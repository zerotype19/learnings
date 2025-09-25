import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import type { Env } from '../index';
import { MailerService } from '../utils/mailer';

const router = new Hono<{ Bindings: Env }>();

// Validation schemas
const termSubmissionSchema = z.object({
  title: z.string().min(1).max(100),
  definition: z.string().min(1).max(2000),
  examples: z.string().max(1000).optional(),
  email: z.string().email(),
  tags: z.array(z.string()).optional(),
  links: z.array(z.object({
    url: z.string().url(),
    label: z.string().min(1)
  })).optional()
});

const wallSubmissionSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().max(2000).optional(),
  source_url: z.string().url(),
  email: z.string().email(),
  tags: z.array(z.string()).optional(),
  suggested_terms: z.array(z.string()).optional()
});

// Submit term for email confirmation
router.post('/terms/submit', async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = termSubmissionSchema.parse(body);
    
    // Generate confirmation token
    const confirmationToken = nanoid(32);
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    
    // Store pending submission
    const submissionId = nanoid();
    const submissionData = {
      id: submissionId,
      type: 'term',
      email: validatedData.email,
      data: JSON.stringify(validatedData),
      confirmation_token: confirmationToken,
      expires_at: expiresAt,
      created_at: Date.now()
    };
    
    await c.env.DB.prepare(`
      INSERT INTO pending_submissions (id, type, email, data, confirmation_token, expires_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      submissionId,
      'term',
      validatedData.email,
      JSON.stringify(validatedData),
      confirmationToken,
      expiresAt,
      Date.now()
    ).run();
    
    // Send confirmation email
    const mailer = new MailerService(c.env);
    const confirmationUrl = `${c.req.header('origin') || 'https://learnings.org'}/confirm/${confirmationToken}`;
    
    await mailer.sendConfirmationEmail({
      type: 'term',
      title: validatedData.title,
      confirmationUrl,
      recipientEmail: validatedData.email
    });
    
    return c.json({
      success: true,
      message: 'Confirmation email sent! Please check your email to complete your submission.',
      submissionId
    });
    
  } catch (error) {
    console.error('Term submission error:', error);
    if (error instanceof z.ZodError) {
      return c.json({ success: false, error: 'Invalid submission data', details: error.errors }, 400);
    }
    return c.json({ success: false, error: 'Failed to submit term' }, 500);
  }
});

// Submit wall post for email confirmation
router.post('/wall/submit', async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = wallSubmissionSchema.parse(body);
    
    // Generate confirmation token
    const confirmationToken = nanoid(32);
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    
    // Store pending submission
    const submissionId = nanoid();
    
    await c.env.DB.prepare(`
      INSERT INTO pending_submissions (id, type, email, data, confirmation_token, expires_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      submissionId,
      'wall',
      validatedData.email,
      JSON.stringify(validatedData),
      confirmationToken,
      expiresAt,
      Date.now()
    ).run();
    
    // Send confirmation email
    const mailer = new MailerService(c.env);
    const confirmationUrl = `${c.req.header('origin') || 'https://learnings.org'}/confirm/${confirmationToken}`;
    
    await mailer.sendConfirmationEmail({
      type: 'wall',
      title: validatedData.title,
      confirmationUrl,
      recipientEmail: validatedData.email
    });
    
    return c.json({
      success: true,
      message: 'Confirmation email sent! Please check your email to complete your submission.',
      submissionId
    });
    
  } catch (error) {
    console.error('Wall submission error:', error);
    if (error instanceof z.ZodError) {
      return c.json({ success: false, error: 'Invalid submission data', details: error.errors }, 400);
    }
    return c.json({ success: false, error: 'Failed to submit wall post' }, 500);
  }
});

// Confirm submission via magic link
router.get('/confirm/:token', async (c) => {
  try {
    const token = c.req.param('token');
    
    // Get pending submission (allow already confirmed ones)
    const result = await c.env.DB.prepare(`
      SELECT * FROM pending_submissions 
      WHERE confirmation_token = ? AND expires_at > ?
    `).bind(token, Date.now()).first();
    
    if (!result) {
      return c.json({ success: false, error: 'Invalid or expired confirmation link' }, 400);
    }
    
    const submissionData = JSON.parse(result.data);
    
    // Mark as confirmed if not already confirmed
    if (!result.confirmed_at) {
      await c.env.DB.prepare(`
        UPDATE pending_submissions 
        SET confirmed_at = ? 
        WHERE confirmation_token = ?
      `).bind(Date.now(), token).run();
    }
    
    // Process the confirmed submission
    if (result.type === 'term') {
      // Add to term_submissions table for admin review
      await c.env.DB.prepare(`
        INSERT INTO term_submissions (id, title, definition, examples, tags, links, submitted_by, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'queued', ?, ?)
      `).bind(
        nanoid(),
        submissionData.title,
        submissionData.definition,
        submissionData.examples || null,
        JSON.stringify(submissionData.tags || []),
        JSON.stringify(submissionData.links || []),
        submissionData.email, // Use email as submitted_by
        Date.now(),
        Date.now()
      ).run();
      
    } else if (result.type === 'wall') {
      // Add to wall_submissions table
      await c.env.DB.prepare(`
        INSERT INTO wall_submissions (id, title, body, source_url, tags, suggested_terms, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, 'queued', ?, ?)
      `).bind(
        nanoid(),
        submissionData.title,
        submissionData.body || null,
        submissionData.source_url,
        JSON.stringify(submissionData.tags || []),
        JSON.stringify(submissionData.suggested_terms || []),
        Date.now(),
        Date.now()
      ).run();
    }
    
    return c.json({
      success: true,
      message: 'Submission confirmed! Your content has been submitted for review.',
      type: result.type,
      title: submissionData.title
    });
    
  } catch (error) {
    console.error('Confirmation error:', error);
    return c.json({ success: false, error: 'Failed to confirm submission' }, 500);
  }
});

export default router;
