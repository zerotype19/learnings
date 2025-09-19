import React, { useState } from 'react';

type GeneratorType = 'post' | 'comment' | 'email';

export function LinkedInGenerators() {
  const [activeGenerator, setActiveGenerator] = useState<GeneratorType>('post');
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      let endpoint = '';
      let payload = {};
      
      switch (activeGenerator) {
        case 'post':
          endpoint = '/v1/ai/linkedin_post';
          payload = { topic };
          break;
        case 'comment':
          endpoint = '/v1/ai/comment';
          payload = { post_excerpt: topic };
          break;
        case 'email':
          endpoint = '/v1/ai/email';
          payload = { purpose: topic };
          break;
      }
      
      const response = await fetch(apiUrl + endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const exportAsCard = (content: string) => {
    // Create a simple downloadable card
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 800;
    canvas.height = 600;
    
    // Background
    ctx.fillStyle = '#0B0D12';
    ctx.fillRect(0, 0, 800, 600);
    
    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Inter, sans-serif';
    ctx.textAlign = 'center';
    
    // Split text into lines
    const words = content.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (const word of words) {
      const testLine = currentLine + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 700 && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());
    
    // Draw lines
    const lineHeight = 36;
    const startY = (600 - (lines.length * lineHeight)) / 2;
    
    lines.forEach((line, index) => {
      ctx.fillText(line, 400, startY + (index * lineHeight));
    });
    
    // Footer
    ctx.font = '16px Inter, sans-serif';
    ctx.fillStyle = '#888888';
    ctx.fillText('Learnings Dot Org — Powered by AI', 400, 550);
    
    // Download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `learnings-${activeGenerator}-card.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h2 className="text-2xl font-bold mb-4">LinkedIn Content Generators</h2>
      <p className="opacity-70 text-sm mb-6">Generate professional corporate content with AI assistance.</p>
      
      {/* Generator Type Selector */}
      <div className="flex gap-2 mb-4">
        {(['post', 'comment', 'email'] as GeneratorType[]).map(type => (
          <button
            key={type}
            onClick={() => setActiveGenerator(type)}
            className={`px-4 py-2 rounded capitalize ${
              activeGenerator === type ? 'bg-black text-white' : 'bg-gray-100'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      
      {/* Input */}
      <div className="mb-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={
            activeGenerator === 'post' ? 'Enter topic (e.g., "digital transformation")'
            : activeGenerator === 'comment' ? 'Enter post excerpt to comment on'
            : 'Enter email purpose (e.g., "Executive Update")'
          }
          className="w-full p-3 border rounded-lg"
        />
        <button
          onClick={generate}
          disabled={loading || !topic.trim()}
          className="mt-2 px-6 py-2 bg-black text-white rounded-lg disabled:opacity-50"
        >
          {loading ? 'Generating...' : `Generate ${activeGenerator}`}
        </button>
      </div>
      
      {/* Results */}
      {result && (
        <div className="space-y-4">
          {activeGenerator === 'post' && result.options && (
            <div>
              <h3 className="font-semibold mb-2">LinkedIn Post Options:</h3>
              {result.options.map((option: string, index: number) => (
                <div key={index} className="border rounded-lg p-4 mb-3">
                  <p className="mb-3">{option}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(option)}
                      className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={() => exportAsCard(option)}
                      className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 rounded"
                    >
                      💾 Export Card
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeGenerator === 'comment' && result.comment && (
            <div>
              <h3 className="font-semibold mb-2">LinkedIn Comment:</h3>
              <div className="border rounded-lg p-4">
                <p className="mb-3">{result.comment}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(result.comment)}
                    className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={() => exportAsCard(result.comment)}
                    className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 rounded"
                  >
                    💾 Export Card
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeGenerator === 'email' && result.subject && result.body && (
            <div>
              <h3 className="font-semibold mb-2">Executive Email:</h3>
              <div className="border rounded-lg p-4">
                <div className="mb-2">
                  <strong>Subject:</strong> {result.subject}
                </div>
                <div className="mb-3">
                  <strong>Body:</strong>
                  <pre className="whitespace-pre-wrap mt-1 text-sm">{result.body}</pre>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(`Subject: ${result.subject}\n\n${result.body}`)}
                    className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded"
                  >
                    📋 Copy Email
                  </button>
                  <button
                    onClick={() => exportAsCard(`${result.subject}\n\n${result.body}`)}
                    className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 rounded"
                  >
                    💾 Export Card
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
