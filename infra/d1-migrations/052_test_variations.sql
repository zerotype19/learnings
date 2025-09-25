-- Test variations import with just a few terms
-- This will help identify the conflict

-- Disable foreign key constraints temporarily
PRAGMA foreign_keys=OFF;

INSERT INTO terms_v2 (
  id, slug, title, definition, examples, tags, status, views, seq, created_at, updated_at
) VALUES (
  'term_actionable-items-test',
  'actionable-items-test',
  'Actionable Items',
  'A task or action that needs to be performed by an individual or team; essentially a to-do list.',
  'Let''s create a list of actionable items from today''s meeting.',
  '["corporate","buzzword","project"]',
  'published',
  0,
  999,
  1758804000000,
  1758804000000
);

-- Re-enable foreign key constraints
PRAGMA foreign_keys=ON;

-- Update the search index
INSERT INTO terms_fts(terms_fts) VALUES('rebuild');
