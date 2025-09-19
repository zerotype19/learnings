-- Phase 2: Wall System - Simple Addition
-- Add only the new tables we need for Phase 2

PRAGMA foreign_keys=ON;

-- Wall voting system
CREATE TABLE IF NOT EXISTS wall_votes_v2 (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id TEXT,
  fingerprint TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Unified feed for Home page
CREATE TABLE IF NOT EXISTS feed_items (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK(type IN ('term','wall','challenge','generator')),
  entity_id TEXT NOT NULL,
  ts TEXT NOT NULL,
  summary TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(type, entity_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_wall_votes_v2_post_id ON wall_votes_v2(post_id);
CREATE INDEX IF NOT EXISTS idx_wall_votes_v2_user_id ON wall_votes_v2(user_id);
CREATE INDEX IF NOT EXISTS idx_wall_votes_v2_fingerprint ON wall_votes_v2(fingerprint);
CREATE INDEX IF NOT EXISTS idx_feed_items_type_ts ON feed_items(type, ts);
CREATE INDEX IF NOT EXISTS idx_feed_items_ts ON feed_items(ts);
