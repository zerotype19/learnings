import { Hono } from 'hono';
import { OpenAIClient } from '../lib/openai';
import { createRateLimiter } from '../lib/ratelimit';
import { sanitizeBuzzword, sanitizeScenario, containsForbiddenContent, generateScenarioHash } from '../lib/sanitize';

interface Env {
  DB: D1Database;
  BUZZWORD_RATELIMIT: KVNamespace;
  OPENAI_API_KEY: string;
}

interface BuzzwordRequest {
  scenario: string;
  tone: 'straight' | 'snarky';
  format: 'verb_noun' | 'noun_noun' | 'adj_noun' | 'surprise';
  edge: 'safe' | 'spicy';
  seed?: number;
}

interface BuzzwordResponse {
  buzzword: string;
  why?: string;
}

const app = new Hono<{ Bindings: Env }>();

// Helper function to build the prompt
function buildPrompt(request: BuzzwordRequest): string {
  const { scenario, tone, format, edge } = request;

  return `Scenario:
${scenario}

Preferences:
Tone: ${tone}
Format: ${format}
Edge: ${edge}

Constraints:
- Return exactly ONE phrase, 1–4 words, Title Case.
- No punctuation, quotes, emojis, or hashtags.
Now generate.`;
}

// Helper function to generate satirical explanation
function generateWhyExplanation(buzzword: string, scenario: string): string {
  const explanations = [
    `Because "${buzzword}" sounds sophisticated while describing chaos`,
    `"${buzzword}" makes corporate nonsense sound intentional`,
    `It's the perfect buzzword for this level of corporate delusion`,
    `"${buzzword}" transforms incompetence into strategy`,
    `This buzzword captures the essence of corporate theater`,
    `"${buzzword}" is what happens when meetings replace thinking`,
    `It's the ideal term for this particular brand of corporate chaos`
  ];
  
  return explanations[Math.floor(Math.random() * explanations.length)];
}

// Generate definition endpoint
app.post('/generate-definition', async (c) => {
  try {
    const body = await c.req.json() as { buzzword: string; scenario: string };
    
    if (!body.buzzword || !body.scenario) {
      return c.json({ error: 'Buzzword and scenario are required' }, 400);
    }

    const openai = new OpenAIClient({
      apiKey: c.env.OPENAI_API_KEY
    });

    const definition = await openai.generateDefinition(body.buzzword, body.scenario);
    
    return c.json({ definition });

  } catch (error) {
    console.error('Definition generation error:', error);
    return c.json({ error: 'Failed to generate definition' }, 500);
  }
});

// Generate example endpoint
app.post('/generate-example', async (c) => {
  try {
    const body = await c.req.json() as { buzzword: string; scenario: string };
    
    if (!body.buzzword || !body.scenario) {
      return c.json({ error: 'Buzzword and scenario are required' }, 400);
    }

    const openai = new OpenAIClient({
      apiKey: c.env.OPENAI_API_KEY
    });

    const example = await openai.generateExample(body.buzzword, body.scenario);
    
    return c.json({ example });

  } catch (error) {
    console.error('Example generation error:', error);
    return c.json({ error: 'Failed to generate example' }, 500);
  }
});

