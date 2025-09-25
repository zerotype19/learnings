import React, { useState } from 'react';
import { submitWallPost } from '../lib/api';

type SubmitTab = 'term' | 'wall';

export function Submit() {
  const [activeTab, setActiveTab] = useState<SubmitTab>('term');

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">📝 Submit Content</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('term')}
            className={`
              px-4 py-2 rounded-xl transition-colors
              ${activeTab === 'term' 
                ? 'bg-brand-600 text-white' 
                : 'border border-neutral-200 hover:bg-neutral-50'
              }
            `}
          >
            📚 Submit Term
          </button>
          <button
            onClick={() => setActiveTab('wall')}
            className={`
              px-4 py-2 rounded-xl transition-colors
              ${activeTab === 'wall' 
                ? 'bg-brand-600 text-white' 
                : 'border border-neutral-200 hover:bg-neutral-50'
              }
            `}
          >
            📸 Submit Wall Post
          </button>
        </div>

        {/* Content */}
        {activeTab === 'term' && <TermSubmissionForm />}
        {activeTab === 'wall' && <WallSubmissionForm />}
      </div>
    </div>
  );
}

function TermSubmissionForm() {
  const [formData, setFormData] = useState({
    title: '',
    definition: '',
    examples: '',
    tags: '',
    email: '',
    links: [{ url: '', label: '' }]
  });
  const [submitting, setSubmitting] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.definition.trim() || !formData.email.trim()) return;

    setSubmitting(true);
    try {
      // Parse tags and links
      const tags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      const links = formData.links.filter(l => l.url.trim() && l.label.trim());

      const response = await fetch(`${apiUrl}/api/submissions/terms/submit`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title.trim(),
          definition: formData.definition.trim(),
          examples: formData.examples.trim() || undefined,
          email: formData.email.trim(),
          tags: tags.length > 0 ? tags : undefined,
          links: links.length > 0 ? links : undefined
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || 'Confirmation email sent! Please check your email to complete your submission.');
        setFormData({
          title: '',
          definition: '',
          examples: '',
          tags: '',
          email: '',
          links: [{ url: '', label: '' }]
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Term submission failed:', error);
      alert('Failed to submit term. Please check your input and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const addLink = () => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, { url: '', label: '' }]
    }));
  };

  const updateLink = (index: number, field: 'url' | 'label', value: string) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const removeLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-white rounded-2xl border p-6">
      <h2 className="text-xl font-semibold mb-4">Submit New Corporate Term</h2>
      <p className="text-sm text-neutral-600 mb-6">
        Help expand our corporate dictionary with your buzzword discoveries.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Term *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Synergy"
            maxLength={100}
            required
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="your@email.com"
            required
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
          />
          <p className="text-xs text-neutral-500 mt-1">
            We'll send you a confirmation link to verify your submission
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Full Definition *</label>
          <textarea
            value={formData.definition}
            onChange={(e) => setFormData(prev => ({ ...prev, definition: e.target.value }))}
            placeholder="Detailed explanation of this corporate buzzword..."
            maxLength={2000}
            rows={4}
            required
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
          />
          <div className="text-xs text-neutral-500 mt-1">
            {formData.definition.length}/2000 characters
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Example Usage</label>
          <textarea
            value={formData.examples}
            onChange={(e) => setFormData(prev => ({ ...prev, examples: e.target.value }))}
            placeholder="Example sentences or usage scenarios..."
            maxLength={1000}
            rows={3}
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            placeholder="corporate, strategy, management (comma-separated)"
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
          />
        </div>

        {/* Source Links */}
        <div>
          <label className="block text-sm font-medium mb-2">Source Links (optional)</label>
          {formData.links.map((link, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="url"
                value={link.url}
                onChange={(e) => updateLink(index, 'url', e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg text-sm"
              />
              <input
                type="text"
                value={link.label}
                onChange={(e) => updateLink(index, 'label', e.target.value)}
                placeholder="Label"
                className="w-32 px-3 py-2 border border-neutral-200 rounded-lg text-sm"
              />
              {formData.links.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          {formData.links.length < 5 && (
            <button
              type="button"
              onClick={addLink}
              className="text-sm text-brand-600 hover:text-brand-700"
            >
              + Add another link
            </button>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={submitting || !formData.title.trim() || !formData.definition.trim()}
            className="px-6 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:opacity-50 transition-colors"
          >
            {submitting ? 'Submitting...' : 'Submit for Review'}
          </button>
          <button
            type="button"
            onClick={() => window.location.href = '/terms'}
            className="px-6 py-2 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function WallSubmissionForm() {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    source_url: '',
    tags: '',
    suggested_terms: '',
    email: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.source_url.trim() || !formData.email.trim()) return;

    setSubmitting(true);
    try {
      // Use the imported API helper
      
      // Parse tags and suggested terms
      const tags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      const suggestedTerms = formData.suggested_terms.split(',').map(t => t.trim()).filter(t => t);

      const response = await fetch(`${apiUrl}/api/submissions/wall/submit`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title.trim(),
          body: formData.body.trim() || undefined,
          source_url: formData.source_url.trim(),
          email: formData.email.trim(),
          tags: tags.length > 0 ? tags : undefined,
          suggested_terms: suggestedTerms.length > 0 ? suggestedTerms : undefined
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || 'Confirmation email sent! Please check your email to complete your submission.');
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Submission failed');
      }
      setFormData({
        title: '',
        body: '',
        source_url: '',
        tags: '',
        suggested_terms: '',
        email: ''
      });
    } catch (error) {
      console.error('Wall submission failed:', error);
      alert('Failed to submit wall post. Please check your input and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border p-6">
      <h2 className="text-xl font-semibold mb-4">Submit Wall Post</h2>
      <p className="text-sm text-neutral-600 mb-6">
        Share corporate buzzword discoveries from the wild.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Peak Corporate Excellence in Action"
            maxLength={200}
            required
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="your@email.com"
            required
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
          />
          <p className="text-xs text-neutral-500 mt-1">
            We'll send you a confirmation link to verify your submission
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Source URL *</label>
          <input
            type="url"
            value={formData.source_url}
            onChange={(e) => setFormData(prev => ({ ...prev, source_url: e.target.value }))}
            placeholder="https://example.com/corporate-presentation"
            required
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
          />
          <div className="text-xs text-neutral-500 mt-1">
            Link to the original content where you found this corporate jargon
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description (optional)</label>
          <textarea
            value={formData.body}
            onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
            placeholder="Context about where you found this or why it's noteworthy..."
            maxLength={2000}
            rows={3}
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
          />
          <div className="text-xs text-neutral-500 mt-1">
            {formData.body.length}/2000 characters
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            placeholder="corporate, presentation, cringe (comma-separated)"
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Related Terms</label>
          <input
            type="text"
            value={formData.suggested_terms}
            onChange={(e) => setFormData(prev => ({ ...prev, suggested_terms: e.target.value }))}
            placeholder="synergy, leverage, optimize (comma-separated slugs)"
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
          />
          <div className="text-xs text-neutral-500 mt-1">
            Suggest terms from our dictionary that relate to this post
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={submitting || !formData.title.trim() || !formData.source_url.trim()}
            className="px-6 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:opacity-50 transition-colors"
          >
            {submitting ? 'Submitting...' : 'Submit for Review'}
          </button>
          <button
            type="button"
            onClick={() => window.location.href = '/wall'}
            className="px-6 py-2 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            View Wall
          </button>
        </div>
      </form>
    </div>
  );
}
