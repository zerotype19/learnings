import React, { useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

export function ProfessorWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'translate' | 'chat'>('chat');
  
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
    
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';
      
      if (mode === 'chat') {
        // Chat mode - send conversation history
        const conversationHistory = messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }));
        
        const r = await fetch(apiUrl + '/v1/ai/chat', { 
          method: 'POST',
          credentials: 'include', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ 
            message: input,
            conversation_history: conversationHistory
          }) 
        });
        const d = await r.json();
        
        const assistantMessage: Message = {
          role: 'assistant',
          content: d.response,
          timestamp: d.timestamp
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Translate mode - keep existing behavior
        const r = await fetch(apiUrl + '/v1/ai/translate', { 
          method: 'POST',
          credentials: 'include', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ text: input }) 
        });
        const d = await r.json();
        
        const assistantMessage: Message = {
          role: 'assistant',
          content: `**Academic Translation:** ${d.academic_tone}\n\n**Plain English:** ${d.plain_translation}\n\n**Framework:** ${d.optional_framework}`,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Request failed:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm experiencing a paradigm shift in my neural networks right now. Could you try that again? 🤖",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setInput('');
    }
  }

  const clearConversation = () => {
    setMessages([]);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    alert('Message copied to clipboard!');
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
        <div className="w-96 h-[500px] rounded-2xl border bg-white shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <strong className="text-lg text-ink">🎓 The Corporate Professor</strong>
              <p className="text-xs text-neutral-500">Chat with your satirical business advisor</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={clearConversation}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                title="Clear conversation"
              >
                Clear
              </button>
              <button 
                onClick={() => setOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 text-xl"
              >
                ×
              </button>
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="p-3 border-b">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setMode('chat')}
                className={`flex-1 px-3 py-1 rounded-md text-sm transition-colors ${
                  mode === 'chat' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                💬 Chat
              </button>
              <button
                onClick={() => setMode('translate')}
                className={`flex-1 px-3 py-1 rounded-md text-sm transition-colors ${
                  mode === 'translate' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🔄 Translate
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 text-sm">
                {mode === 'chat' 
                  ? "Start a conversation! Ask me about corporate culture, buzzwords, or anything business-related."
                  : "Paste some corporate jargon and I'll translate it for you."
                }
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-brand-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                      <button
                        onClick={() => copyMessage(message.content)}
                        className="text-xs opacity-70 hover:opacity-100 transition-opacity"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                    <span className="text-sm text-gray-600">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-100 focus:border-brand-300"
                placeholder={mode === 'chat' ? "Ask me anything..." : "Paste corporate jargon here..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && ask()}
                disabled={loading}
              />
              <button 
                className="rounded-lg bg-brand-600 text-white px-4 py-2 hover:bg-brand-700 transition-colors disabled:opacity-50 text-sm"
                onClick={ask}
                disabled={loading || !input.trim()}
              >
                {loading ? '...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
