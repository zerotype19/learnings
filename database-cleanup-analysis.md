# Database Cleanup Analysis

## Tables Currently Being Used (Keep These)

### Core Tables
- `terms_v2` - Main terms table ✅
- `term_submissions` - Term submission queue ✅
- `wall_posts` - Published wall posts ✅
- `wall_submissions` - Wall submission queue ✅
- `wall_votes` - Wall voting system ✅
- `feed_items` - Activity feed ✅
- `votes_v2` - Voting system ✅
- `generators_v2` - AI generators ✅
- `generator_runs` - Generator execution history ✅
- `events` - Analytics tracking ✅
- `app_flags` - Feature flags ✅

### Auth & Users
- `auth_tokens` - Authentication tokens ✅
- `sessions` - User sessions ✅
- `users` - User accounts ✅
- `users_v2` - Enhanced user accounts ✅

### Admin & Moderation
- `term_aliases` - Term aliases ✅
- `term_links` - Related term links ✅

## Tables NOT Being Used (Can Be Removed)

### Legacy Tables
- `terms` - Old terms table (replaced by terms_v2) ❌
- `term_versions` - Not used ❌
- `tags` - Not used ❌
- `term_tags` - Not used ❌
- `votes` - Old voting system (replaced by votes_v2) ❌
- `submissions` - Old submission system ❌
- `wall_items` - Old wall system (replaced by wall_posts) ❌
- `abuse_reports` - Not implemented ❌
- `examples` - Not used ❌
- `comments` - Not implemented ❌
- `shortlinks` - Not used ❌
- `follows` - Not implemented ❌
- `badges` - Not implemented ❌
- `user_badges` - Not implemented ❌
- `notifications` - Not implemented ❌
- `referrals` - Not implemented ❌
- `professor_replies` - Not used ❌
- `shortlink_hits` - Not used ❌

### Challenge System (Not Used)
- `challenges` - Old challenges ❌
- `challenge_entries` - Old challenge entries ❌
- `challenges_v2` - Not used ❌
- `challenge_entries_v2` - Not used ❌
- `challenges_v3` - Not used ❌
- `challenge_entries_v3` - Not used ❌

### Duplicate/Unused Wall Tables
- `wall_votes_v2` - Duplicate of wall_votes ❌

## Cleanup Script

```sql
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

-- Remove unused challenge tables
DROP TABLE IF EXISTS challenges;
DROP TABLE IF EXISTS challenge_entries;
DROP TABLE IF EXISTS challenges_v2;
DROP TABLE IF EXISTS challenge_entries_v2;
DROP TABLE IF EXISTS challenges_v3;
DROP TABLE IF EXISTS challenge_entries_v3;

-- Remove duplicate wall tables
DROP TABLE IF EXISTS wall_votes_v2;
```

## Summary
- **Keep**: 15 tables (core functionality)
- **Remove**: 25+ tables (legacy/unused)
- **Space Savings**: Significant reduction in database size
- **Maintenance**: Easier to maintain with fewer unused tables
