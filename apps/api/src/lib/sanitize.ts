// Simple profanity filter - basic list of common inappropriate terms
const FORBIDDEN_TERMS = [
  'fuck', 'shit', 'damn', 'hell', 'bitch', 'ass', 'bastard', 'crap',
  'piss', 'dick', 'cock', 'pussy', 'whore', 'slut', 'fag', 'nigger',
  'retard', 'gay', 'lesbian', 'trans', 'tranny', 'dyke', 'faggot'
];

export function sanitizeBuzzword(input: string): string {
  if (!input) return '';

  // Remove punctuation, quotes, hashtags, emojis
  let sanitized = input
    .replace(/[^\w\s]/g, '') // Keep only letters, numbers, spaces
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();

  // Convert to Title Case
  sanitized = sanitized
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Check word count
  const words = sanitized.split(' ').filter(word => word.length > 0);
  if (words.length > 4) {
    // Try to compress by removing articles and prepositions
    const articles = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    const compressed = words.filter(word => !articles.includes(word.toLowerCase()));
    if (compressed.length <= 4) {
      sanitized = compressed.join(' ');
    } else {
      // Take first 4 words
      sanitized = words.slice(0, 4).join(' ');
    }
  }

  return sanitized;
}

export function containsForbiddenContent(text: string): boolean {
  const lowerText = text.toLowerCase();
  return FORBIDDEN_TERMS.some(term => lowerText.includes(term));
}

export function sanitizeScenario(input: string): string {
  if (!input) return '';

  // Remove URLs
  let sanitized = input.replace(/https?:\/\/[^\s]+/g, '[URL]');
  
  // Remove email addresses
  sanitized = sanitized.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]');
  
  // Remove phone numbers
  sanitized = sanitized.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE]');
  
  // Replace names with generic roles (basic pattern matching)
  sanitized = sanitized.replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, (match) => {
    // Simple heuristic: if it looks like a name, replace with role
    if (match.split(' ').length === 2) {
      return 'Manager';
    }
    return match;
  });

  return sanitized.trim();
}

export function generateScenarioHash(scenario: string): string {
  // Simple hash function for deduplication
  let hash = 0;
  const normalized = scenario.toLowerCase().trim();
  
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
}
