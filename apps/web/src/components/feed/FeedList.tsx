import React, { useState, useEffect, useCallback } from 'react';
import { homeFeed, trackEvent } from '../../lib/api';

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
          <div key={i} className="bg-white border border-neutral-200 rounded-2xl p-6 animate-pulse">
            <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-neutral-200 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-neutral-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-neutral-200 rounded w-2/3"></div>
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
        <div className="text-center py-4">
          <div className="text-neutral-600">Loading more...</div>
        </div>
      )}
      
      {/* Infinite scroll sentinel */}
      {nextCursor && (
        <div id="feed-sentinel" className="h-1"></div>
      )}
      
      {/* Load more button fallback */}
      {!loading && nextCursor && (
        <div className="text-center py-4">
          <button
            onClick={() => loadItems(false)}
            className="px-6 py-2 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
      
      {/* Empty state */}
      {!loading && items.length === 0 && (
        <div className="text-center py-12">
          <div className="text-xl text-neutral-600 mb-2">No content yet</div>
          <div className="text-sm text-neutral-500 mb-4">
            Be the first to contribute to the feed!
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/submit'}
              className="px-4 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors"
            >
              Submit Content
            </button>
            <button
              onClick={() => window.location.href = '/terms'}
              className="px-4 py-2 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
            >
              Browse Terms
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
    <div 
      onClick={onClick}
      className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
          📚
        </div>
        <div className="flex-1">
          <div className="text-xs text-neutral-500 mb-1">New Term</div>
          <h3 className="font-semibold text-lg mb-2">{term.title}</h3>
          <p className="text-neutral-600 text-sm mb-3">
            {term.summary || term.short_def || (term.definition ? term.definition.substring(0, 150) + '...' : 'No description available')}
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span>{term.views || 0} views</span>
            <span>{new Date(item.ts).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WallFeedCard({ item, onClick }: FeedCardProps) {
  const post = item.data;
  const domain = post.source_url ? new URL(post.source_url).hostname.replace('www.', '') : '';
  
  return (
    <div 
      onClick={onClick}
      className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
          📸
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="text-xs text-neutral-500">Wall Post</div>
            {domain && (
              <div className="text-xs text-brand-600">🌐 {domain}</div>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
          <p className="text-neutral-600 text-sm mb-3">
            {post.og_desc || post.summary || 'View this wall post...'}
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span>👍 {post.vote_count || post.votes || 0}</span>
            <span>{new Date(item.ts).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChallengeFeedCard({ item, onClick }: FeedCardProps) {
  const challenge = item.data;
  
  return (
    <div 
      onClick={onClick}
      className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
          🏆
        </div>
        <div className="flex-1">
          <div className="text-xs text-neutral-500 mb-1">Challenge</div>
          <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
          <p className="text-neutral-600 text-sm mb-3">
            Join this week's challenge and compete with the community!
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span>Ends {new Date(challenge.ends_at).toLocaleDateString()}</span>
            <span>{new Date(item.ts).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneratorFeedCard({ item, onClick }: FeedCardProps) {
  const run = item.data;
  
  return (
    <div 
      onClick={onClick}
      className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          🤖
        </div>
        <div className="flex-1">
          <div className="text-xs text-neutral-500 mb-1">Generator Output</div>
          <h3 className="font-semibold text-lg mb-2">{run.generator_name || 'AI Generated Content'}</h3>
          <p className="text-neutral-600 text-sm mb-3">
            {run.output_text ? run.output_text.substring(0, 150) + '...' : 'View generated content...'}
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span>{new Date(item.ts).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
