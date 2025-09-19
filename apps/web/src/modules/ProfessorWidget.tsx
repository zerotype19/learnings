import React, { useState } from 'react';

export function ProfessorWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [resp, setResp] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  // Listen for prefill events
  React.useEffect(() => {
    const handlePrefill = (e: CustomEvent) => {
      setInput(e.detail);
      setOpen(true);
    };
    window.addEventListener('professor:prefill', handlePrefill as EventListener);
    return () => window.removeEventListener('professor:prefill', handlePrefill as EventListener);
  }, []);

  async function ask() {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
      const r = await fetch(apiUrl + '/v1/ai/translate', { 
        method: 'POST',
        credentials: 'include', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ text: input }) 
      });
      const d = await r.json();
      setResp(d);
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setLoading(false);
    }
  }

  const copyResponse = () => {
    if (!resp) return;
    const text = `Academic: ${resp.academic_tone}\n\nPlain English: ${resp.plain_translation}${resp.optional_framework ? `\n\nFramework: ${resp.optional_framework}` : ''}`;
    navigator.clipboard.writeText(text);
    alert('Response copied to clipboard!');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open ? (
        <button 
          className="rounded-full bg-brand-600 px-4 py-2 text-white shadow-lg hover:bg-brand-700 transition-colors" 
          onClick={() => setOpen(true)}
        >
          🎓 Ask the Professor
        </button>
      ) : (
        <div className="w-80 rounded-2xl border bg-white shadow-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <strong className="text-lg text-ink">🎓 The Corporate Professor</strong>
              <p className="text-xs text-neutral-500">Faux-academic guidance, now 30% more confident.</p>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="text-neutral-400 hover:text-neutral-600 text-xl"
            >
              ×
            </button>
          </div>
          
          <textarea 
            className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-100 focus:border-brand-300" 
            rows={3} 
            placeholder="Paste the corporate jargon here..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
          />
          
          <div className="mt-3 flex gap-2">
            <button 
              className="flex-1 rounded-xl bg-brand-600 text-white px-3 py-2 hover:bg-brand-700 transition-colors disabled:opacity-50 text-sm" 
              onClick={ask}
              disabled={loading || !input.trim()}
            >
              {loading ? 'Translating...' : 'Translate'}
            </button>
            {resp && (
              <button 
                className="rounded-xl border px-3 py-2 hover:bg-neutral-50 transition-colors text-sm"
                onClick={copyResponse}
              >
                📋 Copy
              </button>
            )}
          </div>
          
          {resp && (
            <div className="mt-4 text-sm space-y-3 border-t pt-3">
              <div>
                <div className="font-semibold text-brand-600">Academic Translation</div>
                <p className="text-neutral-700 text-xs leading-relaxed">{resp.academic_tone}</p>
              </div>
              <div>
                <div className="font-semibold text-green-600">Plain English</div>
                <p className="text-neutral-700 text-xs leading-relaxed">{resp.plain_translation}</p>
              </div>
              {resp.optional_framework && (
                <div>
                  <div className="font-semibold text-purple-600">Framework</div>
                  <p className="text-neutral-700 text-xs leading-relaxed italic">{resp.optional_framework}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
