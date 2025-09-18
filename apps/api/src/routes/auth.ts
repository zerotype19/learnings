import { Hono } from "hono";
import { nanoid } from "nanoid";
import { sha256hex } from "../utils/crypto";
import { sendMail } from "../utils/mail";
import { signJWT } from "../utils/jwt";
import type { Env } from '../index';

const auth = new Hono<{ Bindings: Env }>();

auth.post("/magic", async (c) => {
  const { email, action = "signin", meta = {} } = await c.req.json();
  if (!email) return c.text("Email required", 400);
  
  const tok = nanoid(32);
  const hash = await sha256hex(tok);
  await c.env.DB.prepare(
    "INSERT INTO auth_tokens (id,email,token_hash,action,meta_json,created_at) VALUES (?,?,?,?,?,?)"
  ).bind(nanoid(), email.toLowerCase(), hash, action, JSON.stringify(meta), Date.now()).run();

  const base = new URL(c.req.url);
  base.pathname = "/auth/callback";
  base.searchParams.set("token", tok);
  base.searchParams.set("action", action);
  const link = base.toString();

  await sendMail(c.env, email, link);
  return c.json({ ok: true });
});

auth.get("/callback", async (c) => {
  const token = c.req.query("token") || "";
  const action = c.req.query("action") || "signin";
  const hash = await sha256hex(token);
  
  const row = await c.env.DB.prepare("SELECT * FROM auth_tokens WHERE token_hash=? AND used_at IS NULL ORDER BY created_at DESC LIMIT 1")
    .bind(hash).first<any>();
  if (!row) return c.text("Invalid or used link", 400);
  
  // expire after 15m
  if (Date.now() - row.created_at > 15*60*1000) return c.text("Link expired", 400);

  // find or create user
  let user = await c.env.DB.prepare("SELECT * FROM users WHERE email=?").bind(row.email).first<any>();
  if (!user) {
    const id = nanoid();
    const handle = row.email.split("@")[0].replace(/[^a-z0-9]+/g,"-").slice(0,24) + "-" + Math.floor(Math.random()*1000);
    await c.env.DB.prepare(
      "INSERT INTO users (id,email,handle,display_name,role,trust,created_at) VALUES (?,?,?,?, 'member', 0, ?)"
    ).bind(id, row.email, handle, handle, Date.now()).run();
    user = await c.env.DB.prepare("SELECT * FROM users WHERE id=?").bind(id).first<any>();
  }

  // mark token used
  await c.env.DB.prepare("UPDATE auth_tokens SET used_at=? WHERE id=?").bind(Date.now(), row.id).run();

  // issue a simple HMAC JWT
  const payload = { sub: user.id, email: user.email, iat: Date.now(), exp: Date.now()+30*24*3600*1000 };
  const jwt = await signJWT(payload, c.env);

  await c.env.DB.prepare("INSERT INTO sessions (id,user_id,jwt,created_at,expires_at) VALUES (?,?,?,?,?)")
    .bind(nanoid(), user.id, jwt, Date.now(), payload.exp).run();

  const redirect = new URL(c.req.url);
  redirect.pathname = "/";
  redirect.hash = "/auth/complete";
  redirect.search = `?session=${encodeURIComponent(jwt)}&u=${encodeURIComponent(user.handle)}`;
  return c.redirect(redirect.toString(), 302);
});

auth.post("/claim", async (c) => {
  const { fingerprint } = await c.req.json();
  if (!fingerprint) return c.text("Fingerprint required", 400);
  
  const authHeader = c.req.header('Authorization') || '';
  if (!authHeader.startsWith('Bearer ')) return c.text("Unauthorized", 401);
  
  const token = authHeader.substring(7);
  const session = await c.env.DB.prepare('SELECT user_id FROM sessions WHERE jwt=? AND expires_at > ?')
    .bind(token, Date.now()).first<{user_id: string}>();
  
  if (!session) return c.text("Invalid session", 401);
  
  // Claim all anonymous activity
  const userId = session.user_id;
  
  // Update votes
  await c.env.DB.prepare('UPDATE votes SET user_fingerprint=? WHERE user_fingerprint=?')
    .bind(userId, fingerprint).run();
  
  // Update terms
  await c.env.DB.prepare('UPDATE terms SET author_id=? WHERE fingerprint=?')
    .bind(userId, fingerprint).run();
  
  // Update wall items  
  await c.env.DB.prepare('UPDATE wall_items SET submitter_id=? WHERE fingerprint=?')
    .bind(userId, fingerprint).run();
  
  // Update submissions
  await c.env.DB.prepare('UPDATE submissions SET submitter_id=? WHERE fingerprint=?')
    .bind(userId, fingerprint).run();
  
  // Update challenge entries
  await c.env.DB.prepare('UPDATE challenge_entries SET author_id=? WHERE fingerprint=?')
    .bind(userId, fingerprint).run();
  
  return c.json({ ok: true, claimed: true });
});

