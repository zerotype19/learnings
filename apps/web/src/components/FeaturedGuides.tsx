import React from 'react';
import { termGuides } from '../shared/term-seo';
export function FeaturedGuides() {
  return <section className="my-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-label="Business jargon explained">
    <h2 className="text-xl font-semibold mb-2">Business jargon, explained</h2>
    <p className="text-slate-600 mb-4">Plain-English meanings, illustrative examples, and sources for common workplace concepts.</p>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{Object.keys(termGuides).map(slug => <a key={slug} href={`/term/${slug}`} className="block rounded-lg border p-3 text-brand-700 underline capitalize">{slug === 'rto-return-to-office' ? 'RTO (return to office)' : slug.replaceAll('-', ' ')}</a>)}</div>
  </section>;
}
