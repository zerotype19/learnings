import type { Env } from '../index';

function b64url(s: string) { 
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); 
}

export async function signJWT(payload: any, env: Env) {
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = b64url(JSON.stringify(payload));
  const data = `${header}.${body}`;
  
  const secret = env.JWT_SECRET || "dev-secret-key-change-in-production";
  const key = await crypto.subtle.importKey(
    "raw", 
    new TextEncoder().encode(secret), 
    { name: "HMAC", hash: "SHA-256" }, 
    false, 
    ["sign"]
  );
  
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  const sigB64 = b64url(String.fromCharCode(...new Uint8Array(sig)));
  return `${data}.${sigB64}`;
}
