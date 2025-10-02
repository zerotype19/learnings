import { Hono } from 'hono';
import type { Env } from '../index';

const wallPosts = new Hono<{ Bindings: Env }>();

// GET /api/wall - List wall posts with filtering and pagination
wallPosts.get('/', async (c) => {
  try {
    const tag = c.req.query('tag');
    const sort = c.req.query('sort') || 'new';
    const range = c.req.query('range') || 'all';
    const cursor = c.req.query('cursor');
    const limit = parseInt(c.req.query('limit') || '20');

    let sql = `
      SELECT 
        id, slug, title, body, source_url, og_title, og_desc, og_image, og_site,
        tags, related_terms, votes, comments, vote_count, comment_count, 
        hot_score, created_at, last_activity_at
      FROM wall_posts 
      WHERE 1=1
    `;
    
    const binds: any[] = [];

    // Filter by tag
    if (tag) {
      sql += ` AND (tags LIKE ? OR related_terms LIKE ?)`;
      binds.push(`%"${tag}"%`, `%"${tag}"%`);
    }

    // Filter by time range
    if (range !== 'all') {
      const days = range === '24h' ? 1 : range === '7d' ? 7 : 30;
      sql += ` AND created_at >= datetime('now', '-${days} days')`;
    }

    // Sort by trending (hot_score) or new (created_at)
    if (sort === 'trending') {
      sql += ` ORDER BY hot_score DESC, created_at DESC`;
    } else {
      sql += ` ORDER BY created_at DESC`;
    }

    // Pagination
    if (cursor) {
      const cursorDate = new Date(cursor).toISOString();
      if (sort === 'trending') {
        sql += ` AND (hot_score < (SELECT hot_score FROM wall_posts WHERE id = ?) OR (hot_score = (SELECT hot_score FROM wall_posts WHERE id = ?) AND created_at < ?))`;
        binds.push(cursor, cursor, cursorDate);
      } else {
        sql += ` AND created_at < ?`;
        binds.push(cursorDate);
      }
    }

    sql += ` LIMIT ?`;
    binds.push(limit + 1); // Get one extra to check if there are more

    const stmt = c.env.DB.prepare(sql).bind(...binds);
    const { results } = await stmt.all();

    const items = results || [];
    const hasMore = items.length > limit;
    const posts = hasMore ? items.slice(0, limit) : items;
    
    const nextCursor = hasMore && posts.length > 0 
      ? posts[posts.length - 1].created_at 
      : null;

    return c.json({
      items: posts,
      nextCursor,
      filters: { tag, sort, range }
    });
  } catch (error) {
    console.error('Wall posts error:', error);
    return c.json({ items: [], error: 'Failed to load wall posts' }, 500);
  }
});

// GET /api/wall/tags/popular - Get popular tags
wallPosts.get('/tags/popular', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '20');
    
    const stmt = c.env.DB.prepare(`
      WITH tag_counts AS (
        SELECT 
          json_extract(value, '$') as tag,
          COUNT(*) as count
        FROM wall_posts, json_each(tags)
        WHERE tags IS NOT NULL AND tags != '[]'
        GROUP BY tag
        UNION ALL
        SELECT 
          json_extract(value, '$') as tag,
          COUNT(*) as count
        FROM wall_posts, json_each(related_terms)
        WHERE related_terms IS NOT NULL AND related_terms != '[]'
        GROUP BY tag
      )
      SELECT tag, SUM(count) as count
      FROM tag_counts
      GROUP BY tag
      ORDER BY count DESC
      LIMIT ?
    `).bind(limit);

    const { results } = await stmt.all();
    return c.json({ tags: results || [] });
  } catch (error) {
    console.error('Popular tags error:', error);
    return c.json({ tags: [] }, 500);
  }
});

// POST /api/wall/submit - Submit a new wall post
wallPosts.post('/submit', async (c) => {
  try {
    const body = await c.req.json();
    const { title, body: postBody, source_url, tags = [], suggested_terms = [] } = body;

    if (!title || !source_url) {
      return c.json({ error: 'Title and source URL are required' }, 400);
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const id = `wall_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    // Insert new wall post
    await c.env.DB.prepare(`
      INSERT INTO wall_posts (
        id, slug, title, body, source_url, tags, related_terms,
        votes, comments, vote_count, comment_count, hot_score,
        created_at, last_activity_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 0, 0, 0.0, ?, ?)
    `).bind(
      id, slug, title, postBody || '', source_url,
      JSON.stringify(tags), JSON.stringify(suggested_terms),
      now, now
    ).run();

    return c.json({
      id,
      status: 'published',
      message: 'Wall post submitted successfully'
    });
  } catch (error) {
    console.error('Submit wall post error:', error);
    return c.json({ error: 'Failed to submit wall post' }, 500);
  }
});

export default wallPosts;

