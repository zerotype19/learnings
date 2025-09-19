-- 2025-09-19 Backfill Legacy Data
-- Migrate existing data from legacy tables to new schema
-- Preserves IDs, timestamps, and relationships

-- Backfill terms from legacy table
INSERT OR IGNORE INTO terms_v2 (
  id, slug, title, definition, short_def, examples, tags, 
  created_at, updated_at, status, views, seq
)
SELECT 
  id,
  slug,
  title,
  definition,
  SUBSTR(definition, 1, 160) as short_def, -- truncate for short_def
  example_sentence as examples, -- legacy field
  '[]' as tags, -- initialize empty tags
  datetime(created_at/1000, 'unixepoch') as created_at, -- convert from timestamp
  datetime(updated_at/1000, 'unixepoch') as updated_at,
  CASE 
    WHEN status = 'published' THEN 'published'
    WHEN status = 'draft' THEN 'draft'
    ELSE 'archived'
  END as status,
  0 as views, -- initialize views
  ROW_NUMBER() OVER (ORDER BY created_at) as seq
FROM terms 
WHERE id IS NOT NULL;

-- Backfill existing submissions into new queue
INSERT OR IGNORE INTO term_submissions (
  id, title, short_def, definition, examples, tags, links,
  submitted_by, status, created_at, updated_at
)
SELECT 
  id,
  raw_title as title,
  SUBSTR(raw_definition, 1, 160) as short_def,
  raw_definition as definition,
  raw_example as examples,
  '[]' as tags,
  '[]' as links,
  submitter_id as submitted_by,
  CASE 
    WHEN status = 'pending' THEN 'queued'
    WHEN status = 'approved' THEN 'approved'
    WHEN status = 'rejected' THEN 'rejected'
    ELSE 'queued'
  END as status,
  datetime(created_at/1000, 'unixepoch') as created_at,
  datetime(created_at/1000, 'unixepoch') as updated_at
FROM submissions 
WHERE id IS NOT NULL;

-- Backfill wall items to wall_posts (assuming they're approved)
INSERT OR IGNORE INTO wall_posts (
  id, slug, title, body, source_url, tags, related_terms,
  votes, created_at, seq
)
SELECT 
  id,
  LOWER(REPLACE(REPLACE(title, ' ', '-'), '''', '')) as slug, -- generate slug
  title,
  title as body, -- use title as body for now
  COALESCE(source_url, '') as source_url,
  '[]' as tags,
  '[]' as related_terms,
  0 as votes,
  datetime(created_at/1000, 'unixepoch') as created_at,
  ROW_NUMBER() OVER (ORDER BY created_at) as seq
FROM wall_items 
WHERE id IS NOT NULL AND status = 'published';

-- Backfill users (if exists)
INSERT OR IGNORE INTO users_v2 (id, email, display_name, handle, role, created_at)
SELECT 
  id,
  email,
  display_name,
  handle,
  CASE 
    WHEN role = 'admin' THEN 'admin'
    WHEN role = 'editor' THEN 'editor'
    ELSE 'user'
  END as role,
  datetime(created_at/1000, 'unixepoch') as created_at
FROM users 
WHERE id IS NOT NULL;

-- Backfill challenges (if exists)
INSERT OR IGNORE INTO challenges_v2 (id, slug, title, brief, starts_at, ends_at, status, created_at)
SELECT 
  id,
  slug,
  title,
  prompt as brief,
  datetime(starts_at/1000, 'unixepoch') as starts_at,
  datetime(ends_at/1000, 'unixepoch') as ends_at,
  'active' as status, -- default to active for existing challenges
  datetime(created_at/1000, 'unixepoch') as created_at
FROM challenges 
WHERE id IS NOT NULL;

-- Backfill challenge entries (if exists)
INSERT OR IGNORE INTO challenge_entries_v2 (
  id, challenge_id, user_id, title, body, votes, created_at
)
SELECT 
  id,
  challenge_id,
  author_id as user_id,
  title,
  body,
  0 as votes, -- initialize votes
  datetime(created_at/1000, 'unixepoch') as created_at
FROM challenge_entries 
WHERE id IS NOT NULL;

-- Update sequence numbers for proper ordering
UPDATE terms_v2 SET seq = (
  SELECT COUNT(*) FROM terms_v2 t2 
  WHERE t2.created_at <= terms_v2.created_at
);

UPDATE wall_posts SET seq = (
  SELECT COUNT(*) FROM wall_posts w2 
  WHERE w2.created_at <= wall_posts.created_at
);
