-- Phase 2: Wall System & Home Feed
-- Create wall submission queue, published posts, voting, and unified feed

PRAGMA foreign_keys=ON;

-- Wall submission queue
CREATE TABLE IF NOT EXISTS wall_submissions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT,
  source_url TEXT NOT NULL,
  tags TEXT,               -- JSON array
  suggested_terms TEXT,     -- JSON array of term slugs
  submitted_by TEXT,
  status TEXT DEFAULT 'queued' CHECK(status IN ('queued','approved','rejected','published')),
  reviewer TEXT,
  reviewer_notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Published wall posts
CREATE TABLE IF NOT EXISTS wall_posts (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  source_url TEXT NOT NULL,
  og_title TEXT, 
  og_desc TEXT, 
  og_image TEXT, 
  og_site TEXT,
  tags TEXT,                -- JSON array
  related_terms TEXT,       -- JSON array of term ids
  vote_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  hot_score REAL DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  last_activity_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Wall voting system
CREATE TABLE IF NOT EXISTS wall_votes (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  fingerprint TEXT, -- for anonymous voting
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_id),
  UNIQUE(post_id, fingerprint)
);

-- Comments system (extensible for other entities)
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK(entity_type IN ('wall','term','challenge')),
  entity_id TEXT NOT NULL,
  user_id TEXT,
  fingerprint TEXT,
  body TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Unified feed for Home page
CREATE TABLE IF NOT EXISTS feed_items (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK(type IN ('term','wall','challenge','generator')),
  entity_id TEXT NOT NULL,
  ts TEXT NOT NULL,         -- ISO timestamp for sort
  summary TEXT,             -- optional pre-rendered snippet
  hot_score REAL DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(type, entity_id)
);

-- Enhanced app flags
INSERT OR IGNORE INTO app_flags (key, value, description) VALUES 
('wall_public', 'false', 'Enable public wall page in navigation'),
('home_feed_v2', 'false', 'Enable unified home feed'),
('wall_voting', 'true', 'Enable voting on wall posts'),
('wall_comments', 'false', 'Enable comments on wall posts');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_wall_submissions_status ON wall_submissions(status);
CREATE INDEX IF NOT EXISTS idx_wall_submissions_created_at ON wall_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_wall_posts_created_at ON wall_posts(created_at);
CREATE INDEX IF NOT EXISTS idx_wall_posts_hot_score ON wall_posts(hot_score);
CREATE INDEX IF NOT EXISTS idx_wall_posts_vote_count ON wall_posts(vote_count);
CREATE INDEX IF NOT EXISTS idx_wall_votes_post_id ON wall_votes(post_id);
CREATE INDEX IF NOT EXISTS idx_wall_votes_user_id ON wall_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_entity ON comments(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_feed_items_type_ts ON feed_items(type, ts);
CREATE INDEX IF NOT EXISTS idx_feed_items_ts ON feed_items(ts);
-- Note: feed_items doesn't have hot_score column, removed index
