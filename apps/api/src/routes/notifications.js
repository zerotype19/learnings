import { Hono } from 'hono';
const notifications = new Hono();
notifications.get('/', async (c) => {
    const user = c.req.query('user_id') || 'anon';
    const { results } = await c.env.DB.prepare('SELECT * FROM notifications WHERE user_id=? ORDER BY created_at DESC LIMIT 50')
        .bind(user).all();
    return c.json({ items: results });
});
notifications.post('/read', async (c) => {
    const { user_id, ids } = await c.req.json();
    if (!user_id || !Array.isArray(ids))
        return c.text('Bad request', 400);
    for (const id of ids) {
        await c.env.DB.prepare('UPDATE notifications SET read_at=? WHERE id=? AND user_id=?')
            .bind(Date.now(), id, user_id).run();
    }
    return c.json({ ok: true });
});
export default notifications;
