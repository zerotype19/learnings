import { Hono } from 'hono';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import type { Env } from '../index';
import { checkRate } from '../utils/ratelimit';
import { requireAuth, getFingerprint } from '../utils/auth';

const router = new Hono<{ Bindings: Env }>();

// Get terms with A-Z filtering, search, and pagination
router.get('/', async (c) => {
  try {
    const letter = c.req.query('letter');
    const tag = c.req.query('tag');
    const sort = c.req.query('sort') || 'newest';
    const cursor = c.req.query('cursor');
    const limit = Math.min(Number(c.req.query('limit') || '20'), 50);

    let query = 'SELECT * FROM terms_v2 WHERE status = "published"';
    let params: any[] = [];

    // Letter filtering
    if (letter && letter.length === 1) {
      query += ' AND UPPER(SUBSTR(title, 1, 1)) = ?';
      params.push(letter.toUpperCase());
    }

    // Tag filtering
    if (tag) {
      query += ' AND tags LIKE ?';
      params.push(`%"${tag}"%`);
    }

    // Sorting
    switch (sort) {
      case 'popular':
        query += ' ORDER BY views DESC, created_at DESC';
        break;
      case 'newest':
      default:
        query += ' ORDER BY created_at DESC';
        break;
    }

    // Cursor-based pagination
    if (cursor) {
      const cursorParts = cursor.split(':');
      if (cursorParts.length === 2) {
        const [cursorSort, cursorValue] = cursorParts;
        if (sort === 'popular') {
          query += ' AND (views < ? OR (views = ? AND created_at < ?))';
          params.push(cursorValue, cursorValue, cursorSort);
        } else {
          query += ' AND created_at < ?';
          params.push(cursorSort);
        }
      }
    }

    query += ' LIMIT ?';
    params.push(limit + 1);

    const stmt = c.env.DB.prepare(query);
    const { results } = await stmt.all(...params);
    
    const items = (results || []).slice(0, limit);
    const hasMore = (results || []).length > limit;
    
    let nextCursor: string | undefined;
    if (hasMore && items.length > 0) {
      const lastItem = items[items.length - 1] as any;
      if (sort === 'popular') {
        nextCursor = `${lastItem.created_at}:${lastItem.views}`;
      } else {
        nextCursor = lastItem.created_at;
      }
    }

    // Parse JSON fields
    const processedItems = items.map((item: any) => ({
      ...item,
      tags: item.tags ? JSON.parse(item.tags) : [],
    }));

    return c.json({ 
      items: processedItems, 
      nextCursor 
    });
  } catch (error) {
    console.error('Terms API error:', error);
    console.error('Query:', query);
    console.error('Params:', params);
    return c.json({ 
      items: [], 
      error: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        query,
        params,
        errorType: typeof error
      }
    }, 500);
  }
});

// Get single term by slug
router.get('/:slug', async (c) => {
  try {
    const slug = c.req.param('slug');
    const stmt = c.env.DB.prepare(
      'SELECT * FROM terms_v2 WHERE slug = ? AND status = "published"'
    );
    const result = await stmt.first();
    
    if (!result) {
      return c.json({ error: 'Term not found' }, 404);
    }

    // Increment view count
    await c.env.DB.prepare(
      'UPDATE terms_v2 SET views = views + 1 WHERE id = ?'
    ).bind(result.id).run();

    // Parse JSON fields
    const processedItem = {
      ...result,
      tags: result.tags ? JSON.parse(result.tags) : [],
    };

    return c.json({ item: processedItem });
  } catch (error) {
    console.error('Database error:', error);
    return c.json({ error: 'Database error' }, 500);
  }
});

// Submit new term
const TermSubmissionSchema = z.object({
  title: z.string().min(2).max(100),
  short_def: z.string().max(160).optional(),
  definition: z.string().min(10).max(2000),
  examples: z.string().max(1000).optional(),
  tags: z.array(z.string()).optional(),
  links: z.array(z.object({
    url: z.string().url(),
    label: z.string().max(100)
  })).optional(),
});

