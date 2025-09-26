import { useState, useEffect } from 'react';
import { LetterIndex } from '../components/terms/LetterIndex';
import { getShortDescription } from '../utils/textUtils';
import { SearchBox } from '../components/SearchBox';
import { SEO, SEOConfigs } from '../components/SEO';
import { getApiUrl } from '../utils/getApiUrl';

type Term = {
  id: string;
  slug: string;
  title: string;
  definition: string;
  tags: string[];
  views: number;
  created_at: string;
};

type SortOption = 'newest' | 'popular' | 'alpha' | 'random';

export function TermsHub() {
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('random');
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [letterCount, setLetterCount] = useState<number>(0);

  const apiUrl = getApiUrl();

  const loadTerms = async (reset = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const params = new URLSearchParams({
        sort: activeLetter ? 'alpha' : sortBy, // Use alphabetical when letter is selected
        limit: '20'
      });

      if (activeLetter) params.set('letter', activeLetter);
      if (!reset && nextCursor) {
        params.set('cursor', nextCursor);
      }

      const url = `${apiUrl}/api/terms?${params}`;
      
      const response = await fetch(url, {
        credentials: 'include'
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      
      if (reset) {
        setTerms(data.items || []);
      } else {
        setTerms(prev => [...prev, ...(data.items || [])]);
      }
      
      setNextCursor(data.nextCursor);
    } catch (error) {
      console.error('Failed to load terms:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLetterCount = async (letter: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/terms/letters`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        const letterData = data.letters.find((l: any) => l.letter === letter.toUpperCase());
        setLetterCount(letterData ? letterData.count : 0);
      }
    } catch (error) {
      console.error('Failed to fetch letter count:', error);
      setLetterCount(0);
    }
  };

  // Initialize from URL parameters and load terms
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const letter = urlParams.get('letter');
    setActiveLetter(letter || '');
    
    // Load terms immediately with the parsed letter
    setTerms([]);
    setNextCursor(null);
    
    const loadInitialTerms = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          sort: letter ? 'alpha' : 'random',
          limit: '20'
        });
        if (letter) params.set('letter', letter);

        const response = await fetch(`${apiUrl}/api/terms?${params}`, {
          credentials: 'include'
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setTerms(data.items || []);
        setNextCursor(data.nextCursor);
      } catch (error) {
        console.error('Failed to load terms:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialTerms();
    
    // Fetch count for the letter if one is selected
    if (letter) {
      fetchLetterCount(letter);
    }
    
    // Listen for URL changes (back/forward navigation)
    const updateFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const letter = urlParams.get('letter');
      setActiveLetter(letter || '');
    };
    
    window.addEventListener('popstate', updateFromURL);
    
    return () => {
      window.removeEventListener('popstate', updateFromURL);
    };
  }, []);

  // Load terms when filters change (but not on initial load)
  useEffect(() => {
    // Skip if this is the initial load (handled above)
    if (terms.length === 0 && !loading) return;
    
    setTerms([]);
    setNextCursor(null);
    loadTerms(true);
    
    // Fetch count for the active letter
    if (activeLetter) {
      fetchLetterCount(activeLetter);
    } else {
      setLetterCount(0);
    }
  }, [activeLetter, sortBy]);

  const handleLetterClick = (letter: string) => {
    setActiveLetter(letter);
    setSearchQuery(''); // Clear search when using letter filter
    
    // Fetch count for the selected letter
    if (letter) {
      fetchLetterCount(letter);
    } else {
      setLetterCount(0);
    }
    
    // Update URL
    const url = new URL(window.location.href);
    if (letter) {
      url.searchParams.set('letter', letter);
    } else {
      url.searchParams.delete('letter');
    }
    window.history.pushState({}, '', url.toString());
  };

  return (
    <>
      <SEO {...SEOConfigs.terms} />
      <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              Translate your meeting to human
            </h1>
            <div className="mt-2 h-1 w-24 bg-gradient-to-r from-accent-pink via-brand to-accent-sky rounded-full mx-auto"></div>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Browse 2,000+ corporate buzzwords with witty, satirical definitions
            </p>
          </div>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBox
              placeholder="Search 2,000+ buzzwords…"
              onNavigate={(url) => window.location.href = url}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-slate-700">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-xl2 border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none transition-all duration-200"
              >
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
                <option value="alpha">A-Z</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">View:</label>
              <div className="flex rounded-xl2 border border-slate-200 bg-slate-50 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Letter Index */}
      <LetterIndex activeLetter={activeLetter} onLetterClick={handleLetterClick} />

      {/* Content */}
      <div className="py-8">
        {searchQuery && (
          <div className="text-center mb-8">
            <div className="text-slate-600">
              Search results for <span className="font-semibold text-slate-900">"{searchQuery}"</span> • {terms.length} found
            </div>
          </div>
        )}

        {activeLetter && (
          <div className="text-center mb-8">
            <div className="text-slate-600">
              Terms starting with <span className="font-semibold text-slate-900">"{activeLetter}"</span> • {letterCount} found
            </div>
          </div>
        )}

        {/* Terms Grid/List */}
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4 max-w-4xl mx-auto'
          }
        `}>
          {terms.map(term => (
            <TermCard key={term.id} term={term} viewMode={viewMode} />
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-slate-600">Loading more buzzwords...</div>
          </div>
        )}

        {/* Load More */}
        {!loading && nextCursor && !searchQuery && (
          <div className="text-center mt-12">
            <button
              onClick={() => loadTerms(false)}
              className="inline-flex items-center gap-2 rounded-xl2 border border-slate-200 bg-white text-slate-700 px-6 py-3 hover:bg-slate-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
            >
              Load More Terms
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && terms.length === 0 && (
          <div className="text-center py-16">
            <div className="text-2xl text-slate-600 mb-3">
              {searchQuery ? 'No buzz found. Try "synergy soup".' : 'No terms found'}
            </div>
            <div className="text-slate-500 mb-8">
              {searchQuery ? 'Try a different search term' : 'Be the first to contribute!'}
            </div>
            {!searchQuery && (
              <button
                onClick={() => window.location.href = '/submit'}
                className="inline-flex items-center gap-2 rounded-xl2 bg-brand text-white px-6 py-3 shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
              >
                💡 Submit a Term
              </button>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

type TermCardProps = {
  term: Term;
  viewMode: 'grid' | 'list';
};

function TermCard({ term, viewMode }: TermCardProps) {
  const handleClick = () => {
    window.location.href = `/term/${term.slug}`;
  };

  if (viewMode === 'list') {
    return (
      <article 
        onClick={handleClick}
        className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold tracking-tight group-hover:text-brand transition-colors mb-2">
              {term.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              {getShortDescription(term.definition, 8)}
            </p>
            {term.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {term.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 hover:bg-white hover:border-brand/30 hover:text-brand transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="text-xs text-slate-500 ml-4 flex-shrink-0">
            👀 {term.views} views
          </div>
        </div>
      </article>
    );
  }

  return (
    <article 
      onClick={handleClick}
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <h3 className="text-xl font-semibold tracking-tight group-hover:text-brand transition-colors mb-3">
        {term.title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-4">
        {getShortDescription(term.definition, 6)}...
      </p>
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {term.tags.slice(0, 2).map(tag => (
            <span key={tag} className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 hover:bg-white hover:border-brand/30 hover:text-brand transition-colors">
              {tag}
            </span>
          ))}
        </div>
        <div className="text-xs text-slate-500 flex-shrink-0">
          👀 {term.views}
        </div>
      </div>
    </article>
  );
}
