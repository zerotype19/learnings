-- Add missing updated_at column to wall_submissions table
-- This column is referenced in the confirmation process but was missing

PRAGMA foreign_keys=ON;

-- Add updated_at column to wall_submissions if it doesn't exist
ALTER TABLE wall_submissions ADD COLUMN updated_at TEXT DEFAULT CURRENT_TIMESTAMP;

-- Update existing records to have updated_at = created_at
UPDATE wall_submissions SET updated_at = created_at WHERE updated_at IS NULL;
