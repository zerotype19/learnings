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
import { AdminV2 } from '../pages/AdminV2';
import { HomeV2 } from '../pages/HomeV2';
import { Suggest } from './Suggest';
import { LayoutShell } from './LayoutShell';
import { Hero } from './Hero';
import { HomeSidebar } from './HomeSidebar';
import { Bingo } from './Bingo';
import { TermsHub } from '../pages/TermsHub';
import { TermDetail } from '../pages/TermDetail';
import { Submit } from '../pages/Submit';
import { WallHub } from '../pages/WallHub';
import { GeneratorsHub } from '../pages/GeneratorsHub';
import { ChallengesHub } from '../pages/ChallengesHub';

type Page = 'home' | 'home-v2' | 'wall' | 'wall-hub' | 'challenges' | 'bingo' | 'linkedin' | 'analytics' | 'suggest' | 'admin' | 'admin-v2' | 'profile' | 'terms-hub' | 'term-detail' | 'submit-v2' | 'generators-hub' | 'challenges-hub';

export function App() {
  const [terms, setTerms] = useState<Term[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});

  // Handle browser history routing
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      const parts = path.split('/').filter(part => part); // Remove empty parts
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
          setCurrentPage('wall-hub');
          break;
        case 'challenges':
          setCurrentPage('challenges-hub');
          break;
        case 'bingo':
          setCurrentPage('bingo');
          break;
        case 'generators':
          setCurrentPage('generators-hub');
          break;
        case 'linkedin':
          setCurrentPage('linkedin');
          break;
        case 'suggest':
          setCurrentPage('suggest');
          break;
        case 'analytics':
          setCurrentPage('analytics');
          break;
        case 'admin':
          setCurrentPage('admin-v2');
          break;
        default:
          setCurrentPage('home-v2');
      }
    };

    // Handle initial route
    handleRouteChange();
    
    // Listen for popstate events (back/forward buttons)
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
    console.log('API URL:', apiUrl); // Debug log
    fetch(apiUrl + '/api/terms')
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

  // Handle navigation with browser history
  const handlePageChange = (page: Page) => {
    const getPath = (pageId: string) => {
      switch (pageId) {
        case 'home-v2': return '/';
        case 'terms-hub': return '/terms';
        case 'wall-hub': return '/wall';
        case 'challenges-hub': return '/challenges';
        case 'bingo': return '/bingo';
        case 'generators-hub': return '/generators';
        case 'submit-v2': return '/submit';
        case 'analytics': return '/analytics';
        case 'admin-v2': return '/admin';
        default: return '/';
      }
    };

    const path = getPath(page);
    window.history.pushState({}, '', path);
    setCurrentPage(page);
  };

  return (
    <LayoutShell currentPage={currentPage} onPageChange={handlePageChange}>
      {/* New v2 Pages - Full Screen */}
      {currentPage === 'home-v2' && <HomeV2 />}
      {currentPage === 'terms-hub' && <TermsHub />}
      {currentPage === 'term-detail' && <TermDetail slug={routeParams.slug || ''} />}
      {currentPage === 'submit-v2' && <Submit />}
      {currentPage === 'wall-hub' && <WallHub />}
      {currentPage === 'challenges-hub' && <ChallengesHub />}
      {currentPage === 'generators-hub' && <GeneratorsHub />}
      {currentPage === 'admin-v2' && <AdminV2 />}
      
      {/* Legacy Pages */}
      {currentPage === 'home' && (
        <div className="mt-8">
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
        </div>
      )}
      
      {currentPage === 'wall' && <Wall />}
      {currentPage === 'challenges' && <Challenges />}
      {currentPage === 'bingo' && <Bingo />}
      {currentPage === 'linkedin' && <LinkedInGenerators />}
      {currentPage === 'analytics' && <Analytics />}
      {currentPage === 'suggest' && <Suggest />}
      {currentPage === 'admin' && <Admin />}
      
      <ProfessorWidget />
    </LayoutShell>
  );
}