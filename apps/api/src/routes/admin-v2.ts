import { Hono } from 'hono';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import type { Env } from '../index';
import { requireAuth } from '../utils/auth';
import { scrapeOpenGraph, getCachedOG, setCachedOG } from '../utils/og-scraper-v2';

const router = new Hono<{ Bindings: Env }>();

// Middleware to require admin auth
router.use('*', async (c, next) => {
  // TODO: Implement proper admin role checking
  // For now, allow access to admin endpoints
  await next();
});

// Get term submissions queue
router.get('/terms/submissions', async (c) => {
  try {
    const status = c.req.query('status') || 'queued';
    const limit = Math.min(Number(c.req.query('limit') || '50'), 100);
    
    const stmt = c.env.DB.prepare(`
      SELECT * FROM term_submissions 
      WHERE status = ?
      ORDER BY created_at ASC
      LIMIT ?
    `);
    
    const { results } = await stmt.bind(status, limit).all();
    
    // Parse JSON fields
    const processedItems = (results || []).map((item: any) => ({
      ...item,
      tags: item.tags ? JSON.parse(item.tags) : [],
      links: item.links ? JSON.parse(item.links) : [],
    }));

    return c.json({ items: processedItems });
  } catch (error) {
    console.error('Term submissions error:', error);
    return c.json({ items: [], error: 'Database error' }, 500);
  }
});

