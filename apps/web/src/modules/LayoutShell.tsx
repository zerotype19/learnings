import React, { useState } from 'react';
import { NotificationBell } from './Notifications';

type Page = 'home' | 'wall' | 'challenges' | 'linkedin' | 'analytics' | 'suggest' | 'admin';

interface LayoutShellProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  children: React.ReactNode;
}

export function LayoutShell({ currentPage, onPageChange, children }: LayoutShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Check for admin access
  const isAdmin = new URLSearchParams(window.location.search).get('admin') === '1';
  
  const navigation = [
    { id: 'home', label: 'Terms', icon: '📚' },
    { id: 'wall', label: 'Wall', icon: '📸' },
    { id: 'challenges', label: 'Challenges', icon: '🏆' },
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
            <NotificationBell user="anon" />
            <button className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
              Sign in
            </button>
            
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
    </div>
  );
}
