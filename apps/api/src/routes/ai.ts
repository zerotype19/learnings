import { Hono } from 'hono';
import type { Env } from '../index';
import { callOpenAI, createSystemPrompt } from '../utils/openai';

const ai = new Hono<{ Bindings: Env }>();

ai.post('/translate', async (c) => {
  const { text } = await c.req.json();
  
  try {
    const systemPrompt = createSystemPrompt(
      `You are the "Corporate Professor" - an expert at translating corporate jargon into plain English.

REQUIREMENTS:
- Translate corporate jargon nonsense into clear, simple English
- Suggest normal, everyday language to use instead of the jargon
- Be helpful and educational, not just satirical
- Keep responses concise but informative

OUTPUT FORMAT:
Return ONLY a valid JSON object with these exact keys:
{
  "original_jargon": "The corporate jargon that was provided",
  "plain_english": "Clear, simple explanation of what it actually means", 
  "normal_language": "Suggested everyday words/phrases to use instead"
}`
    );

    const response = await callOpenAI(c.env, [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Translate this corporate jargon: "${text}"` }
    ], 300, 0.8);

    // Parse the JSON response
    try {
      // Clean the response to extract JSON
      const cleanedResponse = response.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
      const parsed = JSON.parse(cleanedResponse);
      
      if (parsed.original_jargon && parsed.plain_english && parsed.normal_language) {
        return c.json(parsed);
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Fallback: try to extract object from response
      const objectMatch = response.match(/\{[\s\S]*?\}/);
      if (objectMatch) {
        try {
          const parsed = JSON.parse(objectMatch[0]);
          if (parsed.original_jargon && parsed.plain_english && parsed.normal_language) {
            return c.json(parsed);
          }
        } catch {}
      }
    }

    // Ultimate fallback
    return c.json({
      original_jargon: text,
      plain_english: 'This corporate jargon is unclear and should be simplified.',
      normal_language: 'Use clear, direct language instead.'
    });
  } catch (error) {
    console.error('Translation error:', error);
    // Return fallback
    return c.json({
      original_jargon: text,
      plain_english: 'Unable to translate at this time.',
      normal_language: 'Please try again with clearer text.'
    });
  }
});

ai.post('/linkedin_post', async (c) => {
  const { topic = 'synergy' } = await c.req.json();
  
  try {
    const systemPrompt = createSystemPrompt(
      `You are a satirical LinkedIn content generator. Create exactly 3 corporate LinkedIn posts about the given topic.

REQUIREMENTS:
- Each post should be 1-2 sentences
- Sound authentically corporate but subtly ridiculous
- Include buzzwords, humble brags, and LinkedIn clichés
- Use emojis sparingly (1-2 per post max)

OUTPUT FORMAT:
Return ONLY a valid JSON array with exactly 3 strings. No other text, no explanations, no markdown formatting.

Example format:
["First post here", "Second post here", "Third post here"]`
    );

    const response = await callOpenAI(c.env, [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Generate 3 LinkedIn posts about: ${topic}` }
    ], 400, 0.9);

    try {
      // Clean the response to extract JSON
      const cleanedResponse = response.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
      const parsed = JSON.parse(cleanedResponse);
      
      if (Array.isArray(parsed) && parsed.length >= 3) {
        return c.json({ options: parsed.slice(0, 3) });
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Fallback: try to extract array from response
      const arrayMatch = response.match(/\[[\s\S]*?\]/);
      if (arrayMatch) {
        try {
          const parsed = JSON.parse(arrayMatch[0]);
          if (Array.isArray(parsed) && parsed.length >= 3) {
            return c.json({ options: parsed.slice(0, 3) });
          }
        } catch {}
      }
    }

    // Ultimate fallback with AI-generated topic
    return c.json({
      options: [
        `Excited to share how our team leveraged ${topic} to drive unprecedented synergies across all verticals. 🚀`,
        `${topic} isn't just a buzzword—it's a mindset that transforms how we operationalize excellence at scale.`,
        `Reflecting on Q3: our ${topic} initiative delivered 300% more alignment than forecasted. Onwards! 💪`
      ]
    });
  } catch (error) {
    console.error('LinkedIn post generation error:', error);
    return c.json({
      options: [
        `Today, our team operationalized ${topic} at scale. TL;DR: frameworks > feelings.`,
        `We didn't pivot — we pirouetted. ${topic} isn't a strategy, it's a lifestyle.`,
        `Hot take: ${topic} only fails when you measure it.`
      ]
    });
  }
});

