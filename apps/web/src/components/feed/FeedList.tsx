import React, { useState, useEffect, useCallback } from 'react';
import { homeFeed, trackEvent } from '../../lib/api';
import { getShortDescription } from '../../utils/textUtils';

type FeedItem = {
  type: 'term' | 'wall' | 'challenge' | 'generator';
  ts: string;
  data: any;
};

type FeedListProps = {
  onItemClick?: (item: FeedItem) => void;
  className?: string;
};

export function FeedList({ onItemClick, className = '' }: FeedListProps) {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [seenItems, setSeenItems] = useState<Set<string>>(new Set());

  const getKey = useCallback((item: FeedItem) => `${item.type}:${item.data.id}`, []);

  const loadItems = useCallback(async (reset = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await homeFeed(reset ? undefined : nextCursor || undefined);
      
      if (reset) {
        setItems(data.items || []);
        setSeenItems(new Set());
      } else {
        // Dedupe items based on key
        const existingKeys = new Set(items.map(getKey));
        const newItems = (data.items || []).filter(item => !existingKeys.has(getKey(item)));
        
        setItems(prev => [...prev, ...newItems]);
      }
      
      setNextCursor(data.nextCursor || null);
    } catch (error) {
      console.error('Failed to load feed:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, nextCursor, items, getKey]);

  const onSeen = useCallback(async (item: FeedItem) => {
    const key = getKey(item);
    if (seenItems.has(key)) return;
    
    setSeenItems(prev => new Set([...prev, key]));
    
    // Track view event
    try {
      await trackEvent('home_card_click', { 
        type: item.type, 
        id: item.data.id 
      });
    } catch (error) {
      console.warn('Failed to track view:', error);
    }
  }, [seenItems, getKey]);

  // Load initial items
  useEffect(() => {
    loadItems(true);
  }, []);

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (!nextCursor) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadItems(false);
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById('feed-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [nextCursor, loading, loadItems]);

  const handleItemClick = (item: FeedItem) => {
    onSeen(item);
    onItemClick?.(item);
  };

  if (loading && items.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 animate-pulse">
            <div className="h-5 w-1/2 bg-slate-200/70 rounded mb-3"></div>
            <div className="h-4 w-3/4 bg-slate-200/70 rounded mb-4"></div>
            <div className="h-4 w-full bg-slate-200/70 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-slate-200/70 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {items.map((item) => (
        <FeedCard 
          key={getKey(item)} 
          item={item} 
          onClick={() => handleItemClick(item)}
        />
      ))}
      
      {/* Loading indicator */}
      {loading && items.length > 0 && (
        <div className="text-center py-8">
          <div className="text-slate-600">Loading more buzzwords...</div>
        </div>
      )}
      
      {/* Infinite scroll sentinel */}
      {nextCursor && (
        <div id="feed-sentinel" className="h-1"></div>
      )}
      
      {/* Load more button fallback */}
      {!loading && nextCursor && (
        <div className="text-center py-8">
          <button
            onClick={() => loadItems(false)}
            className="inline-flex items-center gap-2 rounded-xl2 border border-slate-200 bg-white text-slate-700 px-6 py-3 hover:bg-slate-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
          >
            Load More
          </button>
        </div>
      )}
      
      {/* Empty state */}
      {!loading && items.length === 0 && (
        <div className="text-center py-16">
          <div className="text-2xl text-slate-600 mb-3">No buzz found. Try 'synergy soup'.</div>
          <div className="text-slate-500 mb-8">
            Be the first to contribute to the feed!
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/submit'}
              className="inline-flex items-center gap-2 rounded-xl2 bg-brand text-white px-6 py-3 shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
            >
              💡 Submit Content
            </button>
            <button
              onClick={() => window.location.href = '/terms'}
              className="inline-flex items-center gap-2 rounded-xl2 border border-slate-200 bg-white text-slate-700 px-6 py-3 hover:bg-slate-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
            >
              📚 Browse Terms
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

type FeedCardProps = {
  item: FeedItem;
  onClick: () => void;
};

function FeedCard({ item, onClick }: FeedCardProps) {
  switch (item.type) {
    case 'term':
      return <TermFeedCard item={item} onClick={onClick} />;
    case 'wall':
      return <WallFeedCard item={item} onClick={onClick} />;
    case 'challenge':
      return <ChallengeFeedCard item={item} onClick={onClick} />;
    case 'generator':
      return <GeneratorFeedCard item={item} onClick={onClick} />;
    default:
      return null;
  }
}

function TermFeedCard({ item, onClick }: FeedCardProps) {
  const term = item.data;
  
  return (
    <article 
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
          <span className="text-xl">📚</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center rounded-full bg-brand-100 text-brand-700 px-2.5 py-1 text-xs font-medium">New Term</span>
            <span className="text-xs text-slate-500">{new Date(item.ts).toLocaleDateString()}</span>
          </div>
          <h3 className="text-xl font-semibold tracking-tight group-hover:text-brand transition-colors mb-3">
            {term.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {term.summary || getShortDescription(term.definition, 8) || 'No description available'}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>👀 {term.views || 0} views</span>
            <span>📅 {new Date(item.ts).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function WallFeedCard({ item, onClick }: FeedCardProps) {
  const post = item.data;
  const domain = post.source_url ? new URL(post.source_url).hostname.replace('www.', '') : '';
  
  return (
    <article 
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
          <span className="text-xl">📸</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center rounded-full bg-purple-100 text-purple-700 px-2.5 py-1 text-xs font-medium">Wall Post</span>
            {domain && (
              <span className="text-xs text-brand-600">🌐 {domain}</span>
            )}
            <span className="text-xs text-slate-500">{new Date(item.ts).toLocaleDateString()}</span>
          </div>
          <h3 className="text-xl font-semibold tracking-tight group-hover:text-brand transition-colors mb-3">
            {post.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {post.og_desc || post.summary || 'View this wall post...'}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>👍 {post.vote_count || post.votes || 0}</span>
            <span>📅 {new Date(item.ts).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function ChallengeFeedCard({ item, onClick }: FeedCardProps) {
  const challenge = item.data;
  
  return (
    <article 
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
          <span className="text-xl">🏆</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-2.5 py-1 text-xs font-medium">Challenge</span>
            <span className="text-xs text-slate-500">{new Date(item.ts).toLocaleDateString()}</span>
          </div>
          <h3 className="text-xl font-semibold tracking-tight group-hover:text-brand transition-colors mb-3">
            {challenge.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Join this week's challenge and compete with the community!
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>⏰ Ends {new Date(challenge.ends_at).toLocaleDateString()}</span>
            <span>📅 {new Date(item.ts).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function GeneratorFeedCard({ item, onClick }: FeedCardProps) {
  const run = item.data;
  
  return (
    <article 
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
          <span className="text-xl">🤖</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-2.5 py-1 text-xs font-medium">Generator Output</span>
            <span className="text-xs text-slate-500">{new Date(item.ts).toLocaleDateString()}</span>
          </div>
          <h3 className="text-xl font-semibold tracking-tight group-hover:text-brand transition-colors mb-3">
            {run.generator_name || 'AI Generated Content'}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {run.output_text ? run.output_text.substring(0, 150) + '...' : 'View generated content...'}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>📅 {new Date(item.ts).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
