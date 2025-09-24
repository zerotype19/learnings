import React, { useState, useEffect } from 'react';

type TermDetail = {
  id: string;
  slug: string;
  title: string;
  definition: string;
  short_def?: string;
  examples?: string;
  tags: string[];
  views: number;
  created_at: string;
  updated_at: string;
  related_terms: Array<{
    id: string;
    slug: string;
    title: string;
    short_def?: string;
  }>;
  links: Array<{
    id: string;
    url: string;
    platform: string;
    title?: string;
    note?: string;
    votes: number;
  }>;
};

type TermDetailProps = {
  slug: string;
};

export function TermDetail({ slug }: TermDetailProps) {
  const [term, setTerm] = useState<TermDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLinkForm, setShowLinkForm] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';

  useEffect(() => {
    loadTerm();
  }, [slug]);

  const loadTerm = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${apiUrl}/api/terms/${slug}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 404) {
          setError('Term not found');
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
        return;
      }

      const data = await response.json();
      setTerm(data.item);
    } catch (err) {
      console.error('Failed to load term:', err);
      setError('Failed to load term');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    const url = `${window.location.origin}/term/${slug}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const shareLink = () => {
    const url = `${window.location.origin}/term/${slug}`;
    if (navigator.share) {
      navigator.share({
        title: term?.title,
        text: term?.short_def || term?.definition,
        url
      });
    } else {
      copyLink();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-neutral-600">Loading term...</div>
      </div>
    );
  }

  if (error || !term) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-neutral-600 mb-2">{error || 'Term not found'}</div>
          <button 
            onClick={() => window.location.href = '/terms'}
            className="text-brand-600 hover:text-brand-700"
          >
            ← Back to Terms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => window.location.href = '/terms'}
            className="text-brand-600 hover:text-brand-700 text-sm mb-4"
          >
            ← Back to Terms
          </button>
          
          <div className="bg-white rounded-2xl border p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{term.title}</h1>
              <div className="flex gap-2">
                <button
                  onClick={copyLink}
                  className="px-3 py-1 text-xs border border-neutral-200 rounded-full hover:bg-neutral-50"
                >
                  📋 Copy Link
                </button>
                <button
                  onClick={shareLink}
                  className="px-3 py-1 text-xs border border-neutral-200 rounded-full hover:bg-neutral-50"
                >
                  📤 Share
                </button>
              </div>
            </div>

            <div className="text-lg text-neutral-700 mb-4">{term.definition}</div>

            {term.examples && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Examples</h3>
                <div className="text-neutral-600 whitespace-pre-wrap">{term.examples}</div>
              </div>
            )}

            {term.tags && term.tags.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {term.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-neutral-500">
              {term.views} views • Created {new Date(term.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* In the Wild Links */}
            <div className="bg-white rounded-2xl border p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">🌍 In the Wild</h2>
                <button
                  onClick={() => setShowLinkForm(!showLinkForm)}
                  className="px-3 py-1 text-xs bg-brand-600 text-white rounded-full hover:bg-brand-700"
                >
                  + Add Example
                </button>
              </div>

              {showLinkForm && <LinkSubmissionForm termId={term.id} onSubmit={() => setShowLinkForm(false)} />}

              {(!term.links || term.links.length === 0) ? (
                <div className="text-center py-8 text-neutral-500">
                  No examples yet. Be the first to add one!
                </div>
              ) : (
                <div className="space-y-3">
                  {term.links.map(link => (
                    <div key={link.id} className="border border-neutral-200 rounded-xl p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-brand-600 hover:text-brand-700 font-medium"
                          >
                            {link.title || link.url}
                          </a>
                          {link.note && (
                            <p className="text-sm text-neutral-600 mt-1">{link.note}</p>
                          )}
                          <div className="text-xs text-neutral-500 mt-1">
                            {link.platform} • {link.votes} votes
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Terms */}
            {term.related_terms && term.related_terms.length > 0 && (
              <div className="bg-white rounded-2xl border p-6 mb-6">
                <h3 className="font-semibold mb-4">Related Terms</h3>
                <div className="space-y-2">
                  {term.related_terms.map(relatedTerm => (
                    <button
                      key={relatedTerm.id}
                      onClick={() => window.location.href = `/term/${relatedTerm.slug}`}
                      className="block w-full text-left p-2 hover:bg-neutral-50 rounded-lg transition-colors"
                    >
                      <div className="font-medium text-sm">{relatedTerm.title}</div>
                      {relatedTerm.short_def && (
                        <div className="text-xs text-neutral-600">{relatedTerm.short_def}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Generator Shortcuts */}
            <div className="bg-white rounded-2xl border p-6">
              <h3 className="font-semibold mb-4">🤖 AI Tools</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const event = new CustomEvent('professor:prefill', { detail: term.title });
                    window.dispatchEvent(event);
                  }}
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  🎓 Translate with Professor
                </button>
                <button
                  onClick={() => window.location.href = '/generators'}
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  📝 Generate LinkedIn Post
                </button>
                <button
                  onClick={() => window.location.href = '/bingo'}
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  🎯 Add to Bingo Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkSubmissionForm({ termId, onSubmit }: { termId: string; onSubmit: () => void }) {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('other');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/api/terms/${termId}/link/submit`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.trim(),
          platform,
          title: title.trim() || undefined,
          note: note.trim() || undefined
        })
      });

      if (response.ok) {
        alert('Link submitted for review!');
        setUrl('');
        setTitle('');
        setNote('');
        onSubmit();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Link submission failed:', error);
      alert('Failed to submit link. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border border-neutral-200 rounded-xl p-4 mb-4 bg-neutral-50">
      <h4 className="font-medium mb-3">Add an example from the wild</h4>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">URL *</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            required
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm"
          >
            <option value="other">Other</option>
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
            <option value="article">Article</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Title (optional)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief description..."
            maxLength={200}
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Note (optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Why is this a good example?"
            maxLength={500}
            rows={2}
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting || !url.trim()}
            className="px-4 py-2 bg-brand-600 text-white text-sm rounded-lg hover:bg-brand-700 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Link'}
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="px-4 py-2 border border-neutral-200 text-sm rounded-lg hover:bg-neutral-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
