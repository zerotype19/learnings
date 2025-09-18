import React, { useState } from 'react';

export function Suggest() {
  const [title, setTitle] = useState('');
  const [defn, setDefn] = useState('');
  const [ex, setEx] = useState('');
  const [done, setDone] = useState('');
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';
  
  async function send() {
    if (!title.trim() || !defn.trim() || !ex.trim()) return;
    setLoading(true);
    try {
      const r = await fetch(apiUrl + '/v1/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, rough_definition: defn, example: ex })
      });
      const d = await r.json(); 
      setDone('Submitted! ID ' + d.id + ' - Our team will review it.');
      setTitle(''); 
      setDefn(''); 
      setEx('');
    } catch (error) {
      setDone('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h2 className="text-2xl font-bold mb-4">💡 Suggest a Buzzword</h2>
      <p className="opacity-70 text-sm mb-6">Help us expand the corporate lexicon. Our AI will add some gravitas.</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Buzzword</label>
          <input 
            className="border p-3 w-full rounded-lg" 
            placeholder="e.g., 'Synergistic Optimization'" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-1">What does it *pretend* to mean?</label>
          <textarea 
            className="border p-3 w-full rounded-lg" 
            rows={4} 
            placeholder="Your rough definition..." 
            value={defn} 
            onChange={e => setDefn(e.target.value)} 
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-1">Use it in a sentence</label>
          <textarea 
            className="border p-3 w-full rounded-lg" 
            rows={3} 
            placeholder="Example: 'We need to leverage synergistic optimization for Q4 deliverables.'" 
            value={ex} 
            onChange={e => setEx(e.target.value)} 
          />
        </div>
        
        <button 
          className="rounded bg-black text-white px-6 py-3 disabled:opacity-50" 
          onClick={send}
          disabled={loading || !title.trim() || !defn.trim() || !ex.trim()}
        >
          {loading ? 'Submitting...' : 'Submit for Review'}
        </button>
        
        {done && (
          <div className="text-sm p-3 bg-green-50 border border-green-200 rounded-lg">
            {done}
          </div>
        )}
      </div>
    </div>
  );
}
