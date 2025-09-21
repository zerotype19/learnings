-- 2025-01-20 Missing Columns Migration
-- Add missing columns to existing tables

PRAGMA foreign_keys=ON;

-- Add missing columns to generator_runs table
ALTER TABLE generator_runs ADD COLUMN fingerprint TEXT;
ALTER TABLE generator_runs ADD COLUMN made_public INTEGER DEFAULT 0;

-- Check if wall_posts has vote_count column, if not add it
-- Note: SQLite doesn't support IF NOT EXISTS for ALTER TABLE
-- We'll try to add it and ignore errors if it already exists
ALTER TABLE wall_posts ADD COLUMN vote_count INTEGER DEFAULT 0;

-- Add missing columns to wall_posts if they don't exist
ALTER TABLE wall_posts ADD COLUMN hot_score REAL DEFAULT 0;
ALTER TABLE wall_posts ADD COLUMN last_activity_at TEXT;
ALTER TABLE wall_posts ADD COLUMN og_site TEXT;
ALTER TABLE wall_posts ADD COLUMN comment_count INTEGER DEFAULT 0;

-- Update existing wall_posts to have vote_count if they don't
UPDATE wall_posts SET vote_count = 0 WHERE vote_count IS NULL;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_generator_runs_fingerprint ON generator_runs(fingerprint);
CREATE INDEX IF NOT EXISTS idx_generator_runs_made_public ON generator_runs(made_public);
CREATE INDEX IF NOT EXISTS idx_wall_posts_vote_count ON wall_posts(vote_count);
CREATE INDEX IF NOT EXISTS idx_wall_posts_hot_score ON wall_posts(hot_score);
