CREATE TABLE IF NOT EXISTS challenges (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  prompt TEXT NOT NULL,
  starts_at INTEGER NOT NULL,
  ends_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS challenge_entries (
  id TEXT PRIMARY KEY,
  challenge_id TEXT NOT NULL,
  term_id TEXT,           -- optional if entry links to a term
  wall_item_id TEXT,      -- optional if entry links to a wall item
  author_id TEXT,
  title TEXT,
  body TEXT,
  created_at INTEGER NOT NULL
);

-- Optional: per-entry reaction summary (or compute on the fly)
CREATE VIEW IF NOT EXISTS v_entry_reactions AS
SELECT ce.id AS entry_id,
  SUM(CASE WHEN v.reaction='cringe' THEN 1 ELSE 0 END) AS cringe,
  SUM(CASE WHEN v.reaction='heard1000x' THEN 1 ELSE 0 END) AS heard,
  SUM(CASE WHEN v.reaction='chefskiss' THEN 1 ELSE 0 END) AS chefskiss
FROM challenge_entries ce
LEFT JOIN terms t ON t.id = ce.term_id
LEFT JOIN votes v ON v.term_id = t.id
GROUP BY ce.id;
