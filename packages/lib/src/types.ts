export type Reaction = 'cringe' | 'nailedit' | 'heard1000x' | 'chefskiss';

// Legacy term interface (for backward compatibility)
export interface Term {
  id: string;
  slug: string;
  title: string;
  definition: string;
  translation?: string;
  example_sentence: string;
  status: 'draft' | 'review' | 'published' | 'archived';
  created_at: number;
  updated_at: number;
}

// New v2 interfaces
export interface TermV2 {
  id: string;
  slug: string;
  title: string;
  definition: string;
  short_def?: string;
  examples?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  seq?: number;
}

export interface TermSubmission {
  id: string;
  title: string;
  short_def?: string;
  definition: string;
  examples?: string;
  tags?: string[];
  links?: Array<{url: string; label: string}>;
  submitted_by?: string;
  status: 'queued' | 'needs_changes' | 'approved' | 'rejected' | 'published';
  reviewer?: string;
  reviewer_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface WallSubmission {
  id: string;
  title: string;
  body?: string;
  source_url: string;
  tags?: string[];
  suggested_terms?: string[];
  submitted_by?: string;
  status: 'queued' | 'approved' | 'rejected' | 'published';
  reviewer?: string;
  reviewer_notes?: string;
  created_at: string;
}

export interface WallPost {
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
  seq?: number;
}

export interface FeedItem {
  type: 'term' | 'wall' | 'challenge' | 'generator';
  ts: string;
  data: any;
}

export interface SearchResult {
  type: 'term' | 'wall' | 'generator' | 'challenge';
  id: string;
  title: string;
  description?: string;
  url?: string;
  relevance_score?: number;
}

export interface ApiResponse<T> {
  items?: T[];
  item?: T;
  nextCursor?: string;
  error?: string;
  ok?: boolean;
}
