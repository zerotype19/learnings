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

export default social;
