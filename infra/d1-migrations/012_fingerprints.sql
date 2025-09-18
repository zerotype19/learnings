-- Add fingerprint columns to track anonymous activity
ALTER TABLE votes ADD COLUMN fingerprint TEXT;
ALTER TABLE terms ADD COLUMN fingerprint TEXT;
ALTER TABLE wall_items ADD COLUMN fingerprint TEXT;
ALTER TABLE submissions ADD COLUMN fingerprint TEXT;
ALTER TABLE challenge_entries ADD COLUMN fingerprint TEXT;

-- Index for efficient fingerprint lookups
CREATE INDEX IF NOT EXISTS idx_votes_fingerprint ON votes(fingerprint);
CREATE INDEX IF NOT EXISTS idx_terms_fingerprint ON terms(fingerprint);
CREATE INDEX IF NOT EXISTS idx_wall_fingerprint ON wall_items(fingerprint);
CREATE INDEX IF NOT EXISTS idx_submissions_fingerprint ON submissions(fingerprint);
CREATE INDEX IF NOT EXISTS idx_challenge_entries_fingerprint ON challenge_entries(fingerprint);
