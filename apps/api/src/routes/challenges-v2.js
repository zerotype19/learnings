import { Hono } from 'hono';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { requireAuth, getFingerprint } from '../utils/auth';
const challengesV2 = new Hono();
// GET /api/challenges - List all challenges
challengesV2.get('/', async (c) => {
    try {
        const { results } = await c.env.DB.prepare(`
      SELECT c.*, COUNT(ce.id) as entry_count
      FROM challenges_v3 c
      LEFT JOIN challenge_entries_v3 ce ON c.id = ce.challenge_id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `).all();
        const items = (results || []).map((challenge) => ({
            id: challenge.id,
            slug: challenge.slug,
            title: challenge.title,
            brief: challenge.brief,
            starts_at: challenge.starts_at,
            ends_at: challenge.ends_at,
            status: challenge.status,
            entry_count: challenge.entry_count || 0,
            created_at: challenge.created_at
        }));
        return c.json({ items });
    }
    catch (error) {
        console.error('Failed to load challenges:', error);
        return c.json({ error: 'Failed to load challenges' }, 500);
    }
});
// GET /api/challenges/:id/entries - Get entries for a challenge
challengesV2.get('/:id/entries', async (c) => {
    const { id } = c.req.param();
    try {
        const { results } = await c.env.DB.prepare(`
      SELECT id, challenge_id, title, body, source_url, media_url, 
             related_terms, votes, hot_score, created_at, fingerprint
      FROM challenge_entries_v3 
      WHERE challenge_id = ?
      ORDER BY hot_score DESC, created_at DESC
    `).bind(id).all();
        const items = (results || []).map((entry) => ({
            id: entry.id,
            challenge_id: entry.challenge_id,
            title: entry.title,
            body: entry.body,
            source_url: entry.source_url,
            media_url: entry.media_url,
            related_terms: JSON.parse(entry.related_terms || '[]'),
            votes: entry.votes,
            hot_score: entry.hot_score,
            created_at: entry.created_at,
            fingerprint: entry.fingerprint
        }));
        return c.json({ items });
    }
    catch (error) {
        console.error('Failed to load challenge entries:', error);
        return c.json({ error: 'Failed to load challenge entries' }, 500);
    }
});
// POST /api/challenges/:id/entries - Submit entry to challenge
const SubmitEntrySchema = z.object({
    title: z.string().optional(),
    body: z.string().min(1, 'Entry body is required'),
    source_url: z.string().url().optional(),
    media_url: z.string().url().optional(),
    related_terms: z.array(z.string()).optional()
});
challengesV2.post('/:id/entries', async (c) => {
    const { id } = c.req.param();
    const body = await c.req.json();
    const parsed = SubmitEntrySchema.safeParse(body);
    if (!parsed.success) {
        return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
    }
    // Check if challenge exists and is active
    const challenge = await c.env.DB.prepare(`
    SELECT id, status, starts_at, ends_at FROM challenges_v3 WHERE id = ?
  `).bind(id).first();
    if (!challenge) {
        return c.json({ error: 'Challenge not found' }, 404);
    }
    if (challenge.status !== 'active') {
        return c.json({ error: 'Challenge is not currently active' }, 400);
    }
    // Check if challenge is still open
    const now = new Date().toISOString();
    if (now > challenge.ends_at) {
        return c.json({ error: 'Challenge has ended' }, 400);
    }
    const auth = await requireAuth(c);
    const fingerprint = getFingerprint(c);
    const data = parsed.data;
    try {
        // Create entry
        const entryId = nanoid();
        await c.env.DB.prepare(`
      INSERT INTO challenge_entries_v3 
      (id, challenge_id, user_id, fingerprint, title, body, source_url, media_url, related_terms, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(entryId, id, auth?.userId || null, fingerprint, data.title || null, data.body, data.source_url || null, data.media_url || null, JSON.stringify(data.related_terms || [])).run();
        // Add to feed
        await c.env.DB.prepare(`
      INSERT OR REPLACE INTO feed_items (id, type, entity_id, ts, summary, created_at)
      VALUES (?, 'challenge', ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(nanoid(), entryId, now, `New challenge entry: ${data.title || data.body.substring(0, 50)}...`).run();
        return c.json({
            id: entryId,
            challenge_id: id,
            title: data.title,
            body: data.body,
            source_url: data.source_url,
            media_url: data.media_url,
            related_terms: data.related_terms || [],
            votes: 0,
            hot_score: 0,
            created_at: now
        });
    }
    catch (error) {
        console.error('Failed to submit challenge entry:', error);
        return c.json({ error: 'Failed to submit entry' }, 500);
    }
});
// GET /api/challenges/:id - Get specific challenge details
challengesV2.get('/:id', async (c) => {
    const { id } = c.req.param();
    try {
        const challenge = await c.env.DB.prepare(`
      SELECT c.*, COUNT(ce.id) as entry_count
      FROM challenges_v3 c
      LEFT JOIN challenge_entries_v3 ce ON c.id = ce.challenge_id
      WHERE c.id = ?
      GROUP BY c.id
    `).bind(id).first();
        if (!challenge) {
            return c.json({ error: 'Challenge not found' }, 404);
        }
        return c.json({
            id: challenge.id,
            slug: challenge.slug,
            title: challenge.title,
            brief: challenge.brief,
            starts_at: challenge.starts_at,
            ends_at: challenge.ends_at,
            status: challenge.status,
            entry_count: challenge.entry_count || 0,
            created_at: challenge.created_at
        });
    }
    catch (error) {
        console.error('Failed to load challenge:', error);
        return c.json({ error: 'Failed to load challenge' }, 500);
    }
});
// POST /api/challenges - Create new challenge (admin only)
const CreateChallengeSchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    brief: z.string().min(1),
    starts_at: z.string(),
    ends_at: z.string(),
    status: z.enum(['scheduled', 'active', 'closed']).optional()
});
challengesV2.post('/', async (c) => {
    const auth = await requireAuth(c);
    // TODO: Add admin check when admin system is ready
    if (!auth) {
        return c.json({ error: 'Authentication required' }, 401);
    }
    const body = await c.req.json();
    const parsed = CreateChallengeSchema.safeParse(body);
    if (!parsed.success) {
        return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
    }
    try {
        const challengeId = nanoid();
        const data = parsed.data;
        await c.env.DB.prepare(`
      INSERT INTO challenges_v3 
      (id, slug, title, brief, starts_at, ends_at, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(challengeId, data.slug, data.title, data.brief, data.starts_at, data.ends_at, data.status || 'scheduled').run();
        return c.json({
            id: challengeId,
            slug: data.slug,
            title: data.title,
            brief: data.brief,
            starts_at: data.starts_at,
            ends_at: data.ends_at,
            status: data.status || 'scheduled',
            entry_count: 0,
            created_at: new Date().toISOString()
        });
    }
    catch (error) {
        console.error('Failed to create challenge:', error);
        return c.json({ error: 'Failed to create challenge' }, 500);
    }
});
// PUT /api/challenges/:id/status - Update challenge status (admin only)
challengesV2.put('/:id/status', async (c) => {
    const { id } = c.req.param();
    const { status } = await c.req.json();
    if (!['scheduled', 'active', 'closed'].includes(status)) {
        return c.json({ error: 'Invalid status' }, 400);
    }
    const auth = await requireAuth(c);
    // TODO: Add admin check when admin system is ready
    if (!auth) {
        return c.json({ error: 'Authentication required' }, 401);
    }
    try {
        await c.env.DB.prepare(`
      UPDATE challenges_v3 
      SET status = ? 
      WHERE id = ?
    `).bind(status, id).run();
        return c.json({ success: true, status });
    }
    catch (error) {
        console.error('Failed to update challenge status:', error);
        return c.json({ error: 'Failed to update status' }, 500);
    }
});
// GET /api/challenges/:id/leaderboard - Get leaderboard for challenge
challengesV2.get('/:id/leaderboard', async (c) => {
    const { id } = c.req.param();
    const limit = parseInt(c.req.query('limit') || '10');
    try {
        const { results } = await c.env.DB.prepare(`
      SELECT 
        fingerprint,
        COUNT(*) as entries_count,
        SUM(votes) as total_votes,
        AVG(hot_score) as avg_hot_score,
        MAX(hot_score) as best_score,
        (
          SELECT id FROM challenge_entries_v3 ce2 
          WHERE ce2.fingerprint = ce.fingerprint 
          AND ce2.challenge_id = ?
          ORDER BY ce2.hot_score DESC 
          LIMIT 1
        ) as best_entry_id
      FROM challenge_entries_v3 ce
      WHERE challenge_id = ?
      GROUP BY fingerprint
      ORDER BY total_votes DESC, avg_hot_score DESC
      LIMIT ?
    `).bind(id, id, limit).all();
        // Get best entry details for each user
        const items = await Promise.all((results || []).map(async (user) => {
            let bestEntry = null;
            if (user.best_entry_id) {
                const entry = await c.env.DB.prepare(`
          SELECT id, title, body, votes, hot_score
          FROM challenge_entries_v3 
          WHERE id = ?
        `).bind(user.best_entry_id).first();
                if (entry) {
                    bestEntry = {
                        id: entry.id,
                        title: entry.title,
                        body: entry.body,
                        votes: entry.votes,
                        hot_score: entry.hot_score
                    };
                }
            }
            return {
                fingerprint: user.fingerprint,
                total_votes: user.total_votes || 0,
                entries_count: user.entries_count || 0,
                avg_hot_score: user.avg_hot_score || 0,
                best_entry: bestEntry
            };
        }));
        return c.json({ items });
    }
    catch (error) {
        console.error('Failed to load leaderboard:', error);
        return c.json({ error: 'Failed to load leaderboard' }, 500);
    }
});
export default challengesV2;
