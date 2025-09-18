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
  const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
  
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
        <div className="mt-4">
          <div className="text-xs uppercase opacity-60">Referral link</div>
          <code className="text-sm">{location.origin + '/r/' + p.ref_code}</code>
        </div>
      )}
    </div>
  );
}
