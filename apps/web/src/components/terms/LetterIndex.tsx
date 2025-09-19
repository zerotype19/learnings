import React from 'react';

type LetterIndexProps = {
  activeLetter: string;
  onLetterClick: (letter: string) => void;
};

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function LetterIndex({ activeLetter, onLetterClick }: LetterIndexProps) {
  return (
    <div className="sticky top-20 z-30 bg-white/90 backdrop-blur border-b py-2">
      <div className="flex flex-wrap justify-center gap-1 max-w-4xl mx-auto px-4">
        <button
          onClick={() => onLetterClick('')}
          className={`
            px-2 py-1 text-xs rounded-full transition-colors
            ${activeLetter === '' 
              ? 'bg-brand-600 text-white' 
              : 'hover:bg-neutral-100 text-neutral-600'
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
              px-2 py-1 text-xs rounded-full transition-colors min-w-[28px]
              ${activeLetter === letter 
                ? 'bg-brand-600 text-white' 
                : 'hover:bg-neutral-100 text-neutral-600'
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
