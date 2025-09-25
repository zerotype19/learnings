import React, { useState, useEffect } from 'react';
import type { ClorgLine } from '../types/nonsense';

interface ClorgDockProps {
  lines: ClorgLine[];
}

export function ClorgDock({ lines }: ClorgDockProps) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * lines.length));
  
  console.log('ClorgDock rendered with', lines.length, 'lines');
  
  const next = () => setIdx((i) => (i + 1) % lines.length);
  
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="ml-auto flex items-center gap-2 clorg-dock">
      <button
        aria-expanded={open}
        aria-controls="clorg-bubble"
        onClick={() => setOpen(v => !v)}
        className="w-10 h-10 rounded-full border-2 border-brand-500 bg-brand-50 dark:bg-brand-900/20 shadow-lg hover:shadow-xl grid place-items-center transition-all duration-200 hover:scale-110"
        title="Clorg - Your Enterprise Gremlin"
      >
        {/* Tiny paperclip SVG */}
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-brand-600 dark:text-brand-400">
          <path 
            d="M7 12l6-6a4 4 0 016 6l-7 7a5 5 0 11-7-7l6-6" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
        </svg>
      </button>
      {open && (
        <div 
          id="clorg-bubble" 
          role="dialog" 
          aria-modal="true"
          className="absolute bottom-14 right-4 max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white/95 dark:bg-zinc-900/95 shadow-2xl p-4 text-sm animate-clorg-slide-in backdrop-blur-sm"
        >
          <p className="pr-10 text-zinc-800 dark:text-zinc-200">{lines[idx].text}</p>
          <div className="mt-3 flex gap-2">
            <button 
              className="px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors" 
              onClick={next}
            >
              Another
            </button>
            <button 
              className="px-2.5 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors" 
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
