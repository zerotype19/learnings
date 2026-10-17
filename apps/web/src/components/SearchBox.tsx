import React, { useEffect, useId, useRef, useState } from 'react';
import { getApiUrl } from '../utils/getApiUrl';
type Suggestion = { id: string; type: string; title: string; description?: string; url: string };
interface SearchBoxProps { onNavigate?: (url: string) => void; placeholder?: string; className?: string }
export function SearchBox({ onNavigate, placeholder = 'Search the dictionary…', className = '' }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const id = useId();
  const navigate = (url: string) => { setOpen(false); (onNavigate || (destination => window.location.assign(destination)))(url); };
  useEffect(() => {
    const controller = new AbortController();
    setSuggestions([]); setSelected(-1); setError(false); setLoading(false);
    if (query.trim().length < 2) { setOpen(false); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`${getApiUrl()}/api/search/suggest?q=${encodeURIComponent(query.trim())}&limit=8`, { signal: controller.signal });
        if (!response.ok) throw new Error('Search unavailable');
        const data = await response.json();
        if (!controller.signal.aborted) { setSuggestions((data.suggestions || []).filter((s: Suggestion) => typeof s.url === 'string' && s.url.startsWith('/') && !s.url.startsWith('//'))); setOpen(true); }
      } catch { if (!controller.signal.aborted) { setError(true); setOpen(true); } }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query]);
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!box.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);
  return <div ref={box} className={`relative ${className}`}>
    <form role="search" action="/search" onSubmit={event => { event.preventDefault(); if (query.trim()) navigate(selected >= 0 && open && suggestions[selected] ? suggestions[selected].url : `/search?q=${encodeURIComponent(query.trim())}`); }}>
      <label className="sr-only" htmlFor={id}>Search dictionary and jargon wall</label>
      <input id={id} name="q" type="search" role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={`${id}-results`} aria-activedescendant={selected >= 0 ? `${id}-${selected}` : undefined} autoComplete="off" value={query} onChange={e => setQuery(e.target.value)} onFocus={() => { if (suggestions.length) setOpen(true); }} onKeyDown={e => {
        if (e.key === 'Escape') { setOpen(false); setSelected(-1); }
        if (e.key === 'ArrowDown' && suggestions.length) { e.preventDefault(); setOpen(true); setSelected(i => Math.min(i + 1, suggestions.length - 1)); }
        if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(i => Math.max(-1, i - 1)); }
      }} placeholder={placeholder} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900" />
    </form>
    {loading && <span role="status" className="sr-only">Searching…</span>}
    {open && <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
      <div id={`${id}-results`} role="listbox" aria-label="Search suggestions">
        {suggestions.map((item, i) => <a id={`${id}-${i}`} key={`${item.type}-${item.id}`} role="option" aria-selected={selected === i} href={item.url} onClick={e => { if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) { e.preventDefault(); navigate(item.url); } }} className={`block px-4 py-3 text-sm hover:bg-slate-50 ${selected === i ? 'bg-brand-50' : ''}`}><span className="block font-medium">{item.title}</span>{item.description && <span className="block text-xs text-slate-500 truncate">{item.description}</span>}</a>)}
      </div>
      {error && <p role="status" className="p-3 text-sm text-slate-600">Suggestions are unavailable. Press Enter to search the dictionary.</p>}
      {!error && !suggestions.length && <p className="p-3 text-sm text-slate-600">No suggestions. Try a different word or view all results.</p>}
      <a className="block border-t px-4 py-3 text-sm text-brand-600" href={`/search?q=${encodeURIComponent(query.trim())}`}>View all results for “{query.trim()}”</a>
    </div>}
  </div>;
}
