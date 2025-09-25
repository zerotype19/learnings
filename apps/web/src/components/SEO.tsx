import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: any;
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://learnings.org/og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
  noindex = false
}: SEOProps) {
  const fullTitle = title.includes('Learnings') ? title : `${title} | Learnings Dot Org`;
  const siteUrl = 'https://learnings.org';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : undefined;

  React.useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    if (fullCanonical) updateMetaTag('canonical', fullCanonical);
    
    // Robots
    updateMetaTag('robots', noindex ? 'noindex,nofollow' : 'index,follow');

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', fullCanonical || window.location.href, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:site_name', 'Learnings Dot Org', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', twitterCard, true);
    updateMetaTag('twitter:title', fullTitle, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', ogImage, true);

    // Additional SEO tags
    updateMetaTag('author', 'Learnings Dot Org');
    updateMetaTag('language', 'en');
    updateMetaTag('revisit-after', '7 days');

    // Structured data
    if (structuredData) {
      // Remove existing structured data
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Reset to default title
      document.title = 'Learnings Dot Org — Powered by AI';
    };
  }, [title, description, keywords, canonical, ogImage, ogType, twitterCard, structuredData, noindex, fullTitle, fullCanonical]);

  return null;
}

// Predefined SEO configurations for common pages
export const SEOConfigs = {
  home: {
    title: 'Learnings Dot Org — Corporate Buzzword Dictionary',
    description: 'The ultimate corporate buzzword dictionary. Decode business jargon, understand corporate speak, and master the art of professional communication. Powered by AI.',
    keywords: 'corporate buzzwords, business jargon, corporate dictionary, professional communication, business terms, corporate speak, workplace language',
    canonical: '/',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Learnings Dot Org',
      url: 'https://learnings.org',
      description: 'The ultimate corporate buzzword dictionary. Decode business jargon, understand corporate speak, and master the art of professional communication.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://learnings.org/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  },

  terms: {
    title: 'Corporate Buzzword Dictionary',
    description: 'Browse our comprehensive collection of corporate buzzwords, business jargon, and professional terminology. Learn what these terms really mean.',
    keywords: 'corporate buzzwords, business dictionary, professional terms, corporate jargon, business vocabulary, workplace language',
    canonical: '/terms',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Corporate Buzzword Dictionary',
      url: 'https://learnings.org/terms',
      description: 'Browse our comprehensive collection of corporate buzzwords, business jargon, and professional terminology.',
      mainEntity: {
        '@type': 'ItemList',
        name: 'Corporate Buzzwords',
        description: 'A curated list of corporate buzzwords and business jargon'
      }
    }
  },

  wall: {
    title: 'Wall of Fame — Corporate Content',
    description: 'Discover the best corporate content, memes, and insights shared by our community. Join the conversation about business culture and corporate life.',
    keywords: 'corporate content, business memes, corporate culture, workplace humor, business insights, corporate community',
    canonical: '/wall',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Wall of Fame',
      url: 'https://learnings.org/wall',
      description: 'Discover the best corporate content, memes, and insights shared by our community.'
    }
  },

  bingo: {
    title: 'Corporate Buzzword Bingo',
    description: 'Play corporate buzzword bingo! Generate random bingo cards with real corporate jargon and challenge your colleagues to spot these terms in meetings.',
    keywords: 'corporate bingo, buzzword bingo, meeting bingo, corporate game, business bingo, workplace fun',
    canonical: '/bingo',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Game',
      name: 'Corporate Buzzword Bingo',
      url: 'https://learnings.org/bingo',
      description: 'Play corporate buzzword bingo with real business jargon!',
      gameLocation: 'https://learnings.org/bingo',
      numberOfPlayers: '1-50'
    }
  },

  generators: {
    title: 'AI-Powered Corporate Generators',
    description: 'Generate LinkedIn posts, corporate roasts, and business content with our AI-powered tools. Perfect for professionals who need creative corporate content.',
    keywords: 'AI generators, LinkedIn posts, corporate content, business writing, AI tools, professional content, corporate roasts',
    canonical: '/generators',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'AI-Powered Corporate Generators',
      url: 'https://learnings.org/generators',
      description: 'Generate LinkedIn posts, corporate roasts, and business content with AI.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser'
    }
  },

  submit: {
    title: 'Submit Corporate Content',
    description: 'Share your corporate buzzwords, wall posts, and business insights with our community. Help others decode the corporate world.',
    keywords: 'submit content, corporate submission, business terms, community contribution, corporate dictionary',
    canonical: '/submit',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Submit Corporate Content',
      url: 'https://learnings.org/submit',
      description: 'Share your corporate buzzwords and business insights with our community.'
    }
  }
};
