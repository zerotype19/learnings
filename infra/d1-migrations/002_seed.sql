INSERT INTO terms (id, slug, title, definition, translation, example_sentence, status, created_at, updated_at)
VALUES
  ('t_synergy','synergy','Synergy','When two mediocre ideas hold hands to look strategic.','We hope someone else does the work.','Let''s leverage cross-functional synergy to unlock Q3 velocity.', 'published', strftime('%s','now')*1000, strftime('%s','now')*1000),
  ('t_ainative','ai-native','AI-native','We taped a chatbot to a spreadsheet and called it innovation.','We added an API key.','Our AI-native platform operationalizes intelligence at scale.', 'published', strftime('%s','now')*1000, strftime('%s','now')*1000),
  ('t_enterprise','enterprise-grade','Enterprise-grade','It has SSO and a status page gif.','We made it someone else''s problem.','This enterprise-grade solution right-sizes your risk posture.', 'published', strftime('%s','now')*1000, strftime('%s','now')*1000);
