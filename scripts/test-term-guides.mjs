import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import worker from '../apps/web/dist/_worker.js';
const root = new URL('../apps/web/dist/', import.meta.url);
const guides = JSON.parse(await fs.readFile(new URL('../apps/web/src/content/term-guides.json', import.meta.url)));
const catalog = JSON.parse(await fs.readFile(new URL('catalog.json', root))).terms;
const assets = { fetch: async request => new Response(await fs.readFile(new URL(new URL(request.url).pathname === '/' ? 'index.html' : new URL(request.url).pathname.slice(1), root))) };
let current;
globalThis.fetch = async url => {
  const data = url.includes('/related?') ? { success: true, related: [] } : url.includes('/variations/') ? { success: true, variations: [] } : { item: { ...current, definition: 'Original dictionary definition.', examples: '', links: [], views: 0, created_at: '2020-01-01', updated_at: '2025-01-01' } };
  return new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json' } });
};
for (const [slug, guide] of Object.entries(guides)) {
  current = catalog.find(t => t.slug === slug);
  assert.ok(current, slug);
  assert.equal(current.definition, guide.meaning, 'Search/directory must use the same meaning as the detail page');
  for (const related of guide.related) assert.ok(catalog.some(t => t.slug === related), `Missing related destination ${related}`);
  const response = await worker.fetch(new Request(`https://learnings.org/term/${slug}`), { ASSETS: assets });
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes('Illustrative workplace example'));
  assert.ok(html.includes('Original dictionary definition.'));
  assert.ok(html.includes('Sources and further reading'));
  assert.ok(html.includes('aria-label="Breadcrumb"'));
  for (const source of guide.sources) assert.ok(html.includes(source.url));
  const structured = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(structured['@graph'][0]['@type'], 'DefinedTerm');
  assert.equal(structured['@graph'][0].description, guide.meaning);
  assert.equal(structured['@graph'][1].itemListElement[2].item, `https://learnings.org/term/${slug}`);
  assert.ok(html.includes('Meaning &amp; Examples | Learnings.org'));
}
console.log(`PASS: ${Object.keys(guides).length} guides, source links, dictionary/search parity, visible breadcrumbs and DefinedTerm schema.`);
