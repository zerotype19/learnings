CREATE TABLE IF NOT EXISTS buzzword_generations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  user_id TEXT, -- nullable
  scenario TEXT NOT NULL,
  scenario_hash TEXT, -- SHA-256 of normalized scenario (nullable but recommended)
  buzzword TEXT NOT NULL,
  tone TEXT CHECK(tone IN ('straight','snarky')) DEFAULT 'straight',
  format TEXT CHECK(format IN ('verb_noun','noun_noun','adj_noun','surprise')) DEFAULT 'surprise',
  edge TEXT CHECK(edge IN ('safe','spicy')) DEFAULT 'safe',
  seed INTEGER DEFAULT 0,
  saved_term_id INTEGER, -- nullable; references terms_v2(id)
  ip_hash TEXT
);

CREATE INDEX IF NOT EXISTS idx_buzzword_created_at ON buzzword_generations(created_at);
CREATE INDEX IF NOT EXISTS idx_buzzword_user_id ON buzzword_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_buzzword_scenario_hash ON buzzword_generations(scenario_hash);
