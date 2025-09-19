-- Phase 2: Wall System Enhancements
-- Add missing columns and tables for wall voting and feed system

PRAGMA foreign_keys=ON;

-- Add missing columns to existing wall_posts table
ALTER TABLE wall_posts ADD COLUMN og_site TEXT;
ALTER TABLE wall_posts ADD COLUMN vote_count INTEGER DEFAULT 0;
ALTER TABLE wall_posts ADD COLUMN comment_count INTEGER DEFAULT 0;
ALTER TABLE wall_posts ADD COLUMN hot_score REAL DEFAULT 0;
ALTER TABLE wall_posts ADD COLUMN updated_at TEXT DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE wall_posts ADD COLUMN last_activity_at TEXT DEFAULT CURRENT_TIMESTAMP;

-- Update existing vote counts from votes column if it exists
UPDATE wall_posts SET vote_count = COALESCE(votes, 0) WHERE vote_count = 0;
UPDATE wall_posts SET comment_count = COALESCE(comments, 0) WHERE comment_count = 0;

-- Wall voting system (new table)
CREATE TABLE IF NOT EXISTS wall_votes (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  fingerprint TEXT, -- for anonymous voting
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_id),
  UNIQUE(post_id, fingerprint)
);

-- Comments system (new table)
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK(entity_type IN ('wall','term','challenge')),
  entity_id TEXT NOT NULL,
  user_id TEXT,
  fingerprint TEXT,
  body TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Unified feed for Home page (new table)
CREATE TABLE IF NOT EXISTS feed_items (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK(type IN ('term','wall','challenge','generator')),
  entity_id TEXT NOT NULL,
  ts TEXT NOT NULL,         -- ISO timestamp for sort
  summary TEXT,             -- optional pre-rendered snippet
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(type, entity_id)
);

-- Enhanced app flags (only if app_flags table exists)
INSERT OR IGNORE INTO app_flags (key, value, description) VALUES 
('wall_public', 'false', 'Enable public wall page in navigation'),
('home_feed_v2', 'false', 'Enable unified home feed'),
('wall_voting', 'true', 'Enable voting on wall posts'),
('wall_comments', 'false', 'Enable comments on wall posts');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_wall_posts_vote_count ON wall_posts(vote_count);
CREATE INDEX IF NOT EXISTS idx_wall_posts_hot_score ON wall_posts(hot_score);
CREATE INDEX IF NOT EXISTS idx_wall_votes_post_id ON wall_votes(post_id);
CREATE INDEX IF NOT EXISTS idx_wall_votes_user_id ON wall_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_entity ON comments(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_feed_items_type_ts ON feed_items(type, ts);
CREATE INDEX IF NOT EXISTS idx_feed_items_ts ON feed_items(ts);
