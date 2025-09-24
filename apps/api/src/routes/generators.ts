import { Hono } from 'hono';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import type { Env } from '../index';
import { requireAuth, getFingerprint } from '../utils/auth';
import { callOpenAI } from '../utils/openai';

const generators = new Hono<{ Bindings: Env }>();

// GET /api/generators - List available generators
generators.get('/', async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT id, slug, name, description, options_schema, is_public
    FROM generators_v2 
    WHERE is_public = 1
    ORDER BY name ASC
  `).all();

  const items = (results || []).map((item: any) => ({
    ...item,
    options_schema: JSON.parse(item.options_schema || '{}')
  }));

  return c.json({ items });
});

// POST /api/generate/:slug - Run a generator
const GenerateSchema = z.object({
  inputs: z.record(z.any()),
  options: z.record(z.any()).optional(),
  related_terms: z.array(z.string()).optional(),
  made_public: z.boolean().optional()
});

generators.post('/:slug', async (c) => {
  const { slug } = c.req.param();
  const body = await c.req.json();
  const parsed = GenerateSchema.safeParse(body);
  
  if (!parsed.success) {
    return c.json({ error: 'Invalid input', details: parsed.error.flatten() }, 400);
  }

  // Get generator config
  const generator = await c.env.DB.prepare(`
    SELECT id, name, template, options_schema FROM generators_v2 WHERE slug = ?
  `).bind(slug).first();

  if (!generator) {
    return c.json({ error: 'Generator not found' }, 404);
  }

  const auth = await requireAuth(c);
  const fingerprint = getFingerprint(c);
  const data = parsed.data;

  // Create cache key for deduplication
  const cacheKey = `gen_cache:${slug}:${hashInputs(data.inputs, data.options || {})}`;
  
  // Check cache first
  const cached = await c.env.CACHE.get(cacheKey);
  if (cached) {
    const cachedResult = JSON.parse(cached);
    return c.json({
      output_text: cachedResult.output_text,
      run_id: cachedResult.run_id,
      cached: true
    });
  }

  try {
    // Resolve template with inputs
    const prompt = resolveTemplate(generator.template, data.inputs);
    
    // Generate output based on generator type
    let output_text = '';
    
    if (slug === 'professor') {
      // Use structured JSON response for professor
      const response = await callOpenAI(c.env, [
        { role: 'user', content: prompt }
      ], 300, 0.8);
      
      // Parse the JSON response
      try {
        const cleanedResponse = response.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
        const parsed = JSON.parse(cleanedResponse);
        
        if (parsed.academic_tone && parsed.plain_translation && parsed.optional_framework) {
          output_text = JSON.stringify(parsed);
        } else {
          throw new Error('Invalid JSON structure');
        }
      } catch (parseError) {
        console.error('Professor JSON parse error:', parseError);
        // Fallback: try to extract object from response
        const objectMatch = response.match(/\{[\s\S]*?\}/);
        if (objectMatch) {
          try {
            const parsed = JSON.parse(objectMatch[0]);
            if (parsed.academic_tone && parsed.plain_translation && parsed.optional_framework) {
              output_text = JSON.stringify(parsed);
            } else {
              throw new Error('Invalid JSON structure');
            }
          } catch {
            throw new Error('JSON extraction failed');
          }
        } else {
          throw new Error('No JSON object found');
        }
      }
    } else {
      // For other generators, use OpenAI directly
      output_text = await callOpenAI(c.env, [
        { role: 'user', content: prompt }
      ], 400, 0.7);
    }

    // Store the run
    const runId = nanoid();
    await c.env.DB.prepare(`
      INSERT INTO generator_runs 
      (id, generator_id, user_id, fingerprint, input_json, output_text, related_terms, made_public, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      runId,
      generator.id,
      auth?.userId || null,
      fingerprint,
      JSON.stringify(data.inputs),
      output_text,
      JSON.stringify(data.related_terms || []),
      data.made_public ? 1 : 0
    ).run();

    // Cache the result for 1 hour
    await c.env.CACHE.put(cacheKey, JSON.stringify({
      output_text,
      run_id: runId
    }), { expirationTtl: 3600 });

    // Add to feed if public
    if (data.made_public) {
      await c.env.DB.prepare(`
        INSERT OR REPLACE INTO feed_items (id, type, entity_id, ts, summary, created_at)
        VALUES (?, 'generator', ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        nanoid(),
        runId,
        new Date().toISOString(),
        `Generated ${generator.name}: ${output_text.substring(0, 100)}...`
      ).run();
    }

    return c.json({
      output_text,
      run_id: runId,
      generator_name: generator.name,
      cached: false
    });

  } catch (error) {
    console.error('Generator error:', error);
    return c.json({ 
      error: 'Generation failed',
      fallback: `Our ${generator.name} is currently experiencing a paradigm shift. Please try again.`
    }, 500);
  }
});

// GET /api/generate/:runId - Get a specific generator run
generators.get('/run/:runId', async (c) => {
  const { runId } = c.req.param();

  const run = await c.env.DB.prepare(`
    SELECT gr.*, g.name as generator_name, g.slug as generator_slug
    FROM generator_runs gr
    LEFT JOIN generators_v2 g ON gr.generator_id = g.id
    WHERE gr.id = ?
  `).bind(runId).first();

  if (!run) {
    return c.json({ error: 'Run not found' }, 404);
  }

  return c.json({
    ...run,
    input_json: JSON.parse(run.input_json || '{}'),
    related_terms: JSON.parse(run.related_terms || '[]')
  });
});

// Helper functions
function resolveTemplate(template: string, inputs: Record<string, any>): string {
  let resolved = template;
  
  for (const [key, value] of Object.entries(inputs)) {
    const placeholder = `{{${key}}}`;
    resolved = resolved.replace(new RegExp(placeholder, 'g'), String(value));
  }
  
  return resolved;
}

function hashInputs(inputs: Record<string, any>, options: Record<string, any>): string {
  const combined = JSON.stringify({ inputs, options });
  // Simple hash for cache key
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

export default generators;
