import { Hono } from 'hono';
import type { Env } from '../index';

const referrals = new Hono<{ Bindings: Env }>();

referrals.get('/:code', async (c) => {
  const { code } = c.req.param();
  const user = await c.env.DB.prepare('SELECT id FROM users WHERE ref_code=?').bind(code).first<{id:string}>();
  if (!user) return c.text('Not found', 404);
  // Store referral touch; joining logic can be expanded later.
  await c.env.DB.prepare('INSERT INTO referrals (ref_code, inviter_user_id, credited_at) VALUES (?, ?, ?)').bind(code, user.id, Date.now()).run();
  return c.redirect('/?ref=' + code, 302);
});

export default referrals;
