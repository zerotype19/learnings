import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WallCard } from '../components/wall/WallCard';
import { WallFilters } from '../components/wall/WallFilters';
import { listWall, trackEvent, type WallPost } from '../lib/api';

export function WallHub() {
  const [posts, setPosts] = useState<WallPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Filter state
  const [currentTag, setCurrentTag] = useState<string | undefined>();
  const [currentSort, setCurrentSort] = useState<'trending' | 'new'>('trending');
  const [currentRange, setCurrentRange] = useState<'24h' | '7d' | '30d' | 'all'>('7d');

  // Refs for infinite scroll
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Load posts
  const loadPosts = useCallback(async (reset = false) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);

    try {
      const params = {
        tag: currentTag,
        sort: currentSort,
        range: currentRange,
        cursor: reset ? undefined : nextCursor || undefined,
        limit: 20
      };

      const response = await listWall(params);
      
      if (reset) {
        setPosts(response.items);
      } else {
        setPosts(prev => [...prev, ...response.items]);
      }
      
      setNextCursor(response.nextCursor || null);
      setHasMore(!!response.nextCursor);

      // Track view event
      await trackEvent('wall_view', {
        tag: currentTag,
        sort: currentSort,
        range: currentRange,
        count: response.items.length
      });

    } catch (err) {
      console.error('Failed to load wall posts:', err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, [currentTag, currentSort, currentRange, nextCursor, loading]);

  // Load posts when filters change
  useEffect(() => {
    setPosts([]);
    setNextCursor(null);
    setHasMore(true);
    loadPosts(true);
  }, [currentTag, currentSort, currentRange]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadPosts(false);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, loadPosts]);

  // Handle filter changes
  const handleTagChange = async (tag?: string) => {
    setCurrentTag(tag);
    await trackEvent('wall_filter_change', { filter: 'tag', value: tag });
  };

  const handleSortChange = async (sort: 'trending' | 'new') => {
    setCurrentSort(sort);
    await trackEvent('wall_filter_change', { filter: 'sort', value: sort });
  };

  const handleRangeChange = async (range: '24h' | '7d' | '30d' | 'all') => {
    setCurrentRange(range);
    await trackEvent('wall_filter_change', { filter: 'range', value: range });
  };

  const handleVoted = (postId: string, newCount: number) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, votes: newCount, vote_count: newCount }
          : post
      )
    );
  };

  // Extract available tags from loaded posts
  const availableTags = Array.from(
    new Set(
      posts.flatMap(post => getTags(post))
    )
  ).slice(0, 10); // Show top 10 tags

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-2">📸 Buzzword Wall</h1>
          <p className="text-neutral-600">
            Corporate jargon spotted in the wild. Vote for the most cringe-worthy discoveries.
          </p>
        </div>
      </div>

      {/* Filters */}
      <WallFilters
        currentTag={currentTag}
        onTagChange={handleTagChange}
        currentSort={currentSort}
        onSortChange={handleSortChange}
        currentRange={currentRange}
        onRangeChange={handleRangeChange}
        availableTags={availableTags}
      />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Filter Summary */}
        <div className="mb-4 text-sm text-neutral-600">
          {currentTag && `Tagged "${currentTag}" • `}
          {currentSort === 'trending' ? 'Trending' : 'Latest'} • 
          {currentRange === '24h' ? 'Last 24 hours' : 
           currentRange === '7d' ? 'Last 7 days' : 
           currentRange === '30d' ? 'Last 30 days' : 'All time'} • 
          {posts.length} post{posts.length !== 1 ? 's' : ''}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <div className="text-red-600 mb-2">{error}</div>
            <button
              onClick={() => loadPosts(true)}
              className="text-brand-600 hover:text-brand-700"
            >
              Try again
            </button>
          </div>
        )}

        {/* Posts Grid */}
        {!error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map(post => (
              <WallCard
                key={post.id}
                post={post}
                onVoted={(newCount) => handleVoted(post.id, newCount)}
              />
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white border border-neutral-200 rounded-2xl p-4 animate-pulse">
                <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                <div className="h-3 bg-neutral-200 rounded mb-4 w-3/4"></div>
                <div className="h-32 bg-neutral-200 rounded mb-3"></div>
                <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-xl text-neutral-600 mb-2">No posts found</div>
            <div className="text-sm text-neutral-500 mb-4">
              Be the first to submit a corporate-speak specimen.
            </div>
            <button
              onClick={() => window.location.hash = '/submit'}
              className="px-6 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors"
            >
              Submit Wall Post
            </button>
          </div>
        )}

        {/* Load More Sentinel */}
        <div ref={sentinelRef} className="h-10 flex items-center justify-center">
          {hasMore && !loading && posts.length > 0 && (
            <button
              onClick={() => loadPosts(false)}
              className="px-4 py-2 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
            >
              Load More Posts
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
