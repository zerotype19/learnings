import React, { useEffect, useState } from 'react';

export function Admin() {
  const [wall, setWall] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
  
  useEffect(() => { 
    // Load flagged wall items
    fetch(apiUrl + '/v1/wall?status=published&flagged=1')
      .then(r => r.json())
      .then(d => setWall(d.items || []))
      .catch(() => setWall([]));
  }, [apiUrl]);
  
  const moderateWall = async (id: string, action: 'approve' | 'reject') => {
    const status = action === 'approve' ? 'published' : 'archived';
    await fetch(apiUrl + `/v1/wall/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, reviewed_by: 'admin' })
    });
    // Refresh the list
    const response = await fetch(apiUrl + '/v1/wall?status=published&flagged=1');
    const data = await response.json();
    setWall(data.items || []);
  };
  
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h2 className="text-2xl font-bold">🛡️ Admin Dashboard</h2>
      <p className="opacity-70 text-sm mb-6">Moderation and content management.</p>
      
      <section className="mt-6">
        <h3 className="font-semibold mb-4">⚠️ Flagged Wall Items ({wall.length})</h3>
        {!wall.length ? (
          <div className="text-sm opacity-70 p-4 border rounded">No flagged items to review.</div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {wall.map(w => (
              <li key={w.id} className="border rounded-lg p-3">
                <img 
                  className="w-full h-32 object-cover rounded mb-2" 
                  src={`${apiUrl}/v1/wall/file/${w.image_key}`} 
                  alt={w.title}
                />
                <div className="text-sm font-semibold mb-1">{w.title}</div>
                <div className="text-xs opacity-60 mb-3">
                  ID: {w.id} • {new Date(w.created_at).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button 
                    className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 rounded"
                    onClick={() => moderateWall(w.id, 'approve')}
                  >
                    ✅ Approve
                  </button>
                  <button 
                    className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 rounded"
                    onClick={() => moderateWall(w.id, 'reject')}
                  >
                    ❌ Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      
      <section className="mt-8">
        <h3 className="font-semibold mb-4">📝 Recent Activity</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border rounded-lg p-4">
            <div className="font-semibold text-sm">Wall Uploads Today</div>
            <div className="text-2xl font-bold">{wall.length}</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="font-semibold text-sm">Pending Reviews</div>
            <div className="text-2xl font-bold">{wall.filter(w => !w.reviewed_by).length}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
