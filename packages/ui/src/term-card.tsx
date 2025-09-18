import React from 'react';
import type { Term } from '@learnings/lib';

export function TermCard({ term, onRemixWithProfessor }: { term: Term; onRemixWithProfessor?: (text: string) => void }) {
  const handleVote = async (reaction: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
      const response = await fetch(`${apiUrl}/v1/terms/${term.id}/vote`, {
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

  const handleShare = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
      const response = await fetch(`${apiUrl}/v1/share/term/${term.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const data = await response.json();
        const shortUrl = `${apiUrl}${data.short}`;
        
        if (navigator.share) {
          await navigator.share({
            title: term.title,
            text: term.definition,
            url: shortUrl
          });
        } else {
          await navigator.clipboard.writeText(shortUrl);
          alert('Short link copied to clipboard!');
        }
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const handleEmbed = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
      const embedUrl = `${apiUrl}/v1/embed/term/${term.slug}`;
      const oembedUrl = `${apiUrl}/oembed?url=https://learnings.org/embed/term/${term.slug}`;
      
      const embedCode = `<iframe src="${embedUrl}" width="560" height="300" frameborder="0" scrolling="no" style="border:0;border-radius:16px;overflow:hidden"></iframe>`;
      
      await navigator.clipboard.writeText(embedCode);
      alert(`Embed code copied to clipboard!\n\noEmbed URL: ${oembedUrl}`);
    } catch (error) {
      console.error('Embed failed:', error);
      // Fallback - show the embed code in an alert
      const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
      const embedUrl = `${apiUrl}/v1/embed/term/${term.slug}`;
      const embedCode = `<iframe src="${embedUrl}" width="560" height="300" frameborder="0" scrolling="no" style="border:0;border-radius:16px;overflow:hidden"></iframe>`;
      prompt('Copy this embed code:', embedCode);
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
      <div className="mt-4 flex gap-2 flex-wrap">
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
        <button 
          onClick={handleShare}
          className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded-full"
        >
          📤 Share
        </button>
        <button 
          onClick={handleEmbed}
          className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          🔗 Embed
        </button>
        {onRemixWithProfessor && (
          <button 
            onClick={() => onRemixWithProfessor(`${term.title}: ${term.definition}`)}
            className="px-3 py-1 text-xs bg-indigo-100 hover:bg-indigo-200 rounded-full"
          >
            🎓 Remix with Professor
          </button>
        )}
      </div>
    </div>
  );
}
