import type { Context } from 'hono';
import type { Env } from '../index';

export async function requireAuth(c: Context<{ Bindings: Env }>) {
  const auth = c.req.header('Authorization') || '';
  if (!auth.startsWith('Bearer ')) {
    return null;
  }
  
  const token = auth.substring(7);
  // Simple JWT validation - in production you'd verify the signature
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp < Date.now()) return null;
    
    // Check if session exists and is valid
    const session = await c.env.DB.prepare('SELECT user_id FROM sessions WHERE jwt=? AND expires_at > ?')
      .bind(token, Date.now()).first<{user_id: string}>();
    
    if (!session) return null;
    
    return { userId: session.user_id, jwt: token };
  } catch {
    return null;
  }
}

export function getFingerprint(c: Context) {
  return c.req.header('X-Fingerprint') || 'anon';
}
