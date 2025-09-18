import React from 'react';
import type { Term } from '@learnings/lib';
import { Card } from './card';
import { IconButton } from './icon-button';

export function TermCard({ term }: { term: Term }) {
  const handleVote = async (reaction: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
      
      // Get fingerprint and session
      const getFingerprint = () => {
        const key = 'learnings_fingerprint';
        let fingerprint = localStorage.getItem(key);
        if (!fingerprint) {
          fingerprint = 'fp_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
          localStorage.setItem(key, fingerprint);
        }
        return fingerprint;
      };
      
      const fingerprint = getFingerprint();
      const session = localStorage.getItem('learnings_session');
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Fingerprint': fingerprint,
      };
      
      if (session) {
        headers['Authorization'] = `Bearer ${session}`;
      }
      
      const response = await fetch(`${apiUrl}/v1/terms/${term.id}/vote`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          reaction,
          user_fingerprint: fingerprint
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
    <Card className="hover:ring-1 hover:ring-brand-100 transition-all">
      <div className="text-xl font-semibold text-ink">{term.title}</div>
      <p className="mt-2 text-[0.95rem] leading-6 text-neutral-700">{term.definition}</p>
      {term.translation && (
        <p className="mt-1 text-xs italic text-neutral-500">Translation: {term.translation}</p>
      )}
      <p className="mt-3 text-sm border-l-2 border-neutral-200 pl-3 text-neutral-600">
        "{term.example_sentence}"
      </p>
      
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {/* Reaction Pills */}
        <div className="flex gap-2">
          <button 
            onClick={() => handleVote('cringe')}
            className="rounded-full border px-3 py-1.5 text-xs hover:bg-red-50 hover:border-red-200 transition-colors"
          >
            😬 Cringe
          </button>
          <button 
            onClick={() => handleVote('nailedit')}
            className="rounded-full border px-3 py-1.5 text-xs hover:bg-green-50 hover:border-green-200 transition-colors"
          >
            🎯 Nailed It
          </button>
          <button 
            onClick={() => handleVote('heard1000x')}
            className="rounded-full border px-3 py-1.5 text-xs hover:bg-yellow-50 hover:border-yellow-200 transition-colors"
          >
            🔄 Heard 1000x
          </button>
          <button 
            onClick={() => handleVote('chefskiss')}
            className="rounded-full border px-3 py-1.5 text-xs hover:bg-purple-50 hover:border-purple-200 transition-colors"
          >
            👌 Chef's Kiss
          </button>
        </div>
        
        {/* Secondary Actions */}
        <div className="ml-auto flex gap-2">
          <IconButton onClick={handleShare}>📤 Share</IconButton>
          <IconButton onClick={handleEmbed}>🔗 Embed</IconButton>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('professor:prefill', { detail: `${term.title}: ${term.definition}` }))}
            className="rounded-xl bg-brand-600 px-3 py-1.5 text-xs text-white hover:bg-brand-700 transition-colors"
          >
            🎓 Remix
          </button>
        </div>
      </div>
    </Card>
  );
}
