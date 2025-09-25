import { Hono } from 'hono';
import type { Env } from '../index';

const nonsense = new Hono<{ Bindings: Env }>();

// Track nonsense analytics
nonsense.post('/track', async (c) => {
  try {
    const body = await c.req.json();
    const { type, id, variant, enterprise, path, timestamp } = body;

    // Validate required fields
    if (!type || !id || !path) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Store in D1 database
    const stmt = c.env.DB.prepare(`
      INSERT INTO nonsense_analytics (type, id, variant, enterprise, path, timestamp)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    await stmt.bind(
      type,
      id,
      variant || 'A',
      enterprise ? 1 : 0,
      path,
      timestamp || Date.now()
    ).run();

    return c.json({ success: true });
  } catch (error) {
    console.error('Nonsense tracking error:', error);
    return c.json({ error: 'Failed to track event' }, 500);
  }
});

// Get analytics summary (for admin)
nonsense.get('/stats', async (c) => {
  try {
    const stmt = c.env.DB.prepare(`
      SELECT 
        type,
        variant,
        enterprise,
        COUNT(*) as count,
        COUNT(DISTINCT id) as unique_events
      FROM nonsense_analytics 
      WHERE timestamp > ? 
      GROUP BY type, variant, enterprise
    `);

    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    const { results } = await stmt.bind(oneDayAgo).all();

    return c.json({ stats: results });
  } catch (error) {
    console.error('Nonsense stats error:', error);
    return c.json({ error: 'Failed to get stats' }, 500);
  }
});

export default nonsense;
