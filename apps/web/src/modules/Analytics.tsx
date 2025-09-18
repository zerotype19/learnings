import React, { useEffect, useState } from 'react';

type AnalyticsItem = { code: string; clicks: number };

export function Analytics() {
  const [shortlinks, setShortlinks] = useState<AnalyticsItem[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
  
  useEffect(() => {
    fetch(apiUrl + '/v1/analytics/shortlinks')
      .then(r => r.json())
      .then(d => setShortlinks(d.items || []))
      .catch(() => setShortlinks([]));
  }, [apiUrl]);
  
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Share Analytics</h2>
      <p className="opacity-70 text-sm mb-6">Track performance of your shared content.</p>
      
      <div className="border rounded-xl p-4">
        <h3 className="font-semibold mb-3">Top Shortlinks</h3>
        {!shortlinks.length ? (
          <div className="text-sm opacity-70">No shortlink data yet. Start sharing content!</div>
        ) : (
          <div className="space-y-2">
            {shortlinks.map((item, index) => (
              <div key={item.code} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    /l/{item.code}
                  </span>
                  <span className="text-xs opacity-60">#{index + 1}</span>
                </div>
                <div className="text-sm font-semibold">
                  {item.clicks} clicks
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
