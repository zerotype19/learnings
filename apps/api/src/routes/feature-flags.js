import { Hono } from 'hono';
const router = new Hono();
// Get feature flag status
router.get('/:key', async (c) => {
    try {
        const key = c.req.param('key');
        const stmt = c.env.DB.prepare('SELECT value FROM app_flags WHERE key = ?');
        const result = await stmt.first();
        if (!result) {
            return c.json({ enabled: false, error: 'Flag not found' }, 404);
        }
        try {
            const parsed = JSON.parse(result.value);
            return c.json({ enabled: parsed.enabled === true });
        }
        catch {
            // Fallback for simple string values
            return c.json({ enabled: result.value === 'true' });
        }
    }
    catch (error) {
        console.error('Feature flag error:', error);
        return c.json({ enabled: false, error: 'Database error' }, 500);
    }
});
// List all feature flags (admin only)
router.get('/', async (c) => {
    try {
        const stmt = c.env.DB.prepare('SELECT key, value, description FROM app_flags ORDER BY key');
        const { results } = await stmt.all();
        const flags = (results || []).map((row) => ({
            key: row.key,
            value: row.value,
            description: row.description,
            enabled: (() => {
                try {
                    const parsed = JSON.parse(row.value);
                    return parsed.enabled === true;
                }
                catch {
                    return row.value === 'true';
                }
            })()
        }));
        return c.json({ flags });
    }
    catch (error) {
        console.error('Feature flags list error:', error);
        return c.json({ flags: [], error: 'Database error' }, 500);
    }
});
export default router;
