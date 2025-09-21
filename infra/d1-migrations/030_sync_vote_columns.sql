-- 2025-01-20 Sync Vote Columns Migration
-- Sync data between old 'votes' column and new 'vote_count' column

PRAGMA foreign_keys=ON;

-- Update vote_count to match votes where vote_count is 0 but votes > 0
UPDATE wall_posts 
SET vote_count = votes 
WHERE vote_count = 0 AND votes > 0;

-- Also update any wall_posts where votes is NULL but vote_count exists
UPDATE wall_posts 
SET votes = vote_count 
WHERE votes IS NULL AND vote_count > 0;

-- Ensure both columns are in sync for consistency
UPDATE wall_posts 
SET vote_count = COALESCE(votes, 0) 
WHERE vote_count IS NULL;
