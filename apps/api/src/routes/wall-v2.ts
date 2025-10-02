import { Hono } from 'hono';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import type { Env } from '../index';
import { checkRate } from '../utils/ratelimit';
import { getFingerprint } from '../utils/auth';
import { scrapeOpenGraph, getCachedOG, setCachedOG } from '../utils/og-scraper-v2';

const router = new Hono<{ Bindings: Env }>();

// Submit wall content
const WallSubmissionSchema = z.object({
  title: z.string().min(3).max(200),
  body: z.string().max(1000).optional(),
  source_url: z.string().url(),
  tags: z.array(z.string()).optional(),
  suggested_terms: z.array(z.string()).optional(),
});

router.post('/submit', async (c) => {
  // Rate limiting
  const fingerprint = getFingerprint(c);
  const ok = await checkRate(c.env as any, `ip:${fingerprint}:wall-submit`, 3, 60);
  if (!ok) return c.text('Rate limit exceeded', 429);
  
  try {
    const body = await c.req.json();
    const parsed = WallSubmissionSchema.safeParse(body);
    
    if (!parsed.success) {
      return c.json({ error: parsed.error.flatten() }, 400);
    }

    const id = nanoid();
    const now = new Date().toISOString();
    
    const stmt = c.env.DB.prepare(`
      INSERT INTO wall_submissions (
        id, title, body, source_url, tags, suggested_terms, 
        submitted_by, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'queued', ?)
    `);
    
    await stmt.bind(
      id,
      parsed.data.title,
      parsed.data.body || null,
      parsed.data.source_url,
      parsed.data.tags ? JSON.stringify(parsed.data.tags) : null,
      parsed.data.suggested_terms ? JSON.stringify(parsed.data.suggested_terms) : null,
      fingerprint, // submitted_by
      now
    ).run();

    return c.json({ id, status: 'queued' }, 201);
  } catch (error) {
    console.error('Wall submission error:', error);
    return c.json({ error: 'Submission failed' }, 500);
  }
});

// Get wall posts with filtering and pagination
router.get('/', async (c) => {
  let query = 'SELECT * FROM wall_posts WHERE 1=1';
  let params: any[] = [];
  
  try {
    const tag = c.req.query('tag');
    const sort = c.req.query('sort') || 'new';
    const range = c.req.query('range') || 'all';
    const cursor = c.req.query('cursor');
    const limit = Math.min(Number(c.req.query('limit') || '20'), 50);
    
    console.log('Received cursor:', cursor);

    // Tag filtering
    if (tag) {
      query += ' AND tags LIKE ?';
      params.push(`%"${tag}"%`);
    }

    // Time range filtering
    if (range !== 'all') {
      const now = new Date();
      let cutoffDate: Date;
      
      switch (range) {
        case '24h':
          cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case '7d':
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          cutoffDate = new Date(0); // All time
      }
      
      if (cutoffDate.getTime() > 0) {
        query += ' AND created_at >= ?';
        params.push(cutoffDate.toISOString());
      }
    }

    // Sorting
    switch (sort) {
      case 'trending':
        query += ' ORDER BY hot_score DESC, vote_count DESC, created_at DESC';
        break;
      case 'new':
      default:
        query += ' ORDER BY created_at DESC';
        break;
    }

    // Cursor-based pagination
    if (cursor) {
      // Decode the cursor in case it's URL encoded
      const decodedCursor = decodeURIComponent(cursor);
      query += ' AND created_at < ?';
      params.push(decodedCursor);
    }

    query += ' LIMIT ?';
    params.push(limit + 1);

    const stmt = c.env.DB.prepare(query);
    const { results } = await stmt.bind(...params).all();
    
    const items = (results || []).slice(0, limit);
    const hasMore = (results || []).length > limit;
    
    let nextCursor: string | undefined;
    if (hasMore && items.length > 0) {
      const lastItem = items[items.length - 1] as any;
      if (sort === 'trending') {
        nextCursor = `${lastItem.created_at}:${lastItem.hot_score}`;
      } else {
        nextCursor = lastItem.created_at;
      }
    }

    // Parse JSON fields
    const processedItems = items.map((item: any) => ({
      ...item,
      tags: item.tags ? JSON.parse(item.tags) : [],
      related_terms: item.related_terms ? JSON.parse(item.related_terms) : [],
    }));

    return c.json({ 
      items: processedItems, 
      nextCursor 
    });
  } catch (error) {
    console.error('Wall posts error:', error);
    return c.json({ items: [], error: 'Database error' }, 500);
  }
});

