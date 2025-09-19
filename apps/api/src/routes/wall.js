import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import { checkRate } from '../utils/ratelimit';
const wall = new Hono();
// GET /v1/wall?status=published|pending|flagged
wall.get('/', async (c) => {
    const status = c.req.query('status') || 'published';
    const flagged = c.req.query('flagged');
    let sql = 'SELECT id,title,image_key,source_url,status,flagged,created_at FROM wall_items WHERE status=?';
    const binds = [status];
    if (flagged === '1') {
        sql += ' AND flagged=1';
    }
    sql += ' ORDER BY created_at DESC LIMIT 100';
    const { results } = await c.env.DB.prepare(sql).bind(...binds).all();
    return c.json({ items: results });
});
wall.post('/', async (c) => {
    // Rate limiting
    const ok = await checkRate(c.env, `ip:${c.req.header('cf-connecting-ip')}:wall`, 5, 60);
    if (!ok)
        return c.text('Slow down', 429);
    const contentType = c.req.header('content-type') || '';
    if (!contentType.includes('multipart/form-data'))
        return c.text('Bad Request', 400);
    const form = await c.req.formData();
    const file = form.get('file');
    const title = form.get('title') || 'Untitled';
    const source_url = form.get('source_url') || null;
    if (!file)
        return c.text('No file', 400);
    const id = nanoid();
    const key = `wall/${id}.png`;
    await c.env.R2.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type || 'image/png' } });
    const now = Date.now();
    await c.env.DB.prepare('INSERT INTO wall_items (id, title, image_key, source_url, status, created_at) VALUES (?, ?, ?, ?, "published", ?)')
        .bind(id, title, key, source_url, now).run();
    // Enqueue moderation job
    await c.env.JOBS.send({ type: 'moderate_wall', id, key });
    return c.json({ id, key });
});
// PATCH /v1/wall/:id -> { status, reviewed_by, moderation_notes }
wall.patch('/:id', async (c) => {
    const { id } = c.req.param();
    const body = await c.req.json();
    await c.env.DB.prepare('UPDATE wall_items SET status=COALESCE(?,status), reviewed_by=COALESCE(?,reviewed_by), moderation_notes=COALESCE(?,moderation_notes) WHERE id=?')
        .bind(body.status ?? null, body.reviewed_by ?? null, body.moderation_notes ?? null, id).run();
    return c.json({ ok: true });
});
wall.get('/file/*', async (c) => {
    const key = c.req.path.replace('/v1/wall/file/', '');
    const obj = await c.env.R2.get(key);
    if (!obj)
        return c.text('Not found', 404);
    const h = new Headers();
    h.set('Content-Type', obj.httpMetadata?.contentType || 'application/octet-stream');
    return new Response(obj.body, { headers: h });
});
export default wall;
