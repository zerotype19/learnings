-- 2025-01-20 Fix Generator Foreign Key Migration
-- Fix foreign key constraint to point to generators_v2 instead of generators

PRAGMA foreign_keys=ON;

-- Drop the existing foreign key constraint
-- Note: SQLite doesn't support DROP CONSTRAINT directly, so we need to recreate the table

-- Create a temporary table with the same structure but correct foreign key
CREATE TABLE generator_runs_new (
    id TEXT PRIMARY KEY,
    generator_id TEXT NOT NULL,
    user_id TEXT,
    input_json TEXT NOT NULL,
    output_text TEXT,
    related_terms TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    fingerprint TEXT,
    made_public INTEGER DEFAULT 0,
    FOREIGN KEY (generator_id) REFERENCES generators_v2(id)
);

-- Copy data from old table to new table
INSERT INTO generator_runs_new 
SELECT * FROM generator_runs;

-- Drop the old table
DROP TABLE generator_runs;

-- Rename the new table to the original name
ALTER TABLE generator_runs_new RENAME TO generator_runs;

-- Recreate indexes
CREATE INDEX IF NOT EXISTS idx_generator_runs_generator_id ON generator_runs(generator_id);
CREATE INDEX IF NOT EXISTS idx_generator_runs_user_id ON generator_runs(user_id);
CREATE INDEX IF NOT EXISTS idx_generator_runs_created_at ON generator_runs(created_at);
CREATE INDEX IF NOT EXISTS idx_generator_runs_fingerprint ON generator_runs(fingerprint);
CREATE INDEX IF NOT EXISTS idx_generator_runs_made_public ON generator_runs(made_public);
