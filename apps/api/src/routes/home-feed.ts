import { Hono } from 'hono';
import type { Env } from '../index';

const router = new Hono<{ Bindings: Env }>();

// Get unified home feed
router.get('/', async (c) => {
  try {
    const cursor = c.req.query('cursor');
    const limit = Math.min(Number(c.req.query('limit') || '20'), 50);

    let query = `
      SELECT 
        'term' as type,
        id,
        slug,
        title,
        short_def as summary,
        created_at as ts,
        views,
        NULL as vote_count,
        NULL as source_url,
        NULL as og_image
      FROM terms_v2 
      WHERE status = 'published'
      
      UNION ALL
      
      SELECT 
        'wall' as type,
        id,
        slug,
        title,
        og_desc as summary,
        created_at as ts,
        0 as views,
        vote_count,
        source_url,
        og_image
      FROM wall_posts
      
      ORDER BY ts DESC
      LIMIT ?
    `;

    let params: any[] = [limit + 1];

    // Cursor-based pagination
    if (cursor) {
      query = `
        SELECT 
          'term' as type,
          id,
          slug,
          title,
          short_def as summary,
          created_at as ts,
          views,
          NULL as vote_count,
          NULL as source_url,
          NULL as og_image
        FROM terms_v2 
        WHERE status = 'published' AND created_at < ?
        
        UNION ALL
        
        SELECT 
          'wall' as type,
          id,
          slug,
          title,
          og_desc as summary,
          created_at as ts,
          0 as views,
          vote_count,
          source_url,
          og_image
        FROM wall_posts
        WHERE created_at < ?
        
        ORDER BY ts DESC
        LIMIT ?
      `;
      params = [cursor, cursor, limit + 1];
    }

    const stmt = c.env.DB.prepare(query);
    const { results } = await stmt.all(...params);
    
    const items = (results || []).slice(0, limit);
    const hasMore = (results || []).length > limit;
    
    let nextCursor: string | undefined;
    if (hasMore && items.length > 0) {
      const lastItem = items[items.length - 1] as any;
      nextCursor = lastItem.ts;
    }

    // Format items for frontend
    const formattedItems = items.map((item: any) => ({
      type: item.type,
      ts: item.ts,
      data: {
        id: item.id,
        slug: item.slug,
        title: item.title,
        summary: item.summary,
        views: item.views,
        vote_count: item.vote_count,
        source_url: item.source_url,
        og_image: item.og_image,
      }
    }));

    return c.json({ 
      items: formattedItems, 
      nextCursor 
    });
  } catch (error) {
    console.error('Home feed error:', error);
    return c.json({ items: [], error: 'Feed error' }, 500);
  }
});

export default router;