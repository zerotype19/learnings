import React, { useState, useEffect } from 'react';
import { NotificationBell } from './Notifications';
import { AuthModal } from './AuthModal';

type Page = 'home' | 'wall' | 'wall-hub' | 'challenges' | 'bingo' | 'linkedin' | 'analytics' | 'suggest' | 'admin' | 'terms-hub' | 'term-detail' | 'submit-v2';

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
        const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
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
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'terms-hub', label: 'Terms', icon: '📚' },
    { id: 'wall', label: 'Wall', icon: '📸' },
    { id: 'challenges', label: 'Challenges', icon: '🏆' },
    { id: 'bingo', label: 'Bingo', icon: '🎯' },
    { id: 'linkedin', label: 'Generators', icon: '📝' },
    { id: 'submit-v2', label: 'Submit', icon: '💡' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: '🛡️' }] : [])
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          {/* Logo */}
          <button 
            onClick={() => onPageChange('home')}
            className="font-bold tracking-tight text-ink hover:text-brand-600 transition-colors"
          >
            Learnings Dot Org
          </button>
          
          {/* Global Search */}
          <div className="hidden md:block flex-1 max-w-sm mx-8">
            <input
              type="text"
              placeholder="Search terms, wall posts..."
              className="w-full px-3 py-1 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const query = (e.target as HTMLInputElement).value;
                  if (query.trim()) {
                    window.location.hash = `/search?q=${encodeURIComponent(query)}`;
                  }
                }
              }}
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden gap-1 sm:flex">
            {navigation.map((nav) => (
              <button
                key={nav.id}
                onClick={() => onPageChange(nav.id as Page)}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  currentPage === nav.id 
                    ? 'bg-brand-100 text-brand-700' 
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <span className="sm:hidden">{nav.icon}</span>
                <span className="hidden sm:inline">{nav.label}</span>
              </button>
            ))}
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
                {navigation.map((nav) => (
                  <button
                    key={nav.id}
                    onClick={() => {
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
                  </button>
                ))}
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
            <a href="#/about" className="hover:text-neutral-900 transition-colors">About</a>
            <a href="#/embeds" className="hover:text-neutral-900 transition-colors">Embeds</a>
            <a href="#/terms" className="hover:text-neutral-900 transition-colors">Terms</a>
            <a href="#/privacy" className="hover:text-neutral-900 transition-colors">Privacy</a>
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
