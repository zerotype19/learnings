import guides from '../content/term-guides.json';
export type TermGuide = typeof guides['customer-intimacy'];
export const termGuides: Record<string, TermGuide> = guides;
export function termTitle(title: string, slug = '') { return `${title}: Meaning${termGuides[slug] ? ' & Examples' : ''} | Learnings.org`; }
export function termSchema(term: { slug: string; title: string; definition: string }) {
  const url = `https://learnings.org/term/${term.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'DefinedTerm', '@id': url + '#term', name: term.title, description: termGuides[term.slug]?.meaning || term.definition, url,
        inDefinedTermSet: { '@type': 'DefinedTermSet', '@id': 'https://learnings.org/terms#dictionary', name: 'Learnings.org Corporate Buzzword Dictionary', url: 'https://learnings.org/terms' } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://learnings.org/' },
        { '@type': 'ListItem', position: 2, name: 'Dictionary', item: 'https://learnings.org/terms' },
        { '@type': 'ListItem', position: 3, name: term.title, item: url }
      ] }
    ]
  };
}
