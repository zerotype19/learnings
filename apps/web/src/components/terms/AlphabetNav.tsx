import React from 'react';

type AlphabetNavProps = {
  activeLetter?: string;
  onLetterClick: (letter: string) => void;
  className?: string;
};

export function AlphabetNav({ activeLetter = '', onLetterClick, className = '' }: AlphabetNavProps) {
  const letters = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onLetterClick(letter === 'All' ? '' : letter)}
          className={`px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
            activeLetter === letter || (letter === 'All' && activeLetter === '')
              ? 'bg-brand-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