// LinkedIn OAuth routes
auth.get("/linkedin/start", async (c) => {
  const clientId = c.env.LINKEDIN_CLIENT_ID || "test";
  const redirectUri = encodeURIComponent(new URL("/auth/linkedin/callback", c.req.url).toString());
  const state = nanoid(16);
  
  // Store state for validation (in production, use KV)
  await c.env.CACHE.put(`linkedin_state:${state}`, "valid", { expirationTtl: 600 });
  
  const linkedinUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=r_liteprofile%20r_emailaddress`;
  
  return c.redirect(linkedinUrl, 302);
});

auth.get("/linkedin/callback", async (c) => {
  const code = c.req.query("code");
  const state = c.req.query("state");
  
  if (!code || !state) return c.text("Missing code or state", 400);
  
  // Validate state
  const stateValid = await c.env.CACHE.get(`linkedin_state:${state}`);
  if (!stateValid) return c.text("Invalid state", 400);
  
  try {
    // Exchange code for token
    const clientId = c.env.LINKEDIN_CLIENT_ID || "test";
    const clientSecret = c.env.LINKEDIN_CLIENT_SECRET || "test";
    const redirectUri = new URL("/auth/linkedin/callback", c.req.url).toString();
    
    const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }).toString()
    });
    
    const tokenData = await tokenResponse.json() as any;
    if (!tokenData.access_token) return c.text("Failed to get access token", 400);
    
    // Get user profile
    const profileResponse = await fetch("https://api.linkedin.com/v2/people/~:(id,firstName,lastName,profilePicture(displayImage~:playableStreams))", {
      headers: { "Authorization": `Bearer ${tokenData.access_token}` }
    });
    const profile = await profileResponse.json() as any;
    
    // Get email
    const emailResponse = await fetch("https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))", {
      headers: { "Authorization": `Bearer ${tokenData.access_token}` }
    });
    const emailData = await emailResponse.json() as any;
    const email = emailData.elements?.[0]?.['handle~']?.emailAddress;
    
    if (!email) return c.text("Failed to get email", 400);
    
    // Find or create user (same logic as magic link)
    let user = await c.env.DB.prepare("SELECT * FROM users WHERE email=?").bind(email).first<any>();
    if (!user) {
      const id = nanoid();
      const firstName = profile.firstName?.localized?.en_US || '';
      const lastName = profile.lastName?.localized?.en_US || '';
      const displayName = `${firstName} ${lastName}`.trim() || email.split('@')[0];
      const handle = email.split("@")[0].replace(/[^a-z0-9]+/g,"-").slice(0,24) + "-" + Math.floor(Math.random()*1000);
      
      await c.env.DB.prepare(
        "INSERT INTO users (id,email,handle,display_name,role,trust,created_at) VALUES (?,?,?,?, 'member', 0, ?)"
      ).bind(id, email, handle, displayName, Date.now()).run();
      user = await c.env.DB.prepare("SELECT * FROM users WHERE id=?").bind(id).first<any>();
    }
    
    // Issue JWT session (same as magic link)
    const payload = { sub: user.id, email: user.email, iat: Date.now(), exp: Date.now()+30*24*3600*1000 };
    const jwt = await signJWT(payload, c.env);
    
    await c.env.DB.prepare("INSERT INTO sessions (id,user_id,jwt,created_at,expires_at) VALUES (?,?,?,?,?)")
      .bind(nanoid(), user.id, jwt, Date.now(), payload.exp).run();
    
    const redirect = new URL(c.req.url);
    redirect.pathname = "/";
    redirect.hash = "/auth/complete";
    redirect.search = `?session=${encodeURIComponent(jwt)}&u=${encodeURIComponent(user.handle)}`;
    return c.redirect(redirect.toString(), 302);
    
  } catch (error) {
    console.error('LinkedIn OAuth error:', error);
    return c.text("OAuth failed", 500);
  }
});

export default auth;
