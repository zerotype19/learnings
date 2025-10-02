-- Fix wall posts engagement data with proper positive values and valid dates
-- This script ensures all wall posts have realistic engagement metrics

-- Fix votes to be positive values between 100-500
UPDATE wall_posts SET 
  votes = ABS(CAST((RANDOM() % 401) + 100 AS INTEGER)),
  vote_count = ABS(CAST((RANDOM() % 401) + 100 AS INTEGER)),
  hot_score = ABS(CAST((RANDOM() % 401) + 100 AS REAL)) / 100.0
WHERE id LIKE 'wall_%';

-- Fix comments to be positive values between 0-20
UPDATE wall_posts SET 
  comments = ABS(CAST((RANDOM() % 21) AS INTEGER)),
  comment_count = ABS(CAST((RANDOM() % 21) AS INTEGER))
WHERE id LIKE 'wall_%';

-- Fix created_at dates to be within the last 6 months
UPDATE wall_posts SET 
  created_at = datetime('now', '-' || CAST((RANDOM() % 180) + 1 AS TEXT) || ' days', 
                       '+' || CAST((RANDOM() % 24) AS TEXT) || ' hours',
                       '+' || CAST((RANDOM() % 60) AS TEXT) || ' minutes',
                       '+' || CAST((RANDOM() % 60) AS TEXT) || ' seconds')
WHERE id LIKE 'wall_%' AND created_at IS NULL;

-- Fix last_activity_at to be within the last 30 days
UPDATE wall_posts SET 
  last_activity_at = datetime('now', '-' || CAST((RANDOM() % 30) + 1 AS TEXT) || ' days',
                             '+' || CAST((RANDOM() % 24) AS TEXT) || ' hours',
                             '+' || CAST((RANDOM() % 60) AS TEXT) || ' minutes',
                             '+' || CAST((RANDOM() % 60) AS TEXT) || ' seconds')
WHERE id LIKE 'wall_%';

