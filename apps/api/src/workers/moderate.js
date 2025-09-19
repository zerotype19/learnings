export async function moderateWall(env, id, key) {
    try {
        // 1) fetch image from R2
        const obj = await env.R2.get(key);
        if (!obj)
            return;
        const buf = await obj.arrayBuffer();
        // 2) run lightweight detection via Workers AI (placeholder)
        // NOTE: Replace with real model later; store results only
        const results = {
            faces: Math.random() > 0.7 ? 1 : 0,
            textBoxes: Math.random() > 0.8 ? 1 : 0,
            piiRisk: Math.random() > 0.9 ? 1 : 0
        };
        // 3) if risk>0, mark flagged and add notes
        const flagged = results.faces > 0 || results.textBoxes > 0 || results.piiRisk > 0 ? 1 : 0;
        await env.DB.prepare('UPDATE wall_items SET flagged=?, moderation_notes=? WHERE id=?')
            .bind(flagged, JSON.stringify(results), id).run();
        console.log(`Moderated wall item ${id}: flagged=${flagged}, results=${JSON.stringify(results)}`);
    }
    catch (error) {
        console.error('Moderation failed for', id, error);
    }
}
