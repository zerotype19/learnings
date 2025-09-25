// Enhanced OpenGraph scraper for Phase 2 wall posts
export async function scrapeOpenGraph(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; LearningsBot/1.0; +https://learnings.org)',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            },
            // Set a reasonable timeout
            signal: AbortSignal.timeout(10000)
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const html = await response.text();
        return parseOpenGraph(html, url);
    }
    catch (error) {
        console.warn(`OG scrape failed for ${url}:`, error);
        return {
            og_title: undefined,
            og_desc: undefined,
            og_image: undefined,
            og_site: undefined
        };
    }
}
function parseOpenGraph(html, url) {
    const data = {};
    // Extract domain for og_site
    try {
        const urlObj = new URL(url);
        data.og_site = urlObj.hostname.replace('www.', '');
    }
    catch {
        data.og_site = undefined;
    }
    // Simple regex-based extraction (more reliable than complex HTML parsing)
    const patterns = {
        og_title: /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i,
        og_desc: /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i,
        og_image: /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i,
        // Fallback to name attribute
        title_name: /<meta[^>]*name=["']title["'][^>]*content=["']([^"']*)["'][^>]*>/i,
        desc_name: /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i,
        // HTML title as fallback
        html_title: /<title[^>]*>([^<]*)<\/title>/i,
    };
    // Try OpenGraph properties first
    data.og_title = extractMeta(html, patterns.og_title) ||
        extractMeta(html, patterns.title_name) ||
        extractMeta(html, patterns.html_title);
    data.og_desc = extractMeta(html, patterns.og_desc) ||
        extractMeta(html, patterns.desc_name);
    data.og_image = extractMeta(html, patterns.og_image);
    // Clean up extracted data
    if (data.og_title) {
        data.og_title = cleanText(data.og_title);
    }
    if (data.og_desc) {
        data.og_desc = cleanText(data.og_desc);
    }
    // Resolve relative image URLs
    if (data.og_image && data.og_image.startsWith('/')) {
        try {
            const baseUrl = new URL(url);
            data.og_image = `${baseUrl.protocol}//${baseUrl.host}${data.og_image}`;
        }
        catch {
            // Keep relative URL as-is if we can't resolve it
        }
    }
    return data;
}
function extractMeta(html, pattern) {
    const match = html.match(pattern);
    return match ? match[1] : undefined;
}
function cleanText(text) {
    return text
        .replace(/\s+/g, ' ') // Normalize whitespace
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .trim()
        .substring(0, 500); // Limit length
}
// Cache wrapper for KV storage
export async function getCachedOG(env, url) {
    try {
        const cacheKey = `og_cache:${url}`;
        const cached = await env.CACHE.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        return null;
    }
    catch (error) {
        console.warn('Cache read failed:', error);
        return null;
    }
}
export async function setCachedOG(env, url, data) {
    try {
        const cacheKey = `og_cache:${url}`;
        await env.CACHE.put(cacheKey, JSON.stringify(data), {
            expirationTtl: 7 * 24 * 60 * 60 // 7 days
        });
    }
    catch (error) {
        console.warn('Cache write failed:', error);
    }
}
