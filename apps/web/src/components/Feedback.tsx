import React, { useState } from 'react';
export type FeedbackValue = { message: string; kind: 'success' | 'error' | 'info' } | null;
export function Feedback({ value }: { value: FeedbackValue }) {
  if (!value) return null;
  return <p role={value.kind === 'error' ? 'alert' : 'status'} className={`my-3 rounded-lg border px-4 py-3 text-sm ${value.kind === 'error' ? 'border-red-200 bg-red-50 text-red-800' : value.kind === 'success' ? 'border-green-200 bg-green-50 text-green-800' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>{value.message}</p>;
}
export function useFeedback() {
  const [feedback, setFeedback] = useState<FeedbackValue>(null);
  const notify = (message: string, kind: 'success' | 'error' | 'info' = 'success') => setFeedback({ message, kind });
  const copy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); notify('Copied to clipboard.'); }
    catch { notify('Could not copy automatically. Select the text and copy it manually.', 'error'); }
  };
  const share = async (data: ShareData) => {
    try {
      if (navigator.share) await navigator.share(data);
      else await copy(data.url || data.text || '');
    } catch (error) {
      if (!(error instanceof Error && error.name === 'AbortError')) notify('Could not share. Please try copying the link instead.', 'error');
    }
  };
  return { feedback, notify, copy, share, clearFeedback: () => setFeedback(null) };
}
