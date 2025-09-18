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

export default auth;
