import React, { useState, useEffect } from 'react';
import { SearchBox } from '../components/SearchBox';
import { EnterpriseToggle } from '../components/EnterpriseToggle';
import { BuzzwordTicker } from '../components/BuzzwordTicker';
import { ClorgDock } from '../components/ClorgDock';
import { useSectionStamps } from '../hooks/useSectionStamps';
import type { NonsenseData } from '../types/nonsense';

type Page = 'home' | 'home-v2' | 'wall' | 'wall-hub' | 'bingo' | 'linkedin' | 'suggest' | 'admin' | 'admin-v2' | 'terms-hub' | 'term-detail' | 'submit-v2' | 'generators-hub' | 'about' | 'privacy' | 'terms' | 'contact';

interface LayoutShellProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  children: React.ReactNode;
}

export function LayoutShell({ currentPage, onPageChange, children }: LayoutShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [nonsenseData, setNonsenseData] = useState<NonsenseData | null>(null);
  
  // Check for admin access
  const isAdmin = new URLSearchParams(window.location.search).get('admin') === '1';

  // Load nonsense data
  useEffect(() => {
    const loadNonsenseData = async () => {
      try {
        console.log('Loading nonsense data...');
        const response = await fetch('/nonsense.json');
        const data: NonsenseData = await response.json();
        console.log('Loaded nonsense data:', data);
        setNonsenseData(data);
      } catch (error) {
        console.error('Failed to load nonsense data:', error);
      }
    };

    loadNonsenseData();
  }, []);

  // Initialize section stamps
  useSectionStamps();
  
  const navigation = [
    { id: 'home-v2', label: 'Home', icon: '🏠' },
    { id: 'terms-hub', label: 'Terms', icon: '📚' },
    { id: 'wall-hub', label: 'Wall', icon: '📸' },
    { id: 'bingo', label: 'Bingo', icon: '🎯' },
    { id: 'generators-hub', label: 'Generators', icon: '📝' },
    { id: 'submit-v2', label: 'Submit', icon: '💡' },
    ...(isAdmin ? [{ id: 'admin-v2', label: 'Admin', icon: '🛡️' }] : [])
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onPageChange('home-v2');
            }}
            className="text-xl font-semibold tracking-tight text-slate-900 hover:text-brand transition-colors"
          >
            Learnings Dot Org
          </a>
          
          {/* Global Search */}
          <div className="hidden md:block flex-1 max-w-sm mx-8">
            <SearchBox
              onNavigate={(url) => {
                if (url.startsWith('/search')) {
                  // Use pushState to navigate to search page
                  window.history.pushState({}, '', url);
                  onPageChange('search');
                } else {
                  // Handle internal navigation
                  const path = url.replace(/^\/+/, '');
                  if (path === '') {
                    onPageChange('home-v2');
                  } else if (path.startsWith('term/')) {
                    // Extract slug from /term/slug URL
                    const slug = path.replace('term/', '');
                    window.history.pushState({}, '', url);
                    onPageChange('term-detail');
                    // Set the slug parameter for the term detail page
                    window.dispatchEvent(new CustomEvent('route-params', { 
                      detail: { slug } 
                    }));
                  } else if (path === 'wall') {
                    onPageChange('wall-hub');
                  } else if (path === 'generators') {
                    onPageChange('generators-hub');
                  } else {
                    window.location.href = url;
                  }
                }
              }}
              placeholder="Search terms, wall posts..."
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden gap-2 sm:flex">
            {navigation.map((nav) => {
              // Map page IDs to URL paths
              const getHref = (id: string) => {
                switch (id) {
                  case 'home-v2': return '/';
                  case 'terms-hub': return '/terms';
                  case 'wall-hub': return '/wall';
                  case 'bingo': return '/bingo';
                  case 'generators-hub': return '/generators';
                  case 'submit-v2': return '/submit';
                  case 'admin-v2': return '/admin07932';
                  default: return '/';
                }
              };

              const isTermsHub = nav.id === 'terms-hub';
              const isActive = currentPage === nav.id;

              return (
                <a
                  key={nav.id}
                  href={getHref(nav.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(nav.id as Page);
                  }}
                  className={`inline-flex items-center gap-2 rounded-xl2 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isTermsHub && isActive
                      ? 'bg-brand text-white shadow-soft hover:shadow-lg hover:-translate-y-0.5'
                      : isActive
                        ? 'bg-brand-100 text-brand-700' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="sm:hidden">{nav.icon}</span>
                  <span className="hidden sm:inline">{nav.label}</span>
                </a>
              );
            })}
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button 
              className="sm:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white sm:hidden">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
              <div className="grid grid-cols-2 gap-3">
                {navigation.map((nav) => {
                  // Map page IDs to URL paths
                  const getHref = (id: string) => {
                    switch (id) {
                      case 'home-v2': return '/';
                      case 'terms-hub': return '/terms';
                      case 'wall-hub': return '/wall';
                      case 'bingo': return '/bingo';
                      case 'generators-hub': return '/generators';
                      case 'submit-v2': return '/submit';
                      case 'admin-v2': return '/admin07932';
                      default: return '/';
                    }
                  };

                  const isTermsHub = nav.id === 'terms-hub';
                  const isActive = currentPage === nav.id;

                  return (
                    <a
                      key={nav.id}
                      href={getHref(nav.id)}
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(nav.id as Page);
                        setMobileMenuOpen(false);
                      }}
                      className={`inline-flex items-center gap-2 rounded-xl2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isTermsHub && isActive
                          ? 'bg-brand text-white shadow-soft'
                          : isActive
                            ? 'bg-brand-100 text-brand-700' 
                            : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {nav.icon} {nav.label}
                    </a>
                  );
                })}
              </div>
            </nav>
          </div>
        )}
      </header>
      
      {/* Buzzword Ticker */}
      {nonsenseData?.ticker && (
        <BuzzwordTicker items={nonsenseData.ticker} />
      )}
      
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center gap-8 text-sm text-slate-600 mb-6">
            <a 
              href="/about" 
              onClick={(e) => { e.preventDefault(); onPageChange('about'); }}
              className="hover:text-slate-900 transition-colors"
            >
              About
            </a>
            <a 
              href="/contact" 
              onClick={(e) => { e.preventDefault(); onPageChange('contact'); }}
              className="hover:text-slate-900 transition-colors"
            >
              Contact
            </a>
            <a 
              href="/terms" 
              onClick={(e) => { e.preventDefault(); onPageChange('terms'); }}
              className="hover:text-slate-900 transition-colors"
            >
              Terms
            </a>
            <a 
              href="/privacy" 
              onClick={(e) => { e.preventDefault(); onPageChange('privacy'); }}
              className="hover:text-slate-900 transition-colors"
            >
              Privacy
            </a>
          </div>
          
          {/* Enterprise Mode Toggle */}
          <div className="flex justify-center mb-6">
            <EnterpriseToggle />
          </div>
          
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>© 2025 Learnings Dot Org — Speak fluent corporate. Ironically.</span>
            {nonsenseData?.clorg?.lines && (
              <ClorgDock lines={nonsenseData.clorg.lines} />
            )}
          </div>
        </div>
      </footer>
      
    </div>
  );
}