// Get single wall post by slug
router.get('/:slug', async (c) => {
  try {
    const slug = c.req.param('slug');
    const stmt = c.env.DB.prepare('SELECT * FROM wall_posts WHERE slug = ?');
    const result = await stmt.first();
    
    if (!result) {
      return c.json({ error: 'Post not found' }, 404);
    }

    // Parse JSON fields
    const processedItem = {
      ...result,
      tags: result.tags ? JSON.parse(result.tags) : [],
      related_terms: result.related_terms ? JSON.parse(result.related_terms) : [],
    };

    return c.json({ item: processedItem });
  } catch (error) {
    console.error('Wall post error:', error);
    return c.json({ error: 'Database error' }, 500);
  }
});

// Vote on wall post
router.post('/:id/vote', async (c) => {
  try {
    const postId = c.req.param('id');
    const fingerprint = getFingerprint(c);
    
    // Check if user already voted
    const existingVote = await c.env.DB.prepare(
      'SELECT id FROM wall_votes WHERE post_id = ? AND user_id = ?'
    ).bind(postId, fingerprint).first();
    
    if (existingVote) {
      return c.json({ error: 'Already voted' }, 400);
    }

    // Add vote
    const voteId = nanoid();
    const now = new Date().toISOString();
    
    await c.env.DB.prepare(
      'INSERT INTO wall_votes (id, post_id, user_id, created_at) VALUES (?, ?, ?, ?)'
    ).bind(voteId, postId, fingerprint, now).run();

    // Update vote count and hot score
    const post = await c.env.DB.prepare(
      'SELECT created_at, vote_count FROM wall_posts WHERE id = ?'
    ).bind(postId).first() as any;
    
    if (post) {
      const newVoteCount = (post.vote_count || 0) + 1;
      
      // Calculate hot score: vote_count / (hours_since_post + 2)^1.5
      const hoursSincePost = (Date.now() - new Date(post.created_at).getTime()) / (1000 * 60 * 60);
      const hotScore = newVoteCount / Math.pow(hoursSincePost + 2, 1.5);
      
      await c.env.DB.prepare(
        'UPDATE wall_posts SET vote_count = ?, hot_score = ?, last_activity_at = ? WHERE id = ?'
      ).bind(newVoteCount, hotScore, now, postId).run();
      
      return c.json({ vote_count: newVoteCount, hot_score: hotScore });
    }

    return c.json({ error: 'Post not found' }, 404);
  } catch (error) {
    console.error('Vote error:', error);
    return c.json({ error: 'Vote failed' }, 500);
  }
});

// Get popular tags
router.get('/tags/popular', async (c) => {
  try {
    const limit = Math.min(Number(c.req.query('limit') || '20'), 50);
    
    // This is a simplified approach - in production you might want a separate tags table
    const stmt = c.env.DB.prepare(`
      SELECT tags FROM wall_posts 
      WHERE tags IS NOT NULL AND tags != '[]'
      LIMIT 1000
    `);
    
    const { results } = await stmt.all();
    const tagCounts: Record<string, number> = {};
    
    if (results) {
      for (const row of results as any[]) {
        try {
          const tags = JSON.parse(row.tags || '[]');
          for (const tag of tags) {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          }
        } catch (e) {
          // Skip invalid JSON
        }
      }
    }
    
    // Sort by count and return top tags
    const popularTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([tag, count]) => ({ tag, count }));
    
    return c.json({ tags: popularTags });
  } catch (error) {
    console.error('Popular tags error:', error);
    return c.json({ tags: [] }, 500);
  }
});

export default router;