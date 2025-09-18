import React, { useState } from 'react';

export function ProfessorWidget({ onTextRequest }: { onTextRequest?: (callback: (text: string) => void) => void }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [resp, setResp] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  React.useEffect(() => {
    if (onTextRequest) {
      onTextRequest((text: string) => {
        setInput(text);
        setOpen(true);
      });
    }
  }, [onTextRequest]);

  async function ask() {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
      const r = await fetch(apiUrl + '/v1/ai/translate', { 
        method: 'POST', 
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

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open ? (
        <button 
          className="rounded-full px-4 py-2 bg-black text-white shadow-lg hover:bg-gray-800 transition-colors" 
          onClick={() => setOpen(true)}
        >
          🎓 Ask the Professor
        </button>
      ) : (
        <div className="w-80 rounded-2xl border bg-white shadow-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <strong className="text-lg">🎓 The Corporate Professor</strong>
            <button 
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          <textarea 
            className="w-full border rounded p-2 text-sm" 
            rows={3} 
            placeholder="Paste the corporate jargon here..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
          />
          <button 
            className="mt-2 w-full rounded bg-black text-white px-3 py-2 hover:bg-gray-800 transition-colors disabled:opacity-50" 
            onClick={ask}
            disabled={loading || !input.trim()}
          >
            {loading ? 'Translating...' : 'Translate'}
          </button>
          {resp && (
            <div className="mt-4 text-sm space-y-3">
              <div>
                <div className="font-semibold text-blue-600">Academic Translation</div>
                <p className="text-gray-700">{resp.academic_tone}</p>
              </div>
              <div>
                <div className="font-semibold text-green-600">Plain English</div>
                <p className="text-gray-700">{resp.plain_translation}</p>
              </div>
              {resp.optional_framework && (
                <div>
                  <div className="font-semibold text-purple-600">Framework</div>
                  <p className="text-gray-700 italic">{resp.optional_framework}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
