-- 2025-01-19 Phase 1 Enhancements Migration
-- Add missing tables and enhancements for Phase 1 functionality

PRAGMA foreign_keys=ON;

-- Add missing columns to existing tables
ALTER TABLE wall_posts ADD COLUMN hot_score REAL DEFAULT 0;
ALTER TABLE wall_posts ADD COLUMN last_activity_at TEXT DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE wall_posts ADD COLUMN og_site TEXT;
ALTER TABLE wall_posts ADD COLUMN comment_count INTEGER DEFAULT 0;

-- Wall voting system
CREATE TABLE IF NOT EXISTS wall_votes (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_id),
  FOREIGN KEY(post_id) REFERENCES wall_posts(id)
);

-- Comments system
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK(entity_type IN ('wall')),
  entity_id TEXT NOT NULL,
  user_id TEXT,
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
  UNIQUE(type, entity_id)
);

-- FTS5 virtual tables for search
CREATE VIRTUAL TABLE IF NOT EXISTS terms_fts USING fts5(
  title, 
  definition, 
  short_def,
  content='terms_v2', 
  content_rowid='rowid'
);

CREATE VIRTUAL TABLE IF NOT EXISTS wall_fts USING fts5(
  title, 
  body, 
  content='wall_posts', 
  content_rowid='rowid'
);

-- FTS5 triggers for terms_v2
CREATE TRIGGER IF NOT EXISTS terms_v2_ai AFTER INSERT ON terms_v2 BEGIN
  INSERT INTO terms_fts(rowid, title, definition, short_def) 
  VALUES (new.rowid, new.title, new.definition, new.short_def);
END;

CREATE TRIGGER IF NOT EXISTS terms_v2_au AFTER UPDATE ON terms_v2 BEGIN
  INSERT INTO terms_fts(terms_fts, rowid, title, definition, short_def) 
  VALUES('delete', old.rowid, old.title, old.definition, old.short_def);
  INSERT INTO terms_fts(rowid, title, definition, short_def) 
  VALUES (new.rowid, new.title, new.definition, new.short_def);
END;

CREATE TRIGGER IF NOT EXISTS terms_v2_ad AFTER DELETE ON terms_v2 BEGIN
  INSERT INTO terms_fts(terms_fts, rowid, title, definition, short_def) 
  VALUES('delete', old.rowid, old.title, old.definition, old.short_def);
END;

-- FTS5 triggers for wall_posts
CREATE TRIGGER IF NOT EXISTS wall_posts_ai AFTER INSERT ON wall_posts BEGIN
  INSERT INTO wall_fts(rowid, title, body) 
  VALUES (new.rowid, new.title, new.body);
END;

CREATE TRIGGER IF NOT EXISTS wall_posts_au AFTER UPDATE ON wall_posts BEGIN
  INSERT INTO wall_fts(wall_fts, rowid, title, body) 
  VALUES('delete', old.rowid, old.title, old.body);
  INSERT INTO wall_fts(rowid, title, body) 
  VALUES (new.rowid, new.title, new.body);
END;

CREATE TRIGGER IF NOT EXISTS wall_posts_ad AFTER DELETE ON wall_posts BEGIN
  INSERT INTO wall_fts(wall_fts, rowid, title, body) 
  VALUES('delete', old.rowid, old.title, old.body);
END;

-- Additional indexes for performance
CREATE INDEX IF NOT EXISTS idx_wall_votes_post_id ON wall_votes(post_id);
CREATE INDEX IF NOT EXISTS idx_wall_votes_user_id ON wall_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_entity ON comments(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_feed_items_ts ON feed_items(ts);
CREATE INDEX IF NOT EXISTS idx_feed_items_type ON feed_items(type);

-- Update feature flags for Phase 1 & 2
UPDATE app_flags SET value = 'true' WHERE key = 'terms_hub_enabled';
UPDATE app_flags SET value = 'true' WHERE key = 'search_v2_enabled';
UPDATE app_flags SET value = 'true' WHERE key = 'submit_v2_enabled';
UPDATE app_flags SET value = 'true' WHERE key = 'wall_enabled';

-- Add new feature flags
INSERT OR IGNORE INTO app_flags (key, value, description) VALUES 
('wall_public', 'true', 'Enable public wall viewing'),
('home_feed_v2', 'true', 'Enable new home feed'),
('admin_queue_enabled', 'true', 'Enable admin submission queues');

-- Seed some initial terms for testing
INSERT OR IGNORE INTO terms_v2 (id, slug, title, definition, short_def, tags, status, views, seq) VALUES 
('term_synergy', 'synergy', 'Synergy', 'The magical power that occurs when two or more things work together to create something greater than the sum of their parts. Often used to justify unnecessary meetings.', 'The magical power of working together', '["business", "meetings", "buzzword"]', 'published', 42, 1),
('term_leverage', 'leverage', 'Leverage', 'To use something to maximum advantage. In corporate speak, this means "exploit" but sounds more sophisticated.', 'To use something to maximum advantage', '["business", "strategy", "buzzword"]', 'published', 38, 2),
('term_paradigm', 'paradigm', 'Paradigm', 'A framework or model for thinking about something. Corporate favorite for "way of doing things" when you want to sound smart.', 'A framework or model for thinking', '["business", "strategy", "buzzword"]', 'published', 35, 3);
