import { Hono } from 'hono';
const embeds = new Hono();
function termCardHTML({ title, definition, translation, slug }) {
    // Minimal, self-contained, no external CSS. Inline styles for portability.
    return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
  <body style="margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif">
    <div style="border:1px solid #e5e7eb;border-radius:16px;padding:16px;max-width:560px">
      <div style="font-weight:700;font-size:20px;">${title}</div>
      <p style="margin:8px 0 0 0;font-size:14px;line-height:1.45;">${definition}</p>
      ${translation ? `<p style="margin:8px 0 0 0;font-size:12px;opacity:.75;font-style:italic;">Translation: ${translation}</p>` : ''}
      <a href="https://learnings.org/term/${slug}" style="display:inline-block;margin-top:10px;font-size:12px;text-decoration:none;color:#111">Learnings Dot Org — Powered by AI</a>
    </div>
  </body></html>`;
}
embeds.get('/v1/embed/term/:slug', async (c) => {
    const { slug } = c.req.param();
    const row = await c.env.DB.prepare('SELECT title, definition, translation, slug FROM terms WHERE slug=?').bind(slug).first();
    if (!row)
        return c.text('Not found', 404);
    return new Response(termCardHTML(row), { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=600' } });
});
embeds.get('/v1/embed/wall/:id', async (c) => {
    const { id } = c.req.param();
    const row = await c.env.DB.prepare('SELECT id, title, image_key FROM wall_items WHERE id=?').bind(id).first();
    if (!row)
        return c.text('Not found', 404);
    const html = `<!doctype html><html><body style="margin:0;font-family:Inter,system-ui">
    <figure style="border:1px solid #e5e7eb;border-radius:16px;padding:8px;max-width:560px">
      <img style="max-width:100%;display:block;border-radius:12px" src="${c.env.CORS_ORIGIN || ''}/v1/wall/file/${row.image_key}" alt="${row.title}"/>
      <figcaption style="font-size:12px;margin-top:6px">${row.title}</figcaption>
    </figure>
  </body></html>`;
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=600' } });
});
// oEmbed endpoint: https://oembed.com/
embeds.get('/oembed', async (c) => {
    const url = c.req.query('url') || '';
    const maxwidth = Number(c.req.query('maxwidth') || 560);
    const maxheight = Number(c.req.query('maxheight') || 300);
    // Expect urls like: https://learnings.org/embed/term/:slug or /embed/wall/:id
    const mTerm = url.match(/\/embed\/term\/([a-z0-9-]+)/i);
    const mWall = url.match(/\/embed\/wall\/([a-zA-Z0-9_-]+)/i);
    if (mTerm) {
        const slug = mTerm[1];
        const src = `${new URL(c.req.url).origin}/v1/embed/term/${slug}`;
        return c.json({
            version: '1.0', type: 'rich', provider_name: 'Learnings', provider_url: 'https://learnings.org',
            title: `Learnings — ${slug}`,
            html: `<iframe src="${src}" width="${maxwidth}" height="${maxheight}" frameborder="0" scrolling="no" style="border:0;border-radius:16px;overflow:hidden"></iframe>`,
            width: maxwidth, height: maxheight
        });
    }
    if (mWall) {
        const id = mWall[1];
        const src = `${new URL(c.req.url).origin}/v1/embed/wall/${id}`;
        return c.json({
            version: '1.0', type: 'rich', provider_name: 'Learnings', provider_url: 'https://learnings.org',
            title: `Learnings — wall item`,
            html: `<iframe src="${src}" width="${maxwidth}" height="${maxheight}" frameborder="0" scrolling="no" style="border:0;border-radius:16px;overflow:hidden"></iframe>`,
            width: maxwidth, height: maxheight
        });
    }
    return c.json({ error: 'unsupported url' }, 400);
});
export default embeds;
