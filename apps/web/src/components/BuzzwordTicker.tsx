import React, { useState, useEffect } from 'react';

interface BuzzwordTickerProps {
  items: string[];
}

function formatTickerText(text: string, index: number, isCorporateMode: boolean): string {
  let formatted = text;
  
  // Corporate Mode effects
  if (isCorporateMode) {
    // Uppercase every third item
    if (index % 3 === 2) {
      formatted = formatted.toUpperCase();
    }
    
    // Random ™ to 30% of items
    if (Math.random() < 0.3) {
      formatted += '™';
    }
  }
  
  // BREAKING prefix (every 5th item)
  if ((index + 1) % 5 === 0) {
    formatted = 'BREAKING: ' + formatted;
  }
  
  return formatted;
}

export function BuzzwordTicker({ items }: BuzzwordTickerProps) {
  const [i, setI] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isCorporateMode, setIsCorporateMode] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery?.matches || false);

    const handleChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery?.addEventListener('change', handleChange);

    // Check for corporate mode
    const checkCorporateMode = () => {
      setIsCorporateMode(document.documentElement.classList.contains('corp-mode'));
    };
    
    checkCorporateMode();
    
    // Listen for corporate mode changes
    const observer = new MutationObserver(checkCorporateMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      mediaQuery?.removeEventListener('change', handleChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      const id = setInterval(() => setI(v => (v + 1) % items.length), 8000);
      return () => clearInterval(id);
    }
  }, [items.length, reduceMotion]);

  if (items.length === 0) return null;

  return (
    <div className="h-10 bg-transparent">
      <div className="mx-auto max-w-6xl h-full flex items-center text-sm font-bold overflow-hidden">
        {reduceMotion ? (
          <span className="transition-opacity duration-300 bg-gradient-to-r from-pink-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
            {formatTickerText(items[i], i, isCorporateMode)}
          </span>
        ) : (
          <div className="whitespace-nowrap animate-ticker hover:[animation-play-state:paused]">
            {items.concat(items[0]).map((t, idx) => (
              <span key={idx} className="mr-12 bg-gradient-to-r from-pink-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
                {formatTickerText(t, idx, isCorporateMode)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
