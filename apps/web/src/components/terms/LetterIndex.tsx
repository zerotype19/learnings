import React from 'react';

type LetterIndexProps = {
  activeLetter: string;
  onLetterClick: (letter: string) => void;
};

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function LetterIndex({ activeLetter, onLetterClick }: LetterIndexProps) {
  return (
    <div className="sticky top-20 z-30 bg-white shadow-sm border-b py-3">
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
