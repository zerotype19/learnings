-- Nonsense analytics table for tracking tooltip and Clorg interactions
CREATE TABLE IF NOT EXISTS nonsense_analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL, -- 'tooltip' or 'clorg'
  id TEXT NOT NULL, -- hashed identifier for the specific tooltip/clorg line
  variant TEXT NOT NULL DEFAULT 'A', -- A/B test variant
  enterprise INTEGER NOT NULL DEFAULT 0, -- 1 if enterprise mode enabled
  path TEXT NOT NULL, -- page path where event occurred
  timestamp INTEGER NOT NULL, -- unix timestamp
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for efficient querying
CREATE INDEX IF NOT EXISTS idx_nonsense_analytics_type_timestamp ON nonsense_analytics(type, timestamp);
CREATE INDEX IF NOT EXISTS idx_nonsense_analytics_path_timestamp ON nonsense_analytics(path, timestamp);
CREATE INDEX IF NOT EXISTS idx_nonsense_analytics_variant_enterprise ON nonsense_analytics(variant, enterprise);
