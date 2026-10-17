import React, { useState, useEffect } from 'react';
import { SearchBox } from '../components/SearchBox';

interface LayoutShellProps {
  currentPage: string;
  onPageChange: (page: any) => void;
  children: React.ReactNode;
}
const navigation = [
  { id: 'home-v2', label: 'Home', href: '/' },
  { id: 'terms-hub', label: 'Dictionary', href: '/terms' },
  { id: 'wall-hub', label: 'Jargon Wall', href: '/wall' },
  { id: 'bingo', label: 'Bingo', href: '/bingo' },
  { id: 'generators-hub', label: 'Tools', href: '/generators' },
  { id: 'submit-v2', label: 'Contribute', href: '/submit' },
  { id: 'search', label: 'Search', href: '/search' }
];
export function LayoutShell({ currentPage, children }: LayoutShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => setIsAdmin(new URLSearchParams(window.location.search).get('admin') === '1'), []);
  const items = isAdmin ? [...navigation, { id: 'admin-v2', label: 'Admin', href: '/admin07932' }] : navigation;
  const active = (id: string) => currentPage === id || (id === 'terms-hub' && currentPage === 'term-detail') || (id === 'generators-hub' && currentPage === 'buzzword-generator');
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <div className="min-h-screen bg-slate-50">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="/" className="shrink-0 p-1" aria-label="Learnings.org home"><img src="/learnings_dot_org_logo.png" alt="Learnings Dot Org" width="959" height="351" className="h-12 w-auto" /></a>
        <div className="hidden xl:block flex-1 max-w-xs"><SearchBox placeholder="Search the dictionary…" /></div>
        <nav aria-label="Main navigation" className="hidden lg:flex gap-1">
          {items.map(item => <a key={item.id} href={item.href} aria-current={active(item.id) ? 'page' : undefined} className={`rounded-xl px-3 py-2 text-sm font-medium ${active(item.id) ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{item.label}</a>)}
        </nav>
        <button type="button" aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" className="lg:hidden rounded-lg border px-3 py-2 text-slate-700" onClick={() => setMobileMenuOpen(v => !v)}>{mobileMenuOpen ? 'Close' : 'Menu'}</button>
      </div>
      {mobileMenuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="lg:hidden border-t p-4">
        <SearchBox placeholder="Search the dictionary…" />
        <div className="grid grid-cols-2 gap-2 mt-4">{items.map(item => <a key={item.id} href={item.href} aria-current={active(item.id) ? 'page' : undefined} className={`rounded-lg p-3 ${active(item.id) ? 'bg-brand-600 text-white' : 'bg-slate-50'}`}>{item.label}</a>)}</div>
      </nav>}
    </header>
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">{children}</main>
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-600 mb-6">
          <a href="/about">About</a><a href="/terms">Dictionary</a><a href="/generators/buzzword">Buzzword Generator</a><a href="/contact">Contact</a><a href="/terms-of-service">Terms of Service</a><a href="/privacy">Privacy</a>
        </nav>
        <p className="text-center text-sm text-slate-500">© 2008–{new Date().getUTCFullYear()} Learnings Dot Org — Speak fluent corporate. Ironically.</p>
      </div>
    </footer>
  </div>;
}
