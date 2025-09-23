import React, { useState, useEffect } from 'react';
import { trackEvent } from '../lib/api';

type Challenge = {
  id: string;
  slug: string;
  title: string;
  brief: string;
  starts_at: string;
  ends_at: string;
  status: 'scheduled' | 'active' | 'closed';
  entry_count?: number;
};

type ChallengeEntry = {
  id: string;
  challenge_id: string;
  title?: string;
  body: string;
  source_url?: string;
  media_url?: string;
  related_terms: string[];
  votes: number;
  hot_score: number;
  created_at: string;
  fingerprint: string;
};

export function ChallengesHub() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [entries, setEntries] = useState<ChallengeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [entriesLoading, setEntriesLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Submission form state
  const [submissionTitle, setSubmissionTitle] = useState('');
  const [submissionBody, setSubmissionBody] = useState('');
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submissionTerms, setSubmissionTerms] = useState<string[]>([]);
  const [newTerm, setNewTerm] = useState('');

  // Load challenges on mount
  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const response = await fetch(`${getApiUrl()}/api/challenges`, {
          credentials: 'include'
        });
        const data = await response.json();
        setChallenges(data.items || []);
        
        // Set active challenge if available
        const active = data.items?.find((c: Challenge) => c.status === 'active');
        if (active) {
          setActiveChallenge(active);
          loadChallengeEntries(active.id);
        }
      } catch (error) {
        console.error('Failed to load challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChallenges();
  }, []);

  const loadChallengeEntries = async (challengeId: string) => {
    setEntriesLoading(true);
    try {
      const response = await fetch(`${getApiUrl()}/api/challenges/${challengeId}/entries`, {
        credentials: 'include'
      });
      const data = await response.json();
      setEntries(data.items || []);
    } catch (error) {
      console.error('Failed to load challenge entries:', error);
    } finally {
      setEntriesLoading(false);
    }
  };

  const handleChallengeSelect = (challenge: Challenge) => {
    setActiveChallenge(challenge);
    loadChallengeEntries(challenge.id);
    
    trackEvent('challenge_viewed', {
      challenge_id: challenge.id,
      challenge_slug: challenge.slug
    });
  };

  const handleSubmitEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChallenge || !submissionBody.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${getApiUrl()}/api/challenges/${activeChallenge.id}/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: submissionTitle.trim() || undefined,
          body: submissionBody.trim(),
          source_url: submissionUrl.trim() || undefined,
          related_terms: submissionTerms
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Submission failed');
      }

      // Clear form
      setSubmissionTitle('');
      setSubmissionBody('');
      setSubmissionUrl('');
      setSubmissionTerms([]);
      
      // Reload entries
      loadChallengeEntries(activeChallenge.id);

      trackEvent('challenge_entry_submitted', {
        challenge_id: activeChallenge.id,
        challenge_slug: activeChallenge.slug
      });

      alert('Entry submitted successfully!');
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const addTerm = () => {
    if (newTerm.trim() && !submissionTerms.includes(newTerm.trim())) {
      setSubmissionTerms([...submissionTerms, newTerm.trim()]);
      setNewTerm('');
    }
  };

  const removeTerm = (term: string) => {
    setSubmissionTerms(submissionTerms.filter(t => t !== term));
  };

  const getApiUrl = () => {
    return import.meta.env.VITE_API_URL || 'https://api.learnings.org';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysLeft = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-6"></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Challenges Hub</h1>
        <p className="text-gray-600">Weekly prompts to showcase the worst of corporate culture</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Challenges List */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Available Challenges</h2>
          <div className="space-y-3">
            {challenges.map((challenge) => (
              <button
                key={challenge.id}
                onClick={() => handleChallengeSelect(challenge)}
                className={`w-full p-4 text-left border rounded-lg transition-colors ${
                  activeChallenge?.id === challenge.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{challenge.title}</div>
                  <div className={`px-2 py-1 text-xs rounded ${
                    challenge.status === 'active' ? 'bg-green-100 text-green-800' :
                    challenge.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {challenge.status}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">{challenge.brief}</div>
                <div className="text-xs text-gray-500">
                  {challenge.status === 'active' && getDaysLeft(challenge.ends_at) > 0 && (
                    <span>{getDaysLeft(challenge.ends_at)} days left</span>
                  )}
                  {challenge.status === 'closed' && (
                    <span>Ended {formatDate(challenge.ends_at)}</span>
                  )}
                  {challenge.status === 'scheduled' && (
                    <span>Starts {formatDate(challenge.starts_at)}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Challenge Details & Entries */}
        <div className="lg:col-span-2">
          {activeChallenge ? (
            <div className="space-y-6">
              {/* Challenge Header */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">{activeChallenge.title}</h2>
                  <div className={`px-3 py-1 text-sm rounded ${
                    activeChallenge.status === 'active' ? 'bg-green-100 text-green-800' :
                    activeChallenge.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activeChallenge.status}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{activeChallenge.brief}</p>
                <div className="text-sm text-gray-600">
                  {activeChallenge.status === 'active' && getDaysLeft(activeChallenge.ends_at) > 0 && (
                    <span>⏰ {getDaysLeft(activeChallenge.ends_at)} days remaining</span>
                  )}
                  {activeChallenge.status === 'closed' && (
                    <span>🏁 Challenge ended {formatDate(activeChallenge.ends_at)}</span>
                  )}
                </div>
              </div>

              {/* Submission Form */}
              {activeChallenge.status === 'active' && (
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Submit Entry</h3>
                  <form onSubmit={handleSubmitEntry} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Title (optional)
                      </label>
                      <input
                        type="text"
                        value={submissionTitle}
                        onChange={(e) => setSubmissionTitle(e.target.value)}
                        placeholder="Give your entry a catchy title"
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Entry *
                      </label>
                      <textarea
                        value={submissionBody}
                        onChange={(e) => setSubmissionBody(e.target.value)}
                        placeholder="Share the most cringe-worthy corporate jargon you've encountered..."
                        className="w-full p-3 border rounded-lg resize-none"
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Source URL (optional)
                      </label>
                      <input
                        type="url"
                        value={submissionUrl}
                        onChange={(e) => setSubmissionUrl(e.target.value)}
                        placeholder="Link to the original source if available"
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Related Terms
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newTerm}
                          onChange={(e) => setNewTerm(e.target.value)}
                          placeholder="Add a buzzword"
                          className="flex-1 p-2 border rounded"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTerm())}
                        />
                        <button
                          type="button"
                          onClick={addTerm}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded"
                        >
                          Add
                        </button>
                      </div>
                      {submissionTerms.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {submissionTerms.map((term) => (
                            <span
                              key={term}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm flex items-center gap-1"
                            >
                              {term}
                              <button
                                type="button"
                                onClick={() => removeTerm(term)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting || !submissionBody.trim()}
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                    >
                      {submitting ? 'Submitting...' : 'Submit Entry'}
                    </button>
                  </form>
                </div>
              )}

              {/* Entries List */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Entries ({entries.length})
                </h3>
                
                {entriesLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border rounded-lg p-4 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : entries.length > 0 ? (
                  <div className="space-y-4">
                    {entries
                      .sort((a, b) => b.hot_score - a.hot_score)
                      .map((entry) => (
                        <ChallengeEntryCard key={entry.id} entry={entry} />
                      ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="text-gray-400 mb-2">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-gray-600">No entries yet. Be the first!</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-gray-600">Select a challenge to view details and entries</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Challenge Entry Card Component
function ChallengeEntryCard({ entry }: { entry: ChallengeEntry }) {
  const [voted, setVoted] = useState(false);

  const handleVote = async () => {
    if (voted) return;

    try {
      const response = await fetch(`${getApiUrl()}/api/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          entity_type: 'challenge_entry',
          entity_id: entry.id,
          direction: 1
        })
      });

      if (response.ok) {
        setVoted(true);
        trackEvent('challenge_entry_voted', {
          entry_id: entry.id,
          challenge_id: entry.challenge_id
        });
      }
    } catch (error) {
      console.error('Vote failed:', error);
    }
  };

  const getApiUrl = () => {
    return import.meta.env.VITE_API_URL || 'https://api.learnings.org';
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          {entry.title && (
            <h4 className="font-medium mb-2">{entry.title}</h4>
          )}
          <p className="text-gray-700 text-sm leading-relaxed">{entry.body}</p>
          
          {entry.source_url && (
            <a
              href={entry.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs text-blue-600 hover:text-blue-800"
            >
              View Source →
            </a>
          )}
        </div>
        
        <div className="ml-4 flex flex-col items-center">
          <button
            onClick={handleVote}
            disabled={voted}
            className={`p-2 rounded-full transition-colors ${
              voted 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="text-xs text-gray-600 mt-1">{entry.votes}</span>
        </div>
      </div>
      
      {entry.related_terms && entry.related_terms.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {entry.related_terms.map((term) => (
            <span
              key={term}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
            >
              {term}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}