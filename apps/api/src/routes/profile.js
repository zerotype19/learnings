import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import { pushNotification } from '../utils/notify';
import { checkAndAwardBadges } from '../utils/badges';
const profile = new Hono();
profile.get('/:handle', async (c) => {
    const { handle } = c.req.param();
    const row = await c.env.DB.prepare('SELECT id, handle, display_name, bio, avatar_key, links_json, ref_code FROM users WHERE handle=?').bind(handle).first();
    if (!row)
        return c.text('Not found', 404);
    const stats = await c.env.DB.prepare(`SELECT
    (SELECT COUNT(*) FROM terms WHERE author_id = ?) AS terms,
    (SELECT COUNT(*) FROM wall_items WHERE submitter_id = ?) AS wall,
    (SELECT COUNT(*) FROM follows WHERE followee_id = ?) AS followers,
    (SELECT COUNT(*) FROM follows WHERE follower_id = ?) AS following
  `).bind(row.id, row.id, row.id, row.id).first();
    // Get user badges
    const badges = await c.env.DB.prepare(`
    SELECT b.id, b.name, b.icon, ub.awarded_at 
    FROM user_badges ub 
    JOIN badges b ON b.id = ub.badge_id 
    WHERE ub.user_id = ?
    ORDER BY ub.awarded_at DESC
  `).bind(row.id).all();
    return c.json({ ...row, stats, badges: badges.results });
});
profile.post('/', async (c) => {
    // For now, anonymous edit stub. Later require auth.
    const { handle, display_name, bio, links, avatar_key } = await c.req.json();
    const ref_code = `ref_${Math.random().toString(36).slice(2, 8)}`;
    const now = Date.now();
    const id = nanoid();
    await c.env.DB.prepare('INSERT INTO users (id, handle, display_name, bio, links_json, avatar_key, ref_code, role, created_at) VALUES (?,?,?,?,?,?,?,"member",?)')
        .bind(id, handle, display_name, bio || null, JSON.stringify(links || []), avatar_key || null, ref_code, now).run();
    return c.json({ id, handle, ref_code });
});
profile.post('/follow/:handle', async (c) => {
    const { handle } = c.req.param();
    const follower = (await c.req.json()).follower_id || 'anon';
    const target = await c.env.DB.prepare('SELECT id FROM users WHERE handle=?').bind(handle).first();
    if (!target)
        return c.text('Not found', 404);
    await c.env.DB.prepare('INSERT OR IGNORE INTO follows (follower_id, followee_id, created_at) VALUES (?,?,?)').bind(follower, target.id, Date.now()).run();
    // Notify the followee and check for badges
    await pushNotification(c.env, target.id, 'follow', { follower_id: follower });
    await checkAndAwardBadges(c.env, target.id);
    return c.json({ ok: true });
});
export default profile;
