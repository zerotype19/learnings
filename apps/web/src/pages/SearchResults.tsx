import React, { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/getApiUrl';
import { SEO } from '../components/SEO';
type Result = { title: string; description: string; url: string; type: string };
export function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(20);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q')?.trim() || '';
    setQuery(q);
    if (!q) { setLoading(false); return; }
    const controller = new AbortController();
    async function search() {
      try {
        const response = await fetch('/catalog.json', { signal: controller.signal });
        if (!response.ok) throw new Error('Dictionary unavailable');
        const catalog = await response.json();
        const needle = q.toLocaleLowerCase('en-US');
        const terms = catalog.terms.filter((t: any) => `${t.title} ${t.definition}`.toLocaleLowerCase('en-US').includes(needle));
        const rank = (title: string) => title.toLocaleLowerCase('en-US') === needle ? 0 : title.toLocaleLowerCase('en-US').startsWith(needle) ? 1 : title.toLocaleLowerCase('en-US').includes(needle) ? 2 : 3;
        terms.sort((a: any, b: any) => rank(a.title) - rank(b.title) || a.title.localeCompare(b.title));
        const dictionary = terms.map((t: any) => ({ title: t.title, description: t.definition, url: `/term/${t.slug}`, type: 'Dictionary' }));
        if (!controller.signal.aborted) { setResults(dictionary); setLoading(false); }
        // Optional wall matches must not block dictionary search.
        try {
          const wall = await fetch(`${getApiUrl()}/api/search?q=${encodeURIComponent(q)}&type=wall&limit=20`, { signal: controller.signal });
          if (wall.ok) {
            const data = await wall.json();
            const matches = (data.items || []).filter((r: any) => r.type === 'wall').map((r: any) => ({ ...r, type: 'Jargon Wall', url: '/wall' }));
            if (!controller.signal.aborted) setResults([...dictionary, ...matches]);
          }
        } catch { /* Dictionary results remain usable when the wall service is unavailable. */ }
      } catch { if (!controller.signal.aborted) setError('Search is temporarily unavailable. Please reload or browse the dictionary.'); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }
    search();
    return () => controller.abort();
  }, []);
  return <section className="mx-auto max-w-4xl py-6">
    <SEO title={query ? `Search results for ${query}` : 'Search'} description="Search corporate buzzwords and business jargon." canonical="/search" noindex />
    <h1 className="text-3xl font-semibold mb-5">{query ? `Search results for “${query}”` : 'Search the dictionary'}</h1>
    <form action="/search" className="flex gap-2 mb-6"><label className="sr-only" htmlFor="search-query">Search words</label><input className="min-w-0 flex-1 border rounded-lg px-4 py-3" id="search-query" type="search" name="q" defaultValue={query} key={query} required /><button className="bg-brand-600 text-white rounded-lg px-4">Search</button></form>
    {loading && <p role="status">Searching…</p>}
    {error && <p role="alert" className="text-red-700">{error} <a href="/terms" className="underline">Browse the dictionary</a>.</p>}
    {!loading && !error && query && <p className="text-slate-600 mb-4" role="status">{results.length ? `${results.length} results. Showing ${Math.min(visible, results.length)}.` : 'No matches. Try a shorter phrase or check the spelling.'}</p>}
    <div className="space-y-4">{results.slice(0, visible).map((r, i) => <article key={`${r.url}-${i}`} className="bg-white border rounded-xl p-5"><span className="text-xs text-slate-500">{r.type}</span><h2 className="text-xl font-semibold mt-1"><a className="text-brand-600 underline" href={r.url}>{r.title}</a></h2><p className="text-slate-600 mt-2">{r.description?.length > 250 ? r.description.slice(0, 247) + '…' : r.description}</p></article>)}</div>
    {visible < results.length && <button onClick={() => setVisible(n => n + 20)} className="mt-6 rounded-lg border bg-white px-5 py-3">Show 20 more results</button>}
    {!query && !loading && <p className="text-slate-600">Enter a word or phrase, or <a className="text-brand-600 underline" href="/terms">browse the A–Z dictionary</a>.</p>}
  </section>;
}
