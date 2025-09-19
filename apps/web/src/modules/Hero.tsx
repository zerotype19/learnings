import React from 'react';

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
        Learnings Dot Org — Powered by AI
      </h1>
      <p className="mt-2 max-w-2xl text-sm sm:text-base text-neutral-600">
        Advancing corporate thought one buzzword at a time.
      </p>
      <div className="mt-5 flex gap-2">
        <a 
          href="#/submit" 
          className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 transition-colors"
        >
          Submit buzzword
        </a>
        <a 
          href="#/generators" 
          className="rounded-xl border px-4 py-2 hover:bg-neutral-50 transition-colors"
        >
          Open Generators
        </a>
      </div>
    </section>
  );
}
