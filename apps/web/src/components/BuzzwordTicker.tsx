import React, { useState, useEffect } from 'react';

interface BuzzwordTickerProps {
  items: string[];
}

export function BuzzwordTicker({ items }: BuzzwordTickerProps) {
  const [i, setI] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery?.matches || false);

    const handleChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery?.addEventListener('change', handleChange);

    return () => mediaQuery?.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      const id = setInterval(() => setI(v => (v + 1) % items.length), 8000);
      return () => clearInterval(id);
    }
  }, [items.length, reduceMotion]);

  if (items.length === 0) return null;

  return (
    <div className="h-10 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <div className="mx-auto max-w-6xl h-full flex items-center text-sm font-bold overflow-hidden">
        {reduceMotion ? (
          <span className="transition-opacity duration-300 bg-gradient-to-r from-pink-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
            {(i + 1) % 5 === 0 ? 'BREAKING: ' : ''}{items[i]}
          </span>
        ) : (
          <div className="whitespace-nowrap animate-ticker hover:[animation-play-state:paused]">
            {items.concat(items[0]).map((t, idx) => (
              <span key={idx} className="mr-12 bg-gradient-to-r from-pink-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
                {(idx + 1) % 5 === 0 ? 'BREAKING: ' : ''}{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
