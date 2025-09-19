export async function checkRate(env, key, limit = 20, windowSec = 60) {
    const now = Math.floor(Date.now() / 1000);
    const bucket = `rl:${key}:${Math.floor(now / windowSec)}`;
    const cur = Number((await env.CACHE.get(bucket)) || '0');
    if (cur >= limit)
        return false;
    await env.CACHE.put(bucket, String(cur + 1), { expirationTtl: windowSec });
    return true;
}
