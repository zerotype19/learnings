import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import type { Env } from '../index';

const challenges = new Hono<{ Bindings: Env }>();

challenges.get('/', async (c) => {
  const now = Date.now();
  const { results } = await c.env.DB.prepare('SELECT * FROM challenges WHERE ends_at >= ? ORDER BY starts_at ASC LIMIT 12').bind(now).all();
  return c.json({ items: results });
});

challenges.post('/', async (c) => {
  const { title, prompt, starts_at, ends_at } = await c.req.json();
  const id = nanoid();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  await c.env.DB.prepare('INSERT INTO challenges (id, slug, title, prompt, starts_at, ends_at, created_at) VALUES (?,?,?,?,?,?,?)')
    .bind(id, slug, title, prompt, starts_at, ends_at, Date.now()).run();
  return c.json({ id, slug });
});

challenges.get('/:slug', async (c) => {
  const { slug } = c.req.param();
  const ch = await c.env.DB.prepare('SELECT * FROM challenges WHERE slug=?').bind(slug).first();
  if (!ch) return c.text('Not found', 404);
  const entries = await c.env.DB.prepare('SELECT * FROM challenge_entries WHERE challenge_id=? ORDER BY created_at DESC').bind(ch.id).all();
  return c.json({ challenge: ch, entries: entries.results });
});

challenges.post('/:slug/entries', async (c) => {
  const { slug } = c.req.param();
  const ch = await c.env.DB.prepare('SELECT id FROM challenges WHERE slug=?').bind(slug).first<{id:string}>();
  if (!ch) return c.text('Not found', 404);
  const { term_id, wall_item_id, title, body, author_id } = await c.req.json();
  const id = nanoid();
  await c.env.DB.prepare('INSERT INTO challenge_entries (id, challenge_id, term_id, wall_item_id, author_id, title, body, created_at) VALUES (?,?,?,?,?,?,?,?)')
    .bind(id, ch.id, term_id || null, wall_item_id || null, author_id || null, title || null, body || null, Date.now()).run();
  return c.json({ id });
});

export default challenges;
