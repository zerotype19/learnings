import { Hono } from 'hono';
import { z } from 'zod';
import type { Env } from '../index';
import { MailerService } from '../utils/mailer';

const contact = new Hono<{ Bindings: Env }>();

const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(2000)
});

// Handle contact form submissions
contact.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = ContactSchema.parse(body);
    
    // Send email to professor@learnings.org
    const mailer = new MailerService(c.env);
    await mailer.sendContactEmail({
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message
    });
    
    return c.json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you soon.'
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return c.json({
        success: false,
        message: 'Please fill in all required fields correctly.',
        errors: error.flatten()
      }, 400);
    }
    
    return c.json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again.'
    }, 500);
  }
});

export default contact;
