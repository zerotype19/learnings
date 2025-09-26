import React, { useEffect, useState } from 'react';
import { TermCard } from '@learnings/ui';
import type { Term } from '@learnings/lib';
import { getApiUrl } from '../utils/getApiUrl';
import { Wall } from './Wall';
import { ProfessorWidget } from './ProfessorWidget';
import { Challenges, DeansList } from './Challenges';
import { Profile } from './Profile';
import { LinkedInGenerators } from './LinkedInGenerators';
import { Admin } from './admin/Admin';
import { AdminV2 } from '../pages/AdminV2';
import { HomeV2 } from '../pages/HomeV2';
import { Suggest } from './Suggest';
import { LayoutShell } from './LayoutShell';
import { Hero } from './Hero';
import { Bingo } from './Bingo';
import { TermsHub } from '../pages/TermsHub';
import { TermDetail } from '../pages/TermDetail';
import { Submit } from '../pages/Submit';
import { WallHub } from '../pages/WallHub';
import { GeneratorsHub } from '../pages/GeneratorsHub';
import { SearchResults } from '../pages/SearchResults';
import { About } from '../pages/About';
import { Privacy } from '../pages/Privacy';
import { Terms } from '../pages/Terms';
import { Contact } from '../pages/Contact';
import { ConfirmSubmission } from '../pages/ConfirmSubmission';
import { useTooltips } from '../hooks/useTooltips';

type Page = 'home' | 'home-v2' | 'wall' | 'wall-hub' | 'bingo' | 'linkedin' | 'suggest' | 'admin' | 'admin-v2' | 'profile' | 'terms-hub' | 'term-detail' | 'submit-v2' | 'generators-hub' | 'search' | 'about' | 'privacy' | 'terms' | 'contact' | 'confirm';

export function App() {
  const [terms, setTerms] = useState<Term[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});

  // Initialize tooltips
  useTooltips();

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
        case 'about':
          setCurrentPage('about');
          break;
        case 'privacy':
          setCurrentPage('privacy');
          break;
        case 'contact':
          setCurrentPage('contact');
          break;
        case 'confirm':
          setCurrentPage('confirm');
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
        case 'admin07932':
          setCurrentPage('admin-v2');
          break;
        case 'search':
          setCurrentPage('search');
          break;
        default:
          setCurrentPage('home-v2');
      }
    };

    // Handle route parameters from search navigation
    const handleRouteParams = (event: CustomEvent) => {
      setRouteParams(event.detail);
    };

    // Handle initial route
    handleRouteChange();
    
    // Listen for popstate events (back/forward buttons)
    window.addEventListener('popstate', handleRouteChange);
    // Listen for route-params events from search navigation
    window.addEventListener('route-params', handleRouteParams as EventListener);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('route-params', handleRouteParams as EventListener);
    };
  }, []);

  useEffect(() => {
    const apiUrl = getApiUrl();
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
        case 'about': return '/about';
        case 'privacy': return '/privacy';
        case 'terms': return '/terms';
        case 'contact': return '/contact';
        case 'confirm': return '/confirm';
        case 'bingo': return '/bingo';
        case 'generators-hub': return '/generators';
        case 'submit-v2': return '/submit';
        case 'admin-v2': return '/admin07932';
        case 'search': return '/search';
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
      {currentPage === 'generators-hub' && <GeneratorsHub />}
      {currentPage === 'admin-v2' && <AdminV2 />}
      {currentPage === 'search' && <SearchResults />}
      {currentPage === 'about' && <About />}
      {currentPage === 'privacy' && <Privacy />}
      {currentPage === 'terms' && <Terms />}
      {currentPage === 'contact' && <Contact />}
      {currentPage === 'confirm' && <ConfirmSubmission />}
      
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
              
              {/* Sidebar removed - challenges system disabled */}
            </div>
          </div>
        </div>
      )}
      
      {currentPage === 'wall' && <Wall />}
      {currentPage === 'bingo' && <Bingo />}
      {currentPage === 'linkedin' && <LinkedInGenerators />}
      {currentPage === 'suggest' && <Suggest />}
      {currentPage === 'admin' && <Admin />}
      
      <ProfessorWidget />
    </LayoutShell>
  );
}