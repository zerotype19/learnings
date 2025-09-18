ALTER TABLE wall_items ADD COLUMN flagged INTEGER DEFAULT 0; -- 0/1
ALTER TABLE wall_items ADD COLUMN moderation_notes TEXT;      -- JSON with detection results
ALTER TABLE wall_items ADD COLUMN reviewed_by TEXT;           -- user id
