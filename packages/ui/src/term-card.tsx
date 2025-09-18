import React from 'react';
import type { Term } from '@learnings/lib';

export function TermCard({ term }: { term: Term }) {
  const handleVote = async (reaction: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8787'}/v1/terms/${term.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reaction,
          user_fingerprint: 'dev'
        })
      });
      if (response.ok) {
        console.log(`Voted ${reaction} for ${term.title}`);
      }
    } catch (error) {
      console.error('Vote failed:', error);
    }
  };

  return (
    <div className="rounded-2xl border p-4 shadow-sm">
      <div className="text-xl font-semibold">{term.title}</div>
      <p className="mt-2 text-sm">{term.definition}</p>
      {term.translation && (
        <p className="mt-2 text-xs italic opacity-70">Translation: {term.translation}</p>
      )}
      <p className="mt-3 text-sm border-l-2 pl-3">"{term.example_sentence}"</p>
      <div className="mt-4 flex gap-2">
        <button 
          onClick={() => handleVote('cringe')}
          className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 rounded-full"
        >
          😬 Cringe
        </button>
        <button 
          onClick={() => handleVote('nailedit')}
          className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 rounded-full"
        >
          🎯 Nailed It
        </button>
        <button 
          onClick={() => handleVote('heard1000x')}
          className="px-3 py-1 text-xs bg-yellow-100 hover:bg-yellow-200 rounded-full"
        >
          🔄 Heard 1000x
        </button>
        <button 
          onClick={() => handleVote('chefskiss')}
          className="px-3 py-1 text-xs bg-purple-100 hover:bg-purple-200 rounded-full"
        >
          👌 Chef's Kiss
        </button>
      </div>
    </div>
  );
}