router.post('/submit', async (c) => {
  // Rate limiting
  const fingerprint = getFingerprint(c);
  const ok = await checkRate(c.env as any, `ip:${fingerprint}:terms-submit`, 5, 60);
  if (!ok) return c.text('Rate limit exceeded', 429);
  
  try {
    const body = await c.req.json();
    const parsed = TermSubmissionSchema.safeParse(body);
    
    if (!parsed.success) {
      return c.json({ error: parsed.error.flatten() }, 400);
    }

    const id = nanoid();
    const now = new Date().toISOString();
    
    const stmt = c.env.DB.prepare(`
      INSERT INTO term_submissions (
        id, title, short_def, definition, examples, tags, links, 
        submitted_by, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'queued', ?, ?)
    `);
    
    await stmt.bind(
      id,
      parsed.data.title,
      parsed.data.short_def || null,
      parsed.data.definition,
      parsed.data.examples || null,
      parsed.data.tags ? JSON.stringify(parsed.data.tags) : null,
      parsed.data.links ? JSON.stringify(parsed.data.links) : null,
      fingerprint, // submitted_by
      now,
      now
    ).run();

    return c.json({ id, status: 'queued' }, 201);
  } catch (error) {
    console.error('Submission error:', error);
    return c.json({ error: 'Submission failed' }, 500);
  }
});

// Search terms with FTS5
router.get('/search', async (c) => {
  try {
    const q = c.req.query('q') || '';
    const limit = Math.min(Number(c.req.query('limit') || '10'), 20);
    
    if (!q.trim()) {
      return c.json({ items: [] });
    }

    // Use FTS5 for better search results
    const stmt = c.env.DB.prepare(`
      SELECT t.*, rank 
      FROM terms_fts f
      JOIN terms_v2 t ON f.rowid = t.rowid
      WHERE terms_fts MATCH ? AND t.status = 'published'
      ORDER BY rank
      LIMIT ?
    `);
    
    const { results } = await stmt.all(`"${q}"`, limit);
    
    // Parse JSON fields
    const processedItems = (results || []).map((item: any) => ({
      ...item,
      tags: item.tags ? JSON.parse(item.tags) : [],
    }));

    return c.json({ items: processedItems });
  } catch (error) {
    console.error('Search error:', error);
    // Fallback to LIKE search if FTS5 fails
    try {
      const q = c.req.query('q') || '';
      const limit = Math.min(Number(c.req.query('limit') || '10'), 20);
      
      const stmt = c.env.DB.prepare(`
        SELECT * FROM terms_v2 
        WHERE (title LIKE ? OR definition LIKE ? OR short_def LIKE ?) 
        AND status = 'published'
        ORDER BY views DESC
        LIMIT ?
      `);
      
      const searchTerm = `%${q}%`;
      const { results } = await stmt.all(searchTerm, searchTerm, searchTerm, limit);
      
      const processedItems = (results || []).map((item: any) => ({
        ...item,
        tags: item.tags ? JSON.parse(item.tags) : [],
      }));

      return c.json({ items: processedItems });
    } catch (fallbackError) {
      console.error('Fallback search error:', fallbackError);
      return c.json({ items: [], error: 'Search failed' }, 500);
    }
  }
});

// Get A-Z letter counts for navigation
router.get('/letters', async (c) => {
  try {
    const stmt = c.env.DB.prepare(`
      SELECT UPPER(SUBSTR(title, 1, 1)) as letter, COUNT(*) as count
      FROM terms_v2 
      WHERE status = 'published'
      GROUP BY UPPER(SUBSTR(title, 1, 1))
      ORDER BY letter
    `);
    
    const { results } = await stmt.all();
    return c.json({ letters: results || [] });
  } catch (error) {
    console.error('Letters error:', error);
    return c.json({ letters: [] }, 500);
  }
});

export default router;