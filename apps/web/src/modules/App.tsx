import React, { useEffect, useState } from 'react';
import { TermCard } from '@learnings/ui';
import type { Term } from '@learnings/lib';
import { Wall } from './Wall';
import { ProfessorWidget } from './ProfessorWidget';
import { Challenges, DeansList } from './Challenges';
import { Profile } from './Profile';
import { LinkedInGenerators } from './LinkedInGenerators';
import { Analytics } from './Analytics';
import { Admin } from './admin/Admin';
import { Suggest } from './Suggest';
import { LayoutShell } from './LayoutShell';
import { Hero } from './Hero';
import { HomeSidebar } from './HomeSidebar';
import { Bingo } from './Bingo';
import { TermsHub } from '../pages/TermsHub';
import { TermDetail } from '../pages/TermDetail';
import { Submit } from '../pages/Submit';

type Page = 'home' | 'wall' | 'challenges' | 'bingo' | 'linkedin' | 'analytics' | 'suggest' | 'admin' | 'profile' | 'terms-hub' | 'term-detail' | 'submit-v2';

export function App() {
  const [terms, setTerms] = useState<Term[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove #
      const parts = hash.split('/').filter(part => part); // Remove empty parts
      const [page, ...params] = parts;
      
      
      switch (page) {
        case 'terms':
          setCurrentPage('terms-hub');
          break;
        case 'term':
          setCurrentPage('term-detail');
          setRouteParams({ slug: params[0] || '' });
          break;
        case 'submit':
          setCurrentPage('submit-v2');
          break;
        case 'wall':
          setCurrentPage('wall');
          break;
        case 'challenges':
          setCurrentPage('challenges');
          break;
        case 'bingo':
          setCurrentPage('bingo');
          break;
        case 'linkedin':
        case 'generators':
          setCurrentPage('linkedin');
          break;
        case 'suggest':
          setCurrentPage('suggest');
          break;
        case 'analytics':
          setCurrentPage('analytics');
          break;
        case 'admin':
          setCurrentPage('admin');
          break;
        default:
          setCurrentPage('home');
      }
    };

    // Handle initial route
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
    console.log('API URL:', apiUrl); // Debug log
    fetch(apiUrl + '/v1/terms')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        setTerms(d.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load terms:', err);
        setError(err.message);
        setLoading(false);
        setTerms([]);
      });
  }, []);

  return (
    <LayoutShell currentPage={currentPage} onPageChange={setCurrentPage}>
      {/* New v2 Pages - Full Screen */}
      {currentPage === 'terms-hub' && <TermsHub />}
      
      {currentPage === 'term-detail' && <TermDetail slug={routeParams.slug || ''} />}
      
      {currentPage === 'submit-v2' && <Submit />}
      
      {/* Legacy Pages */}
      {(currentPage === 'home' || currentPage === 'wall' || currentPage === 'challenges' || currentPage === 'bingo' || currentPage === 'linkedin' || currentPage === 'analytics' || currentPage === 'suggest' || currentPage === 'admin') && (
        <div className="mt-8">
          {currentPage === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero />
            
            <div className="mt-8 lg:grid lg:grid-cols-[1fr_320px] lg:gap-8">
              {/* Main Content */}
              <div>
                {loading && (
                  <div className="text-center py-8">
                    <div className="text-lg text-neutral-600">Loading corporate wisdom...</div>
                  </div>
                )}
                {error && (
                  <div className="text-center py-8 text-red-600">
                    <div className="text-lg">Error: {error}</div>
                    <div className="text-sm mt-2">Check console for details</div>
                  </div>
                )}
                {!loading && !error && (
                  <div className="grid gap-4">
                    {terms.map((t) => (
                      <TermCard key={t.id} term={t} />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Sidebar */}
              <div className="mt-8 lg:mt-0">
                <HomeSidebar />
              </div>
            </div>
          </div>
        )}
      
      {currentPage === 'wall' && <Wall />}
      
      {currentPage === 'challenges' && <Challenges />}
      
      {currentPage === 'bingo' && <Bingo />}
      
      {currentPage === 'linkedin' && <LinkedInGenerators />}
      
      {currentPage === 'analytics' && <Analytics />}
      
      {currentPage === 'suggest' && <Suggest />}
      
      {currentPage === 'admin' && <Admin />}
        </div>
      )}
      
      <ProfessorWidget />
    </LayoutShell>
  );
}
