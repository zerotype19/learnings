/**
 * Truncate text to a specified number of words and add ellipsis
 */
export function truncateWords(text: string, maxWords: number = 8): string {
  if (!text) return '';
  
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) {
    return text;
  }
  
  return words.slice(0, maxWords).join(' ') + '...';
}

/**
 * Get a short description from a term definition
 */
export function getShortDescription(definition: string, maxWords: number = 8): string {
  return truncateWords(definition, maxWords);
}
