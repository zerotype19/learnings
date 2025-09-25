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
        const searchTerm = `%${q}%`;
        const termStmt = c.env.DB.prepare(`
          SELECT id, slug, title, definition, views,
                 CASE 
                   WHEN slug LIKE '%-v%' OR slug LIKE '%-alt' THEN 
                     REPLACE(REPLACE(slug, '-v2', ''), '-alt', '')
                   ELSE slug
                 END as base_slug
          FROM terms_v2 
          WHERE status = 'published' 
          AND (title LIKE ? OR definition LIKE ?)
          ORDER BY 
            CASE 
              WHEN slug NOT LIKE '%-v%' AND slug NOT LIKE '%-alt' THEN 1
              ELSE 2
            END,
            views DESC
          LIMIT ?
        `).bind(searchTerm, searchTerm, Math.ceil(limit / 2));
        
        const { results: termResults } = await termStmt.all();
        
        if (termResults) {
          // Group variations by base term
          const groupedTerms = new Map();
          
          for (const term of termResults as any[]) {
            const baseSlug = term.base_slug;
            
            if (!groupedTerms.has(baseSlug)) {
              groupedTerms.set(baseSlug, {
                type: 'term',
                id: term.id,
                title: term.title,
                description: term.definition.substring(0, 100) + '...',
                url: `/term/${term.slug}`,
                relevance_score: 1.0,
                variations: []
              });
            }
            
            // Add variation if it's not the primary term
            if (term.slug !== baseSlug) {
              groupedTerms.get(baseSlug).variations.push({
                id: term.id,
                slug: term.slug,
                title: term.title,
                description: term.definition.substring(0, 100) + '...',
                url: `/term/${term.slug}`
              });
            }
          }
          
          // Convert map to array
          for (const [_, term] of groupedTerms) {
            results.push(term);
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
      const searchTerm = `%${q}%`;
      const termStmt = c.env.DB.prepare(`
        SELECT id, slug, title, definition
        FROM terms_v2 
        WHERE status = 'published' 
        AND (title LIKE ? OR definition LIKE ?)
        ORDER BY views DESC
        LIMIT ?
      `).bind(searchTerm, searchTerm, 3);
      
      const { results: termResults } = await termStmt.all();
      
      if (termResults) {
        for (const term of termResults as any[]) {
          suggestions.push({
            type: 'term',
            id: term.id,
            title: term.title,
            description: term.definition.substring(0, 80) + '...',
            url: `/term/${term.slug}`
          });
        }
      }
    } catch (termError) {
      console.error('Term suggest error:', termError);
    }

    // Get wall suggestions (disabled for now due to table structure issues)
    // try {
    //   const wallStmt = c.env.DB.prepare(`
    //     SELECT id, slug, title, og_desc
    //     FROM wall_posts 
    //     WHERE title LIKE ?
    //     ORDER BY vote_count DESC
    //     LIMIT ?
    //   `);
    //   
    //   const searchTerm = `%${q}%`;
    //   const { results: wallResults } = await wallStmt.all(searchTerm, 2);
    //   
    //   if (wallResults) {
    //     for (const wall of wallResults as any[]) {
    //       suggestions.push({
    //         type: 'wall',
    //         id: wall.id,
    //         title: wall.title,
    //         description: wall.og_desc,
    //         url: `/wall#${wall.slug}`
    //       });
    //     }
    //   }
    // } catch (wallError) {
    //   console.error('Wall suggest error:', wallError);
    // }

    return c.json({ suggestions });
  } catch (error) {
    console.error('Suggest error:', error);
    return c.json({ suggestions: [] }, 500);
  }
});

export default router;
