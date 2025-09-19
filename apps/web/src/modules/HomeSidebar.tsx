import React, { useEffect, useState } from 'react';
import { DeansList } from './Challenges';

type Challenge = { slug: string; title: string; prompt: string; ends_at: number };
type ShortlinkStat = { code: string; clicks: number };

export function HomeSidebar() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [topLinks, setTopLinks] = useState<ShortlinkStat[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
  
  useEffect(() => {
    // Load current challenge
    fetch(apiUrl + '/v1/challenges')
      .then(r => r.json())
      .then(d => {
        const challenges = d.items || [];
        if (challenges.length > 0) {
          setCurrentChallenge(challenges[0]);
        }
      })
      .catch(() => setCurrentChallenge(null));
      
    // Load top shortlinks
    fetch(apiUrl + '/v1/analytics/shortlinks')
      .then(r => r.json())
      .then(d => setTopLinks((d.items || []).slice(0, 5)))
      .catch(() => setTopLinks([]));
  }, [apiUrl]);
  
  const daysLeft = currentChallenge ? Math.ceil((currentChallenge.ends_at - Date.now()) / (1000 * 60 * 60 * 24)) : 0;
  
  return (
    <div className="space-y-6">
      {/* Dean's List Widget */}
      <DeansList />
      
      {/* This Week's Challenge */}
      {currentChallenge && (
        <div className="rounded-2xl border bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-ink">🏆 This Week's Challenge</h3>
            <span className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-full">
              Ends in {daysLeft}d
            </span>
          </div>
          <h4 className="font-medium text-sm">{currentChallenge.title}</h4>
          <p className="text-xs text-neutral-600 mt-1 line-clamp-2">{currentChallenge.prompt}</p>
          <a 
            href={`#/challenges`}
            className="mt-3 inline-block text-xs text-brand-600 hover:text-brand-700 font-medium"
          >
            Join Challenge →
          </a>
        </div>
      )}
      
      {/* Top Shortlinks */}
      {topLinks.length > 0 && (
        <div className="rounded-2xl border bg-white p-4 shadow-soft">
          <h3 className="font-semibold text-ink mb-3">📊 Trending Shares</h3>
          <div className="space-y-2">
            {topLinks.map((link, index) => (
              <div key={link.code} className="flex items-center justify-between text-sm">
                <span className="font-mono text-xs bg-neutral-100 px-2 py-1 rounded">
                  /l/{link.code}
                </span>
                <span className="text-neutral-600">{link.clicks} clicks</span>
              </div>
            ))}
          </div>
          <a 
            href="#/analytics"
            className="mt-3 inline-block text-xs text-brand-600 hover:text-brand-700 font-medium"
          >
            View Analytics →
          </a>
        </div>
      )}
    </div>
  );
}
