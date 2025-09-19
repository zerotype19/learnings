import React, { useEffect, useState } from 'react';

export function Admin() {
  const [wall, setWall] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
  
  useEffect(() => { 
    // Load flagged wall items
    fetch(apiUrl + '/v1/wall?status=published&flagged=1', { credentials: 'include' })
      .then(r => r.json())
      .then(d => setWall(d.items || []))
      .catch(() => setWall([]));
    
    // Load pending submissions
    fetch(apiUrl + '/v1/admin/submissions?admin=1', { credentials: 'include' })
      .then(r => r.json())
      .then(d => setSubmissions(d.items || []))
      .catch(() => setSubmissions([]));
  }, [apiUrl]);
  
  const moderateWall = async (id: string, action: 'approve' | 'reject') => {
    const status = action === 'approve' ? 'published' : 'archived';
    await fetch(apiUrl + `/v1/wall/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, reviewed_by: 'admin' })
    });
    // Refresh the list
    const response = await fetch(apiUrl + '/v1/wall?status=published&flagged=1', { credentials: 'include' });
    const data = await response.json();
    setWall(data.items || []);
  };

  const moderateSubmission = async (id: string, action: 'approve' | 'reject') => {
    const status = action === 'approve' ? 'approved' : 'rejected';
    await fetch(apiUrl + `/v1/admin/submissions/${id}?admin=1`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    // Refresh the list
    const response = await fetch(apiUrl + '/v1/admin/submissions?admin=1', { credentials: 'include' });
    const data = await response.json();
    setSubmissions(data.items || []);
  };
  
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h2 className="text-2xl font-bold">🛡️ Admin Dashboard</h2>
      <p className="opacity-70 text-sm mb-6">Moderation and content management.</p>
      
      <section className="mt-6">
        <h3 className="font-semibold mb-4">📝 Pending Buzzword Submissions ({submissions.length})</h3>
        {!submissions.length ? (
          <div className="text-sm opacity-70 p-4 border rounded">No pending submissions to review.</div>
        ) : (
          <div className="grid gap-4 mb-8">
            {submissions.map(s => (
              <div key={s.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-2">{s.raw_title}</div>
                    <div className="text-sm text-gray-700 mb-2">{s.raw_definition}</div>
                    <div className="text-xs text-gray-500 mb-2">Example: "{s.raw_example}"</div>
                    <div className="text-xs opacity-60">
                      ID: {s.id} • {new Date(s.created_at).toLocaleDateString()} • Status: {s.status}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button 
                      className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 rounded"
                      onClick={() => moderateSubmission(s.id, 'approve')}
                    >
                      ✅ Approve
                    </button>
                    <button 
                      className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 rounded"
                      onClick={() => moderateSubmission(s.id, 'reject')}
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
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
