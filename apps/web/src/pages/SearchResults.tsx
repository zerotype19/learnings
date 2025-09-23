import React, { useState, useEffect } from 'react';
import type { SearchResult } from '@learnings/lib';

export function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';

  // Get query from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q') || '';
    setQuery(searchQuery);
    
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, []);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setTotal(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/search?q=${encodeURIComponent(searchQuery)}&limit=20`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      setResults(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed. Please try again.');
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'term': return '📚';
      case 'wall': return '📸';
      case 'generator': return '🤖';
      case 'challenge': return '🏆';
      default: return '📄';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'term': return 'Term';
      case 'wall': return 'Wall Post';
      case 'generator': return 'Generator';
      case 'challenge': return 'Challenge';
      default: return 'Content';
    }
  };

  const handleResultClick = (result: SearchResult) => {
    const url = result.url || `/${result.type}/${result.id}`;
    window.location.href = url;
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink mb-2">
          {query ? `Search results for "${query}"` : 'Search'}
        </h1>
        {total > 0 && (
          <p className="text-neutral-600">
            Found {total} result{total !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-2 border-brand-500 border-t-transparent rounded-full"></div>
          <span className="ml-3 text-neutral-600">Searching...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* No Results */}
      {!loading && !error && results.length === 0 && query && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-ink mb-2">No results found</h3>
          <p className="text-neutral-600 mb-4">
            We couldn't find anything matching "{query}"
          </p>
          <p className="text-sm text-neutral-500">
            Try different keywords or check your spelling
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && !query && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-ink mb-2">Start searching</h3>
          <p className="text-neutral-600">
            Enter a search term to find terms, wall posts, and more
          </p>
        </div>
      )}

      {/* Search Results */}
      {!loading && !error && results.length > 0 && (
        <div className="space-y-4">
          {results.map((result) => (
            <button
              key={`${result.type}-${result.id}`}
              onClick={() => handleResultClick(result)}
              className="w-full text-left p-4 bg-white border border-neutral-200 rounded-lg hover:border-brand-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0 mt-1">
                  {getTypeIcon(result.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-ink group-hover:text-brand-600 transition-colors">
                      {result.title}
                    </h3>
                    <span className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-full">
                      {getTypeLabel(result.type)}
                    </span>
                  </div>
                  {result.description && (
                    <p className="text-sm text-neutral-600 line-clamp-2">
                      {result.description}
                    </p>
                  )}
                  {result.relevance_score && (
                    <div className="mt-2 text-xs text-neutral-500">
                      Relevance: {Math.round(result.relevance_score * 100)}%
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 text-neutral-400 group-hover:text-brand-500 transition-colors">
                  →
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Load More Button (if needed) */}
      {!loading && !error && results.length > 0 && results.length < total && (
        <div className="text-center mt-8">
          <button className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">
            Load More Results
          </button>
        </div>
      )}
    </div>
  );
}
