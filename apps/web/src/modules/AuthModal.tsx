import React, { useState } from 'react';

export function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  
  async function send() {
    if (!email.trim()) return;
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
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
              We'll email you a magic link. No passwords required.
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
            <div className="mt-4 text-xs text-neutral-500 text-center">
              Or continue with LinkedIn (coming soon).
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
