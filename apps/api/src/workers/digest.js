export async function sendWeeklyDigest(env) {
    try {
        // Get top terms from this week
        const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const topTerms = await env.DB.prepare(`
      SELECT t.title, t.definition, t.slug, COUNT(v.id) as votes
      FROM terms t
      LEFT JOIN votes v ON v.term_id = t.id AND v.created_at >= ?
      GROUP BY t.id
      ORDER BY votes DESC
      LIMIT 5
    `).bind(oneWeekAgo).all();
        // Get users who opted in for digests
        const users = await env.DB.prepare(`
      SELECT email, handle, display_name 
      FROM users 
      WHERE email IS NOT NULL 
      AND (bio IS NULL OR bio NOT LIKE '%no-digest%')
      LIMIT 100
    `).all();
        const terms = topTerms.results;
        if (!terms.length)
            return;
        // Generate digest content
        const subject = "Weekly Buzzword Roundup — Peak Corporate Excellence";
        const content = `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #0B0D12; font-size: 24px; margin-bottom: 16px;">This Week's Corporate Excellence</h1>
        <p style="color: #666; margin-bottom: 24px;">The most operationalized buzzwords from your fellow thought leaders:</p>
        
        ${terms.map((term, i) => `
          <div style="margin-bottom: 20px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 12px;">
            <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #0B0D12;">#${i + 1} ${term.title}</h3>
            <p style="margin: 0 0 8px 0; color: #666; line-height: 1.5;">${term.definition}</p>
            <p style="margin: 0; font-size: 12px; color: #999;">${term.votes} reactions this week</p>
          </div>
        `).join('')}
        
        <div style="margin-top: 32px; padding: 16px; background: #f9fafb; border-radius: 12px; text-align: center;">
          <p style="margin: 0 0 16px 0; color: #666;">Ready to contribute your own corporate wisdom?</p>
          <a href="https://learnings.org/#/suggest" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 12px; font-weight: 600;">
            Submit Your Buzzword
          </a>
        </div>
        
        <p style="color: #999; font-size: 12px; margin-top: 24px; text-align: center;">
          Unsubscribe by adding "no-digest" to your profile bio.
        </p>
      </div>
    `;
        // Send to all users (in production, batch this)
        for (const user of users.results) {
            try {
                await sendDigestEmail(env, user.email, subject, content);
                await new Promise(resolve => setTimeout(resolve, 100)); // Rate limiting
            }
            catch (error) {
                console.error('Failed to send digest to', user.email, error);
            }
        }
        console.log(`Sent weekly digest to ${users.results.length} users`);
    }
    catch (error) {
        console.error('Weekly digest failed:', error);
    }
}
async function sendDigestEmail(env, to, subject, content) {
    const payload = {
        personalizations: [{ to: [{ email: to }] }],
        from: { email: "digest@learnings.org", name: "Learnings Weekly" },
        subject,
        content: [{
                type: "text/html",
                value: content
            }]
    };
    await fetch("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
    });
}
