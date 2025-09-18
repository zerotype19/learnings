import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import type { Env } from '../index';

const social = new Hono<{ Bindings: Env }>();

social.post('/share/:type/:id', async (c) => {
  const { type, id } = c.req.param();
  const code = nanoid(7);
  const target = `/${type}/${id}`;
  await c.env.DB.prepare(`INSERT INTO shortlinks (code, target, created_at) VALUES (?, ?, ?)`)
    .bind(code, target, Date.now())
    .run();
  return c.json({ short: `/l/${code}` });
});

social.get('/l/:code', async (c) => {
  const { code } = c.req.param();
  const row = await c.env.DB.prepare('SELECT target FROM shortlinks WHERE code = ?').bind(code).first<{target:string}>();
  if (!row) return c.text('Not found', 404);
  return c.redirect(row.target.startsWith('http') ? row.target : row.target, 302);
});

// Ranking by (cringe + heard) weekly delta
social.get('/deans-list', async (c) => {
  const oneWeekAgo = Date.now() - 7*24*60*60*1000;
  const { results } = await c.env.DB.prepare(`
    SELECT t.slug, t.title,
      SUM(CASE WHEN v.reaction='cringe' THEN 1 ELSE 0 END) AS cringe,
      SUM(CASE WHEN v.reaction='heard1000x' THEN 1 ELSE 0 END) AS heard
    FROM terms t
    LEFT JOIN votes v ON v.term_id = t.id AND v.created_at >= ?
    GROUP BY t.id
    ORDER BY (cringe + heard) DESC
    LIMIT 10
  `).bind(oneWeekAgo).all();
  return c.json({ items: results });
});

export default social;
