// Build from the public listing endpoint (does not increment individual term views).
// Fail the deployment rather than silently publish a partial dictionary/sitemap.
import { writeFile, mkdir } from 'node:fs/promises';
const api = 'https://api.learnings.org';
async function read(path) {
  const r = await fetch(api + path, { signal: AbortSignal.timeout(20000), redirect: 'error' });
  if (!r.ok) throw new Error(`Catalog request failed: ${r.status}`);
  const data = await r.json();
  if (data.error) throw new Error('Catalog API returned an error');
  return data;
}
const counts = await read('/api/terms/letters');
const expected = counts.letters.reduce((n, l) => n + l.count, 0);
const terms = []; const seen = new Set();
for (const { letter } of counts.letters) {
let cursor;
do {
  const params = new URLSearchParams({ sort: 'alpha', limit: '50', letter });
  if (cursor) params.set('cursor', cursor);
  const data = await read('/api/terms?' + params);
  if (!Array.isArray(data.items)) throw new Error('Invalid catalog response');
  for (const t of data.items) {
    if (!/^[a-zA-Z0-9_-]+$/.test(t.slug) || seen.has(t.slug) || typeof t.definition !== 'string' || !Array.isArray(t.tags)) throw new Error('Invalid or duplicate catalog term');
    seen.add(t.slug);
    terms.push({ slug: t.slug, title: t.title, definition: t.definition, tags: t.tags, updated_at: t.updated_at });
  }
  if (data.nextCursor && (data.nextCursor === cursor || !data.items.length)) throw new Error('Catalog pagination did not advance');
  cursor = data.nextCursor;
  if (terms.length > 50000) throw new Error('Unexpected catalog size');
} while (cursor);
}
if (!terms.length || terms.length !== expected) throw new Error(`Incomplete catalog: ${terms.length} of ${expected}; check duplicate titles or concurrent content changes`);
const output = new URL('../apps/web/public/catalog.json', import.meta.url);
await mkdir(new URL('.', output), { recursive: true });
await writeFile(output, JSON.stringify({ generatedAt: new Date().toISOString(), terms }));
console.log(`Validated catalog: ${terms.length} published terms.`);
