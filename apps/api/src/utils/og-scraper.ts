import type { Env } from '../index';

export type OGData = {
  og_title?: string;
  og_desc?: string;
  og_image?: string;
  og_site?: string;
};

export async function scrapeOG(env: Env, url: string): Promise<OGData> {
  const cacheKey = `og_cache:${url}`;
  
  // Check KV cache first
  const cached = await env.CACHE.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  try {
    // Fetch the URL
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Learnings.org Bot/1.0 (+https://learnings.org)'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const ogData = extractOGTags(html, url);

    // Cache for 24 hours
    await env.CACHE.put(cacheKey, JSON.stringify(ogData), { expirationTtl: 86400 });

    return ogData;
  } catch (error) {
    console.error('OG scraping failed for', url, error);
    
    // Return fallback data
    const fallback = {
      og_title: extractDomainName(url),
      og_desc: 'Content from ' + extractDomainName(url),
      og_site: extractDomainName(url)
    };

    // Cache fallback for 1 hour to avoid repeated failures
    await env.CACHE.put(cacheKey, JSON.stringify(fallback), { expirationTtl: 3600 });

    return fallback;
  }
}

function extractOGTags(html: string, url: string): OGData {
  const ogData: OGData = {};

  // Extract title
  const titleMatch = html.match(/<meta[^>]*property=["\']og:title["\'][^>]*content=["\']([^"\']*)["\'][^>]*>/i) ||
                    html.match(/<meta[^>]*content=["\']([^"\']*)["\'][^>]*property=["\']og:title["\'][^>]*>/i) ||
                    html.match(/<title[^>]*>([^<]*)<\/title>/i);
  if (titleMatch) {
    ogData.og_title = titleMatch[1].trim();
  }

  // Extract description
  const descMatch = html.match(/<meta[^>]*property=["\']og:description["\'][^>]*content=["\']([^"\']*)["\'][^>]*>/i) ||
                   html.match(/<meta[^>]*content=["\']([^"\']*)["\'][^>]*property=["\']og:description["\'][^>]*>/i) ||
                   html.match(/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']*)["\'][^>]*>/i);
  if (descMatch) {
    ogData.og_desc = descMatch[1].trim();
  }

  // Extract image
  const imageMatch = html.match(/<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']*)["\'][^>]*>/i) ||
                    html.match(/<meta[^>]*content=["\']([^"\']*)["\'][^>]*property=["\']og:image["\'][^>]*>/i);
  if (imageMatch) {
    let imageUrl = imageMatch[1].trim();
    // Make relative URLs absolute
    if (imageUrl.startsWith('/')) {
      const urlObj = new URL(url);
      imageUrl = `${urlObj.protocol}//${urlObj.host}${imageUrl}`;
    }
    ogData.og_image = imageUrl;
  }

  // Extract site name
  const siteMatch = html.match(/<meta[^>]*property=["\']og:site_name["\'][^>]*content=["\']([^"\']*)["\'][^>]*>/i) ||
                   html.match(/<meta[^>]*content=["\']([^"\']*)["\'][^>]*property=["\']og:site_name["\'][^>]*>/i);
  if (siteMatch) {
    ogData.og_site = siteMatch[1].trim();
  } else {
    ogData.og_site = extractDomainName(url);
  }

  return ogData;
}

function extractDomainName(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch {
    return 'Unknown Site';
  }
}

export function calculateHotScore(votes: number, createdAt: string): number {
  const hoursAgo = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
  return votes / Math.pow(hoursAgo + 2, 1.5);
}
