import React from 'react';
import { useInitialData } from '../../server/initial-data';

type AlphabetNavProps = {
  activeLetter?: string;
  onLetterClick: (letter: string) => void;
  className?: string;
};

export function AlphabetNav({ activeLetter = '', onLetterClick, className = '' }: AlphabetNavProps) {
  const LETTERS = useInitialData()?.letters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className={`bg-white shadow-sm border-b py-3 ${className}`}>
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto px-4">
        <a
          href="/terms"
          className={`
            px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200
            ${activeLetter === '' 
              ? 'bg-purple-600 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }
          `}
        >
          All
        </a>
        {LETTERS.map(letter => (
          <a
            key={letter}
            href={`/terms?letter=${letter}`}
            className={`
              w-8 h-8 text-sm font-medium rounded-full transition-all duration-200 flex items-center justify-center
              ${activeLetter === letter 
                ? 'bg-purple-600 text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }
            `}
          >
            {letter}
          </a>
        ))}
      </div>
    </div>
  );
}
