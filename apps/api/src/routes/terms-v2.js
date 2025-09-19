import { Hono } from 'hono';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { requireAuth } from '../utils/auth';
const termsV2 = new Hono();
// GET /api/terms - List terms with filtering and pagination
termsV2.get('/', async (c) => {
    const letter = c.req.query('letter') || '';
    const tag = c.req.query('tag') || '';
    const sort = c.req.query('sort') || 'newest'; // newest, popular, alpha
    const cursor = c.req.query('cursor') || '';
    const limit = Math.min(parseInt(c.req.query('limit') || '20'), 50);
    let query = 'SELECT id, slug, title, definition, short_def, tags, views, created_at FROM terms_v2 WHERE status = ?';
    let params = ['published'];
    // Filter by letter
    if (letter && letter.length === 1) {
        query += ' AND UPPER(SUBSTR(title, 1, 1)) = ?';
        params.push(letter.toUpperCase());
    }
    // Filter by tag (simple JSON search for now)
    if (tag) {
        query += ' AND tags LIKE ?';
        params.push(`%"${tag}"%`);
    }
    // Cursor pagination
    if (cursor) {
        if (sort === 'popular') {
            query += ' AND (views < ? OR (views = ? AND id < ?))';
            const [views, id] = cursor.split('|');
            params.push(parseInt(views), parseInt(views), id);
        }
        else if (sort === 'alpha') {
            query += ' AND title > ?';
            params.push(cursor);
        }
        else {
            query += ' AND created_at < ?';
            params.push(cursor);
        }
    }
    // Sorting
    if (sort === 'popular') {
        query += ' ORDER BY views DESC, id DESC';
    }
    else if (sort === 'alpha') {
        query += ' ORDER BY title ASC';
    }
    else {
        query += ' ORDER BY created_at DESC';
    }
    query += ' LIMIT ?';
    params.push(limit + 1); // Get one extra to check if there's more
    const { results } = await c.env.DB.prepare(query).bind(...params).all();
    const items = results;
    // Check if there are more items
    const hasMore = items.length > limit;
    if (hasMore)
        items.pop();
    // Generate next cursor
    let nextCursor = '';
    if (hasMore && items.length > 0) {
        const lastItem = items[items.length - 1];
        if (sort === 'popular') {
            nextCursor = `${lastItem.views}|${lastItem.id}`;
        }
        else if (sort === 'alpha') {
            nextCursor = lastItem.title;
        }
        else {
            nextCursor = lastItem.created_at;
        }
    }
    // Parse tags from JSON strings
    const processedItems = items.map(item => ({
        ...item,
        tags: JSON.parse(item.tags || '[]'),
        short_def: item.short_def || item.definition.substring(0, 160)
    }));
    return c.json({
        items: processedItems,
        nextCursor: hasMore ? nextCursor : null
    });
});
// GET /api/term/:slug - Get single term by slug
termsV2.get('/:slug', async (c) => {
    const { slug } = c.req.param();
    const term = await c.env.DB.prepare(`
    SELECT id, slug, title, definition, short_def, examples, tags, views, created_at, updated_at 
    FROM terms_v2 
    WHERE slug = ? AND status = 'published'
  `).bind(slug).first();
    if (!term) {
        return c.json({ error: 'Term not found' }, 404);
    }
    // Increment view count
    await c.env.DB.prepare('UPDATE terms_v2 SET views = views + 1 WHERE id = ?')
        .bind(term.id).run();
    // Get related terms (simple implementation for now)
    const { results: relatedTerms } = await c.env.DB.prepare(`
    SELECT id, slug, title, short_def 
    FROM terms_v2 
    WHERE status = 'published' AND id != ? 
    ORDER BY RANDOM() 
    LIMIT 5
  `).bind(term.id).all();
    // Get term links if any
    const { results: links } = await c.env.DB.prepare(`
    SELECT id, url, platform, title, note, votes 
    FROM term_links 
    WHERE term_id = ? AND status = 'approved' 
    ORDER BY votes DESC, created_at DESC
  `).bind(term.id).all();
    return c.json({
        ...term,
        tags: JSON.parse(term.tags || '[]'),
        views: (term.views || 0) + 1, // Return incremented count
        related_terms: relatedTerms,
        links: links || []
    });
});
// POST /api/terms/submit - Submit new term for review
const TermSubmissionSchema = z.object({
    title: z.string().min(2).max(100),
    short_def: z.string().max(160).optional(),
    definition: z.string().min(10).max(2000),
    examples: z.string().max(1000).optional(),
    tags: z.array(z.string()).max(10).optional(),
    links: z.array(z.object({
        url: z.string().url(),
        label: z.string()
    })).max(5).optional()
});
termsV2.post('/submit', async (c) => {
    const body = await c.req.json();
    const parsed = TermSubmissionSchema.safeParse(body);
    if (!parsed.success) {
        return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
    }
    const auth = await requireAuth(c);
    const data = parsed.data;
    const id = nanoid();
    await c.env.DB.prepare(`
    INSERT INTO term_submissions 
    (id, title, short_def, definition, examples, tags, links, submitted_by, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'queued', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `).bind(id, data.title, data.short_def || data.definition.substring(0, 160), data.definition, data.examples || '', JSON.stringify(data.tags || []), JSON.stringify(data.links || []), auth?.userId || 'anonymous').run();
    return c.json({
        id,
        status: 'queued',
        message: 'Term submitted for review'
    }, 201);
});
// POST /api/term/:id/link/submit - Submit link to term
const LinkSubmissionSchema = z.object({
    url: z.string().url(),
    platform: z.enum(['twitter', 'instagram', 'tiktok', 'youtube', 'article', 'other']).optional(),
    title: z.string().max(200).optional(),
    note: z.string().max(500).optional()
});
termsV2.post('/:id/link/submit', async (c) => {
    const { id } = c.req.param();
    const body = await c.req.json();
    const parsed = LinkSubmissionSchema.safeParse(body);
    if (!parsed.success) {
        return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
    }
    // Check if term exists
    const term = await c.env.DB.prepare('SELECT id FROM terms_v2 WHERE id = ? AND status = "published"')
        .bind(id).first();
    if (!term) {
        return c.json({ error: 'Term not found' }, 404);
    }
    const auth = await requireAuth(c);
    const data = parsed.data;
    const linkId = nanoid();
    await c.env.DB.prepare(`
    INSERT INTO term_links 
    (id, term_id, url, platform, title, note, submitted_by, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'queued', CURRENT_TIMESTAMP)
  `).bind(linkId, id, data.url, data.platform || 'other', data.title || '', data.note || '', auth?.userId || 'anonymous').run();
    return c.json({
        id: linkId,
        status: 'queued',
        message: 'Link submitted for review'
    }, 201);
});
export default termsV2;
