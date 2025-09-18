import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import type { Env } from '../index';
import { checkRate } from '../utils/ratelimit';

const suggest = new Hono<{ Bindings: Env }>();

suggest.post('/', async (c) => {
  // Rate limiting
  const ok = await checkRate(c.env as any, `ip:${c.req.header('cf-connecting-ip')}:suggest`, 3, 60);
  if (!ok) return c.text('Slow down', 429);
  
  const { title, rough_definition, example } = await c.req.json();
  // AI punch-up (stub)
  const definition = rough_definition + ' (now with 30% more gravitas)';
  const id = nanoid();
  await c.env.DB.prepare('INSERT INTO submissions (id, raw_title, raw_definition, raw_example, status, created_at) VALUES (?,?,?,?,"pending",?)')
    .bind(id, title, definition, example, Date.now()).run();
  return c.json({ id, status: 'pending' });
});

export default suggest;
