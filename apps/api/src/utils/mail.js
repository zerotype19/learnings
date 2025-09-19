export async function sendMail(env, to, link) {
    const payload = {
        personalizations: [{ to: [{ email: to }] }],
        from: { email: "signin@learnings.org", name: "Learnings" },
        subject: "Your Learnings sign-in link",
        content: [{
                type: "text/html",
                value: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #0B0D12; font-size: 24px; margin-bottom: 16px;">Welcome to Learnings Dot Org</h1>
          <p style="color: #666; margin-bottom: 24px;">Click the button below to sign in. This link expires in 15 minutes.</p>
          <a href="${link}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 12px; font-weight: 600;">
            Sign in to Learnings
          </a>
          <p style="color: #999; font-size: 12px; margin-top: 24px;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `
            }]
    };
    try {
        await fetch("https://api.mailchannels.net/tx/v1/send", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload)
        });
    }
    catch (error) {
        console.error('Failed to send email:', error);
        // In development, just log the link
        console.log('Magic link (dev):', link);
    }
}
