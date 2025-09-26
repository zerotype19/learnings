import React, { useState, useEffect, useRef } from 'react';
import type { ClorgLine, NonsenseData } from '../types/nonsense';
import { trackEvent } from '../lib/api';

const ClorgSVG = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-sm">
    {/* Paperclip */}
    <path
      d="M12 8c0-2.2 1.8-4 4-4s4 1.8 4 4v16c0 1.1.9 2 2 2s2-.9 2-2V8c0-4.4-3.6-8-8-8s-8 3.6-8 8v16c0 3.3 2.7 6 6 6s6-2.7 6-6V12c0-1.1.9-2 2-2s2 .9 2 2v12c0 5.5-4.5 10-10 10s-10-4.5-10-10V8z"
      fill="#C7CBD1"
      stroke="#A1A1AA"
      strokeWidth="0.5"
    />
    {/* Lanyard */}
    <rect x="18" y="2" width="4" height="8" fill="#2563EB" rx="2" />
    {/* Badge */}
    <rect x="16" y="6" width="8" height="6" fill="white" stroke="#2563EB" strokeWidth="0.5" rx="1" />
    <text x="20" y="10" textAnchor="middle" fontSize="3" fill="#0F172A" fontWeight="bold">
      STAKEHOLDER
    </text>
  </svg>
);

export function Clorg() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLine, setCurrentLine] = useState<ClorgLine | null>(null);
  const [data, setData] = useState<NonsenseData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const sessionCountRef = useRef(0);
  const pageCountRef = useRef(0);

  useEffect(() => {
    // Check if nonsense is disabled
    const urlParams = new URLSearchParams(window.location.search);
    const noClorg = urlParams.get('noclorg') === '1';
    const localStorageDisabled = localStorage.getItem('nonsenseDisabled') === 'true';
    
    if (noClorg || localStorageDisabled) {
      return;
    }

    // Load nonsense data
    const loadData = async () => {
      try {
        const response = await fetch('/nonsense.json');
        const nonsenseData: NonsenseData = await response.json();
        setData(nonsenseData);
      } catch (error) {
        console.error('Failed to load Clorg data:', error);
      }
    };

    loadData();

    // Set up A/B variant if not set
    if (!localStorage.getItem('nonsenseVariant')) {
      localStorage.setItem('nonsenseVariant', Math.random() < 0.5 ? 'A' : 'B');
    }

    // Set up triggers
    const setupTriggers = () => {
      // Random trigger after 10-20s
      const randomDelay = 10000 + Math.random() * 10000;
      timeoutRef.current = setTimeout(() => {
        if (shouldShowClorg()) {
          showClorg();
        }
      }, randomDelay);

      // Scroll trigger
      let hasScrolled = false;
      const handleScroll = () => {
        if (!hasScrolled && window.scrollY > window.innerHeight * 0.5) {
          hasScrolled = true;
          if (shouldShowClorg()) {
            showClorg();
          }
        }
      };

      // Hover trigger
      let hasHovered = false;
      const handleHover = () => {
        if (!hasHovered) {
          hasHovered = true;
          if (shouldShowClorg()) {
            showClorg();
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      document.addEventListener('mouseover', (e) => {
        if ((e.target as HTMLElement).matches('.btn-primary')) {
          handleHover();
        }
      });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    };

    const cleanup = setupTriggers();
    return cleanup;
  }, []);

  const shouldShowClorg = (): boolean => {
    const sessionCount = parseInt(localStorage.getItem('clorgSessionCount') || '0');
    const pageCount = parseInt(localStorage.getItem('clorgPageCount') || '0');
    const isEnterpriseMode = localStorage.getItem('enterpriseMode') === 'true';
    
    const maxPerPage = isEnterpriseMode ? 3 : 2;
    const maxPerSession = isEnterpriseMode ? 6 : 5;
    
    return sessionCount < maxPerSession && pageCount < maxPerPage;
  };

  const showClorg = () => {
    if (!data || isVisible || isAnimating) return;

    const lines = data.clorg.lines;
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    
    setCurrentLine(randomLine);
    setIsVisible(true);
    setIsAnimating(true);

    // Track analytics
    trackEvent('clorg', 'impression', randomLine.text);

    // Update counters
    const sessionCount = parseInt(localStorage.getItem('clorgSessionCount') || '0');
    const pageCount = parseInt(localStorage.getItem('clorgPageCount') || '0');
    localStorage.setItem('clorgSessionCount', (sessionCount + 1).toString());
    localStorage.setItem('clorgPageCount', (pageCount + 1).toString());

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 600);
  };

  const hideClorg = () => {
    setIsVisible(false);
    setCurrentLine(null);
  };

  const handleCtaClick = (cta: { label: string; action: string; href?: string }) => {
    trackEvent('clorg', 'cta_click', cta.label);
    
    switch (cta.action) {
      case 'dismiss':
        hideClorg();
        break;
      case 'navigate':
        if (cta.href) {
          window.location.href = cta.href;
        }
        break;
      case 'open-modal':
        // Could open a modal here
        hideClorg();
        break;
    }
  };

  const trackEvent = (type: 'clorg', id: string, text?: string) => {
    const variant = localStorage.getItem('nonsenseVariant') as 'A' | 'B' || 'A';
    const enterprise = localStorage.getItem('enterpriseMode') === 'true';
    
    const event = {
      type,
      id: btoa(id + (text || '')),
      variant,
      enterprise,
      path: window.location.pathname,
      timestamp: Date.now()
    };

    trackEvent('clorg_interaction', {
      action: 'click',
      phrase: line.text,
      path: window.location.pathname
    });
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        hideClorg();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  if (!isVisible || !currentLine) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-sm rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 bg-white/95 dark:bg-zinc-900/95 p-4 z-50 ${
        isAnimating ? 'animate-clorg-slide-in' : ''
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="clorg-text"
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${isAnimating ? 'animate-clorg-wiggle' : ''}`}>
          <ClorgSVG />
        </div>
        <div className="flex-1 min-w-0">
          <p id="clorg-text" className="text-sm text-zinc-800 dark:text-zinc-100 mb-3">
            {currentLine.text}
          </p>
          {currentLine.ctas && currentLine.ctas.length > 0 && (
            <div className="flex gap-2">
              {currentLine.ctas.map((cta, index) => (
                <button
                  key={index}
                  onClick={() => handleCtaClick(cta)}
                  className="px-2.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-600 text-xs bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                >
                  {cta.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={hideClorg}
          className="flex-shrink-0 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
          aria-label="Close Clorg"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes clorg-slide-in {
    from {
      transform: translateY(24px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes clorg-wiggle {
    0% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
    100% { transform: rotate(0); }
  }
  
  .animate-clorg-slide-in {
    animation: clorg-slide-in 0.3s ease-out;
  }
  
  .animate-clorg-wiggle {
    animation: clorg-wiggle 0.6s ease-in-out 1-2;
  }
`;
document.head.appendChild(style);
