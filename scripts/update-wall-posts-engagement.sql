-- Update wall posts with random votes (100+) and randomize dates over last 6 months
-- This script adds engagement data to make the wall posts look more active

-- Update votes to random values between 100-500
UPDATE wall_posts SET 
  votes = CAST((RANDOM() % 401) + 100 AS INTEGER),
  vote_count = CAST((RANDOM() % 401) + 100 AS INTEGER),
  hot_score = CAST((RANDOM() % 401) + 100 AS REAL) / 100.0
WHERE id LIKE 'wall_%';

-- Update created_at to random dates over the last 6 months
-- Generate random dates between 6 months ago and now
UPDATE wall_posts SET 
  created_at = datetime('now', '-' || CAST((RANDOM() % 180) + 1 AS TEXT) || ' days', 
                       '+' || CAST((RANDOM() % 24) AS TEXT) || ' hours',
                       '+' || CAST((RANDOM() % 60) AS TEXT) || ' minutes',
                       '+' || CAST((RANDOM() % 60) AS TEXT) || ' seconds'),
  last_activity_at = datetime('now', '-' || CAST((RANDOM() % 30) + 1 AS TEXT) || ' days',
                             '+' || CAST((RANDOM() % 24) AS TEXT) || ' hours',
                             '+' || CAST((RANDOM() % 60) AS TEXT) || ' minutes',
                             '+' || CAST((RANDOM() % 60) AS TEXT) || ' seconds')
WHERE id LIKE 'wall_%';

-- Add some comments to make it look more active
UPDATE wall_posts SET 
  comments = CAST((RANDOM() % 21) AS INTEGER),
  comment_count = CAST((RANDOM() % 21) AS INTEGER)
WHERE id LIKE 'wall_%';

