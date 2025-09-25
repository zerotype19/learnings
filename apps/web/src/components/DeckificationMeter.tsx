import React, { useState, useEffect } from 'react';

interface DeckificationMeterProps {
  className?: string;
}

export function DeckificationMeter({ className = '' }: DeckificationMeterProps) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calculateDeckification = () => {
      const main = document.querySelector('main');
      if (!main) return;

      // Count various elements that contribute to "deckification"
      const bulletCount = main.querySelectorAll('ul li, ol li').length;
      const headingCount = main.querySelectorAll('h2, h3, h4').length;
      const imageCount = main.querySelectorAll('img').length;
      const tableCount = main.querySelectorAll('table').length;
      const codeCount = main.querySelectorAll('pre, code').length;

      // Calculate percentage (max 100%)
      const score = Math.min(100, 
        (bulletCount * 8) + 
        (headingCount * 5) + 
        (imageCount * 7) + 
        (tableCount * 10) + 
        (codeCount * 3)
      );

      setPercentage(score);
    };

    // Calculate on mount and when content changes
    calculateDeckification();
    
    // Recalculate when DOM changes (for dynamic content)
    const observer = new MutationObserver(calculateDeckification);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true 
    });

    return () => observer.disconnect();
  }, []);

  if (percentage === 0) return null;

  return (
    <div className={`bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-700 py-2 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-3">
        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
          Slide Readiness: {percentage}%
        </span>
        <div className="flex-1 h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-brand-500 to-accent-pink transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs text-zinc-500 dark:text-zinc-500">
          {percentage >= 80 ? 'Deck Master' : 
           percentage >= 60 ? 'Slide Ready' : 
           percentage >= 40 ? 'Getting There' : 
           'Needs More Rectangles'}
        </span>
      </div>
    </div>
  );
}
