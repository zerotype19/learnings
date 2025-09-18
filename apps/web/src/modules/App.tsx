import React, { useEffect, useState } from 'react';
import { TermCard } from '@learnings/ui';
import type { Term } from '@learnings/lib';
import { Wall } from './Wall';
import { ProfessorWidget } from './ProfessorWidget';
import { Challenges, DeansList } from './Challenges';
import { Profile } from './Profile';
import { NotificationBell } from './Notifications';
import { LinkedInGenerators } from './LinkedInGenerators';
import { Analytics } from './Analytics';
import { Admin } from './admin/Admin';
import { Suggest } from './Suggest';

type Page = 'home' | 'wall' | 'challenges' | 'linkedin' | 'analytics' | 'suggest' | 'admin' | 'profile';

export function App() {
  const [terms, setTerms] = useState<Term[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [professorCallback, setProfessorCallback] = useState<((text: string) => void) | null>(null);
  
  // Check for admin access
  const isAdmin = new URLSearchParams(window.location.search).get('admin') === '1';
  
  const handleRemixWithProfessor = (text: string) => {
    if (professorCallback) {
      professorCallback(text);
    }
  };

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Learnings Dot Org — Powered by AI</h1>
            <p className="opacity-70">Advancing corporate thought one buzzword at a time.</p>
          </div>
          <NotificationBell user="anon" />
        </div>
        {/* Mobile hamburger */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
        
        {/* Desktop nav */}
        <nav className={`mt-4 flex flex-wrap gap-2 ${mobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
          {[
            { id: 'home', label: 'Terms', icon: '📚' },
            { id: 'wall', label: 'Wall', icon: '📸' },
            { id: 'challenges', label: 'Challenges', icon: '🏆' },
            { id: 'linkedin', label: 'Generators', icon: '📝' },
            { id: 'suggest', label: 'Suggest', icon: '💡' },
            { id: 'analytics', label: 'Analytics', icon: '📊' },
            ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: '🛡️' }] : [])
          ].map(nav => (
            <button 
              key={nav.id}
              onClick={() => {
                setCurrentPage(nav.id as Page);
                setMobileMenuOpen(false);
              }}
              className={`px-3 py-2 rounded text-sm ${
                currentPage === nav.id ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {nav.icon} {nav.label}
            </button>
          ))}
        </nav>
      </header>
      
      {currentPage === 'home' && (
        <div>
          <div className="grid gap-4">
            {terms.map((t) => (
              <TermCard key={t.id} term={t} onRemixWithProfessor={handleRemixWithProfessor} />
            ))}
          </div>
          <DeansList />
        </div>
      )}
      
      {currentPage === 'wall' && <Wall />}
      
      {currentPage === 'challenges' && <Challenges />}
      
      {currentPage === 'linkedin' && <LinkedInGenerators />}
      
      {currentPage === 'analytics' && <Analytics />}
      
      {currentPage === 'suggest' && <Suggest />}
      
      {currentPage === 'admin' && isAdmin && <Admin />}
      
      {/* Footer */}
      <footer className="mt-12 pt-8 border-t text-center text-sm opacity-60">
        <div className="flex justify-center gap-6 mb-4">
          <a href="#/about" className="hover:underline">About</a>
          <a href="#/embeds" className="hover:underline">Embeds</a>
          <a href="#/terms" className="hover:underline">Terms</a>
          <a href="#/privacy" className="hover:underline">Privacy</a>
        </div>
        <div>
          © 2025 Learnings Dot Org — Operationalizing synergy since yesterday.
        </div>
      </footer>
      
      <ProfessorWidget onTextRequest={setProfessorCallback} />
    </div>
  );
}
