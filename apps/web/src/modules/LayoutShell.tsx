import React, { useState, useEffect } from 'react';
import { NotificationBell } from './Notifications';
import { AuthModal } from './AuthModal';
import { SearchBox } from '../components/SearchBox';

type Page = 'home' | 'home-v2' | 'wall' | 'wall-hub' | 'challenges' | 'bingo' | 'linkedin' | 'analytics' | 'suggest' | 'admin' | 'admin-v2' | 'terms-hub' | 'term-detail' | 'submit-v2' | 'generators-hub' | 'challenges-hub';

interface LayoutShellProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  children: React.ReactNode;
}

export function LayoutShell({ currentPage, onPageChange, children }: LayoutShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<{ handle: string; email: string } | null>(null);
  
  // Check for admin access
  const isAdmin = new URLSearchParams(window.location.search).get('admin') === '1';
  
  // Handle auth completion
  useEffect(() => {
    const hash = window.location.hash;
    
    if (hash === '#/auth/complete') {
      // User just completed auth, cookie is already set
      setUser({ handle: 'user', email: '' }); // We'll load full user data later
      
      // Claim anonymous activity
      const fingerprint = localStorage.getItem('learnings_fingerprint');
      if (fingerprint) {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';
        fetch(apiUrl + '/v1/auth/claim', {
          method: 'POST',
          credentials: 'include', // Use cookies instead of Authorization header
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fingerprint })
        }).then(() => {
          console.log('Anonymous activity claimed successfully');
        }).catch(err => {
          console.error('Failed to claim activity:', err);
        });
      }
      
      // Clear the URL
      window.history.replaceState({}, '', window.location.pathname);
      alert('Welcome! You\'re now signed in.');
    }
    
    // TODO: Check if user is already signed in via cookie validation
  }, []);
  
  const signOut = () => {
    // Clear the session cookie
    document.cookie = 'session=; Path=/; Domain=.learnings.org; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setUser(null);
    alert('Signed out successfully.');
  };
  
  const navigation = [
    { id: 'home-v2', label: 'Home', icon: '🏠' },
    { id: 'terms-hub', label: 'Terms', icon: '📚' },
    { id: 'wall-hub', label: 'Wall', icon: '📸' },
    { id: 'challenges-hub', label: 'Challenges', icon: '🏆' },
    { id: 'bingo', label: 'Bingo', icon: '🎯' },
    { id: 'generators-hub', label: 'Generators', icon: '📝' },
    { id: 'submit-v2', label: 'Submit', icon: '💡' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    ...(isAdmin ? [{ id: 'admin-v2', label: 'Admin', icon: '🛡️' }] : [])
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          {/* Logo */}
          <a 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onPageChange('home-v2');
            }}
            className="font-bold tracking-tight text-ink hover:text-brand-600 transition-colors"
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
                    onPageChange('term-detail');
                  } else if (path === 'wall') {
                    onPageChange('wall-hub');
                  } else if (path === 'generators') {
                    onPageChange('generators-hub');
                  } else if (path === 'challenges') {
                    onPageChange('challenges-hub');
                  } else {
                    window.location.href = url;
                  }
                }
              }}
              placeholder="Search terms, wall posts..."
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden gap-1 sm:flex">
            {navigation.map((nav) => {
              // Map page IDs to URL paths
              const getHref = (id: string) => {
                switch (id) {
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

              return (
                <a
                  key={nav.id}
                  href={getHref(nav.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(nav.id as Page);
                  }}
                  className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    currentPage === nav.id 
                      ? 'bg-brand-100 text-brand-700' 
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <span className="sm:hidden">{nav.icon}</span>
                  <span className="hidden sm:inline">{nav.label}</span>
                </a>
              );
            })}
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <NotificationBell user={user?.handle || "anon"} />
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-600">@{user.handle}</span>
                <button 
                  onClick={signOut}
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                Sign in
              </button>
            )}
            
            {/* Mobile hamburger */}
            <button 
              className="sm:hidden p-2 text-neutral-600 hover:text-neutral-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t bg-white sm:hidden">
            <nav className="mx-auto max-w-5xl px-4 py-2">
              <div className="grid grid-cols-2 gap-2">
                {navigation.map((nav) => {
                  // Map page IDs to URL paths
                  const getHref = (id: string) => {
                    switch (id) {
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

                  return (
                    <a
                      key={nav.id}
                      href={getHref(nav.id)}
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(nav.id as Page);
                        setMobileMenuOpen(false);
                      }}
                      className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                        currentPage === nav.id 
                          ? 'bg-brand-100 text-brand-700' 
                          : 'text-neutral-600 hover:bg-neutral-100'
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
      
      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="flex justify-center gap-6 text-sm text-neutral-600 mb-4">
            <a href="/about" className="hover:text-neutral-900 transition-colors">About</a>
            <a href="/embeds" className="hover:text-neutral-900 transition-colors">Embeds</a>
            <a href="/terms" className="hover:text-neutral-900 transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-neutral-900 transition-colors">Privacy</a>
          </div>
          <div className="text-center text-sm text-neutral-500">
            © 2025 Learnings Dot Org — Operationalizing synergy since yesterday.
          </div>
        </div>
      </footer>
      
      {/* Auth Modal */}
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
