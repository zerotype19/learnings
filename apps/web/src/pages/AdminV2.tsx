import React, { useState, useEffect } from 'react';

type TermSubmission = {
  id: string;
  title: string;
  short_def?: string;
  definition: string;
  examples?: string;
  tags: string[];
  links: Array<{url: string; label: string}>;
  submitted_by?: string;
  status: string;
  reviewer?: string;
  reviewer_notes?: string;
  created_at: string;
};

type WallSubmission = {
  id: string;
  title: string;
  body?: string;
  source_url: string;
  tags: string[];
  suggested_terms: string[];
  submitted_by?: string;
  status: string;
  reviewer?: string;
  reviewer_notes?: string;
  created_at: string;
};

type AdminStats = {
  pending_term_submissions: number;
  pending_wall_submissions: number;
  total_terms: number;
  total_wall_posts: number;
};

type AdminTab = 'terms' | 'wall' | 'stats';

export function AdminV2() {
  const [activeTab, setActiveTab] = useState<AdminTab>('terms');
  const [termSubmissions, setTermSubmissions] = useState<TermSubmission[]>([]);
  const [wallSubmissions, setWallSubmissions] = useState<WallSubmission[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';

  const loadTermSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/admin/terms/submissions?status=queued`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setTermSubmissions(data.items || []);
      }
    } catch (error) {
      console.error('Failed to load term submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadWallSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/admin/wall/submissions?status=queued`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setWallSubmissions(data.items || []);
      }
    } catch (error) {
      console.error('Failed to load wall submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/stats`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  useEffect(() => {
    loadStats();
    if (activeTab === 'terms') {
      loadTermSubmissions();
    } else if (activeTab === 'wall') {
      loadWallSubmissions();
    }
  }, [activeTab]);

  const approveTermSubmission = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/terms/${id}/approve`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        alert('Term submission approved!');
        loadTermSubmissions();
        loadStats();
      } else {
        throw new Error('Approval failed');
      }
    } catch (error) {
      console.error('Approval failed:', error);
      alert('Failed to approve submission');
    }
  };

  const rejectTermSubmission = async (id: string) => {
    const reason = prompt('Reason for rejection:');
    if (!reason) return;

    try {
      const response = await fetch(`${apiUrl}/api/admin/terms/${id}/reject`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      });
      
      if (response.ok) {
        alert('Term submission rejected');
        loadTermSubmissions();
        loadStats();
      } else {
        throw new Error('Rejection failed');
      }
    } catch (error) {
      console.error('Rejection failed:', error);
      alert('Failed to reject submission');
    }
  };

  const approveWallSubmission = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/wall/${id}/approve`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        alert('Wall submission approved!');
        loadWallSubmissions();
        loadStats();
      } else {
        throw new Error('Approval failed');
      }
    } catch (error) {
      console.error('Approval failed:', error);
      alert('Failed to approve submission');
    }
  };

  const rejectWallSubmission = async (id: string) => {
    const reason = prompt('Reason for rejection:');
    if (!reason) return;

    try {
      const response = await fetch(`${apiUrl}/api/admin/wall/${id}/reject`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      });
      
      if (response.ok) {
        alert('Wall submission rejected');
        loadWallSubmissions();
        loadStats();
      } else {
        throw new Error('Rejection failed');
      }
    } catch (error) {
      console.error('Rejection failed:', error);
      alert('Failed to reject submission');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">🛡️ Admin Console</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'terms' 
                ? 'bg-brand-600 text-white' 
                : 'border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            📚 Term Submissions ({termSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('wall')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'wall' 
                ? 'bg-brand-600 text-white' 
                : 'border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            📸 Wall Submissions ({wallSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'stats' 
                ? 'bg-brand-600 text-white' 
                : 'border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            📊 Stats
          </button>
        </div>

        {/* Content */}
        {activeTab === 'terms' && (
          <div className="bg-white rounded-2xl border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Term Submissions Queue</h2>
              <p className="text-sm text-neutral-600 mt-1">
                Review and approve new corporate buzzword definitions
              </p>
            </div>

            {loading ? (
              <div className="p-8 text-center text-neutral-600">Loading submissions...</div>
            ) : termSubmissions.length === 0 ? (
              <div className="p-8 text-center text-neutral-600">
                No pending term submissions
              </div>
            ) : (
              <div className="divide-y">
                {termSubmissions.map(submission => (
                  <TermSubmissionCard
                    key={submission.id}
                    submission={submission}
                    onApprove={() => approveTermSubmission(submission.id)}
                    onReject={() => rejectTermSubmission(submission.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'wall' && (
          <div className="bg-white rounded-2xl border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Wall Submissions Queue</h2>
              <p className="text-sm text-neutral-600 mt-1">
                Review and approve wall post submissions
              </p>
            </div>

            {loading ? (
              <div className="p-8 text-center text-neutral-600">Loading submissions...</div>
            ) : wallSubmissions.length === 0 ? (
              <div className="p-8 text-center text-neutral-600">
                No pending wall submissions
              </div>
            ) : (
              <div className="divide-y">
                {wallSubmissions.map(submission => (
                  <WallSubmissionCard
                    key={submission.id}
                    submission={submission}
                    onApprove={() => approveWallSubmission(submission.id)}
                    onReject={() => rejectWallSubmission(submission.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border p-6">
              <div className="text-sm font-medium text-neutral-600 mb-1">Pending Terms</div>
              <div className="text-2xl font-bold">{stats.pending_term_submissions}</div>
            </div>
            <div className="bg-white rounded-2xl border p-6">
              <div className="text-sm font-medium text-neutral-600 mb-1">Pending Wall</div>
              <div className="text-2xl font-bold">{stats.pending_wall_submissions}</div>
            </div>
            <div className="bg-white rounded-2xl border p-6">
              <div className="text-sm font-medium text-neutral-600 mb-1">Total Terms</div>
              <div className="text-2xl font-bold">{stats.total_terms}</div>
            </div>
            <div className="bg-white rounded-2xl border p-6">
              <div className="text-sm font-medium text-neutral-600 mb-1">Total Wall Posts</div>
              <div className="text-2xl font-bold">{stats.total_wall_posts}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TermSubmissionCard({ 
  submission, 
  onApprove, 
  onReject 
}: { 
  submission: TermSubmission; 
  onApprove: () => void; 
  onReject: () => void; 
}) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{submission.title}</h3>
          {submission.short_def && (
            <p className="text-sm text-neutral-600 mb-2 italic">"{submission.short_def}"</p>
          )}
          <p className="text-neutral-700 mb-3">{submission.definition}</p>
          
          {submission.examples && (
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Examples:</h4>
              <p className="text-sm text-neutral-600 whitespace-pre-wrap">{submission.examples}</p>
            </div>
          )}

          {submission.tags.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {submission.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {submission.links.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Source Links:</h4>
              <div className="space-y-1">
                {submission.links.map((link, index) => (
                  <div key={index} className="text-sm">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700">
                      {link.label}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-xs text-neutral-500">
            Submitted by {submission.submitted_by || 'anonymous'} • {new Date(submission.created_at).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onApprove}
          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
        >
          ✅ Approve
        </button>
        <button
          onClick={onReject}
          className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
        >
          ❌ Reject
        </button>
      </div>
    </div>
  );
}

function WallSubmissionCard({ 
  submission, 
  onApprove, 
  onReject 
}: { 
  submission: WallSubmission; 
  onApprove: () => void; 
  onReject: () => void; 
}) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{submission.title}</h3>
          
          <div className="mb-3">
            <a 
              href={submission.source_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-700 text-sm"
            >
              🔗 {submission.source_url}
            </a>
          </div>

          {submission.body && (
            <p className="text-neutral-700 mb-3">{submission.body}</p>
          )}

          {submission.tags.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {submission.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {submission.suggested_terms.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Suggested Terms:</h4>
              <div className="flex flex-wrap gap-1">
                {submission.suggested_terms.map(term => (
                  <span key={term} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="text-xs text-neutral-500">
            Submitted by {submission.submitted_by || 'anonymous'} • {new Date(submission.created_at).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onApprove}
          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
        >
          ✅ Approve
        </button>
        <button
          onClick={onReject}
          className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
        >
          ❌ Reject
        </button>
      </div>
    </div>
  );
}
