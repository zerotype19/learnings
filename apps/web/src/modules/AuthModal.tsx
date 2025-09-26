import React, { useState } from 'react';

export function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  
  async function send() {
    if (!email.trim()) return;
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';
      await fetch(apiUrl + "/v1/auth/magic", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      setSent(true);
    } catch (error) {
      alert("Failed to send magic link. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {!sent ? (
          <>
            <div className="text-xl font-semibold text-ink">Sign in</div>
            <p className="mt-1 text-sm text-neutral-600">
              We'll email you a magic link. No passwords required. Your email is only used for confirmation and is not saved.
            </p>
            <input 
              className="mt-4 w-full rounded-xl border border-neutral-200 p-3 focus:ring-2 focus:ring-brand-100 focus:border-brand-300" 
              placeholder="you@work.com" 
              type="email"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
            <div className="mt-4 flex justify-end gap-2">
              <button 
                className="rounded-xl border border-neutral-200 px-4 py-2 hover:bg-neutral-50 transition-colors" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 transition-colors disabled:opacity-50" 
                onClick={send}
                disabled={loading || !email.trim()}
              >
                {loading ? 'Sending...' : 'Email me a link'}
              </button>
            </div>
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-neutral-500">Or</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';
                  window.location.href = apiUrl + '/v1/auth/linkedin/start';
                }}
                className="mt-3 w-full rounded-xl border border-neutral-200 px-4 py-2 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-blue-600">💼</span>
                Continue with LinkedIn
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-xl font-semibold text-ink">Check your email</div>
            <p className="mt-1 text-sm text-neutral-600">
              We sent a magic link to <strong>{email}</strong>. Click it to sign in.
            </p>
            <button 
              className="mt-4 w-full rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 transition-colors" 
              onClick={onClose}
            >
              Got it
            </button>
          </>
        )}
      </div>
    </div>
  );
}
