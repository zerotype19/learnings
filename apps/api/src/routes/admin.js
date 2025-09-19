import { Hono } from 'hono';
import { requireAuth } from '../utils/auth';
const admin = new Hono();
// Get pending submissions
admin.get('/submissions', async (c) => {
    const auth = await requireAuth(c);
    const adminParam = c.req.query('admin');
    // For development: allow access with admin=1 parameter
    if (!auth && adminParam !== '1') {
        return c.text('Unauthorized', 401);
    }
    const { results } = await c.env.DB.prepare(`
    SELECT id, raw_title, raw_definition, raw_example, status, created_at 
    FROM submissions 
    WHERE status = 'pending' 
    ORDER BY created_at DESC
    LIMIT 50
  `).all();
    return c.json({ items: results });
});
// Moderate a submission
admin.patch('/submissions/:id', async (c) => {
    const auth = await requireAuth(c);
    const adminParam = c.req.query('admin');
    // For development: allow access with admin=1 parameter
    if (!auth && adminParam !== '1') {
        return c.text('Unauthorized', 401);
    }
    const { id } = c.req.param();
    const { status } = await c.req.json();
    if (!['approved', 'rejected'].includes(status)) {
        return c.text('Invalid status', 400);
    }
    // Update submission status
    await c.env.DB.prepare('UPDATE submissions SET status=? WHERE id=?')
        .bind(status, id).run();
    // If approved, could optionally create a term (for now just mark as approved)
    return c.json({ ok: true, status });
});
export default admin;
