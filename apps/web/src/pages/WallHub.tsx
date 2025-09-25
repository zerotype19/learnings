import React, { useState, useEffect } from 'react';
import { listWall, vote, getPopularTags, getVoteCount } from '../lib/api';
import { SEO, SEOConfigs } from '../components/SEO';

type WallPost = {
  id: string;
  slug: string;
  title: string;
  body?: string;
  source_url: string;
  og_title?: string;
  og_desc?: string;
  og_image?: string;
  og_site?: string;
  tags?: string[];
  related_terms?: string[];
  vote_count: number;
  comment_count: number;
  hot_score: number;
  created_at: string;
  updated_at: string;
  last_activity_at: string;
};

type FilterState = {
  tag?: string;
  sort: 'trending' | 'new';
  range: '24h' | '7d' | '30d' | 'all';
};

export function WallHub() {
  const [posts, setPosts] = useState<WallPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    sort: 'new',
    range: 'all'
  });
  const [popularTags, setPopularTags] = useState<Array<{tag: string; count: number}>>([]);

  const loadPosts = async (reset = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const params = {
        tag: filters.tag,
        sort: filters.sort,
        range: filters.range,
        cursor: reset ? undefined : nextCursor,
        limit: 20
      };

      const data = await listWall(params);
      
      if (reset) {
        setPosts(data.items || []);
      } else {
        setPosts(prev => [...prev, ...(data.items || [])]);
      }
      
      setNextCursor(data.nextCursor || null);
    } catch (error) {
      console.error('Failed to load wall posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPopularTags = async () => {
    try {
      const data = await getPopularTags({ limit: 20 });
      setPopularTags(data.tags || []);
    } catch (error) {
      console.error('Failed to load popular tags:', error);
    }
  };

  // Load posts when filters change
  useEffect(() => {
    setPosts([]);
    setNextCursor(null);
    loadPosts(true);
  }, [filters]);

  // Load popular tags on mount
  useEffect(() => {
    loadPopularTags();
  }, []);

  const handleVote = async (postId: string) => {
    try {
      const result = await vote('wall', postId);
      if (result.ok) {
        // Update local state
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, vote_count: result.votes }
            : post
        ));
      }
    } catch (error) {
      console.error('Vote failed:', error);
      alert('Failed to vote. Please try again.');
    }
  };

  const handleTagClick = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tag: prev.tag === tag ? undefined : tag
    }));
  };

  const getDomainFromUrl = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <>
      <SEO {...SEOConfigs.wall} />
      <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              📸 Buzzword Wall
            </h1>
            <div className="mt-2 h-1 w-24 bg-gradient-to-r from-accent-pink via-brand to-accent-sky rounded-full mx-auto"></div>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Corporate-speak specimens from the wild. Vote for the most cringe-worthy examples.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center mb-4">
            <div className="flex gap-2">
              <label className="text-sm font-medium">Sort:</label>
              <select
                value={filters.sort}
                onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value as 'trending' | 'new' }))}
                className="text-sm border border-neutral-200 rounded px-2 py-1"
              >
                <option value="new">New</option>
                <option value="trending">Trending</option>
              </select>
            </div>

            <div className="flex gap-2">
              <label className="text-sm font-medium">Time:</label>
              <select
                value={filters.range}
                onChange={(e) => setFilters(prev => ({ ...prev, range: e.target.value as any }))}
                className="text-sm border border-neutral-200 rounded px-2 py-1"
              >
                <option value="24h">24h</option>
                <option value="7d">7d</option>
                <option value="30d">30d</option>
                <option value="all">All time</option>
              </select>
            </div>
          </div>

          {/* Popular Tags */}
          {popularTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {popularTags.slice(0, 10).map(({ tag, count }) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    filters.tag === tag
                      ? 'bg-brand-100 text-brand-700 border-brand-200'
                      : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {tag} ({count})
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {filters.tag && (
          <div className="mb-4 text-sm text-neutral-600">
            Showing posts tagged "{filters.tag}" • {posts.length} found
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <WallCard 
              key={post.id} 
              post={post} 
              onVote={() => handleVote(post.id)}
              getDomainFromUrl={getDomainFromUrl}
            />
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="text-neutral-600">Loading posts...</div>
          </div>
        )}

        {/* Load More */}
        {!loading && nextCursor && (
          <div className="text-center mt-8">
            <button
              onClick={() => loadPosts(false)}
              className="px-6 py-2 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
            >
              Load More Posts
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-xl text-neutral-600 mb-2">No posts found</div>
            <div className="text-sm text-neutral-500 mb-4">
              {filters.tag ? 'Try removing the tag filter' : 'Be the first to submit a corporate-speak specimen.'}
            </div>
            <button
              onClick={() => window.location.href = '/submit'}
              className="px-4 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors"
            >
              Submit Wall Post
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

type WallCardProps = {
  post: WallPost;
  onVote: () => void;
  getDomainFromUrl: (url: string) => string;
};

function WallCard({ post, onVote, getDomainFromUrl }: WallCardProps) {
  const [showFullContent, setShowFullContent] = useState(false);
  
  const domain = getDomainFromUrl(post.source_url);
  const description = post.og_desc || post.body || '';
  const shouldTruncate = description.length > 200;

  const handleShare = () => {
    const url = `${window.location.origin}/wall`;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: description,
        url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
      {/* Source Badge */}
      <div className="flex items-center justify-between mb-3">
        <a
          href={post.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-brand-600 hover:text-brand-700 font-medium"
        >
          🌐 {domain}
        </a>
        <button
          onClick={handleShare}
          className="text-xs text-neutral-500 hover:text-neutral-700"
        >
          📤 Share
        </button>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg mb-3 line-clamp-2">{post.title}</h3>

      {/* Content */}
      {description && (
        <div className="mb-4">
          <p className="text-neutral-700 text-sm leading-relaxed">
            {shouldTruncate && !showFullContent 
              ? `${description.substring(0, 200)}...` 
              : description
            }
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-xs text-brand-600 hover:text-brand-700 mt-1"
            >
              {showFullContent ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Related Terms */}
      {post.related_terms && post.related_terms.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-neutral-500 mb-1">Related terms:</div>
          <div className="flex flex-wrap gap-1">
            {post.related_terms.slice(0, 2).map(term => (
              <button
                key={term}
                onClick={() => window.location.href = `/term/${term}`}
                className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full hover:bg-blue-200"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onVote}
          className="flex items-center gap-2 px-3 py-1 border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors"
        >
          <span>👍</span>
          <span className="text-sm">{post.vote_count}</span>
        </button>

        <div className="text-xs text-neutral-500">
          {new Date(post.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}