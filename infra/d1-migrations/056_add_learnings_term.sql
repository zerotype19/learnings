-- 2025-01-25 Add "learnings" term
-- Add the made-up word "learnings" to the terms table

INSERT OR IGNORE INTO terms_v2 (
  id,
  slug,
  title,
  definition,
  short_def,
  examples,
  tags,
  created_at,
  updated_at,
  status,
  views,
  seq
) VALUES (
  'learnings_term_001',
  'learnings',
  'learnings',
  'A made-up corporate buzzword that sounds like it means "insights" or "knowledge gained" but is actually just a pretentious way to say "things we learned." Often used in plural form to sound more sophisticated than the simple "learning."',
  'A made-up corporate buzzword for "things we learned"',
  'Let''s discuss the key learnings from this quarter''s performance review.\n\nOur learnings indicate that we need to pivot our strategy.\n\nWhat are the main learnings from this customer feedback session?',
  '["corporate", "buzzword", "made-up", "pretentious"]',
  '2025-01-25T00:00:00Z',
  '2025-01-25T00:00:00Z',
  'published',
  0,
  (SELECT COALESCE(MAX(seq), 0) + 1 FROM terms_v2)
);
