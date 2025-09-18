import { Hono } from 'hono';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import type { Env } from '../index';
import { pushNotification } from '../utils/notify';
import { checkAndAwardBadges } from '../utils/badges';
import { checkRate } from '../utils/ratelimit';
import { requireAuth, getFingerprint } from '../utils/auth';

const router = new Hono<{ Bindings: Env }>();

router.get('/', async (c) => {
  try {
    const q = c.req.query('query') || '';
    const page = Number(c.req.query('page') || '1');
    const limit = 20;
    const offset = (page - 1) * limit;
    const stmt = c.env.DB.prepare(
      `SELECT * FROM terms WHERE title LIKE ? OR definition LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?`
    ).bind(`%${q}%`, `%${q}%`, limit, offset);
    const { results } = await stmt.all();
    return c.json({ items: results || [] });
  } catch (error) {
    console.error('Database error:', error);
    return c.json({ items: [] });
  }
});

const TermSchema = z.object({
  title: z.string().min(2),
  definition: z.string().min(5),
  translation: z.string().optional(),
  example_sentence: z.string().min(5)
});

router.post('/', async (c) => {
  // Rate limiting
  const ok = await checkRate(c.env as any, `ip:${c.req.header('cf-connecting-ip')}:terms`, 10, 60);
  if (!ok) return c.text('Slow down', 429);
  
  const body = await c.req.json();
  const parsed = TermSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);
  const id = nanoid();
  const slug = parsed.data.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const now = Date.now();
  await c.env.DB.prepare(
    `INSERT INTO terms (id, slug, title, definition, translation, example_sentence, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, 'published', ?, ?)`
  ).bind(id, slug, parsed.data.title, parsed.data.definition, parsed.data.translation || null, parsed.data.example_sentence, now, now).run();
  return c.json({ id, slug }, 201);
});

router.post('/:id/vote', async (c) => {
  const id = c.req.param('id');
  const { reaction, user_fingerprint } = await c.req.json();
  const fingerprint = getFingerprint(c);
  const auth = await requireAuth(c);
  const now = Date.now();
  
  try {
    await c.env.DB.prepare(
      `INSERT INTO votes (id, term_id, user_fingerprint, reaction, fingerprint, created_at) VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(nanoid(), id, auth?.userId || user_fingerprint || 'anon', reaction, fingerprint, now).run();
    
    // Notify term author and check for badges
    const owner = await c.env.DB.prepare('SELECT author_id FROM terms WHERE id=?').bind(id).first<{author_id:string|null}>();
    if (owner?.author_id) {
      await pushNotification(c.env as any, owner.author_id, 'vote', { term_id: id, reaction });
      await checkAndAwardBadges(c.env as any, owner.author_id);
    }
  } catch {}
  return c.json({ ok: true });
});

export default router;
