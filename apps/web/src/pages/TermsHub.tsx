import React, { useEffect, useState } from 'react';
import { useInitialData } from '../server/initial-data';
import { SEO } from '../components/SEO';
import { directoryPath, PAGE_SIZE, type CatalogTerm } from '../shared/public-routes';

export function TermsHub() {
  const initial = useInitialData();
  const [directory, setDirectory] = useState(initial?.directory);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (initial?.directory) return;
    const params = new URLSearchParams(window.location.search);
    fetch('/catalog.json').then(r => { if (!r.ok) throw new Error(); return r.json(); }).then(data => {
      const letter = (params.get('letter') || '').toUpperCase();
      const page = Math.max(1, Number(params.get('page')) || 1);
      const terms = data.terms.filter((t: CatalogTerm) => !letter || t.title[0].toUpperCase() === letter);
      setDirectory({ terms: terms.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), letter, page, total: terms.length,
        letters: [...new Set<string>(data.terms.map((t: CatalogTerm) => t.title[0].toUpperCase()))].sort() });
    }).catch(() => setError(true));
  }, [initial]);
  if (!directory) return <section className="max-w-6xl mx-auto p-8"><h1>Corporate Buzzword Dictionary</h1><p>{error ? 'The dictionary is temporarily unavailable. Please reload to try again.' : 'Loading dictionary…'}</p></section>;
  const { terms, letter, page, total, letters } = directory;
  const pages = Math.ceil(total / PAGE_SIZE);
  const title = `${letter ? `${letter} — ` : ''}Corporate Buzzword Dictionary${page > 1 ? ` — Page ${page}` : ''} | Learnings.org`;
  return <section className="max-w-6xl mx-auto px-4 py-10">
    <SEO title={title} description={`Browse ${total} corporate buzzwords${letter ? ` beginning with ${letter}` : ''}, with definitions and related business jargon.${page > 1 ? ` Page ${page}.` : ''}`} canonical={directoryPath(letter, page)} />
    <h1 className="text-4xl font-semibold text-slate-900 mb-4">{letter ? `Corporate buzzwords beginning with ${letter}` : 'Corporate Buzzword Dictionary'}</h1>
    <p className="text-slate-600 mb-6">Decode business jargon with satirical definitions and related terms. Browse {total.toLocaleString('en-US')} entries{page > 1 ? ` — page ${page} of ${pages}` : ''}.</p>
    <form action="/search" method="get" className="flex gap-2 mb-6"><label className="sr-only" htmlFor="dictionary-search">Search buzzwords</label><input id="dictionary-search" name="q" type="search" placeholder="Search buzzwords…" className="border rounded-lg p-3 flex-1" required /><button className="bg-brand-600 text-white rounded-lg px-4">Search</button></form>
    <nav aria-label="Dictionary alphabet" className="flex flex-wrap gap-2 mb-8">
      {['', ...letters].map(l => <a key={l} href={directoryPath(l)} aria-current={letter === l ? 'page' : undefined} className={`border rounded px-3 py-2 ${letter === l ? 'bg-brand-600 text-white' : 'bg-white'}`}>{l || 'All'}</a>)}
    </nav>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {terms.map((term: CatalogTerm) => <article key={term.slug} className="bg-white border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-3"><a className="text-brand-600 underline" href={`/term/${term.slug}`}>{term.title}</a></h2>
        <p className="text-slate-600">{term.definition.length > 240 ? term.definition.slice(0, 237) + '…' : term.definition}</p>
      </article>)}
    </div>
    {pages > 1 && <nav aria-label="Dictionary pages" className="flex flex-wrap gap-2 mt-8">
      {page > 1 && <a className="border rounded p-2" href={directoryPath(letter, page - 1)} rel="prev">Previous</a>}
      {Array.from({ length: pages }, (_, i) => i + 1).map(n => <a className={`border rounded p-2 ${n === page ? 'bg-brand-600 text-white' : ''}`} key={n} href={directoryPath(letter, n)} aria-current={n === page ? 'page' : undefined}>{n}</a>)}
      {page < pages && <a className="border rounded p-2" href={directoryPath(letter, page + 1)} rel="next">Next</a>}
    </nav>}
  </section>;
}
