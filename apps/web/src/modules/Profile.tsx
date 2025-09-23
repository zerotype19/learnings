import React, { useEffect, useState } from 'react';

type Profile = { 
  handle: string; 
  display_name: string; 
  bio?: string; 
  links_json?: string; 
  ref_code?: string; 
  stats?: any 
};

export function Profile({ handle }: { handle: string }) {
  const [p, setP] = useState<Profile | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';
  
  useEffect(() => { 
    fetch(apiUrl + '/v1/profile/' + handle)
      .then(r => r.json())
      .then(setP)
      .catch(() => setP(null));
  }, [handle, apiUrl]);
  
  if (!p) return <div className="p-6">Loading…</div>;
  
  const links = p.links_json ? JSON.parse(p.links_json) : [];
  
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h2 className="text-2xl font-bold">
        {p.display_name} <span className="opacity-60">@{p.handle}</span>
      </h2>
      {p.bio && <p className="mt-2 opacity-80">{p.bio}</p>}
      <div className="mt-3 text-sm">
        Terms: {p.stats?.terms || 0} · Wall: {p.stats?.wall || 0} · Followers: {p.stats?.followers || 0}
      </div>
      <div className="mt-3 flex gap-3 text-sm">
        {links.map((l: any, i: number) => (
          <a key={i} className="underline" href={l.url} target="_blank" rel="noreferrer">
            {l.label}
          </a>
        ))}
      </div>
      {p.ref_code && (
        <div className="mt-4 p-4 bg-brand-50 rounded-xl border border-brand-100">
          <div className="text-sm font-semibold text-brand-700 mb-2">📨 Invite Colleagues</div>
          <div className="text-xs text-neutral-600 mb-2">Share your referral link to earn badges and climb the leaderboard!</div>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-white border px-2 py-1 rounded flex-1">{location.origin + '/r/' + p.ref_code}</code>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(location.origin + '/r/' + p.ref_code);
                alert('Referral link copied!');
              }}
              className="px-3 py-1 bg-brand-600 text-white text-xs rounded hover:bg-brand-700 transition-colors"
            >
              📋 Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
