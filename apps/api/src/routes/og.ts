import { Hono } from 'hono';
import satori from 'satori';
import { Resvg, initWasm } from '@resvg/resvg-wasm';
import type { Env } from '../index';

const og = new Hono<{ Bindings: Env }>();

async function font(c: any) {
  // cache font in KV to avoid refetch
  const key = 'font:Inter:700';
  let buf = await c.env.CACHE.get(key, 'arrayBuffer');
  if (!buf) {
    const res = await fetch('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2');
    buf = await res.arrayBuffer();
    await c.env.CACHE.put(key, buf as any);
  }
  return new Uint8Array(buf as ArrayBuffer);
}

og.get('/term/:slug', async (c) => {
  const { slug } = c.req.param();
  // 1) Check R2 cache
  const key = `og/term/${slug}.png`;
  const head = await c.env.R2.head(key);
  if (head) {
    const obj = await c.env.R2.get(key);
    return new Response(obj!.body, { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=604800' } });
  }

  // 2) Load term from D1
  const row = await c.env.DB.prepare('SELECT title, definition FROM terms WHERE slug = ?').bind(slug).first<{title:string,definition:string}>();
  if (!row) return c.text('Not found', 404);

  // 3) Render SVG via Satori
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'column', width: '1200px', height: '630px', background: '#0B0D12', color: '#fff', padding: '64px', fontFamily: 'Inter' },
        children: [
          { type: 'div', props: { style: { fontSize: 48, fontWeight: 700, lineHeight: 1.1 }, children: row.title } },
          { type: 'div', props: { style: { marginTop: 24, fontSize: 28, opacity: 0.9 }, children: row.definition } },
          { type: 'div', props: { style: { position: 'absolute', bottom: 32, right: 48, fontSize: 20, opacity: 0.8 }, children: 'Learnings Dot Org — Powered by AI' } }
        ]
      }
    },
    { width: 1200, height: 630, fonts: [{ name: 'Inter', data: await font(c), weight: 700, style: 'normal' }] }
  );

  // 4) Convert SVG→PNG via resvg-wasm
  // init wasm once per isolate
  // @ts-ignore
  if (!globalThis.__resvg) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    globalThis.__resvg = initWasm();
  }
  await (globalThis as any).__resvg;
  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();

  // 5) Store in R2
  await c.env.R2.put(key, png, { httpMetadata: { contentType: 'image/png', cacheControl: 'public, max-age=604800' } });

  return new Response(png, { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=604800' } });
});

export default og;
