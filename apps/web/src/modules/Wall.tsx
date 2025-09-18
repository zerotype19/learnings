import React, { useEffect, useState } from 'react';

type WallItem = { id: string; title: string; image_key: string; source_url?: string };

export function Wall() {
  const [items, setItems] = useState<WallItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';

  useEffect(() => { 
    fetch(apiUrl + '/v1/wall')
      .then(r => r.json())
      .then(d => setItems(d.items || []))
      .catch(() => setItems([]));
  }, [apiUrl]);

  async function onUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', title);
    if (source) fd.append('source_url', source);
    await fetch(apiUrl + '/v1/wall', { method: 'POST', body: fd });
    const d = await (await fetch(apiUrl + '/v1/wall')).json();
    setItems(d.items || []);
    setFile(null); 
    setTitle(''); 
    setSource('');
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h2 className="text-2xl font-bold mb-4">LinkedIn Nonsense — Wall of Fame</h2>
      <form onSubmit={onUpload} className="mb-6 space-y-2">
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files?.[0] || null)} 
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <input 
          className="border p-2 w-full rounded" 
          placeholder="Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
        />
        <input 
          className="border p-2 w-full rounded" 
          placeholder="Source URL (optional)" 
          value={source} 
          onChange={e => setSource(e.target.value)} 
        />
        <button 
          className="rounded bg-black text-white px-4 py-2" 
          type="submit"
          disabled={!file}
        >
          Upload
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(it => (
          <figure key={it.id} className="border rounded overflow-hidden">
            <img 
              src={`${apiUrl}/v1/wall/file/${it.image_key}`} 
              alt={it.title} 
              className="w-full h-48 object-cover"
            />
            <figcaption className="p-2 text-sm">
              <div className="font-semibold">{it.title}</div>
              {it.source_url && (
                <a href={it.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs">
                  Source
                </a>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
