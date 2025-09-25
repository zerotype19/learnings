import { Hono } from 'hono';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { requireAuth, getFingerprint } from '../utils/auth';
const challenges = new Hono();
// GET /api/challenges/active - Get current active challenge
challenges.get('/active', async (c) => {
    try {
        const challenge = await c.env.DB.prepare(`
      SELECT * FROM challenges_v3 
      WHERE status = 'active' 
        AND datetime('now') BETWEEN starts_at AND ends_at
      ORDER BY created_at DESC
      LIMIT 1
    `).first();
        if (!challenge) {
            return c.json({ challenge: null });
        }
        // Get entry count for this challenge
        const { count } = await c.env.DB.prepare(`
      SELECT COUNT(*) as count FROM challenge_entries_v3 
      WHERE challenge_id = ?
    `).bind(challenge.id).first();
        return c.json({
            challenge: {
                ...challenge,
                entry_count: count || 0
            }
        });
    }
    catch (error) {
        console.error('Active challenge error:', error);
        return c.json({ challenge: null, error: 'Failed to load active challenge' }, 500);
    }
});
// GET /api/challenges - List all challenges
challenges.get('/', async (c) => {
    const status = c.req.query('status') || '';
    const limit = Math.min(parseInt(c.req.query('limit') || '20'), 50);
    const cursor = c.req.query('cursor') || '';
    try {
        let query = `
      SELECT c.*, COUNT(ce.id) as entry_count 
      FROM challenges_v3 c
      LEFT JOIN challenge_entries_v3 ce ON c.id = ce.challenge_id
    `;
        const params = [];
        if (status && ['scheduled', 'active', 'closed'].includes(status)) {
            query += ` WHERE c.status = ?`;
            params.push(status);
        }
        if (cursor) {
            query += status ? ` AND` : ` WHERE`;
            query += ` c.created_at < ?`;
            params.push(cursor);
        }
        query += ` GROUP BY c.id ORDER BY c.created_at DESC LIMIT ?`;
        params.push(limit);
        const { results } = await c.env.DB.prepare(query).bind(...params).all();
        // Generate next cursor
        let nextCursor = null;
        if (results && results.length === limit) {
            nextCursor = results[results.length - 1].created_at;
        }
        return c.json({
            items: results || [],
            nextCursor
        });
    }
    catch (error) {
        console.error('Challenges list error:', error);
        return c.json({ items: [], nextCursor: null, error: 'Failed to load challenges' }, 500);
    }
});
// GET /api/challenges/:slug - Get challenge detail with entries
challenges.get('/:slug', async (c) => {
    const { slug } = c.req.param();
    const sort = c.req.query('sort') || 'new'; // new | hot
    const limit = Math.min(parseInt(c.req.query('limit') || '20'), 50);
    const cursor = c.req.query('cursor') || '';
    try {
        // Get challenge
        const challenge = await c.env.DB.prepare(`
      SELECT * FROM challenges_v3 WHERE slug = ?
    `).bind(slug).first();
        if (!challenge) {
            return c.json({ error: 'Challenge not found' }, 404);
        }
        // Get entries with sorting
        let entriesQuery = `
      SELECT * FROM challenge_entries_v3 
      WHERE challenge_id = ?
    `;
        const entriesParams = [challenge.id];
        if (cursor) {
            entriesQuery += ` AND created_at < ?`;
            entriesParams.push(cursor);
        }
        if (sort === 'hot') {
            entriesQuery += ` ORDER BY hot_score DESC, created_at DESC`;
        }
        else {
            entriesQuery += ` ORDER BY created_at DESC`;
        }
        entriesQuery += ` LIMIT ?`;
        entriesParams.push(limit);
        const { results: entries } = await c.env.DB.prepare(entriesQuery).bind(...entriesParams).all();
        // Generate next cursor
        let nextCursor = null;
        if (entries && entries.length === limit) {
            nextCursor = entries[entries.length - 1].created_at;
        }
        return c.json({
            challenge,
            entries: entries || [],
            nextCursor
        });
    }
    catch (error) {
        console.error('Challenge detail error:', error);
        return c.json({ error: 'Failed to load challenge' }, 500);
    }
});
// POST /api/challenges/:id/submit - Submit entry to challenge
const SubmitEntrySchema = z.object({
    title: z.string().min(1).max(200),
    body: z.string().optional(),
    source_url: z.string().url().optional(),
    media_url: z.string().url().optional(),
    related_terms: z.array(z.string()).optional()
});
challenges.post('/:id/submit', async (c) => {
    const { id } = c.req.param();
    const body = await c.req.json();
    const parsed = SubmitEntrySchema.safeParse(body);
    if (!parsed.success) {
        return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
    }
    try {
        // Check if challenge exists and is active
        const challenge = await c.env.DB.prepare(`
      SELECT * FROM challenges_v3 
      WHERE id = ? AND status = 'active'
        AND datetime('now') BETWEEN starts_at AND ends_at
    `).bind(id).first();
        if (!challenge) {
            return c.json({ error: 'Challenge not found or not active' }, 404);
        }
        const auth = await requireAuth(c);
        const fingerprint = getFingerprint(c);
        const data = parsed.data;
        // Create entry
        const entryId = nanoid();
        await c.env.DB.prepare(`
      INSERT INTO challenge_entries_v3 
      (id, challenge_id, user_id, fingerprint, title, body, source_url, media_url, related_terms, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(entryId, challenge.id, auth?.userId || null, fingerprint, data.title, data.body || null, data.source_url || null, data.media_url || null, JSON.stringify(data.related_terms || [])).run();
        // Add to feed
        await c.env.DB.prepare(`
      INSERT OR REPLACE INTO feed_items (id, type, entity_id, ts, summary, created_at)
      VALUES (?, 'challenge_entry', ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(nanoid(), entryId, new Date().toISOString(), `New entry in ${challenge.title}: ${data.title}`).run();
        return c.json({
            id: entryId,
            challenge_slug: challenge.slug,
            message: 'Entry submitted successfully'
        });
    }
    catch (error) {
        console.error('Challenge submit error:', error);
        return c.json({ error: 'Failed to submit entry' }, 500);
    }
});
// GET /api/challenges/:slug/entries - Get entries for a specific challenge (alternative endpoint)
challenges.get('/:slug/entries', async (c) => {
    const { slug } = c.req.param();
    const sort = c.req.query('sort') || 'new';
    const limit = Math.min(parseInt(c.req.query('limit') || '20'), 50);
    try {
        const challenge = await c.env.DB.prepare(`
      SELECT id FROM challenges_v3 WHERE slug = ?
    `).bind(slug).first();
        if (!challenge) {
            return c.json({ error: 'Challenge not found' }, 404);
        }
        let query = `
      SELECT * FROM challenge_entries_v3 
      WHERE challenge_id = ?
    `;
        if (sort === 'hot') {
            query += ` ORDER BY hot_score DESC, created_at DESC`;
        }
        else {
            query += ` ORDER BY created_at DESC`;
        }
        query += ` LIMIT ?`;
        const { results } = await c.env.DB.prepare(query).bind(challenge.id, limit).all();
        return c.json({
            entries: results || []
        });
    }
    catch (error) {
        console.error('Challenge entries error:', error);
        return c.json({ entries: [], error: 'Failed to load entries' }, 500);
    }
});
export default challenges;
