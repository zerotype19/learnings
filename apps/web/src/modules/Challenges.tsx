import React, { useEffect, useState } from 'react';

type Challenge = { slug: string; title: string; prompt: string; starts_at: number; ends_at: number };

type DeansItem = { slug: string; title: string; cringe: number; heard: number };

export function Challenges() {
  const [items, setItems] = useState<Challenge[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';
  
  useEffect(() => { 
    fetch(apiUrl + '/v1/challenges')
      .then(r => r.json())
      .then(d => setItems(d.items || []))
      .catch(() => setItems([]));
  }, [apiUrl]);
  
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h2 className="text-2xl font-bold">Weekly Challenges</h2>
      <p className="opacity-70 text-sm">Jump in with your best corporate nonsense.</p>
      <ul className="mt-4 space-y-3">
        {items.map(ch => (
          <li key={ch.slug} className="border rounded-lg p-3">
            <div className="font-semibold">{ch.title}</div>
            <div className="text-sm opacity-80">{ch.prompt}</div>
            <a className="mt-2 inline-block underline" href={`#/ch/${ch.slug}`}>Open</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DeansList() {
  const [items, setItems] = useState<DeansItem[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';
  
  useEffect(() => { 
    fetch(apiUrl + '/v1/deans-list')
      .then(r => r.json())
      .then(d => setItems(d.items || []))
      .catch(() => setItems([]));
  }, [apiUrl]);
  
  if (!items.length) return null;
  
  return (
    <div className="mt-8 border rounded-xl p-4">
      <div className="font-semibold">🏆 Dean's List (Most Cringe This Week)</div>
      <ol className="mt-3 list-decimal pl-5 text-sm">
        {items.map((it, i) => (
          <li key={i}>
            <a className="underline" href={`#/term/${it.slug}`}>
              {it.title}
            </a>
            {' '}— {it.cringe + it.heard} reactions
          </li>
        ))}
      </ol>
    </div>
  );
}
