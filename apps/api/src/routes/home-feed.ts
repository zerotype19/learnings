import { Hono } from 'hono';
import type { Env } from '../index';

const homeFeed = new Hono<{ Bindings: Env }>();

// GET /api/home-feed - Unified home feed with mixed content
homeFeed.get('/', async (c) => {
  const cursor = c.req.query('cursor') || '';
  const limit = Math.min(parseInt(c.req.query('limit') || '20'), 50);

  try {
    const feedItems: any[] = [];

    // Get recent terms (published in last 30 days)
    const { results: recentTerms } = await c.env.DB.prepare(`
      SELECT 'term' as type, id, slug, title, definition as content, short_def, views, created_at as ts
      FROM terms_v2 
      WHERE status = 'published' 
        AND created_at > datetime('now', '-30 days')
        ${cursor ? 'AND created_at < ?' : ''}
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(...(cursor ? [cursor, Math.ceil(limit / 3)] : [Math.ceil(limit / 3)])).all();

    feedItems.push(...(recentTerms || []).map((item: any) => ({
      type: 'term',
      ts: item.ts,
      data: {
        id: item.id,
        slug: item.slug,
        title: item.title,
        short_def: item.short_def || item.content?.substring(0, 160),
        views: item.views
      }
    })));

    // Get recent wall posts
    const { results: recentWall } = await c.env.DB.prepare(`
      SELECT 'wall' as type, id, slug, title, body, source_url, og_title, og_desc, votes, created_at as ts
      FROM wall_posts 
      WHERE created_at > datetime('now', '-30 days')
        ${cursor ? 'AND created_at < ?' : ''}
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(...(cursor ? [cursor, Math.ceil(limit / 3)] : [Math.ceil(limit / 3)])).all();

    feedItems.push(...(recentWall || []).map((item: any) => ({
      type: 'wall',
      ts: item.ts,
      data: {
        id: item.id,
        slug: item.slug,
        title: item.og_title || item.title,
        source_url: item.source_url,
        snippet: item.og_desc || item.body || '',
        votes: item.votes || 0
      }
    })));

    // Get active challenges
    const { results: activeChallenges } = await c.env.DB.prepare(`
      SELECT 'challenge' as type, id, slug, title, brief, ends_at, created_at as ts
      FROM challenges_v3 
      WHERE status = 'active' 
        AND datetime('now') BETWEEN starts_at AND ends_at
      ORDER BY created_at DESC
      LIMIT 2
    `).all();

    feedItems.push(...(activeChallenges || []).map((item: any) => ({
      type: 'challenge',
      ts: item.ts,
      data: {
        id: item.id,
        slug: item.slug,
        title: item.title,
        brief: item.brief,
        ends_at: item.ends_at
      }
    })));

    // Get public generator runs (last 7 days)
    const { results: publicRuns } = await c.env.DB.prepare(`
      SELECT 'generator' as type, gr.id, gr.output_text, gr.created_at as ts, g.name as generator_name
      FROM generator_runs gr
      LEFT JOIN generators_v2 g ON gr.generator_id = g.id
      WHERE gr.made_public = 1 
        AND gr.created_at > datetime('now', '-7 days')
        ${cursor ? 'AND gr.created_at < ?' : ''}
      ORDER BY gr.created_at DESC
      LIMIT ?
    `).bind(...(cursor ? [cursor, Math.ceil(limit / 4)] : [Math.ceil(limit / 4)])).all();

    feedItems.push(...(publicRuns || []).map((item: any) => ({
      type: 'generator',
      ts: item.ts,
      data: {
        id: item.id,
        generator_name: item.generator_name,
        output_snippet: item.output_text?.substring(0, 200) || 'Generated content',
        created_at: item.ts
      }
    })));

    // Sort all items by timestamp
    const sortedItems = feedItems
      .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime())
      .slice(0, limit);

    // Generate next cursor
    let nextCursor = null;
    if (sortedItems.length === limit && sortedItems.length > 0) {
      nextCursor = sortedItems[sortedItems.length - 1].ts;
    }

    return c.json({
      items: sortedItems,
      nextCursor
    });

  } catch (error) {
    console.error('Home feed error:', error);
    return c.json({ 
      items: [], 
      nextCursor: null,
      error: 'Feed temporarily unavailable'
    }, 500);
  }
});

export default homeFeed;
