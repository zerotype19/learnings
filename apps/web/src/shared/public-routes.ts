export const publicRoutes: Record<string, { page: string; title: string; description: string }> = {
  '/': { page: 'home-v2', title: 'Corporate Buzzword Dictionary | Learnings.org', description: 'Decode corporate buzzwords and business jargon with satirical definitions, workplace examples, and free buzzword tools.' },
  '/terms': { page: 'terms-hub', title: 'Corporate Buzzword Dictionary A–Z | Learnings.org', description: 'Browse the corporate jargon dictionary alphabetically. Find business buzzword meanings, examples, and related terms.' },
  '/wall': { page: 'wall-hub', title: 'Corporate Jargon Wall | Learnings.org', description: 'Explore community-shared examples and articles about corporate jargon and workplace buzzwords.' },
  '/generators': { page: 'generators-hub', title: 'Corporate Buzzword Generators | Learnings.org', description: 'Try free corporate buzzword, jargon translation, and workplace satire tools.' },
  '/generators/buzzword': { page: 'buzzword-generator', title: 'Corporate Buzzword Generator | Learnings.org', description: 'Turn real workplace scenarios into satirical corporate buzzwords with this free generator.' },
  '/bingo': { page: 'bingo', title: 'Corporate Buzzword Bingo | Learnings.org', description: 'Play corporate buzzword bingo during your next meeting. Generate a card and mark off the jargon you hear.' },
  '/about': { page: 'about', title: 'About Learnings.org', description: 'Learn about the satirical corporate buzzword dictionary and our mission to make workplace communication less painful.' },
  '/origin-story': { page: 'origin-story', title: 'Why Learnings.org Exists | Our Origin Story', description: 'The story behind Learnings.org and its collection of corporate buzzwords, business jargon, and workplace satire.' },
  '/privacy': { page: 'privacy', title: 'Privacy Policy | Learnings.org', description: 'Read the Learnings.org privacy policy.' },
  '/terms-of-service': { page: 'terms', title: 'Terms of Service | Learnings.org', description: 'Read the terms of service for using Learnings.org.' },
  '/contact': { page: 'contact', title: 'Contact Learnings.org', description: 'Contact Learnings.org with questions, feedback, or suggestions about the corporate buzzword dictionary.' },
  '/submit': { page: 'submit-v2', title: 'Submit a Corporate Buzzword | Learnings.org', description: 'Suggest a corporate buzzword or share an example of workplace jargon with Learnings.org.' }
};
export type CatalogTerm = { slug: string; title: string; definition: string; tags: string[]; updated_at?: string };
export const PAGE_SIZE = 40;
export function directoryPath(letter = '', page = 1) {
  const params = new URLSearchParams();
  if (letter) params.set('letter', letter);
  if (page > 1) params.set('page', String(page));
  return '/terms' + (params.size ? '?' + params : '');
}
