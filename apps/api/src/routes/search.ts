import { Hono } from 'hono';
import type { Env } from '../index';

const search = new Hono<{ Bindings: Env }>();

// GET /api/search - Global search across all content
search.get('/', async (c) => {
  const query = c.req.query('q')?.trim();
  const type = c.req.query('type') || 'all'; // all, terms, wall, generators, challenges
  const limit = Math.min(parseInt(c.req.query('limit') || '20'), 50);

  if (!query || query.length < 2) {
    return c.json({ 
      items: [],
      total: 0,
      query: query || ''
    });
  }

  const results: any[] = [];
  const searchPattern = `%${query}%`;

  try {
    // Search terms
    if (type === 'all' || type === 'terms') {
      const { results: termResults } = await c.env.DB.prepare(`
        SELECT 'term' as type, id, slug, title, definition as content, tags, views, created_at
        FROM terms_v2 
        WHERE status = 'published' 
        AND (title LIKE ? OR definition LIKE ?)
        ORDER BY 
          CASE 
            WHEN title LIKE ? THEN 1
            ELSE 2
          END,
          views DESC
        LIMIT ?
      `).bind(searchPattern, searchPattern, `%${query}%`, Math.ceil(limit / 2)).all();

      results.push(...(termResults || []));
    }

    // Search wall posts
    if (type === 'all' || type === 'wall') {
      const { results: wallResults } = await c.env.DB.prepare(`
        SELECT 'wall' as type, id, slug, title, body as content, source_url, tags, votes, created_at
        FROM wall_posts 
        WHERE title LIKE ? OR body LIKE ?
        ORDER BY 
          CASE 
            WHEN title LIKE ? THEN 1
            ELSE 2
          END,
          votes DESC
        LIMIT ?
      `).bind(searchPattern, searchPattern, `%${query}%`, Math.ceil(limit / 4)).all();

      results.push(...(wallResults || []));
    }

    // Search generators
    if (type === 'all' || type === 'generators') {
      const { results: generatorResults } = await c.env.DB.prepare(`
        SELECT 'generator' as type, id, slug, name as title, description as content, created_at
        FROM generators 
        WHERE name LIKE ? OR description LIKE ?
        ORDER BY 
          CASE 
            WHEN name LIKE ? THEN 1
            ELSE 2
          END
        LIMIT ?
      `).bind(searchPattern, searchPattern, `%${query}%`, Math.ceil(limit / 4)).all();

      results.push(...(generatorResults || []));
    }

    // Search challenges
    if (type === 'all' || type === 'challenges') {
      const { results: challengeResults } = await c.env.DB.prepare(`
        SELECT 'challenge' as type, id, slug, title, brief as content, status, created_at
        FROM challenges_v2 
        WHERE title LIKE ? OR brief LIKE ?
        ORDER BY 
          CASE 
            WHEN title LIKE ? THEN 1
            ELSE 2
          END,
          created_at DESC
        LIMIT ?
      `).bind(searchPattern, searchPattern, `%${query}%`, Math.ceil(limit / 4)).all();

      results.push(...(challengeResults || []));
    }

    // Sort all results by relevance
    const sortedResults = results
      .map(item => ({
        ...item,
        tags: item.tags ? JSON.parse(item.tags) : [],
        relevance: calculateRelevance(query, item)
      }))
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit);

    return c.json({
      items: sortedResults,
      total: sortedResults.length,
      query,
      type
    });

  } catch (error) {
    console.error('Search error:', error);
    return c.json({ 
      items: [], 
      total: 0, 
      query,
      error: 'Search temporarily unavailable'
    }, 500);
  }
});

// GET /api/search/typeahead - Quick search for autocomplete
search.get('/typeahead', async (c) => {
  const query = c.req.query('q')?.trim();
  
  if (!query || query.length < 2) {
    return c.json({ suggestions: [] });
  }

  const searchPattern = `${query}%`; // Prefix match for typeahead
  const results: any[] = [];

  try {
    // Get top 3 terms
    const { results: terms } = await c.env.DB.prepare(`
      SELECT 'term' as type, id, slug, title, views
      FROM terms_v2 
      WHERE status = 'published' AND title LIKE ?
      ORDER BY views DESC
      LIMIT 3
    `).bind(searchPattern).all();

    // Get top 2 wall posts
    const { results: walls } = await c.env.DB.prepare(`
      SELECT 'wall' as type, id, slug, title, votes
      FROM wall_posts 
      WHERE title LIKE ?
      ORDER BY votes DESC
      LIMIT 2
    `).bind(searchPattern).all();

    // Get top 2 generators
    const { results: generators } = await c.env.DB.prepare(`
      SELECT 'generator' as type, id, slug, name as title
      FROM generators 
      WHERE name LIKE ?
      LIMIT 2
    `).bind(searchPattern).all();

    return c.json({
      suggestions: {
        terms: terms || [],
        wall: walls || [],
        generators: generators || []
      }
    });

  } catch (error) {
    console.error('Typeahead error:', error);
    return c.json({ suggestions: [] });
  }
});

// Simple relevance scoring
function calculateRelevance(query: string, item: any): number {
  const q = query.toLowerCase();
  const title = (item.title || '').toLowerCase();
  const content = (item.content || '').toLowerCase();
  
  let score = 0;
  
  // Exact title match gets highest score
  if (title === q) score += 100;
  else if (title.startsWith(q)) score += 50;
  else if (title.includes(q)) score += 25;
  
  // Content match
  if (content.includes(q)) score += 10;
  
  // Boost popular items
  if (item.views) score += Math.min(item.views / 10, 20);
  if (item.votes) score += Math.min(item.votes, 10);
  
  // Boost recent items slightly
  const ageInDays = (Date.now() - new Date(item.created_at).getTime()) / (1000 * 60 * 60 * 24);
  if (ageInDays < 7) score += 5;
  
  return score;
}

export default search;
