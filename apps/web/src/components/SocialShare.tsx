import React, { useState } from 'react';
import { useDialog } from '../hooks/useDialog';
import { Feedback, useFeedback } from './Feedback';

function ShareDialog({ title, url, text, label, className = '' }: { title: string; url: string; text: string; label: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useDialog(open, () => setOpen(false));
  const { feedback, copy, clearFeedback } = useFeedback();
  return <div className={className}>
    <button type="button" onClick={() => { clearFeedback(); setOpen(true); }} aria-haspopup="dialog" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700">{label}</button>
    {open && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div ref={ref} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} className="w-full max-w-sm max-h-[90dvh] overflow-y-auto rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between gap-3 mb-4"><h2 className="text-lg font-semibold text-slate-900">{title}</h2><button aria-label="Close sharing" onClick={() => setOpen(false)} className="shrink-0 min-h-11 min-w-11 rounded-lg border text-xl">×</button></div>
        <div className="grid gap-2">
          <button onClick={() => void copy(url)} className="rounded-lg border p-3 text-left hover:bg-slate-50">Copy link</button>
          <button onClick={() => void copy(text)} className="rounded-lg border p-3 text-left hover:bg-slate-50">Copy text</button>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="block rounded-lg border p-3 hover:bg-slate-50">Share on LinkedIn ↗</a>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" className="block rounded-lg border p-3 hover:bg-slate-50">Share on X ↗</a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="block rounded-lg border p-3 hover:bg-slate-50">Share on Facebook ↗</a>
        </div>
        <Feedback value={feedback} />
      </div>
    </div>}
  </div>;
}
export function SocialShare({ term, className }: { term: { title: string; definition: string; examples?: string; slug: string }; className?: string }) {
  const url = `https://learnings.org/term/${term.slug}`;
  return <ShareDialog title="Share this term" label="Share term" url={url} text={`${term.title}: ${term.definition}\n\n${url}`} className={className} />;
}
export function BuzzwordGeneratorShare({ className }: { className?: string }) {
  const url = 'https://learnings.org/generators/buzzword';
  return <ShareDialog title="Share the generator" label="Share generator" url={url} text={`Turn workplace chaos into satirical buzzwords.\n\n${url}`} className={className} />;
}
