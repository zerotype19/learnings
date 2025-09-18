PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS terms (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  definition TEXT NOT NULL,
  translation TEXT,
  example_sentence TEXT NOT NULL,
  author_id TEXT,
  status TEXT NOT NULL DEFAULT 'published',
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS term_versions (
  id TEXT PRIMARY KEY,
  term_id TEXT NOT NULL,
  definition TEXT NOT NULL,
  translation TEXT,
  example_sentence TEXT NOT NULL,
  editor_id TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS term_tags (
  term_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY(term_id, tag_id)
);

CREATE TABLE IF NOT EXISTS votes (
  id TEXT PRIMARY KEY,
  term_id TEXT NOT NULL,
  user_fingerprint TEXT NOT NULL,
  reaction TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  UNIQUE(term_id, user_fingerprint, reaction)
);

CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  raw_title TEXT NOT NULL,
  raw_definition TEXT NOT NULL,
  raw_example TEXT NOT NULL,
  submitter_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  reason TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS wall_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  image_key TEXT,
  source_url TEXT,
  submitter_id TEXT,
  status TEXT NOT NULL DEFAULT 'published',
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  handle TEXT UNIQUE,
  display_name TEXT,
  role TEXT NOT NULL DEFAULT 'member',
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS abuse_reports (
  id TEXT PRIMARY KEY,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  reporter_id TEXT,
  created_at INTEGER NOT NULL
);

-- UGC & Social extensions
CREATE TABLE IF NOT EXISTS examples (
  id TEXT PRIMARY KEY,
  term_id TEXT NOT NULL,
  body TEXT NOT NULL,
  author_id TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  author_id TEXT,
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS shortlinks (
  code TEXT PRIMARY KEY,
  target TEXT NOT NULL,
  utm_source TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS follows (
  follower_id TEXT NOT NULL,
  followee_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY(follower_id, followee_id)
);

CREATE TABLE IF NOT EXISTS badges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  criteria_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_badges (
  user_id TEXT NOT NULL,
  badge_id TEXT NOT NULL,
  awarded_at INTEGER NOT NULL,
  PRIMARY KEY(user_id, badge_id)
);

CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  read_at INTEGER,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS referrals (
  ref_code TEXT PRIMARY KEY,
  inviter_user_id TEXT,
  join_user_id TEXT,
  credited_at INTEGER
);

CREATE TABLE IF NOT EXISTS professor_replies (
  id TEXT PRIMARY KEY,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  body TEXT NOT NULL,
  author_id TEXT,
  created_at INTEGER NOT NULL
);
