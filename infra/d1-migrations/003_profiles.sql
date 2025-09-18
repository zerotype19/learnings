ALTER TABLE users ADD COLUMN bio TEXT;
ALTER TABLE users ADD COLUMN avatar_key TEXT;
ALTER TABLE users ADD COLUMN links_json TEXT; -- JSON array of {label,url}
ALTER TABLE users ADD COLUMN ref_code TEXT;   -- vanity referral code
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_ref_code ON users(ref_code);
