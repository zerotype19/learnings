interface OpenAIConfig {
  apiKey: string;
  baseURL?: string;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  max_tokens: number;
  temperature: number;
  stop?: string[];
}

interface ChatCompletionResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenAIClient {
  private apiKey: string;
  private baseURL: string;

  constructor(config: OpenAIConfig) {
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL || 'https://api.openai.com/v1';
  }

  async generateBuzzword(prompt: string): Promise<string> {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: `You generate satirical corporate buzzwords as a SINGLE 1–4 word phrase.

Hard rules:
- Output ONLY the phrase. No punctuation. No quotes. No emojis. No hashtags.
- Title Case. Maximum 4 words.
- Keep PG-13. No profanity, slurs, harassment, politics, or references to protected classes.
- Avoid personal names and sensitive identifiers.
- Favor Verb Noun, Noun Noun, or Adjective Noun. Portmanteaus allowed if readable.

If the request is risky or unclear, return a harmless, generic buzzword.`
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    const request: ChatCompletionRequest = {
      model: 'gpt-5',
      messages,
      max_tokens: 16,
      temperature: 0.9, // Increased from 0.8 for more creativity
      stop: ['\n']
    };

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data: ChatCompletionResponse = await response.json();
      return data.choices[0]?.message?.content?.trim() || '';
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate buzzword');
    }
  }

  async generateDefinition(buzzword: string, scenario: string): Promise<string> {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You write witty, satirical definitions for corporate buzzwords. Keep it 1-2 sentences, funny but accurate about how the term is actually used in corporate settings. No emojis, no hashtags.'
      },
      {
        role: 'user',
        content: `Buzzword: "${buzzword}"\nScenario: "${scenario}"\n\nWrite a satirical definition that explains why this buzzword fits the scenario.`
      }
    ];

    const request: ChatCompletionRequest = {
      model: 'gpt-5',
      messages,
      max_tokens: 100,
      temperature: 0.8
    };

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data: ChatCompletionResponse = await response.json();
      return data.choices[0]?.message?.content?.trim() || '';
    } catch (error) {
      console.error('OpenAI API error:', error);
      return `A corporate buzzword that sounds important but usually means nothing.`;
    }
  }

  async generateExample(buzzword: string, scenario: string): Promise<string> {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You write short, satirical examples of how corporate buzzwords are used. Keep it 1 sentence, show real corporate usage. No emojis, no hashtags.'
      },
      {
        role: 'user',
        content: `Buzzword: "${buzzword}"\nScenario: "${scenario}"\n\nWrite a short example sentence showing how this buzzword would be used in corporate settings.`
      }
    ];

    const request: ChatCompletionRequest = {
      model: 'gpt-5',
      messages,
      max_tokens: 50,
      temperature: 0.8
    };

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data: ChatCompletionResponse = await response.json();
      return data.choices[0]?.message?.content?.trim() || '';
    } catch (error) {
      console.error('OpenAI API error:', error);
      return `"We need to ${buzzword.toLowerCase()} on this initiative."`;
    }
  }
}
