import { Hono } from 'hono';
import { callOpenAI, createSystemPrompt } from '../utils/openai';
const ai = new Hono();
ai.post('/translate', async (c) => {
    const { text } = await c.req.json();
    try {
        const systemPrompt = createSystemPrompt(`You are the "Corporate Professor" - an expert at translating corporate jargon. 
      Given a piece of corporate buzzword text, provide three responses:
      1. academic_tone: Translate it into even MORE pretentious corporate speak
      2. plain_translation: What it actually means in simple, honest terms
      3. optional_framework: A satirical "framework" or methodology related to the concept
      
      Keep responses witty, satirical, and brief (1-2 sentences each).`);
        const response = await callOpenAI(c.env, [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Translate this corporate jargon: "${text}"` }
        ], 300, 0.8);
        // Parse the response or provide fallbacks
        try {
            // Try to extract structured response
            const lines = response.split('\n').filter(line => line.trim());
            const academic = lines.find(line => line.includes('academic') || line.includes('1.'))?.replace(/^[^:]*:?\s*/, '') ||
                `In today's dynamic ecosystem, ${text} represents a cross-functional lever for next-gen enablement.`;
            const plain = lines.find(line => line.includes('plain') || line.includes('2.'))?.replace(/^[^:]*:?\s*/, '') ||
                'We have no idea, but it sounds important.';
            const framework = lines.find(line => line.includes('framework') || line.includes('3.'))?.replace(/^[^:]*:?\s*/, '') ||
                'The 3 Ps: Posture, PowerPoint, and Postmortem.';
            return c.json({
                academic_tone: academic,
                plain_translation: plain,
                optional_framework: framework
            });
        }
        catch {
            // Fallback if parsing fails
            return c.json({
                academic_tone: response.substring(0, 200) + '...',
                plain_translation: 'Translation temporarily unavailable.',
                optional_framework: 'The OOPS Framework: Out Of Processing Steam.'
            });
        }
    }
    catch (error) {
        console.error('Translation error:', error);
        // Return humorous fallbacks
        return c.json({
            academic_tone: `In today's dynamic ecosystem, ${text} represents a cross-functional lever for next-gen enablement.`,
            plain_translation: 'Our AI is currently experiencing a paradigm shift.',
            optional_framework: 'The FAIL Framework: Functionally Artificial Intelligence Limitations.'
        });
    }
});
ai.post('/linkedin_post', async (c) => {
    const { topic = 'synergy' } = await c.req.json();
    try {
        const systemPrompt = createSystemPrompt(`You are a satirical LinkedIn content generator. Create 3 different corporate LinkedIn posts about the given topic.
      Make them sound authentically corporate but subtly ridiculous. Each should be 1-2 sentences.
      Include corporate buzzwords, humble brags, and typical LinkedIn clichés.
      Format as a JSON array of strings.`);
        const response = await callOpenAI(c.env, [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Generate 3 LinkedIn posts about: ${topic}` }
        ], 400, 0.9);
        try {
            // Try to parse as JSON first
            const parsed = JSON.parse(response);
            if (Array.isArray(parsed) && parsed.length >= 3) {
                return c.json({ options: parsed.slice(0, 3) });
            }
        }
        catch {
            // Fallback: split by lines or create from response
            const lines = response.split('\n').filter(line => line.trim() && !line.includes('```'));
            if (lines.length >= 3) {
                return c.json({
                    options: lines.slice(0, 3).map(line => line.replace(/^\d+\.\s*/, '').replace(/^[\-\*]\s*/, ''))
                });
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
    }
    catch (error) {
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
        const systemPrompt = createSystemPrompt(`You are a satirical LinkedIn comment generator. Given a LinkedIn post excerpt, 
      create a corporate-sounding comment that sounds engaged but is subtly meaningless.
      Include typical LinkedIn comment patterns like "Great insights!", "Adding this to my...", 
      "This resonates with...", etc. Keep it 1-2 sentences and authentically corporate but hollow.`);
        const response = await callOpenAI(c.env, [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Generate a LinkedIn comment for this post: "${post_excerpt}"` }
        ], 150, 0.8);
        return c.json({ comment: response.trim() });
    }
    catch (error) {
        console.error('Comment generation error:', error);
        return c.json({
            comment: `${post_excerpt} Adding this to our QBR deck immediately. This really resonates with our Q4 strategic initiatives!`
        });
    }
});
ai.post('/email', async (c) => {
    const { purpose = 'Executive Update' } = await c.req.json();
    try {
        const systemPrompt = createSystemPrompt(`You are a corporate email generator. Create a professional but subtly meaningless corporate email.
      Include typical corporate email patterns: vague objectives, action items that aren't actionable,
      buzzwords, and the illusion of progress. Format with a subject line and body.
      Keep the body to 2-3 sentences maximum.`);
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
    }
    catch (error) {
        console.error('Email generation error:', error);
        return c.json({
            subject: `${purpose}: Strategic Momentum Alignment`,
            body: `Team,\n\nWe are accelerating learnings across workstreams while right-sizing expectations. Early signals are net-positive. Next steps: circulate the deck.\n\nBest,\nLeadership`
        });
    }
});
export default ai;
