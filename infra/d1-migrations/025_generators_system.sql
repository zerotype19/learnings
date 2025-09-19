-- Phase 3: Generators Hub & Challenges System
-- Create generators configuration and usage tracking

PRAGMA foreign_keys=ON;

-- Enhanced generators table (if not exists from earlier migration)
CREATE TABLE IF NOT EXISTS generators_v2 (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  template TEXT NOT NULL,          -- prompt template with {{placeholders}}
  options_schema TEXT,             -- JSON schema for UI options
  is_public INTEGER DEFAULT 1,     -- show in hub
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Generator usage tracking
CREATE TABLE IF NOT EXISTS generator_runs (
  id TEXT PRIMARY KEY,
  generator_id TEXT NOT NULL,
  user_id TEXT,
  fingerprint TEXT,
  input_json TEXT NOT NULL,        -- JSON string of inputs
  output_text TEXT,                -- model output
  related_terms TEXT,              -- JSON array of term slugs/ids
  made_public INTEGER DEFAULT 0,   -- user opt-in to share on Home feed
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(generator_id) REFERENCES generators_v2(id)
);

-- Enhanced challenges table
CREATE TABLE IF NOT EXISTS challenges_v3 (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  brief TEXT NOT NULL,
  starts_at TEXT NOT NULL,
  ends_at TEXT NOT NULL,
  status TEXT CHECK(status IN('scheduled','active','closed')) DEFAULT 'scheduled',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Challenge entries with voting
CREATE TABLE IF NOT EXISTS challenge_entries_v3 (
  id TEXT PRIMARY KEY,
  challenge_id TEXT NOT NULL,
  user_id TEXT,
  fingerprint TEXT,
  title TEXT,
  body TEXT,
  source_url TEXT,
  media_url TEXT,
  related_terms TEXT,              -- JSON array
  votes INTEGER DEFAULT 0,
  hot_score REAL DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(challenge_id) REFERENCES challenges_v3(id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_generators_v2_slug ON generators_v2(slug);
CREATE INDEX IF NOT EXISTS idx_generators_v2_public ON generators_v2(is_public);
CREATE INDEX IF NOT EXISTS idx_generator_runs_generator_id ON generator_runs(generator_id);
CREATE INDEX IF NOT EXISTS idx_generator_runs_public ON generator_runs(made_public);
CREATE INDEX IF NOT EXISTS idx_generator_runs_created_at ON generator_runs(created_at);
CREATE INDEX IF NOT EXISTS idx_challenges_v3_status ON challenges_v3(status);
CREATE INDEX IF NOT EXISTS idx_challenges_v3_dates ON challenges_v3(starts_at, ends_at);
CREATE INDEX IF NOT EXISTS idx_challenge_entries_v3_challenge_id ON challenge_entries_v3(challenge_id);
CREATE INDEX IF NOT EXISTS idx_challenge_entries_v3_votes ON challenge_entries_v3(votes);

-- Seed generators (wrapping existing functionality)
INSERT OR IGNORE INTO generators_v2 (id, slug, name, description, template, options_schema) VALUES 
('gen_professor', 'professor', 'Professor Translator', 'Turn corporate-speak into plain English with academic flair', 
 'You are the "Corporate Professor" - an expert at translating corporate jargon. Given a piece of corporate buzzword text, provide three responses:\n1. academic_tone: Translate it into even MORE pretentious corporate speak\n2. plain_translation: What it actually means in simple, honest terms\n3. optional_framework: A satirical "framework" or methodology related to the concept\n\nKeep responses witty, satirical, and brief (1-2 sentences each).\nTranslate this corporate jargon: "{{text}}"',
 '{"text": {"type": "textarea", "label": "Corporate jargon to translate", "required": true}}'),

('gen_linkedin', 'linkedin-post', 'LinkedIn Post Generator', 'Generate authentic corporate LinkedIn posts', 
 'You are a satirical LinkedIn content generator. Create 3 different corporate LinkedIn posts about the given topic. Make them sound authentically corporate but subtly ridiculous. Each should be 1-2 sentences. Include corporate buzzwords, humble brags, and typical LinkedIn clichés. Format as a JSON array of strings.\nGenerate 3 LinkedIn posts about: {{topic}}',
 '{"topic": {"type": "text", "label": "Topic or theme", "required": true}}'),

('gen_comment', 'linkedin-comment', 'LinkedIn Comment Generator', 'Generate engaging but meaningless corporate comments', 
 'You are a satirical LinkedIn comment generator. Given a LinkedIn post excerpt, create a corporate-sounding comment that sounds engaged but is subtly meaningless. Include typical LinkedIn comment patterns like "Great insights!", "Adding this to my...", "This resonates with...", etc. Keep it 1-2 sentences and authentically corporate but hollow.\nGenerate a LinkedIn comment for this post: "{{post_excerpt}}"',
 '{"post_excerpt": {"type": "textarea", "label": "LinkedIn post excerpt", "required": true}}'),

('gen_email', 'corporate-email', 'Corporate Email Generator', 'Generate professional but meaningless corporate emails', 
 'You are a corporate email generator. Create a professional but subtly meaningless corporate email. Include typical corporate email patterns: vague objectives, action items that aren''t actionable, buzzwords, and the illusion of progress. Format with a subject line and body. Keep the body to 2-3 sentences maximum.\nGenerate a corporate email about: {{purpose}}',
 '{"purpose": {"type": "text", "label": "Email purpose", "required": true}}'),

('gen_roast', 'roast', 'Buzzword Roast', 'Satirical take for social posts', 
 'Write a witty, PG-13 roast (2–3 sentences) of the following buzzword usage. Avoid profanity.\nQuote: "{{text}}"',
 '{"text": {"type": "textarea", "label": "Buzzword text to roast", "required": true}}'),

('gen_bsometer', 'bs-meter', 'BS-O-Meter', 'Rate corporate jargon and suggest alternatives', 
 'Read the text and return JSON with fields: {score: 0-100, verdict: short line, fixes: [3 crisp alternatives]}.\nText: "{{text}}"',
 '{"text": {"type": "textarea", "label": "Text to analyze", "required": true}}');

-- Seed a sample active challenge
INSERT OR IGNORE INTO challenges_v3 (id, slug, title, brief, starts_at, ends_at, status) VALUES 
('challenge_q4_2025', 'q4-buzzword-brawl', 'Q4 Buzzword Brawl', 'Submit the most cringe-worthy corporate jargon you''ve encountered this quarter. Extra points for real-world context and documentation.', 
 datetime('now', '-1 day'), datetime('now', '+6 days'), 'active');
