-- Cleanup unused tables from D1 database
-- This removes legacy and unused tables to reduce database size and complexity

-- Remove unused legacy tables
DROP TABLE IF EXISTS terms;
DROP TABLE IF EXISTS term_versions;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS term_tags;
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS submissions;
DROP TABLE IF EXISTS wall_items;
DROP TABLE IF EXISTS abuse_reports;
DROP TABLE IF EXISTS examples;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS shortlinks;
DROP TABLE IF EXISTS follows;
DROP TABLE IF EXISTS badges;
DROP TABLE IF EXISTS user_badges;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS referrals;
DROP TABLE IF EXISTS professor_replies;
DROP TABLE IF EXISTS shortlink_hits;

-- Remove unused challenge system tables
DROP TABLE IF EXISTS challenges;
DROP TABLE IF EXISTS challenge_entries;
DROP TABLE IF EXISTS challenges_v2;
DROP TABLE IF EXISTS challenge_entries_v2;
DROP TABLE IF EXISTS challenges_v3;
DROP TABLE IF EXISTS challenge_entries_v3;

-- Remove duplicate wall tables
DROP TABLE IF EXISTS wall_votes_v2;

-- Note: The following tables are kept as they are actively used:
-- - terms_v2 (main terms table)
-- - term_submissions (submission queue)
-- - term_aliases (term aliases)
-- - term_links (related terms)
-- - wall_posts (published wall posts)
-- - wall_submissions (wall submission queue)
-- - wall_votes (wall voting)
-- - feed_items (activity feed)
-- - votes_v2 (voting system)
-- - generators_v2 (AI generators)
-- - generator_runs (generator history)
-- - events (analytics)
-- - app_flags (feature flags)
-- - auth_tokens (authentication)
-- - sessions (user sessions)
-- - users (user accounts)
-- - users_v2 (enhanced users)