ai.post('/comment', async (c) => {
  const { post_excerpt = 'Great insights!' } = await c.req.json();
  
  try {
    const systemPrompt = createSystemPrompt(
      `You are a satirical LinkedIn comment generator. Given a LinkedIn post excerpt, 
      create a corporate-sounding comment that sounds engaged but is subtly meaningless.
      Include typical LinkedIn comment patterns like "Great insights!", "Adding this to my...", 
      "This resonates with...", etc. Keep it 1-2 sentences and authentically corporate but hollow.`
    );

    const response = await callOpenAI(c.env, [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Generate a LinkedIn comment for this post: "${post_excerpt}"` }
    ], 150, 0.8);

    return c.json({ comment: response.trim() });
  } catch (error) {
    console.error('Comment generation error:', error);
    return c.json({ 
      comment: `${post_excerpt} Adding this to our QBR deck immediately. This really resonates with our Q4 strategic initiatives!` 
    });
  }
});

ai.post('/email', async (c) => {
  const { purpose = 'Executive Update' } = await c.req.json();
  
  try {
    const systemPrompt = createSystemPrompt(
      `You are a corporate email generator. Create a professional but subtly meaningless corporate email.
      Include typical corporate email patterns: vague objectives, action items that aren't actionable,
      buzzwords, and the illusion of progress. Format with a subject line and body.
      Keep the body to 2-3 sentences maximum.`
    );

    const response = await callOpenAI(c.env, [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Generate a corporate email about: ${purpose}` }
    ], 250, 0.7);

    // Try to parse subject and body
    const lines = response.split('\n').filter(line => line.trim());
    const subjectLine = lines.find(line => line.toLowerCase().includes('subject'))?.replace(/^[^:]*:?\s*/, '') || 
      `${purpose}: Strategic Momentum Alignment`;
    
    const bodyStart = lines.findIndex(line => line.toLowerCase().includes('body') || line.toLowerCase().includes('dear') || line.toLowerCase().includes('team'));
    const body = bodyStart >= 0 ? 
      lines.slice(bodyStart + (lines[bodyStart].toLowerCase().includes('body') ? 1 : 0)).join('\n').trim() :
      response.replace(/^[^:]*:\s*/, '').trim();

    return c.json({
      subject: subjectLine,
      body: body || `Team,\n\nWe are accelerating learnings across workstreams while right-sizing expectations. Early signals are net-positive. Next steps: circulate the deck.\n\nBest,\nLeadership`
    });
  } catch (error) {
    console.error('Email generation error:', error);
    return c.json({
      subject: `${purpose}: Strategic Momentum Alignment`,
      body: `Team,\n\nWe are accelerating learnings across workstreams while right-sizing expectations. Early signals are net-positive. Next steps: circulate the deck.\n\nBest,\nLeadership`
    });
  }
});

// New conversational chatbot endpoint
ai.post('/chat', async (c) => {
  const { message, conversation_history = [] } = await c.req.json();
  
  try {
    const systemPrompt = createSystemPrompt(
      `You are "The Corporate Professor" - a witty, satirical AI assistant who specializes in corporate jargon, business culture, and workplace absurdity. You're knowledgeable but playful, and you love to poke fun at corporate speak while being genuinely helpful.

PERSONALITY:
- Witty and satirical, but not mean-spirited
- Knowledgeable about business, corporate culture, and buzzwords
- Playful and engaging in conversation
- Can be serious when needed, but always with a touch of humor
- Love to translate corporate jargon into plain English
- Enjoy discussing workplace culture, management trends, and business absurdity

CONVERSATION STYLE:
- Keep responses conversational and natural (2-4 sentences typically)
- Use humor and wit, but stay helpful
- Ask follow-up questions to keep the conversation going
- Reference corporate culture, buzzwords, and workplace trends
- Be encouraging and supportive while maintaining your satirical edge
- Use emojis sparingly but effectively

TOPICS YOU EXCEL AT:
- Corporate jargon translation and explanation
- Workplace culture and management trends
- Business buzzwords and their real meanings
- Office politics and corporate absurdity
- Career advice (with a humorous twist)
- Industry trends and business news
- Leadership and management philosophy (satirical take)

Remember: You're having a real conversation, not just translating text. Be engaging, ask questions, and keep the chat flowing naturally.`
    );

    // Build conversation history for context
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversation_history,
      { role: 'user', content: message }
    ];

    const response = await callOpenAI(c.env, messages, 300, 0.8);

    return c.json({ 
      response: response.trim(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat error:', error);
    return c.json({ 
      response: "I'm experiencing a paradigm shift in my neural networks right now. Could you try that again? 🤖",
      timestamp: new Date().toISOString()
    });
  }
});

export default ai;
