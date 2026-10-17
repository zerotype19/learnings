import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import worker from '../apps/web/dist/_worker.js';
const root = new URL('../apps/web/dist/', import.meta.url);
const catalog = JSON.parse(await fs.readFile(new URL('catalog.json', root)));
const assets = { fetch: async request => {
  const path = new URL(request.url).pathname;
  try { return new Response(await fs.readFile(new URL(path === '/' ? 'index.html' : path.slice(1), root)), { headers: { 'content-type': path.endsWith('.json') ? 'application/json' : 'text/html' } }); }
  catch { return new Response('missing', { status: 404 }); }
}};
const request = (path, method = 'GET') => worker.fetch(new Request('https://learnings.org' + path, { method }), { ASSETS: assets });
const unescape = value => value.replaceAll('&amp;', '&');
const sitemap = await (await request('/sitemap.xml')).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => unescape(m[1]).replace('https://learnings.org', ''));
assert.equal(new Set(urls).size, urls.length);
assert.equal(urls.filter(p => p.startsWith('/term/')).length, catalog.terms.length);
assert.ok(!urls.some(p => p.startsWith('/wall/')));
const discovered = new Set();
for (const path of urls.filter(p => p.startsWith('/terms') && !p.startsWith('/terms-of-service'))) {
  const r = await request(path); assert.equal(r.status, 200, path);
  const html = await r.text();
  assert.ok(html.includes('<h1'), path);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.ok(html.includes(`href="https://learnings.org${path.replaceAll('&', '&amp;')}"`), path);
  const payload = JSON.parse(html.match(/id="learnings-initial-data" type="application\/json">(.*?)<\/script>/s)[1]);
  const { terms, letter, page, total } = payload.directory;
  assert.ok(terms.length > 0 && terms.length <= 40);
  assert.equal(page, Number(new URL('https://learnings.org' + path).searchParams.get('page') || 1));
  assert.ok(total >= terms.length);
  for (const t of terms) {
    assert.ok(html.includes(`href="/term/${t.slug}"`));
    if (letter) assert.equal(t.title[0].toUpperCase(), letter);
    if (!letter) { assert.ok(!discovered.has(t.slug)); discovered.add(t.slug); }
  }
}
assert.equal(discovered.size, catalog.terms.length, 'All published terms reachable via directory pagination');
for (const path of ['/about','/privacy','/terms-of-service','/contact','/submit','/origin-story','/bingo','/generators/buzzword']) {
  const r = await request(path); assert.equal(r.status, 200, path); const html = await r.text();
  assert.ok(html.includes('<h1'), path); assert.ok(html.includes(`rel="canonical" href="https://learnings.org${path}"`), path);
  assert.ok(!html.includes('<div id="root"></div>'), path);
}
for (const path of ['/missing-page','/terms?page=999','/terms?letter=XX','/terms?page=-1','/generators/missing']) assert.equal((await request(path)).status, 404, path);
for (const [path, destination] of [['/terms?page=1','/terms'],['/terms?letter=a','/terms?letter=A'],['/about/','/about'],['/wall/old-article','/wall'],['/bingo/example123','/bingo?board=example123']]) {
  const r = await request(path); assert.equal(r.status, 301, path); assert.equal(r.headers.get('location'), 'https://learnings.org' + destination);
}
assert.equal(await (await request('/terms', 'HEAD')).text(), '');
assert.equal((await request('/terms', 'POST')).status, 405);
assert.equal((await request('/search?q=test')).headers.get('X-Robots-Tag'), 'noindex, follow');
assert.equal((await request('/bingo?board=example123')).headers.get('X-Robots-Tag'), 'noindex, follow');
console.log(`PASS: ${catalog.terms.length} terms reachable, ${urls.length} sitemap URLs, all directory pages, static SSR, canonicals, redirects, status codes, HEAD and noindex.`);
