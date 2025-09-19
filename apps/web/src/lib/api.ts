// API helpers for wall and feed functionality

export type WallPost = {
  id: string;
  slug: string;
  title: string;
  body?: string;
  source_url: string;
  og_title?: string;
  og_desc?: string;
  og_image?: string;
  og_site?: string;
  tags?: string[] | string; // json string fallback
  related_terms?: string[] | string;
  votes?: number;
  comments?: number;
  vote_count?: number;
  comment_count?: number;
  created_at: string;
};

export type WallListResponse = {
  items: WallPost[];
  nextCursor?: string;
  filters?: {
    tag?: string;
    sort?: string;
    range?: string;
  };
};

export type FeedItem = {
  type: 'term' | 'wall' | 'challenge' | 'generator';
  ts: string;
  data: any;
};

export type FeedResponse = { 
  items: FeedItem[]; 
  nextCursor?: string; 
};

const getApiUrl = () => import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';

export async function listWall(params: { 
  tag?: string; 
  sort?: 'trending' | 'new'; 
  range?: '24h' | '7d' | '30d' | 'all'; 
  cursor?: string; 
  limit?: number 
} = {}): Promise<WallListResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.tag) searchParams.set('tag', params.tag);
  if (params.sort) searchParams.set('sort', params.sort);
  if (params.range) searchParams.set('range', params.range);
  if (params.cursor) searchParams.set('cursor', params.cursor);
  if (params.limit) searchParams.set('limit', String(params.limit));

  const response = await fetch(`${getApiUrl()}/api/wall?${searchParams}`, {
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`Failed to load wall: ${response.status}`);
  }

  return response.json();
}

export async function submitWallPost(data: {
  title: string;
  body?: string;
  source_url: string;
  tags?: string[];
  suggested_terms?: string[];
}): Promise<{ id: string; status: string; message: string }> {
  const response = await fetch(`${getApiUrl()}/api/wall/submit`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Submission failed' }));
    throw new Error(error.error || 'Submission failed');
  }

  return response.json();
}

export async function vote(
  entity: 'wall' | 'entry', 
  entity_id: string
): Promise<{ ok: boolean; votes: number; message?: string }> {
  const response = await fetch(`${getApiUrl()}/api/vote`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ entity_type: entity, entity_id })
  });

  if (!response.ok) {
    throw new Error('Vote failed');
  }

  const result = await response.json();
  return {
    ok: result.ok || false,
    votes: result.votes || result.vote_count || 0,
    message: result.message
  };
}

export async function homeFeed(cursor?: string): Promise<FeedResponse> {
  const searchParams = cursor ? `?cursor=${encodeURIComponent(cursor)}` : '';
  
  const response = await fetch(`${getApiUrl()}/api/home-feed${searchParams}`, {
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Failed to load feed');
  }

  return response.json();
}

export async function trackEvent(name: string, props: Record<string, any> = {}): Promise<void> {
  try {
    await fetch(`${getApiUrl()}/api/track`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, props })
    });
  } catch (error) {
    console.warn('Event tracking failed:', error);
  }
}

// Helper to normalize vote count from either schema
export function getVoteCount(post: WallPost): number {
  return post.vote_count ?? post.votes ?? 0;
}

// Helper to normalize comment count from either schema  
export function getCommentCount(post: WallPost): number {
  return post.comment_count ?? post.comments ?? 0;
}

// Helper to parse tags from either format
export function getTags(post: WallPost): string[] {
  if (Array.isArray(post.tags)) return post.tags;
  if (typeof post.tags === 'string') {
    try {
      return JSON.parse(post.tags);
    } catch {
      return [];
    }
  }
  return [];
}

// Helper to parse related terms from either format
export function getRelatedTerms(post: WallPost): string[] {
  if (Array.isArray(post.related_terms)) return post.related_terms;
  if (typeof post.related_terms === 'string') {
    try {
      return JSON.parse(post.related_terms);
    } catch {
      return [];
    }
  }
  return [];
}

// Get popular tags
export async function getPopularTags(params: { limit?: number } = {}): Promise<{ tags: Array<{tag: string; count: number}> }> {
  const searchParams = new URLSearchParams();
  if (params.limit) searchParams.set('limit', String(params.limit));
  
  const response = await fetch(`${getApiUrl()}/api/wall/tags/popular?${searchParams}`, {
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`Failed to load tags: ${response.status}`);
  }

  return response.json();
}
