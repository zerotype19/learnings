import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import type { Env } from '../index';
import { requireAuth } from '../utils/auth';

const adminV2 = new Hono<{ Bindings: Env }>();

// GET /api/admin/terms/submissions - List term submissions for review
adminV2.get('/terms/submissions', async (c) => {
  const auth = await requireAuth(c);
  const adminParam = c.req.query('admin');
  
  // For development: allow access with admin=1 parameter
  if (!auth && adminParam !== '1') {
    return c.text('Unauthorized', 401);
  }

  const status = c.req.query('status') || 'queued';
  const limit = Math.min(parseInt(c.req.query('limit') || '50'), 100);

  const { results } = await c.env.DB.prepare(`
    SELECT id, title, short_def, definition, examples, tags, links, submitted_by, 
           status, reviewer, reviewer_notes, created_at, updated_at
    FROM term_submissions 
    WHERE status = ?
    ORDER BY created_at DESC
    LIMIT ?
  `).bind(status, limit).all();

  const items = (results || []).map((item: any) => ({
    ...item,
    tags: JSON.parse(item.tags || '[]'),
    links: JSON.parse(item.links || '[]')
  }));

  return c.json({ items });
});

// POST /api/admin/terms/:submissionId/approve - Approve term submission
adminV2.post('/terms/:submissionId/approve', async (c) => {
  const auth = await requireAuth(c);
  const adminParam = c.req.query('admin');
  
  if (!auth && adminParam !== '1') {
    return c.text('Unauthorized', 401);
  }

  const { submissionId } = c.req.param();
  
  // Get the submission
  const submission = await c.env.DB.prepare(`
    SELECT * FROM term_submissions WHERE id = ? AND status = 'queued'
  `).bind(submissionId).first();

  if (!submission) {
    return c.json({ error: 'Submission not found or already processed' }, 404);
  }

  const termId = nanoid();
  const slug = generateSlug(submission.title);

  try {
    // Start transaction-like operations
    // 1. Create the published term
    await c.env.DB.prepare(`
      INSERT INTO terms_v2 (id, slug, title, definition, short_def, examples, tags, status, created_at, updated_at, seq)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'published', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 
              (SELECT COALESCE(MAX(seq), 0) + 1 FROM terms_v2))
    `).bind(
      termId,
      slug,
      submission.title,
      submission.definition,
      submission.short_def,
      submission.examples || '',
      submission.tags || '[]'
    ).run();

    // 2. Update submission status
    await c.env.DB.prepare(`
      UPDATE term_submissions 
      SET status = 'approved', reviewer = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(auth?.userId || 'admin', submissionId).run();

    // 3. Create term links if any
    const links = JSON.parse(submission.links || '[]');
    for (const link of links) {
      await c.env.DB.prepare(`
        INSERT INTO term_links (id, term_id, url, title, note, submitted_by, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 'approved', CURRENT_TIMESTAMP)
      `).bind(
        nanoid(),
        termId,
        link.url,
        link.label || '',
        'Added during term approval',
        submission.submitted_by || 'system'
      ).run();
    }

    return c.json({ 
      ok: true, 
      termId, 
      slug,
      message: 'Term approved and published'
    });

  } catch (error) {
    console.error('Approval error:', error);
    return c.json({ error: 'Failed to approve submission' }, 500);
  }
});

// POST /api/admin/terms/:submissionId/reject - Reject term submission
adminV2.post('/terms/:submissionId/reject', async (c) => {
  const auth = await requireAuth(c);
  const adminParam = c.req.query('admin');
  
  if (!auth && adminParam !== '1') {
    return c.text('Unauthorized', 401);
  }

  const { submissionId } = c.req.param();
  const { reason } = await c.req.json();

  const result = await c.env.DB.prepare(`
    UPDATE term_submissions 
    SET status = 'rejected', reviewer = ?, reviewer_notes = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND status = 'queued'
  `).bind(auth?.userId || 'admin', reason || 'Rejected by admin', submissionId).run();

  if (result.changes === 0) {
    return c.json({ error: 'Submission not found or already processed' }, 404);
  }

  return c.json({ 
    ok: true,
    message: 'Submission rejected'
  });
});

// GET /api/admin/term-links/submissions - List term link submissions
adminV2.get('/term-links/submissions', async (c) => {
  const auth = await requireAuth(c);
  const adminParam = c.req.query('admin');
  
  if (!auth && adminParam !== '1') {
    return c.text('Unauthorized', 401);
  }

  const status = c.req.query('status') || 'queued';
  const limit = Math.min(parseInt(c.req.query('limit') || '50'), 100);

  const { results } = await c.env.DB.prepare(`
    SELECT tl.*, t.title as term_title, t.slug as term_slug
    FROM term_links tl
    LEFT JOIN terms_v2 t ON tl.term_id = t.id
    WHERE tl.status = ?
    ORDER BY tl.created_at DESC
    LIMIT ?
  `).bind(status, limit).all();

  return c.json({ items: results || [] });
});

// POST /api/admin/term-links/:linkId/approve - Approve term link
adminV2.post('/term-links/:linkId/approve', async (c) => {
  const auth = await requireAuth(c);
  const adminParam = c.req.query('admin');
  
  if (!auth && adminParam !== '1') {
    return c.text('Unauthorized', 401);
  }

  const { linkId } = c.req.param();

  const result = await c.env.DB.prepare(`
    UPDATE term_links 
    SET status = 'approved'
    WHERE id = ? AND status = 'queued'
  `).bind(linkId).run();

  if (result.changes === 0) {
    return c.json({ error: 'Link not found or already processed' }, 404);
  }

  return c.json({ ok: true, message: 'Link approved' });
});

// POST /api/admin/term-links/:linkId/reject - Reject term link
adminV2.post('/term-links/:linkId/reject', async (c) => {
  const auth = await requireAuth(c);
  const adminParam = c.req.query('admin');
  
  if (!auth && adminParam !== '1') {
    return c.text('Unauthorized', 401);
  }

  const { linkId } = c.req.param();

  const result = await c.env.DB.prepare(`
    UPDATE term_links 
    SET status = 'rejected'
    WHERE id = ? AND status = 'queued'
  `).bind(linkId).run();

  if (result.changes === 0) {
    return c.json({ error: 'Link not found or already processed' }, 404);
  }

  return c.json({ ok: true, message: 'Link rejected' });
});

// GET /api/admin/metrics - Basic admin metrics
adminV2.get('/metrics', async (c) => {
  const auth = await requireAuth(c);
  const adminParam = c.req.query('admin');
  
  if (!auth && adminParam !== '1') {
    return c.text('Unauthorized', 401);
  }

  try {
    // Get counts for various queues
    const termSubmissions = await c.env.DB.prepare('SELECT COUNT(*) as count FROM term_submissions WHERE status = "queued"').first();
    const linkSubmissions = await c.env.DB.prepare('SELECT COUNT(*) as count FROM term_links WHERE status = "queued"').first();
    const publishedTerms = await c.env.DB.prepare('SELECT COUNT(*) as count FROM terms_v2 WHERE status = "published"').first();
    const wallPosts = await c.env.DB.prepare('SELECT COUNT(*) as count FROM wall_posts').first();

    // Get recent activity (last 7 days)
    const recentTerms = await c.env.DB.prepare(`
      SELECT COUNT(*) as count FROM terms_v2 
      WHERE created_at > datetime('now', '-7 days') AND status = 'published'
    `).first();

    const recentSubmissions = await c.env.DB.prepare(`
      SELECT COUNT(*) as count FROM term_submissions 
      WHERE created_at > datetime('now', '-7 days')
    `).first();

    return c.json({
      queues: {
        term_submissions: termSubmissions?.count || 0,
        link_submissions: linkSubmissions?.count || 0
      },
      content: {
        published_terms: publishedTerms?.count || 0,
        wall_posts: wallPosts?.count || 0
      },
      recent_activity: {
        terms_published_7d: recentTerms?.count || 0,
        submissions_7d: recentSubmissions?.count || 0
      }
    });

  } catch (error) {
    console.error('Metrics error:', error);
    return c.json({ error: 'Failed to fetch metrics' }, 500);
  }
});

// Utility function to generate URL-friendly slugs
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

export default adminV2;
