export async function requireAuth(c) {
    // Check for cookie first, then fallback to Authorization header
    const cookie = c.req.header('cookie') || '';
    const cookieMatch = cookie.match(/(?:^|; )session=([^;]+)/);
    const auth = c.req.header('Authorization') || '';
    const token = cookieMatch?.[1] || (auth.startsWith('Bearer ') ? auth.substring(7) : null);
    if (!token)
        return null;
    // Simple JWT validation - in production you'd verify the signature
    try {
        const parts = token.split('.');
        if (parts.length !== 3)
            return null;
        const payload = JSON.parse(atob(parts[1]));
        if (payload.exp < Date.now())
            return null;
        // Check if session exists and is valid
        const session = await c.env.DB.prepare('SELECT user_id FROM sessions WHERE jwt=? AND expires_at > ?')
            .bind(token, Date.now()).first();
        if (!session)
            return null;
        return { userId: session.user_id, jwt: token };
    }
    catch {
        return null;
    }
}
export function getFingerprint(c) {
    return c.req.header('X-Fingerprint') || 'anon';
}
