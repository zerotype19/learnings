import React, { useState, useEffect } from 'react';

type LeaderboardEntry = {
  fingerprint: string;
  total_votes: number;
  entries_count: number;
  avg_hot_score: number;
  best_entry?: {
    id: string;
    title?: string;
    body: string;
    votes: number;
    hot_score: number;
  };
};

type ChallengeLeaderboardProps = {
  challengeId: string;
  limit?: number;
};

export function ChallengeLeaderboard({ challengeId, limit = 10 }: ChallengeLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiUrl()}/api/challenges/${challengeId}/leaderboard?limit=${limit}`, {
          credentials: 'include'
        });
        const data = await response.json();
        setLeaderboard(data.items || []);
      } catch (error) {
        console.error('Failed to load leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, [challengeId, limit]);

  const getApiUrl = () => {
    return import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  const formatScore = (score: number) => {
    return score.toFixed(1);
  };

  if (loading) {
    return (
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
        <div className="space-y-3">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
        <div className="text-center py-8 text-gray-500">
          <div className="mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>No entries yet. Be the first to submit!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
      <div className="space-y-3">
        {leaderboard.map((entry, index) => (
          <div key={entry.fingerprint} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-sm font-medium">
              {getRankIcon(index)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">
                {entry.best_entry?.title || 'Anonymous'}
              </div>
              <div className="text-xs text-gray-600 truncate">
                {entry.entries_count} entr{entry.entries_count === 1 ? 'y' : 'ies'} • 
                Avg score: {formatScore(entry.avg_hot_score)}
              </div>
              {entry.best_entry && (
                <div className="text-xs text-gray-500 mt-1 truncate">
                  "{entry.best_entry.body.substring(0, 60)}..."
                </div>
              )}
            </div>
            
            <div className="flex-shrink-0 text-right">
              <div className="font-semibold text-sm">{entry.total_votes}</div>
              <div className="text-xs text-gray-600">votes</div>
            </div>
          </div>
        ))}
      </div>
      
      {leaderboard.length === limit && (
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View full leaderboard →
          </button>
        </div>
      )}
    </div>
  );
}
