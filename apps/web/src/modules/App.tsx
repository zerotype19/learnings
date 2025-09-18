import React, { useEffect, useState } from 'react';
import { TermCard } from '@learnings/ui';
import type { Term } from '@learnings/lib';

export function App() {
  const [terms, setTerms] = useState<Term[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/v1/terms')
      .then((r) => r.json())
      .then((d) => setTerms(d.items || []))
      .catch(() => setTerms([]));
  }, []);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Learnings Dot Org — Powered by AI</h1>
        <p className="opacity-70">Advancing corporate thought one buzzword at a time.</p>
      </header>
      <div className="grid gap-4">
        {terms.map((t) => (
          <TermCard key={t.id} term={t} />
        ))}
      </div>
    </div>
  );
}
