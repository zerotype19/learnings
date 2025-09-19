import React, { useState, useEffect } from 'react';
import { LetterIndex } from '../components/terms/LetterIndex';

type Term = {
  id: string;
  slug: string;
  title: string;
  definition: string;
  short_def?: string;
  tags: string[];
  views: number;
  created_at: string;
};

type SortOption = 'newest' | 'popular' | 'alpha';

export function TermsHub() {
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';

  const loadTerms = async (reset = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const params = new URLSearchParams({
        sort: sortBy,
        limit: '20'
      });

      if (activeLetter) params.set('letter', activeLetter);
      if (!reset && nextCursor) params.set('cursor', nextCursor);

      const response = await fetch(`${apiUrl}/api/terms?${params}`, {
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

  // Load terms when filters change
  useEffect(() => {
    setTerms([]);
    setNextCursor(null);
    loadTerms(true);
  }, [activeLetter, sortBy]);

  // Search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // Reset to normal view
      setActiveLetter('');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/search?q=${encodeURIComponent(searchQuery)}&type=terms`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setTerms(data.items || []);
        setNextCursor(null); // No pagination for search results
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLetterClick = (letter: string) => {
    setActiveLetter(letter);
    setSearchQuery(''); // Clear search when using letter filter
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-4">📚 Corporate Dictionary</h1>
          
          {/* Search */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-4 py-2 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              <label className="text-sm font-medium">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm border border-neutral-200 rounded px-2 py-1"
              >
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
                <option value="alpha">A-Z</option>
              </select>
            </div>

            <div className="flex gap-2">
              <label className="text-sm font-medium">View:</label>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2 py-1 text-xs rounded ${viewMode === 'grid' ? 'bg-brand-100 text-brand-700' : 'text-neutral-600'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-2 py-1 text-xs rounded ${viewMode === 'list' ? 'bg-brand-100 text-brand-700' : 'text-neutral-600'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Letter Index */}
      <LetterIndex activeLetter={activeLetter} onLetterClick={handleLetterClick} />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {searchQuery && (
          <div className="mb-4 text-sm text-neutral-600">
            Search results for "{searchQuery}" • {terms.length} found
          </div>
        )}

        {activeLetter && (
          <div className="mb-4 text-sm text-neutral-600">
            Terms starting with "{activeLetter}" • {terms.length} found
          </div>
        )}

        {/* Terms Grid/List */}
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
            : 'space-y-4'
          }
        `}>
          {terms.map(term => (
            <TermCard key={term.id} term={term} viewMode={viewMode} />
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="text-neutral-600">Loading terms...</div>
          </div>
        )}

        {/* Load More */}
        {!loading && nextCursor && !searchQuery && (
          <div className="text-center mt-8">
            <button
              onClick={() => loadTerms(false)}
              className="px-6 py-2 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
            >
              Load More Terms
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && terms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-xl text-neutral-600 mb-2">No terms found</div>
            <div className="text-sm text-neutral-500">
              {searchQuery ? 'Try a different search term' : 'Be the first to contribute!'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type TermCardProps = {
  term: Term;
  viewMode: 'grid' | 'list';
};

function TermCard({ term, viewMode }: TermCardProps) {
  const handleClick = () => {
    window.location.hash = `/term/${term.slug}`;
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={handleClick}
        className="bg-white border border-neutral-200 rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{term.title}</h3>
            <p className="text-neutral-600 text-sm mb-2">
              {term.short_def || term.definition.substring(0, 160)}
            </p>
            {term.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {term.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="text-xs text-neutral-500 ml-4">
            {term.views} views
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="bg-white border border-neutral-200 rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <h3 className="font-semibold text-lg mb-2">{term.title}</h3>
      <p className="text-neutral-600 text-sm mb-3">
        {term.short_def || term.definition.substring(0, 120)}...
      </p>
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-1">
          {term.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="text-xs text-neutral-500">
          {term.views} views
        </div>
      </div>
    </div>
  );
}
