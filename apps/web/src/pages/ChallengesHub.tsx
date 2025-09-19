import React, { useState, useEffect } from 'react';
import { VoteButton } from '../components/common/VoteButton';

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
  title: string;
  body?: string;
  source_url?: string;
  votes: number;
  created_at: string;
};

export function ChallengesHub() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [allChallenges, setAllChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [entries, setEntries] = useState<ChallengeEntry[]>([]);
  const [entriesSort, setEntriesSort] = useState<'new' | 'hot'>('new');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedChallenge) {
      loadEntries(selectedChallenge.slug, entriesSort);
    }
  }, [selectedChallenge, entriesSort]);

  const loadData = async () => {
    try {
      // Load active challenge
      const activeResponse = await fetch(`${apiUrl}/api/challenges/active`, {
        credentials: 'include'
      });
      if (activeResponse.ok) {
        const activeData = await activeResponse.json();
        setActiveChallenge(activeData.challenge);
      }

      // Load all challenges
      const allResponse = await fetch(`${apiUrl}/api/challenges`, {
        credentials: 'include'
      });
      if (allResponse.ok) {
        const allData = await allResponse.json();
        setAllChallenges(allData.items || []);
      }
    } catch (error) {
      console.error('Failed to load challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEntries = async (slug: string, sort: 'new' | 'hot') => {
    try {
      const response = await fetch(`${apiUrl}/api/challenges/${slug}?sort=${sort}`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setEntries(data.entries || []);
      }
    } catch (error) {
      console.error('Failed to load entries:', error);
    }
  };

  const submitEntry = async (challengeId: string, formData: any) => {
    if (submitting) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/api/challenges/${challengeId}/submit`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Entry submitted successfully!');
        if (selectedChallenge) {
          loadEntries(selectedChallenge.slug, entriesSort);
        }
        return result;
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert(`Submission failed: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimeLeft = (endsAt: string) => {
    const end = new Date(endsAt).getTime();
    const now = Date.now();
    const diff = end - now;

    if (diff <= 0) return 'Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-neutral-600">Loading challenges...</div>
      </div>
    );
  }

  // Challenge detail view
  if (selectedChallenge) {
    return (
      <ChallengeDetailView
        challenge={selectedChallenge}
        entries={entries}
        sort={entriesSort}
        onSortChange={setEntriesSort}
        onSubmit={(data) => submitEntry(selectedChallenge.id, data)}
        onBack={() => setSelectedChallenge(null)}
        submitting={submitting}
      />
    );
  }

  // Main hub view
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">🏆 Weekly Challenges</h1>
          <p className="text-neutral-600">
            Community competitions to find the most cringe-worthy corporate jargon in the wild.
          </p>
        </div>

        {/* Active Challenge */}
        {activeChallenge && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Current Challenge</h2>
            <div className="bg-white border-2 border-brand-200 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{activeChallenge.title}</h3>
                  <p className="text-neutral-600 mb-4">{activeChallenge.brief}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-brand-600 font-medium">
                    {formatTimeLeft(activeChallenge.ends_at)}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {activeChallenge.entry_count || 0} entries
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedChallenge(activeChallenge)}
                  className="px-4 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors"
                >
                  View Entries
                </button>
                <button
                  onClick={() => setSelectedChallenge(activeChallenge)}
                  className="px-4 py-2 border border-brand-200 text-brand-700 rounded-xl hover:bg-brand-50 transition-colors"
                >
                  Submit Entry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* All Challenges */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">All Challenges</h2>
          {allChallenges.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">
              No challenges available
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allChallenges.map(challenge => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onClick={() => setSelectedChallenge(challenge)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type ChallengeCardProps = {
  challenge: Challenge;
  onClick: () => void;
};

function ChallengeCard({ challenge, onClick }: ChallengeCardProps) {
  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      scheduled: 'bg-yellow-100 text-yellow-800',
      closed: 'bg-neutral-100 text-neutral-600'
    };
    return badges[status] || badges.closed;
  };

  return (
    <div 
      className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">{challenge.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(challenge.status)}`}>
          {challenge.status}
        </span>
      </div>
      <p className="text-sm text-neutral-600 mb-4 line-clamp-3">{challenge.brief}</p>
      <div className="text-xs text-neutral-500">
        {challenge.entry_count || 0} entries
      </div>
    </div>
  );
}

type ChallengeDetailViewProps = {
  challenge: Challenge;
  entries: ChallengeEntry[];
  sort: 'new' | 'hot';
  onSortChange: (sort: 'new' | 'hot') => void;
  onSubmit: (data: any) => Promise<any>;
  onBack: () => void;
  submitting: boolean;
};

function ChallengeDetailView({ 
  challenge, 
  entries, 
  sort, 
  onSortChange, 
  onSubmit, 
  onBack,
  submitting 
}: ChallengeDetailViewProps) {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    source_url: ''
  });

  const formatTimeLeft = (endsAt: string) => {
    const end = new Date(endsAt).getTime();
    const now = Date.now();
    const diff = end - now;

    if (diff <= 0) return 'Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({ title: '', body: '', source_url: '' });
      setShowSubmitForm(false);
    } catch (error) {
      // Error handling is done in parent
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="text-brand-600 hover:text-brand-700 mb-4"
          >
            ← Back to Challenges
          </button>
          
          <div className="bg-white border rounded-2xl p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{challenge.title}</h1>
                <p className="text-neutral-600">{challenge.brief}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-brand-600 font-medium">
                  {formatTimeLeft(challenge.ends_at)}
                </div>
                <div className="text-xs text-neutral-500">
                  {entries.length} entries
                </div>
              </div>
            </div>
            
            {challenge.status === 'active' && (
              <button
                onClick={() => setShowSubmitForm(!showSubmitForm)}
                className="px-4 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors"
              >
                {showSubmitForm ? 'Cancel' : 'Submit Entry'}
              </button>
            )}
          </div>
        </div>

        {/* Submit Form */}
        {showSubmitForm && (
          <div className="bg-white border rounded-2xl p-6 mb-6">
            <h3 className="font-semibold mb-4">Submit Your Entry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What buzzword horror did you find?"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Context</label>
                <textarea
                  value={formData.body}
                  onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
                  placeholder="Where did you find this? What makes it particularly cringe?"
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Source URL</label>
                <input
                  type="url"
                  value={formData.source_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, source_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:opacity-50 transition-colors"
              >
                {submitting ? 'Submitting...' : 'Submit Entry'}
              </button>
            </form>
          </div>
        )}

        {/* Entries */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Entries</h2>
            <div className="flex gap-2">
              <button
                onClick={() => onSortChange('new')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  sort === 'new' 
                    ? 'bg-brand-100 text-brand-700' 
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                New
              </button>
              <button
                onClick={() => onSortChange('hot')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  sort === 'hot' 
                    ? 'bg-brand-100 text-brand-700' 
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                Hot
              </button>
            </div>
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">
              No entries yet. Be the first to submit!
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map(entry => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type EntryCardProps = {
  entry: ChallengeEntry;
};

function EntryCard({ entry }: EntryCardProps) {
  const getDomainFromUrl = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'Link';
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">{entry.title}</h3>
        <VoteButton
          entityType="entry"
          entityId={entry.id}
          initialVotes={entry.votes}
        />
      </div>
      
      {entry.body && (
        <p className="text-neutral-600 mb-3">{entry.body}</p>
      )}
      
      <div className="flex justify-between items-center text-sm text-neutral-500">
        <div className="flex gap-4">
          {entry.source_url && (
            <a 
              href={entry.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-700"
            >
              {getDomainFromUrl(entry.source_url)}
            </a>
          )}
          <span>{new Date(entry.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
