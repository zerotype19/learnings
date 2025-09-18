import React, { useEffect, useState } from 'react';
import { TermCard } from '@learnings/ui';
import type { Term } from '@learnings/lib';
import { Wall } from './Wall';
import { ProfessorWidget } from './ProfessorWidget';
import { Challenges, DeansList } from './Challenges';
import { Profile } from './Profile';

type Page = 'home' | 'wall' | 'challenges' | 'profile';

export function App() {
  const [terms, setTerms] = useState<Term[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
    fetch(apiUrl + '/v1/terms')
      .then((r) => r.json())
      .then((d) => setTerms(d.items || []))
      .catch(() => setTerms([]));
  }, []);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Learnings Dot Org — Powered by AI</h1>
        <p className="opacity-70">Advancing corporate thought one buzzword at a time.</p>
        <nav className="mt-4 flex gap-4">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`px-4 py-2 rounded ${currentPage === 'home' ? 'bg-black text-white' : 'bg-gray-100'}`}
          >
            Terms
          </button>
          <button 
            onClick={() => setCurrentPage('wall')}
            className={`px-4 py-2 rounded ${currentPage === 'wall' ? 'bg-black text-white' : 'bg-gray-100'}`}
          >
            Wall of Fame
          </button>
          <button 
            onClick={() => setCurrentPage('challenges')}
            className={`px-4 py-2 rounded ${currentPage === 'challenges' ? 'bg-black text-white' : 'bg-gray-100'}`}
          >
            Challenges
          </button>
        </nav>
      </header>
      
      {currentPage === 'home' && (
        <div>
          <div className="grid gap-4">
            {terms.map((t) => (
              <TermCard key={t.id} term={t} />
            ))}
          </div>
          <DeansList />
        </div>
      )}
      
      {currentPage === 'wall' && <Wall />}
      
      {currentPage === 'challenges' && <Challenges />}
      
      <ProfessorWidget />
    </div>
  );
}