app.post('/generate', async (c) => {
  try {
    const body = await c.req.json() as BuzzwordRequest;
    
    // Validate input
    if (!body.scenario || body.scenario.trim().length === 0) {
      return c.json({ error: 'Scenario is required' }, 400);
    }
    
    if (body.scenario.length > 280) {
      return c.json({ error: 'Scenario must be 280 characters or less' }, 400);
    }

    // Sanitize scenario
    const sanitizedScenario = sanitizeScenario(body.scenario);
    
    // Get client IP for rate limiting
    const clientIP = c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For') || 'unknown';
    const isAuthenticated = false; // TODO: Add auth check when user system is implemented
    
    // Check rate limits
    const rateLimiter = createRateLimiter(c.env.BUZZWORD_RATELIMIT, isAuthenticated);
    const rateLimitResult = await rateLimiter.checkLimit(clientIP, isAuthenticated);
    
    if (!rateLimitResult.allowed) {
      return c.json({ 
        error: 'Rate limit exceeded',
        remaining: rateLimitResult.remaining,
        resetTime: rateLimitResult.resetTime
      }, 429);
    }

    // Initialize OpenAI client
    const openai = new OpenAIClient({
      apiKey: c.env.OPENAI_API_KEY
    });

    // Generate buzzword
    const prompt = buildPrompt(body);
    let buzzword = await openai.generateBuzzword(prompt);
    
    // Sanitize the result
    buzzword = sanitizeBuzzword(buzzword);
    
    // Check for forbidden content
    if (containsForbiddenContent(buzzword)) {
      if (body.edge === 'spicy') {
        // Regenerate with safe edge
        const safePrompt = buildPrompt({ ...body, edge: 'safe' });
        buzzword = await openai.generateBuzzword(safePrompt);
        buzzword = sanitizeBuzzword(buzzword);
      } else {
        return c.json({ error: 'Generated content violates guidelines' }, 400);
      }
    }

    // If still too long, try to compress
    const words = buzzword.split(' ').filter(word => word.length > 0);
    if (words.length > 4) {
      const repairPrompt = `Return the same idea as "${buzzword}" in ≤ 4 words. Title Case. No punctuation.`;
      buzzword = await openai.generateBuzzword(repairPrompt);
      buzzword = sanitizeBuzzword(buzzword);
    }

    // Generate satirical explanation
    const why = generateWhyExplanation(buzzword, sanitizedScenario);

    // Log to database
    const scenarioHash = generateScenarioHash(sanitizedScenario);
    await c.env.DB.prepare(`
      INSERT INTO buzzword_generations 
      (scenario, scenario_hash, buzzword, tone, format, edge, seed, ip_hash)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      sanitizedScenario,
      scenarioHash,
      buzzword,
      body.tone,
      body.format,
      body.edge,
      body.seed || 0,
      clientIP
    ).run();

    const response: BuzzwordResponse = {
      buzzword,
      why
    };

    return c.json(response);

  } catch (error) {
    console.error('Buzzword generation error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Endpoint to save buzzword as a term
app.post('/save-term', async (c) => {
  try {
    const body = await c.req.json() as {
      buzzword: string;
      definition: string;
      example?: string;
      tags?: string[];
      scenario: string;
    };

    // Validate input
    if (!body.buzzword || !body.definition) {
      return c.json({ error: 'Buzzword and definition are required' }, 400);
    }

    // Create slug
    const slug = body.buzzword
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Check if term already exists
    const existing = await c.env.DB.prepare(`
      SELECT id FROM terms_v2 WHERE slug = ?
    `).bind(slug).first();

    if (existing) {
      return c.json({ error: 'Term already exists' }, 409);
    }

    // Insert new term
    const result = await c.env.DB.prepare(`
      INSERT INTO terms_v2 
      (id, slug, title, definition, examples, tags, status, created_at, updated_at, origin, source_scenario)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?)
    `).bind(
      `term_${slug.replace(/-/g, '_')}`,
      slug,
      body.buzzword,
      body.definition,
      body.example || '',
      JSON.stringify(body.tags || ['buzzword', 'generator']),
      'published',
      'buzzword_generator',
      body.scenario
    ).run();

    // Update the generation record with the saved term ID
    const termId = result.meta.last_row_id;
    await c.env.DB.prepare(`
      UPDATE buzzword_generations 
      SET saved_term_id = ?
      WHERE buzzword = ? AND scenario = ?
      ORDER BY created_at DESC
      LIMIT 1
    `).bind(termId, body.buzzword, body.scenario).run();

    return c.json({ 
      success: true, 
      termId,
      slug,
      url: `/term/${slug}`
    });

  } catch (error) {
    console.error('Save term error:', error);
    return c.json({ error: 'Failed to save term' }, 500);
  }
});

export default app;
