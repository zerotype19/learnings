import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import type { Env } from '../index';

const profile = new Hono<{ Bindings: Env }>();

profile.get('/:handle', async (c) => {
  const { handle } = c.req.param();
  const row = await c.env.DB.prepare('SELECT id, handle, display_name, bio, avatar_key, links_json, ref_code FROM users WHERE handle=?').bind(handle).first();
  if (!row) return c.text('Not found', 404);
  const stats = await c.env.DB.prepare(`SELECT
    (SELECT COUNT(*) FROM terms WHERE author_id = ?) AS terms,
    (SELECT COUNT(*) FROM wall_items WHERE submitter_id = ?) AS wall,
    (SELECT COUNT(*) FROM follows WHERE followee_id = ?) AS followers,
    (SELECT COUNT(*) FROM follows WHERE follower_id = ?) AS following
  `).bind(row.id, row.id, row.id, row.id).first();
  return c.json({ ...row, stats });
});

profile.post('/', async (c) => {
  // For now, anonymous edit stub. Later require auth.
  const { handle, display_name, bio, links, avatar_key } = await c.req.json();
  const ref_code = `ref_${Math.random().toString(36).slice(2,8)}`;
  const now = Date.now();
  const id = nanoid();
  await c.env.DB.prepare('INSERT INTO users (id, handle, display_name, bio, links_json, avatar_key, ref_code, role, created_at) VALUES (?,?,?,?,?,?,?,"member",?)')
    .bind(id, handle, display_name, bio || null, JSON.stringify(links||[]), avatar_key || null, ref_code, now).run();
  return c.json({ id, handle, ref_code });
});

profile.post('/follow/:handle', async (c) => {
  const { handle } = c.req.param();
  const follower = (await c.req.json()).follower_id || 'anon';
  const target = await c.env.DB.prepare('SELECT id FROM users WHERE handle=?').bind(handle).first<{id:string}>();
  if (!target) return c.text('Not found', 404);
  await c.env.DB.prepare('INSERT OR IGNORE INTO follows (follower_id, followee_id, created_at) VALUES (?,?,?)').bind(follower, target.id, Date.now()).run();
  return c.json({ ok: true });
});

export default profile;
