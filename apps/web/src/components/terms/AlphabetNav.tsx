import React from 'react';

type AlphabetNavProps = {
  activeLetter?: string;
  onLetterClick: (letter: string) => void;
  className?: string;
};

export function AlphabetNav({ activeLetter = '', onLetterClick, className = '' }: AlphabetNavProps) {
  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className={`bg-white shadow-sm border-b py-3 ${className}`}>
      <div className="flex justify-center gap-2 max-w-4xl mx-auto px-4">
        <button
          onClick={() => onLetterClick('')}
          className={`
            px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200
            ${activeLetter === '' 
              ? 'bg-purple-600 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }
          `}
        >
          All
        </button>
        {LETTERS.map(letter => (
          <button
            key={letter}
            onClick={() => onLetterClick(letter)}
            className={`
              w-8 h-8 text-sm font-medium rounded-full transition-all duration-200 flex items-center justify-center
              ${activeLetter === letter 
                ? 'bg-purple-600 text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }
            `}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
