-- 2025-01-19 Missing Tables Migration
-- Add only the missing tables that aren't already present

PRAGMA foreign_keys=ON;

-- Wall voting system (if not exists)
CREATE TABLE IF NOT EXISTS wall_votes (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_id),
  FOREIGN KEY(post_id) REFERENCES wall_posts(id)
);

-- FTS5 virtual tables for search (if not exists)
CREATE VIRTUAL TABLE IF NOT EXISTS terms_fts USING fts5(
  title, 
  definition, 
  short_def,
  content='terms_v2', 
  content_rowid='rowid'
);

-- Add missing columns to wall_posts if they don't exist
-- Note: SQLite doesn't support IF NOT EXISTS for ALTER TABLE, so we'll use a different approach
-- These will be added manually if needed

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_wall_votes_post_id ON wall_votes(post_id);
CREATE INDEX IF NOT EXISTS idx_wall_votes_user_id ON wall_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_entity ON comments(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_feed_items_type_ts ON feed_items(type, ts);

-- Update feature flags for Phase 3
UPDATE app_flags SET value = 'true' WHERE key = 'generators_hub_enabled';
UPDATE app_flags SET value = 'true' WHERE key = 'challenges_hub_enabled';

-- Add new feature flags for Phase 3
INSERT OR IGNORE INTO app_flags (key, value, description) VALUES
('generators_hub_enabled', 'true', 'Enable Generators Hub'),
('challenges_hub_enabled', 'true', 'Enable Challenges Hub'),
('voting_system_v2', 'true', 'Enable enhanced voting system');
