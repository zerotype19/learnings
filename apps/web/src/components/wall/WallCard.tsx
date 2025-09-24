import React from 'react';
import { WallPost, getVoteCount, getCommentCount, getTags, getRelatedTerms } from '../../lib/api';
import { VoteButton } from '../common/VoteButton';

type WallCardProps = {
  post: WallPost;
  onVoted?: (newCount: number) => void;
};

export function WallCard({ post, onVoted }: WallCardProps) {
  const voteCount = getVoteCount(post);
  const commentCount = getCommentCount(post);
  const tags = getTags(post);
  const relatedTerms = getRelatedTerms(post);

  // Extract domain from source URL
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return 'Unknown';
    }
  };

  const domain = getDomain(post.source_url);
  const snippet = post.og_desc || post.body || '';
  const displayTitle = post.og_title || post.title;

  const handleShare = async () => {
    const url = `${window.location.origin}/wall/${post.slug}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: displayTitle,
          text: snippet.substring(0, 100),
          url
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <article className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <a
            href={post.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-medium text-ink hover:text-brand-600 transition-colors"
          >
            {displayTitle}
          </a>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
              {domain}
            </span>
            <span className="text-xs text-neutral-500">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* OG Image */}
      {post.og_image && (
        <div className="mb-3">
          <img
            src={post.og_image}
            alt={displayTitle}
            className="w-full h-48 object-cover rounded-xl"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      {snippet && (
        <p className="text-sm text-neutral-600 mb-3 line-clamp-3">
          {snippet.length > 200 ? snippet.substring(0, 200) + '...' : snippet}
        </p>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 4).map(tag => (
            <span 
              key={tag}
              className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full cursor-pointer hover:bg-neutral-200 transition-colors"
              onClick={() => {
                // Navigate to wall with tag filter
                window.location.href = `/wall?tag=${encodeURIComponent(tag)}`;
              }}
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
              +{tags.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Related Terms */}
      {relatedTerms.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="text-xs text-neutral-500 mr-1">Related:</span>
          {relatedTerms.slice(0, 3).map(termId => (
            <button
              key={termId}
              onClick={() => window.location.href = `/term/${termId}`}
              className="text-xs text-brand-600 hover:text-brand-700 underline"
            >
              {termId}
            </button>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <VoteButton
            id={post.id}
            initialCount={voteCount}
            entity="wall"
            onVoted={onVoted}
          />
          
          {commentCount > 0 && (
            <span className="text-xs text-neutral-500">
              {commentCount} comment{commentCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <button
          onClick={handleShare}
          className="text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          Share
        </button>
      </div>
    </article>
  );
}
