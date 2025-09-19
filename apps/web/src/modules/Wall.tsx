import React, { useEffect, useState } from 'react';

type WallItem = { id: string; title: string; image_key: string; source_url?: string; flagged?: number };

function WallItemCard({ item, apiUrl }: { item: WallItem; apiUrl: string }) {
  const [revealed, setRevealed] = useState(false);
  const isBlurred = item.flagged === 1 && !revealed;
  
  return (
    <figure className="border rounded overflow-hidden">
      <div className="relative">
        <img 
          src={`${apiUrl}/v1/wall/file/${item.image_key}`} 
          alt={item.title} 
          className={`w-full h-48 object-cover transition-all ${isBlurred ? 'filter blur-lg' : ''}`}
        />
        {isBlurred && (
          <button
            onClick={() => setRevealed(true)}
            className="absolute inset-0 bg-black bg-opacity-50 text-white text-sm flex items-center justify-center hover:bg-opacity-40"
          >
            ⚠️ Flagged Content - Click to Reveal
          </button>
        )}
      </div>
      <figcaption className="p-2 text-sm">
        <div className="font-semibold">{item.title}</div>
        {item.source_url && (
          <a href={item.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs">
            Source
          </a>
        )}
        {item.flagged === 1 && (
          <div className="text-xs text-orange-600 mt-1">⚠️ Flagged for review</div>
        )}
      </figcaption>
    </figure>
  );
}

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
          <WallItemCard key={it.id} item={it} apiUrl={apiUrl} />
        ))}
      </div>
    </div>
  );
}
