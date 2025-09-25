-- Create pending_submissions table for email confirmation system
CREATE TABLE IF NOT EXISTS pending_submissions (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('term', 'wall')),
  email TEXT NOT NULL,
  data TEXT NOT NULL, -- JSON data for the submission
  confirmation_token TEXT NOT NULL UNIQUE,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000),
  confirmed_at INTEGER NULL
);

-- Create index for confirmation tokens
CREATE INDEX IF NOT EXISTS idx_pending_submissions_token ON pending_submissions(confirmation_token);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_pending_submissions_email ON pending_submissions(email);

-- Create index for expiration cleanup
CREATE INDEX IF NOT EXISTS idx_pending_submissions_expires ON pending_submissions(expires_at);
