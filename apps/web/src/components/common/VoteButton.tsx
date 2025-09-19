import React, { useState, useEffect } from 'react';
import { vote as apiVote } from '../../lib/api';

type VoteButtonProps = {
  id: string;
  initialCount: number;
  entity: 'wall' | 'entry';
  onVoted?: (newCount: number) => void;
  className?: string;
};

export function VoteButton({ id, initialCount, entity, onVoted, className = '' }: VoteButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if user has already voted (from localStorage)
  useEffect(() => {
    const voteKey = `v:${entity}:${id}`;
    setHasVoted(localStorage.getItem(voteKey) === 'true');
  }, [id, entity]);

  const handleVote = async () => {
    if (hasVoted || loading) return;

    setLoading(true);
    try {
      const result = await apiVote(entity, id);
      
      if (result.ok) {
        const newCount = result.votes;
        setCount(newCount);
        setHasVoted(true);
        
        // Store vote in localStorage
        const voteKey = `v:${entity}:${id}`;
        localStorage.setItem(voteKey, 'true');
        
        onVoted?.(newCount);
      }
    } catch (error) {
      console.error('Vote failed:', error);
      // Could show a toast notification here
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={hasVoted || loading}
      className={`
        inline-flex items-center gap-2 border rounded-full px-3 py-1 text-sm transition-colors
        ${hasVoted 
          ? 'bg-brand-50 border-brand-200 text-brand-700' 
          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
        }
        ${loading ? 'opacity-50' : ''}
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      <span className="text-xs">
        {hasVoted ? '✓' : '↑'}
      </span>
      <span className="font-medium">
        {loading ? '...' : count}
      </span>
      <span className="hidden sm:inline">
        {hasVoted ? 'Voted' : 'Vote'}
      </span>
    </button>
  );
}