// Approve term submission
router.post('/terms/:id/approve', async (c) => {
  try {
    const submissionId = c.req.param('id');
    const auth = await requireAuth(c);
    
    // Get submission
    const submission = await c.env.DB.prepare(
      'SELECT * FROM term_submissions WHERE id = ?'
    ).bind(submissionId).first() as any;
    
    if (!submission) {
      return c.json({ error: 'Submission not found' }, 404);
    }
    
    if (submission.status !== 'queued') {
      return c.json({ error: 'Submission already processed' }, 400);
    }

    // Create term
    const termId = nanoid();
    const slug = submission.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const now = new Date().toISOString();
    
    // Check if slug already exists and modify if needed
    let finalSlug = slug;
    let counter = 1;
    while (true) {
      const existing = await c.env.DB.prepare(
        'SELECT id FROM terms_v2 WHERE slug = ?'
      ).bind(finalSlug).first();
      
      if (!existing) break;
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    // Insert into terms_v2
    await c.env.DB.prepare(`
      INSERT INTO terms_v2 (
        id, slug, title, definition, short_def, examples, tags, 
        status, created_at, updated_at, views, seq
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'published', ?, ?, 0, ?)
    `).bind(
      termId,
      finalSlug,
      submission.title,
      submission.definition,
      submission.short_def || null,
      submission.examples || null,
      submission.tags || null,
      now,
      now,
      Date.now() // seq for ordering
    ).run();

    // Update submission status
    await c.env.DB.prepare(
      'UPDATE term_submissions SET status = ?, reviewer = ?, updated_at = ? WHERE id = ?'
    ).bind('published', auth?.userId || 'system', now, submissionId).run();

    return c.json({ 
      id: termId, 
      slug: finalSlug, 
      status: 'published' 
    });
  } catch (error) {
    console.error('Term approval error:', error);
    return c.json({ error: 'Approval failed' }, 500);
  }
});

// Reject term submission
router.post('/terms/:id/reject', async (c) => {
  try {
    const submissionId = c.req.param('id');
    const body = await c.req.json();
    const auth = await requireAuth(c);
    
    const { reason } = z.object({
      reason: z.string().min(1).max(500)
    }).parse(body);

    const now = new Date().toISOString();
    
    await c.env.DB.prepare(
      'UPDATE term_submissions SET status = ?, reviewer = ?, reviewer_notes = ?, updated_at = ? WHERE id = ?'
    ).bind('rejected', auth?.userId || 'system', reason, now, submissionId).run();

    return c.json({ status: 'rejected' });
  } catch (error) {
    console.error('Term rejection error:', error);
    return c.json({ error: 'Rejection failed' }, 500);
  }
});

// Get wall submissions queue
router.get('/wall/submissions', async (c) => {
  try {
    const status = c.req.query('status') || 'queued';
    const limit = Math.min(Number(c.req.query('limit') || '50'), 100);
    
    const stmt = c.env.DB.prepare(`
      SELECT * FROM wall_submissions 
      WHERE status = ?
      ORDER BY created_at ASC
      LIMIT ?
    `);
    
    const { results } = await stmt.bind(status, limit).all();
    
    // Parse JSON fields
    const processedItems = (results || []).map((item: any) => ({
      ...item,
      tags: item.tags ? JSON.parse(item.tags) : [],
      suggested_terms: item.suggested_terms ? JSON.parse(item.suggested_terms) : [],
    }));

    return c.json({ items: processedItems });
  } catch (error) {
    console.error('Wall submissions error:', error);
    return c.json({ items: [], error: 'Database error' }, 500);
  }
});

// Approve wall submission
router.post('/wall/:id/approve', async (c) => {
  try {
    const submissionId = c.req.param('id');
    const auth = await requireAuth(c);
    
    // Get submission
    const submission = await c.env.DB.prepare(
      'SELECT * FROM wall_submissions WHERE id = ?'
    ).bind(submissionId).first() as any;
    
    if (!submission) {
      return c.json({ error: 'Submission not found' }, 404);
    }
    
    if (submission.status !== 'queued') {
      return c.json({ error: 'Submission already processed' }, 400);
    }

    // Create wall post
    const postId = nanoid();
    const slug = submission.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const now = new Date().toISOString();
    
    // Check if slug already exists and modify if needed
    let finalSlug = slug;
    let counter = 1;
    while (true) {
      const existing = await c.env.DB.prepare(
        'SELECT id FROM wall_posts WHERE slug = ?'
      ).bind(finalSlug).first();
      
      if (!existing) break;
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    // Fetch OpenGraph data from source_url
    let ogTitle = submission.title;
    let ogDesc = submission.body?.substring(0, 200) || '';
    let ogImage: string | undefined;
    let ogSite: string | undefined;

    try {
      // Check cache first
      const cachedOG = await getCachedOG(c.env, submission.source_url);
      
      if (cachedOG) {
        ogTitle = cachedOG.og_title || ogTitle;
        ogDesc = cachedOG.og_desc || ogDesc;
        ogImage = cachedOG.og_image;
        ogSite = cachedOG.og_site;
      } else {
        // Scrape fresh data
        const ogData = await scrapeOpenGraph(submission.source_url);
        ogTitle = ogData.og_title || ogTitle;
        ogDesc = ogData.og_desc || ogDesc;
        ogImage = ogData.og_image;
        ogSite = ogData.og_site;
        
        // Cache the result
        await setCachedOG(c.env, submission.source_url, ogData);
      }
    } catch (error) {
      console.warn('OG scraping failed, using fallback data:', error);
    }

    // Insert into wall_posts
    await c.env.DB.prepare(`
      INSERT INTO wall_posts (
        id, slug, title, body, source_url, og_title, og_desc, og_image, og_site,
        tags, related_terms, vote_count, comment_count, hot_score,
        created_at, updated_at, last_activity_at, seq
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?, ?, ?, ?)
    `).bind(
      postId,
      finalSlug,
      submission.title,
      submission.body || null,
      submission.source_url,
      ogTitle,
      ogDesc,
      ogImage || null,
      ogSite || null,
      submission.tags || null,
      submission.suggested_terms || null,
      now,
      now,
      now,
      Date.now() // seq for ordering
    ).run();

    // Add to feed items
    await c.env.DB.prepare(`
      INSERT INTO feed_items (id, type, entity_id, ts, summary)
      VALUES (?, 'wall', ?, ?, ?)
    `).bind(
      nanoid(),
      postId,
      now,
      ogDesc
    ).run();

    // Update submission status
    await c.env.DB.prepare(
      'UPDATE wall_submissions SET status = ?, reviewer = ?, updated_at = ? WHERE id = ?'
    ).bind('published', auth?.userId || 'system', now, submissionId).run();

    return c.json({ 
      id: postId, 
      slug: finalSlug, 
      status: 'published' 
    });
  } catch (error) {
    console.error('Wall approval error:', error);
    return c.json({ error: 'Approval failed' }, 500);
  }
});

// Reject wall submission
router.post('/wall/:id/reject', async (c) => {
  try {
    const submissionId = c.req.param('id');
    const body = await c.req.json();
    const auth = await requireAuth(c);
    
    const { reason } = z.object({
      reason: z.string().min(1).max(500)
    }).parse(body);

    const now = new Date().toISOString();
    
    await c.env.DB.prepare(
      'UPDATE wall_submissions SET status = ?, reviewer = ?, reviewer_notes = ?, updated_at = ? WHERE id = ?'
    ).bind('rejected', auth?.userId || 'system', reason, now, submissionId).run();

    return c.json({ status: 'rejected' });
  } catch (error) {
    console.error('Wall rejection error:', error);
    return c.json({ error: 'Rejection failed' }, 500);
  }
});

// Get admin dashboard stats
router.get('/stats', async (c) => {
  try {
    // Get counts for different submission types
    const termSubmissions = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM term_submissions WHERE status = "queued"'
    ).first() as any;
    
    const wallSubmissions = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM wall_submissions WHERE status = "queued"'
    ).first() as any;
    
    const totalTerms = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM terms_v2 WHERE status = "published"'
    ).first() as any;
    
    const totalWallPosts = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM wall_posts'
    ).first() as any;

    return c.json({
      pending_term_submissions: termSubmissions?.count || 0,
      pending_wall_submissions: wallSubmissions?.count || 0,
      total_terms: totalTerms?.count || 0,
      total_wall_posts: totalWallPosts?.count || 0,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return c.json({ error: 'Stats failed' }, 500);
  }
});

export default router;