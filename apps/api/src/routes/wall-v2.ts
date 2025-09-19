import { Hono } from 'hono';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import type { Env } from '../index';
import { requireAuth, getFingerprint } from '../utils/auth';
import { scrapeOG, calculateHotScore } from '../utils/og-scraper';

const wallV2 = new Hono<{ Bindings: Env }>();

// GET /api/wall - List published wall posts with filtering
wallV2.get('/', async (c) => {
  const tag = c.req.query('tag') || '';
  const sort = c.req.query('sort') || 'new'; // new, trending
  const range = c.req.query('range') || 'all'; // 24h, 7d, 30d, all
  const cursor = c.req.query('cursor') || '';
  const limit = Math.min(parseInt(c.req.query('limit') || '20'), 50);

  let query = `
    SELECT id, slug, title, body, source_url, og_title, og_desc, og_image,
           tags, related_terms, votes, comments, created_at
    FROM wall_posts 
    WHERE 1=1
  `;
  let params: any[] = [];

  // Filter by tag
  if (tag) {
    query += ' AND tags LIKE ?';
    params.push(`%"${tag}"%`);
  }

  // Filter by date range
  if (range !== 'all') {
    const hours = range === '24h' ? 24 : range === '7d' ? 168 : 720; // 30d
    query += ` AND created_at > datetime('now', '-${hours} hours')`;
  }

  // Cursor pagination
  if (cursor) {
    if (sort === 'trending') {
      const [score, id] = cursor.split('|');
      query += ' AND (vote_count < ? OR (vote_count = ? AND id < ?))';
      params.push(parseFloat(score), parseFloat(score), id);
    } else {
      query += ' AND created_at < ?';
      params.push(cursor);
    }
  }

  // Sorting
  if (sort === 'trending') {
    query += ' ORDER BY votes DESC, id DESC';
  } else {
    query += ' ORDER BY created_at DESC';
  }

  query += ' LIMIT ?';
  params.push(limit + 1);

  const { results } = await c.env.DB.prepare(query).bind(...params).all();
  const items = results as any[];

  // Check if there are more items
  const hasMore = items.length > limit;
  if (hasMore) items.pop();

  // Generate next cursor
  let nextCursor = '';
  if (hasMore && items.length > 0) {
    const lastItem = items[items.length - 1];
    if (sort === 'trending') {
      nextCursor = `${lastItem.vote_count}|${lastItem.id}`;
    } else {
      nextCursor = lastItem.created_at;
    }
  }

  // Process items
  const processedItems = items.map(item => ({
    ...item,
    tags: JSON.parse(item.tags || '[]'),
    related_terms: JSON.parse(item.related_terms || '[]'),
    vote_count: item.votes || 0,
    comment_count: item.comments || 0
  }));

  return c.json({
    items: processedItems,
    nextCursor: hasMore ? nextCursor : null,
    filters: { tag, sort, range }
  });
});

// POST /api/wall/submit - Submit new wall post
const WallSubmissionSchema = z.object({
  title: z.string().min(3).max(200),
  body: z.string().max(2000).optional(),
  source_url: z.string().url(),
  tags: z.array(z.string()).max(10).optional(),
  suggested_terms: z.array(z.string()).max(5).optional()
});

wallV2.post('/submit', async (c) => {
  const body = await c.req.json();
  const parsed = WallSubmissionSchema.safeParse(body);
  
  if (!parsed.success) {
    return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  }

  const auth = await requireAuth(c);
  const fingerprint = getFingerprint(c);
  const data = parsed.data;
  const id = nanoid();

  await c.env.DB.prepare(`
    INSERT INTO wall_submissions 
    (id, title, body, source_url, tags, suggested_terms, submitted_by, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'queued', CURRENT_TIMESTAMP)
  `).bind(
    id,
    data.title,
    data.body || '',
    data.source_url,
    JSON.stringify(data.tags || []),
    JSON.stringify(data.suggested_terms || []),
    auth?.userId || fingerprint
  ).run();

  return c.json({ 
    id, 
    status: 'queued',
    message: 'Wall post submitted for review'
  }, 201);
});

// POST /api/vote - Vote on wall posts
const VoteSchema = z.object({
  entity_type: z.enum(['wall']),
  entity_id: z.string()
});

wallV2.post('/vote', async (c) => {
  const body = await c.req.json();
  const parsed = VoteSchema.safeParse(body);
  
  if (!parsed.success) {
    return c.json({ error: 'Invalid input' }, 400);
  }

  const auth = await requireAuth(c);
  const fingerprint = getFingerprint(c);
  const { entity_type, entity_id } = parsed.data;

  if (entity_type !== 'wall') {
    return c.json({ error: 'Only wall voting supported in this endpoint' }, 400);
  }

  // Check if post exists
  const post = await c.env.DB.prepare('SELECT id, votes FROM wall_posts WHERE id = ?')
    .bind(entity_id).first<{id: string, votes: number}>();

  if (!post) {
    return c.json({ error: 'Post not found' }, 404);
  }

  try {
    // Insert vote (will fail if duplicate due to UNIQUE constraint)
    await c.env.DB.prepare(`
      INSERT INTO wall_votes_v2 (id, post_id, user_id, fingerprint, created_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      nanoid(),
      entity_id,
      auth?.userId || null,
      fingerprint
    ).run();

    // Update vote count in existing wall_posts table
    const newVoteCount = (post.votes || 0) + 1;
    await c.env.DB.prepare(`
      UPDATE wall_posts 
      SET votes = ?
      WHERE id = ?
    `).bind(newVoteCount, entity_id).run();

    return c.json({ 
      ok: true, 
      votes: newVoteCount 
    });

  } catch (error) {
    // Likely duplicate vote
    return c.json({ 
      ok: false, 
      votes: post.votes || 0,
      message: 'Already voted'
    });
  }
});

// GET /api/wall/:slug - Get single wall post
wallV2.get('/:slug', async (c) => {
  const { slug } = c.req.param();

  const post = await c.env.DB.prepare(`
    SELECT * FROM wall_posts WHERE slug = ?
  `).bind(slug).first();

  if (!post) {
    return c.json({ error: 'Post not found' }, 404);
  }

  // Get related terms
  const relatedTermIds = JSON.parse(post.related_terms || '[]');
  let relatedTerms = [];
  
  if (relatedTermIds.length > 0) {
    const placeholders = relatedTermIds.map(() => '?').join(',');
    const { results } = await c.env.DB.prepare(`
      SELECT id, slug, title, short_def FROM terms_v2 
      WHERE id IN (${placeholders}) AND status = 'published'
    `).bind(...relatedTermIds).all();
    relatedTerms = results || [];
  }

  return c.json({
    ...post,
    tags: JSON.parse(post.tags || '[]'),
    related_terms: relatedTerms,
    vote_count: post.vote_count || 0,
    comment_count: post.comment_count || 0
  });
});

export default wallV2;
