import { Hono } from 'hono';
import type { Env } from '../index';
import type { SearchResult } from '@learnings/lib';

const router = new Hono<{ Bindings: Env }>();

// Global search across all content types
router.get('/', async (c) => {
  try {
    const q = c.req.query('q') || '';
    const type = c.req.query('type'); // optional filter: 'term' | 'wall' | 'all'
    const limit = Math.min(Number(c.req.query('limit') || '10'), 20);
    
    if (!q.trim()) {
      return c.json({ items: [] });
    }

    const results: SearchResult[] = [];

    // Search terms (always include unless explicitly excluded)
    if (!type || type === 'term' || type === 'all') {
      try {
        const termStmt = c.env.DB.prepare(`
          SELECT id, slug, title, short_def, definition
          FROM terms_v2 
          WHERE status = 'published' 
          AND (title LIKE ? OR definition LIKE ? OR short_def LIKE ?)
          ORDER BY views DESC
          LIMIT ?
        `);
        
        const searchTerm = `%${q}%`;
        const { results: termResults } = await termStmt.all(searchTerm, searchTerm, searchTerm, Math.ceil(limit / 2));
        
        if (termResults) {
          for (const term of termResults as any[]) {
            results.push({
              type: 'term',
              id: term.id,
              title: term.title,
              description: term.short_def || term.definition.substring(0, 100) + '...',
              url: `/term/${term.slug}`,
              relevance_score: 1.0
            });
          }
        }
      } catch (termError) {
        console.error('Term search error:', termError);
      }
    }

    // Search wall posts (if enabled)
    if (!type || type === 'wall' || type === 'all') {
      try {
        const wallStmt = c.env.DB.prepare(`
          SELECT id, slug, title, og_desc, body
          FROM wall_posts 
          WHERE (title LIKE ? OR body LIKE ? OR og_desc LIKE ?)
          ORDER BY vote_count DESC, created_at DESC
          LIMIT ?
        `);
        
        const searchTerm = `%${q}%`;
        const { results: wallResults } = await wallStmt.all(searchTerm, searchTerm, searchTerm, Math.ceil(limit / 2));
        
        if (wallResults) {
          for (const wall of wallResults as any[]) {
            results.push({
              type: 'wall',
              id: wall.id,
              title: wall.title,
              description: wall.og_desc || wall.body?.substring(0, 100) + '...' || '',
              url: `/wall#${wall.slug}`,
              relevance_score: 0.8
            });
          }
        }
      } catch (wallError) {
        console.error('Wall search error:', wallError);
      }
    }

    // Search generators (if enabled)
    if (!type || type === 'generator' || type === 'all') {
      try {
        const genStmt = c.env.DB.prepare(`
          SELECT id, slug, name, description
          FROM generators 
          WHERE (name LIKE ? OR description LIKE ?)
          LIMIT ?
        `);
        
        const searchTerm = `%${q}%`;
        const { results: genResults } = await genStmt.all(searchTerm, searchTerm, 3);
        
        if (genResults) {
          for (const gen of genResults as any[]) {
            results.push({
              type: 'generator',
              id: gen.id,
              title: gen.name,
              description: gen.description,
              url: `/generators#${gen.slug}`,
              relevance_score: 0.9
            });
          }
        }
      } catch (genError) {
        console.error('Generator search error:', genError);
      }
    }

    // Sort by relevance score and limit results
    results.sort((a, b) => (b.relevance_score || 0) - (a.relevance_score || 0));
    
    return c.json({ 
      items: results.slice(0, limit),
      query: q,
      total: results.length
    });
  } catch (error) {
    console.error('Global search error:', error);
    return c.json({ items: [], error: 'Search failed' }, 500);
  }
});

// Typeahead search for quick suggestions
router.get('/suggest', async (c) => {
  try {
    const q = c.req.query('q') || '';
    const limit = Math.min(Number(c.req.query('limit') || '5'), 10);
    
    if (!q.trim() || q.length < 2) {
      return c.json({ suggestions: [] });
    }

    const suggestions: Array<{
      type: 'term' | 'wall' | 'generator';
      id: string;
      title: string;
      description?: string;
      url: string;
    }> = [];

    // Get term suggestions
    try {
      const termStmt = c.env.DB.prepare(`
        SELECT id, slug, title, short_def
        FROM terms_v2 
        WHERE status = 'published' 
        AND (title LIKE ? OR short_def LIKE ?)
        ORDER BY views DESC
        LIMIT ?
      `);
      
      const searchTerm = `%${q}%`;
      const { results: termResults } = await termStmt.all(searchTerm, searchTerm, 3);
      
      if (termResults) {
        for (const term of termResults as any[]) {
          suggestions.push({
            type: 'term',
            id: term.id,
            title: term.title,
            description: term.short_def,
            url: `/term/${term.slug}`
          });
        }
      }
    } catch (termError) {
      console.error('Term suggest error:', termError);
    }

    // Get wall suggestions
    try {
      const wallStmt = c.env.DB.prepare(`
        SELECT id, slug, title, og_desc
        FROM wall_posts 
        WHERE title LIKE ?
        ORDER BY vote_count DESC
        LIMIT ?
      `);
      
      const searchTerm = `%${q}%`;
      const { results: wallResults } = await wallStmt.all(searchTerm, 2);
      
      if (wallResults) {
        for (const wall of wallResults as any[]) {
          suggestions.push({
            type: 'wall',
            id: wall.id,
            title: wall.title,
            description: wall.og_desc,
            url: `/wall#${wall.slug}`
          });
        }
      }
    } catch (wallError) {
      console.error('Wall suggest error:', wallError);
    }

    return c.json({ suggestions });
  } catch (error) {
    console.error('Suggest error:', error);
    return c.json({ suggestions: [] }, 500);
  }
});

export default router;
