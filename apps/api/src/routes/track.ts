import { Hono } from 'hono';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import type { Env } from '../index';
import { getFingerprint } from '../utils/auth';

const router = new Hono<{ Bindings: Env }>();

const EventSchema = z.object({
  name: z.string().min(1).max(100),
  props: z.record(z.any()).optional(),
});

// Track client events
router.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const parsed = EventSchema.safeParse(body);
    
    if (!parsed.success) {
      return c.json({ error: parsed.error.flatten() }, 400);
    }

    const fingerprint = getFingerprint(c);
    const eventId = nanoid();
    const now = new Date().toISOString();
    
    // Store in events table
    await c.env.DB.prepare(`
      INSERT INTO events (id, user_id, name, props, ts)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      eventId,
      fingerprint,
      parsed.data.name,
      parsed.data.props ? JSON.stringify(parsed.data.props) : null,
      now
    ).run();

    // Optional: Forward to Cloudflare Analytics or other services
    // await forwardToAnalytics(parsed.data.name, parsed.data.props);

    return c.json({ ok: true, id: eventId });
  } catch (error) {
    console.error('Event tracking error:', error);
    return c.json({ error: 'Tracking failed' }, 500);
  }
});

// Get analytics data (admin only)
router.get('/analytics', async (c) => {
  try {
    const days = Number(c.req.query('days') || '7');
    const event = c.req.query('event');
    
    let query = `
      SELECT name, COUNT(*) as count, DATE(ts) as date
      FROM events 
      WHERE ts >= datetime('now', '-${days} days')
    `;
    
    let params: any[] = [];
    
    if (event) {
      query += ' AND name = ?';
      params.push(event);
    }
    
    query += ' GROUP BY name, DATE(ts) ORDER BY date DESC, count DESC';
    
    const stmt = c.env.DB.prepare(query);
    const { results } = await stmt.all(...params);
    
    return c.json({ 
      events: results || [],
      period: `${days} days`
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return c.json({ events: [], error: 'Analytics failed' }, 500);
  }
});

// Get popular events
router.get('/popular', async (c) => {
  try {
    const days = Number(c.req.query('days') || '30');
    const limit = Math.min(Number(c.req.query('limit') || '20'), 100);
    
    const stmt = c.env.DB.prepare(`
      SELECT name, COUNT(*) as count
      FROM events 
      WHERE ts >= datetime('now', '-${days} days')
      GROUP BY name
      ORDER BY count DESC
      LIMIT ?
    `);
    
    const { results } = await stmt.all(limit);
    
    return c.json({ 
      events: results || [],
      period: `${days} days`
    });
  } catch (error) {
    console.error('Popular events error:', error);
    return c.json({ events: [], error: 'Failed to load popular events' }, 500);
  }
});

export default router;
