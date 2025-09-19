-- 2025-09-19 New Schema Migration
-- Create new content-focused tables alongside existing ones
-- Using TEXT PRIMARY KEY (nanoid/uuid) for consistency

PRAGMA foreign_keys=ON;

-- Core terms table (new schema)
CREATE TABLE IF NOT EXISTS terms_v2 (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  definition TEXT NOT NULL,
  short_def TEXT, -- 160 char summary
  examples TEXT, -- markdown
  tags TEXT, -- json array of strings
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'published' CHECK(status IN ('draft','published','archived')),
  views INTEGER DEFAULT 0,
  seq INTEGER -- for insertion order sorting
);

-- Term submission queue
CREATE TABLE IF NOT EXISTS term_submissions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  short_def TEXT,
  definition TEXT NOT NULL,
  examples TEXT,
  tags TEXT, -- json array
  links TEXT, -- json array of {url, label}
  submitted_by TEXT, -- user id/email
  status TEXT DEFAULT 'queued' CHECK(status IN ('queued','needs_changes','approved','rejected','published')),
  reviewer TEXT,
  reviewer_notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Term aliases for redirects and variations
CREATE TABLE IF NOT EXISTS term_aliases (
  id TEXT PRIMARY KEY,
  term_id TEXT NOT NULL,
  alias TEXT NOT NULL,
  FOREIGN KEY(term_id) REFERENCES terms_v2(id)
);

-- Wall submissions queue
CREATE TABLE IF NOT EXISTS wall_submissions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT,
  source_url TEXT NOT NULL,
  tags TEXT, -- json array
  suggested_terms TEXT, -- json array of term slugs
  submitted_by TEXT,
  status TEXT DEFAULT 'queued' CHECK(status IN ('queued','approved','rejected','published')),
  reviewer TEXT,
  reviewer_notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Published wall posts
CREATE TABLE IF NOT EXISTS wall_posts (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  source_url TEXT NOT NULL,
  og_title TEXT,
  og_desc TEXT, 
  og_image TEXT,
  tags TEXT, -- json array
  related_terms TEXT, -- json array of term ids
  votes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  seq INTEGER -- for insertion order sorting
);

-- Enhanced users table
CREATE TABLE IF NOT EXISTS users_v2 (
  id TEXT PRIMARY KEY,
  email TEXT,
  display_name TEXT,
  handle TEXT UNIQUE,
  role TEXT DEFAULT 'user' CHECK(role IN ('user','editor','admin')),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Term links (in-the-wild examples)
CREATE TABLE IF NOT EXISTS term_links (
  id TEXT PRIMARY KEY,
  term_id TEXT NOT NULL,
  url TEXT NOT NULL,
  platform TEXT, -- twitter|instagram|tiktok|youtube|article|other
  title TEXT,
  note TEXT,
  submitted_by TEXT,
  status TEXT DEFAULT 'queued' CHECK(status IN ('queued','approved','rejected')),
  votes INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(term_id) REFERENCES terms_v2(id)
);

-- Generators configuration
CREATE TABLE IF NOT EXISTS generators (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  template TEXT NOT NULL, -- prompt template with {{placeholders}}
  options_schema TEXT, -- json of configurable knobs
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Generator usage tracking
CREATE TABLE IF NOT EXISTS generator_runs (
  id TEXT PRIMARY KEY,
  generator_id TEXT NOT NULL,
  user_id TEXT,
  input_json TEXT NOT NULL,
  output_text TEXT,
  related_terms TEXT, -- json array
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(generator_id) REFERENCES generators(id)
);

-- Challenges system
CREATE TABLE IF NOT EXISTS challenges_v2 (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  brief TEXT NOT NULL,
  starts_at TEXT NOT NULL,
  ends_at TEXT NOT NULL,
  status TEXT CHECK(status IN('scheduled','active','closed')) DEFAULT 'scheduled',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Challenge entries
CREATE TABLE IF NOT EXISTS challenge_entries_v2 (
  id TEXT PRIMARY KEY,
  challenge_id TEXT NOT NULL,
  user_id TEXT,
  title TEXT,
  body TEXT,
  source_url TEXT,
  media_url TEXT,
  related_terms TEXT, -- json array
  votes INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(challenge_id) REFERENCES challenges_v2(id)
);

-- Universal voting system
CREATE TABLE IF NOT EXISTS votes_v2 (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK(entity_type IN ('wall','entry','term_link')),
  entity_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(entity_type, entity_id, user_id)
);

-- Analytics events
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  name TEXT NOT NULL,
  props TEXT, -- json
  ts TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Feature flags for gradual rollout
CREATE TABLE IF NOT EXISTS app_flags (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_terms_v2_status ON terms_v2(status);
CREATE INDEX IF NOT EXISTS idx_terms_v2_created_at ON terms_v2(created_at);
CREATE INDEX IF NOT EXISTS idx_terms_v2_views ON terms_v2(views);
CREATE INDEX IF NOT EXISTS idx_term_submissions_status ON term_submissions(status);
CREATE INDEX IF NOT EXISTS idx_wall_submissions_status ON wall_submissions(status);
CREATE INDEX IF NOT EXISTS idx_wall_posts_created_at ON wall_posts(created_at);
CREATE INDEX IF NOT EXISTS idx_wall_posts_votes ON wall_posts(votes);
CREATE INDEX IF NOT EXISTS idx_term_links_term_id ON term_links(term_id);
CREATE INDEX IF NOT EXISTS idx_term_links_status ON term_links(status);
CREATE INDEX IF NOT EXISTS idx_votes_v2_entity ON votes_v2(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_events_name_ts ON events(name, ts);

-- Insert default feature flags
INSERT OR IGNORE INTO app_flags (key, value, description) VALUES 
('terms_hub_enabled', 'false', 'Enable new terms hub UI'),
('wall_enabled', 'false', 'Enable wall submissions and posts'),
('search_v2_enabled', 'false', 'Enable new search functionality'),
('submit_v2_enabled', 'false', 'Enable new universal submit page');

-- Insert default generators
INSERT OR IGNORE INTO generators (id, slug, name, description, template) VALUES 
('gen_translate', 'translate', 'Jargon Translator', 'Turn corporate-speak into plain English', 'You are a clear, direct editor. Rewrite the following text in plain, human English. Remove jargon, keep meaning.\nText: "{{text}}"\nConstraints: no buzzwords, short sentences, active voice.\nOutput only the rewritten text.'),
('gen_roast', 'roast', 'Buzzword Roast', 'Satirical take for social posts', 'Write a witty, PG-13 roast (2–3 sentences) of the following buzzword usage. Avoid profanity.\nQuote: "{{text}}"'),
('gen_bingo', 'bingo', 'Bingo Card Generator', 'Build card from selected terms', 'Generate a 5x5 bingo card with corporate buzzwords. Center square is FREE.');
