import React from 'react';
import { renderToReadableStream } from 'react-dom/server.browser';
import { App } from '../modules/App';
import { InitialDataContext, type InitialData } from './initial-data';
import { SEOConfigs } from '../components/SEO';
import { getShortDescription } from '../utils/textUtils';

interface Env { ASSETS: { fetch(request: Request): Promise<Response> } }
const API = 'https://api.learnings.org';
const escape = (value: string) => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
export const serialize = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
class SourceError extends Error { constructor(public status: number) { super('Public content unavailable'); } }

// Public, fixed-origin GETs only. Never forward visitor cookies, authorization,
// user-agent, query parameters, or arbitrary destinations to the content API.
async function readPublic(path: string) {
  const response = await fetch(API + path, {
    headers: { accept: 'application/json' }, redirect: 'error',
    signal: AbortSignal.timeout(8000)
  });
  if (!response.ok) throw new SourceError(response.status === 404 ? 404 : 503);
  if (!response.headers.get('content-type')?.includes('application/json')) throw new SourceError(503);
  const reader = response.body!.getReader();
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 2_000_000) throw new SourceError(503);
      chunks.push(value);
    }
  } finally { await reader.cancel(); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}
function validFeedItem(item: any) {
  const data = item?.data;
  if (!['term', 'wall'].includes(item?.type) || typeof item.ts !== 'string' || !data ||
      typeof data.id !== 'string' || typeof data.title !== 'string' || typeof data.summary !== 'string' ||
      typeof data.slug !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(data.slug)) return false;
  if (item.type === 'wall') {
    if (typeof data.source_url !== 'string' || !data.source_url) return false;
    try { if (!['https:', 'http:'].includes(new URL(data.source_url).protocol)) return false; } catch { return false; }
  }
  return true;
}
function validLinks(links: any) {
  return links == null || (Array.isArray(links) && links.every(link => {
    try { return typeof link.url === 'string' && ['http:', 'https:'].includes(new URL(link.url).protocol); } catch { return false; }
  }));
}
function validTerm(term: any) {
  return term && typeof term.slug === 'string' && /^[a-zA-Z0-9_-]+$/.test(term.slug) &&
    typeof term.title === 'string' && typeof term.definition === 'string' && Array.isArray(term.tags);
}
export async function renderPage(request: Request, env: Env) {
  const url = new URL(request.url);
  const match = url.pathname.match(/^\/term\/([a-zA-Z0-9_-]+)$/);
  if (url.pathname !== '/' && !match) return env.ASSETS.fetch(request);
  if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
  try {
    const asset = (path: string) => env.ASSETS.fetch(new Request(new URL(path, url), { headers: { accept: 'text/html, application/json' } }));
    const [templateResponse, nonsenseResponse] = await Promise.all([asset('/index.html'), asset('/nonsense.json')]);
    if (!templateResponse.ok || !nonsenseResponse.ok) throw new SourceError(503);
    const initial: InitialData = { path: url.pathname, nonsense: await nonsenseResponse.json() };
    if (!Array.isArray(initial.nonsense?.ticker)) throw new SourceError(503);
    let title = SEOConfigs.home.title;
    let description = SEOConfigs.home.description;
    let structured: any = SEOConfigs.home.structuredData;
    if (match) {
      const slug = match[1];
      const [term, related, variations] = await Promise.all([
        readPublic(`/api/terms/${slug}`), readPublic(`/api/terms/${slug}/related?limit=5`), readPublic(`/api/terms/variations/${slug}`)
      ]);
      // The published API omits absent links and returns variation tags as JSON text.
      if (Array.isArray(variations.variations)) for (const item of variations.variations) {
        if (typeof item.tags === 'string') item.tags = JSON.parse(item.tags);
      }
      if (!validTerm(term.item) || term.item.slug !== slug || !validLinks(term.item.links) ||
          related.success !== true || !Array.isArray(related.related) || !related.related.every(validTerm) ||
          variations.success !== true || !Array.isArray(variations.variations) || !variations.variations.every(validTerm)) throw new SourceError(503);
      initial.term = term.item;
      initial.related = related.related;
      initial.variations = variations.variations.filter((t: any) => t.slug !== slug);
      title = `${term.item.title} | Learnings Dot Org`;
      description = getShortDescription(term.item.definition, 20);
      structured = { '@context': 'https://schema.org', '@type': 'Article', headline: term.item.title, description,
        url: `https://learnings.org/term/${slug}`, datePublished: term.item.created_at, dateModified: term.item.updated_at };
    } else {
      const feed = await readPublic('/api/home-feed');
      if (feed.error || !Array.isArray(feed.items) || feed.items.length > 20 || !feed.items.every(validFeedItem) ||
          (feed.nextCursor != null && (typeof feed.nextCursor !== 'string' || feed.items.length !== 20)) ||
          new Set(feed.items.map((item: any) => `${item.type}:${item.data.id}`)).size !== feed.items.length) throw new SourceError(503);
      initial.feed = { items: feed.items, nextCursor: feed.nextCursor || null };
    }
    const stream = await renderToReadableStream(<InitialDataContext.Provider value={initial}><App /></InitialDataContext.Provider>);
    const markup = await new Response(stream).text();
    const canonical = `https://learnings.org${url.pathname}`;
    let html = await templateResponse.text();
    if ((html.match(/<div id="root"><\/div>/g) || []).length !== 1 ||
        (html.match(/<link rel="canonical"[^>]*>/g) || []).length !== 1) throw new SourceError(503);
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
      .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
      .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*/, (_match, prefix) => prefix + escape(description))
      .replace(/(<meta (?:name|property)="(?:og:title|twitter:title)" content=")[^"]*/, (_match, prefix) => prefix + escape(title))
      .replace(/(<meta property="og:url" content=")[^"]*/, (_match, prefix) => prefix + canonical)
      .replace('</head>', `<script type="application/ld+json">${serialize(structured)}</script></head>`)
      .replace('<div id="root"></div>', () => `<div id="root">${markup}</div><script id="learnings-initial-data" type="application/json">${serialize(initial)}</script>`);
    const headers = new Headers(templateResponse.headers);
    headers.set('content-type', 'text/html; charset=utf-8');
    headers.set('cache-control', 'public, max-age=0, s-maxage=60');
    headers.set('x-learnings-source', 'initial-page-v1');
    for (const name of ['etag', 'content-length', 'content-encoding', 'last-modified']) headers.delete(name);
    return new Response(request.method === 'HEAD' ? null : html, { status: 200, headers });
  } catch (error) {
    const status = error instanceof SourceError ? error.status : 503;
    return new Response(request.method === 'HEAD' ? null : `<!doctype html><html lang="en"><head><title>${status === 404 ? 'Term not found' : 'Content temporarily unavailable'} | Learnings</title><meta name="robots" content="noindex"></head><body><main><h1>${status === 404 ? 'Term not found' : 'Content temporarily unavailable'}</h1><p>Please try again shortly.</p><a href="/">Learnings home</a></main></body></html>`, { status, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'retry-after': '30' } });
  }
}
export default { fetch: renderPage };
