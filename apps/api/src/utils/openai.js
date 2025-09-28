export async function callOpenAI(env, messages, maxTokens = 500, temperature = 0.7) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-5', // Latest and most capable model
            messages,
            max_tokens: maxTokens,
            temperature,
            stream: false
        })
    });
    if (!response.ok) {
        console.error('OpenAI API error:', await response.text());
        throw new Error(`OpenAI API failed: ${response.status}`);
    }
    const data = await response.json();
    return data.choices[0]?.message?.content || '';
}
export function createSystemPrompt(role, context) {
    const base = `You are an AI assistant helping with corporate jargon and business communication. ${role}`;
    return context ? `${base}\n\nContext: ${context}` : base;
}
