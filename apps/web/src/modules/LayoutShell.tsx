import React, { useState, useEffect } from 'react';
import { NotificationBell } from './Notifications';
import { AuthModal } from './AuthModal';

type Page = 'home' | 'wall' | 'challenges' | 'linkedin' | 'analytics' | 'suggest' | 'admin';

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
    const params = new URLSearchParams(window.location.search);
    const session = params.get('session');
    const handle = params.get('u');
    
    if (session && handle) {
      localStorage.setItem('learnings_session', session);
      setUser({ handle, email: '' }); // We'll load full user data later
      
      // Claim anonymous activity
      const fingerprint = localStorage.getItem('learnings_fingerprint');
      if (fingerprint) {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
        fetch(apiUrl + '/v1/auth/claim', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session}`
          },
          body: JSON.stringify({ fingerprint })
        }).then(() => {
          console.log('Anonymous activity claimed successfully');
        }).catch(err => {
          console.error('Failed to claim activity:', err);
        });
      }
      
      // Clear the URL
      window.history.replaceState({}, '', window.location.pathname + window.location.hash);
      alert('Welcome! You\'re now signed in.');
    } else {
      // Check for existing session
      const existingSession = localStorage.getItem('learnings_session');
      if (existingSession) {
        // TODO: Validate session and load user data
        setUser({ handle: 'user', email: '' });
      }
    }
  }, []);
  
  const signOut = () => {
    localStorage.removeItem('learnings_session');
    setUser(null);
    alert('Signed out successfully.');
  };
  
  const navigation = [
    { id: 'home', label: 'Terms', icon: '📚' },
    { id: 'wall', label: 'Wall', icon: '📸' },
    { id: 'challenges', label: 'Challenges', icon: '🏆' },
    { id: 'bingo', label: 'Bingo', icon: '🎯' },
    { id: 'linkedin', label: 'Generators', icon: '📝' },
    { id: 'suggest', label: 'Suggest', icon: '💡' },
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
