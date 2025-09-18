import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import type { Env } from '../index';

const wall = new Hono<{ Bindings: Env }>();

wall.get('/', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT id, title, image_key, source_url, created_at FROM wall_items WHERE status = "published" ORDER BY created_at DESC LIMIT 100').all();
  return c.json({ items: results });
});

wall.post('/', async (c) => {
  const contentType = c.req.header('content-type') || '';
  if (!contentType.includes('multipart/form-data')) return c.text('Bad Request', 400);
  const form = await c.req.formData();
  const file = form.get('file') as File | null;
  const title = (form.get('title') as string) || 'Untitled';
  const source_url = (form.get('source_url') as string) || null;
  if (!file) return c.text('No file', 400);
  const id = nanoid();
  const key = `wall/${id}.png`;
  await c.env.R2.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type || 'image/png' } });
  const now = Date.now();
  await c.env.DB.prepare('INSERT INTO wall_items (id, title, image_key, source_url, status, created_at) VALUES (?, ?, ?, ?, "published", ?)')
    .bind(id, title, key, source_url, now).run();
  return c.json({ id, key });
});

wall.get('/file/*', async (c) => {
  const key = c.req.path.replace('/v1/wall/file/', '');
  const obj = await c.env.R2.get(key);
  if (!obj) return c.text('Not found', 404);
  const h = new Headers();
  h.set('Content-Type', obj.httpMetadata?.contentType || 'application/octet-stream');
  return new Response(obj.body, { headers: h });
});

export default wall;
