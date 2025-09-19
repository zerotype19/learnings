import { Hono } from 'hono';
import { nanoid } from 'nanoid';
import type { Env } from '../index';
import { checkRate } from '../utils/ratelimit';
import { callOpenAI, createSystemPrompt } from '../utils/openai';

const suggest = new Hono<{ Bindings: Env }>();

suggest.post('/', async (c) => {
  // Rate limiting
  const ok = await checkRate(c.env as any, `ip:${c.req.header('cf-connecting-ip')}:suggest`, 3, 60);
  if (!ok) return c.text('Slow down', 429);
  
  const { title, rough_definition, example } = await c.req.json();
  
  // AI punch-up with OpenAI
  let enhanced_definition = rough_definition;
  try {
    const systemPrompt = createSystemPrompt(
      `You are a corporate jargon enhancement expert. Take a user's rough buzzword definition 
      and enhance it to sound more authentically corporate and pretentious while keeping the 
      satirical edge. Make it sound like it came from a real corporate dictionary. 
      Keep it to 1-2 sentences and maintain the humor. Return only the enhanced definition.`
    );

    enhanced_definition = await callOpenAI(c.env, [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Enhance this corporate buzzword definition:\nTerm: ${title}\nRough definition: ${rough_definition}` }
    ], 150, 0.7);
    
    // Fallback if response is too long or empty
    if (!enhanced_definition.trim() || enhanced_definition.length > 300) {
      enhanced_definition = rough_definition + ' (now with 30% more gravitas)';
    }
  } catch (error) {
    console.error('AI enhancement error:', error);
    enhanced_definition = rough_definition + ' (AI-enhanced for maximum corporate impact)';
  }
  
  const id = nanoid();
  await c.env.DB.prepare('INSERT INTO submissions (id, raw_title, raw_definition, raw_example, status, created_at) VALUES (?,?,?,?,"pending",?)')
    .bind(id, title, enhanced_definition.trim(), example, Date.now()).run();
  return c.json({ id, status: 'pending', enhanced: true });
});

export default suggest;
