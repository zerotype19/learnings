import { Hono } from 'hono';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { getFingerprint } from '../utils/auth';
const router = new Hono();
const VoteSchema = z.object({
    entity_type: z.enum(['wall', 'entry', 'term_link']),
    entity_id: z.string().min(1),
});
// Universal vote endpoint
router.post('/', async (c) => {
    try {
        const body = await c.req.json();
        const parsed = VoteSchema.safeParse(body);
        if (!parsed.success) {
            return c.json({ error: parsed.error.flatten() }, 400);
        }
        const { entity_type, entity_id } = parsed.data;
        const fingerprint = getFingerprint(c);
        // Check if user already voted
        const existingVote = await c.env.DB.prepare('SELECT id FROM votes_v2 WHERE entity_type = ? AND entity_id = ? AND user_id = ?').bind(entity_type, entity_id, fingerprint).first();
        if (existingVote) {
            return c.json({ error: 'Already voted' }, 400);
        }
        // Add vote
        const voteId = nanoid();
        const now = new Date().toISOString();
        await c.env.DB.prepare('INSERT INTO votes_v2 (id, entity_type, entity_id, user_id, created_at) VALUES (?, ?, ?, ?, ?)').bind(voteId, entity_type, entity_id, fingerprint, now).run();
        // Update vote count based on entity type
        if (entity_type === 'wall') {
            const post = await c.env.DB.prepare('SELECT created_at, vote_count FROM wall_posts WHERE id = ?').bind(entity_id).first();
            if (post) {
                const newVoteCount = (post.vote_count || 0) + 1;
                // Calculate hot score: vote_count / (hours_since_post + 2)^1.5
                const hoursSincePost = (Date.now() - new Date(post.created_at).getTime()) / (1000 * 60 * 60);
                const hotScore = newVoteCount / Math.pow(hoursSincePost + 2, 1.5);
                await c.env.DB.prepare('UPDATE wall_posts SET vote_count = ?, hot_score = ?, last_activity_at = ? WHERE id = ?').bind(newVoteCount, hotScore, now, entity_id).run();
                return c.json({
                    ok: true,
                    vote_count: newVoteCount,
                    hot_score: hotScore,
                    message: 'Vote recorded'
                });
            }
        }
        else if (entity_type === 'challenge_entry') {
            // Handle challenge entries (v3)
            const entry = await c.env.DB.prepare('SELECT created_at, votes FROM challenge_entries_v3 WHERE id = ?').bind(entity_id).first();
            if (entry) {
                const newVoteCount = (entry.votes || 0) + 1;
                // Calculate hot score: vote_count / (hours_since_post + 2)^1.5
                const hoursSincePost = (Date.now() - new Date(entry.created_at).getTime()) / (1000 * 60 * 60);
                const hotScore = newVoteCount / Math.pow(hoursSincePost + 2, 1.5);
                await c.env.DB.prepare('UPDATE challenge_entries_v3 SET votes = ?, hot_score = ? WHERE id = ?').bind(newVoteCount, hotScore, entity_id).run();
                return c.json({
                    ok: true,
                    vote_count: newVoteCount,
                    hot_score: hotScore,
                    message: 'Vote recorded'
                });
            }
        }
        else if (entity_type === 'entry') {
            // Handle legacy challenge entries (v2)
            await c.env.DB.prepare('UPDATE challenge_entries_v2 SET votes = votes + 1 WHERE id = ?').bind(entity_id).run();
            const entry = await c.env.DB.prepare('SELECT votes FROM challenge_entries_v2 WHERE id = ?').bind(entity_id).first();
            return c.json({
                ok: true,
                vote_count: entry?.votes || 0,
                message: 'Vote recorded'
            });
        }
        else if (entity_type === 'term_link') {
            // Handle term links
            await c.env.DB.prepare('UPDATE term_links SET votes = votes + 1 WHERE id = ?').bind(entity_id).run();
            const link = await c.env.DB.prepare('SELECT votes FROM term_links WHERE id = ?').bind(entity_id).first();
            return c.json({
                ok: true,
                vote_count: link?.votes || 0,
                message: 'Vote recorded'
            });
        }
        return c.json({
            ok: true,
            message: 'Vote recorded'
        });
    }
    catch (error) {
        console.error('Vote error:', error);
        return c.json({ error: 'Vote failed' }, 500);
    }
});
export default router;
