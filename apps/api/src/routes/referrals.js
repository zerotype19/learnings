import { Hono } from 'hono';
const referrals = new Hono();
referrals.get('/:code', async (c) => {
    const { code } = c.req.param();
    const user = await c.env.DB.prepare('SELECT id FROM users WHERE ref_code=?').bind(code).first();
    if (!user)
        return c.text('Not found', 404);
    // Store referral touch; joining logic can be expanded later.
    await c.env.DB.prepare('INSERT OR IGNORE INTO referrals (ref_code, inviter_user_id, credited_at) VALUES (?, ?, ?)').bind(code, user.id, Date.now()).run();
    return c.redirect('/?ref=' + code, 302);
});
// Get referral stats for analytics
referrals.get('/analytics/top', async (c) => {
    const { results } = await c.env.DB.prepare(`
    SELECT u.handle, u.display_name, COUNT(r.ref_code) as referrals
    FROM users u
    LEFT JOIN referrals r ON r.inviter_user_id = u.id
    WHERE u.ref_code IS NOT NULL
    GROUP BY u.id
    ORDER BY referrals DESC
    LIMIT 10
  `).all();
    return c.json({ items: results });
});
export default referrals;
