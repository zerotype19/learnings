import React, { useState, useEffect, useRef } from 'react';
import type { SearchResult } from '@learnings/lib';

interface SearchBoxProps {
  onNavigate?: (url: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBox({ 
  onNavigate, 
  placeholder = "Search terms, wall posts...",
  className = ""
}: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';

  // Debounced search function
  const searchSuggestions = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `${apiUrl}/api/search/suggest?q=${encodeURIComponent(searchQuery)}&limit=8`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      setSuggestions(data.suggestions || []);
      setIsOpen(true);
      setSelectedIndex(-1);
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed. Please try again.');
      setSuggestions([]);
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search calls
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchSuggestions(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchResult) => {
    const url = suggestion.url || `/${suggestion.type}/${suggestion.id}`;
    if (onNavigate) {
      onNavigate(url);
    } else {
      window.location.href = url;
    }
    setIsOpen(false);
    setQuery('');
    setSuggestions([]);
    inputRef.current?.blur();
  };

  // Handle search (when no suggestion is selected)
  const handleSearch = () => {
    if (query.trim()) {
      const searchUrl = `/search?q=${encodeURIComponent(query.trim())}`;
      if (onNavigate) {
        onNavigate(searchUrl);
      } else {
        // Use pushState to avoid URL stacking
        window.history.pushState({}, '', searchUrl);
        window.location.reload();
      }
    }
    setIsOpen(false);
    setQuery('');
    setSuggestions([]);
    inputRef.current?.blur();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get icon for result type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'term': return '📚';
      case 'wall': return '📸';
      case 'generator': return '🤖';
      case 'challenge': return '🏆';
      default: return '📄';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (suggestions.length > 0) {
            setIsOpen(true);
          }
        }}
        placeholder={placeholder}
        className="w-full px-3 py-1 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
      />
      
      {/* Loading indicator */}
      {loading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-brand-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Search suggestions dropdown */}
      {isOpen && (suggestions.length > 0 || error) && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          {error ? (
            <div className="px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          ) : (
            <>
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.type}-${suggestion.id}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-neutral-50 transition-colors ${
                    index === selectedIndex ? 'bg-brand-50 text-brand-700' : 'text-neutral-700'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-base flex-shrink-0 mt-0.5">
                      {getTypeIcon(suggestion.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">
                        {suggestion.title}
                      </div>
                      {suggestion.description && (
                        <div className="text-xs text-neutral-500 truncate mt-0.5">
                          {suggestion.description}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-neutral-400 flex-shrink-0 mt-0.5">
                      {suggestion.type}
                    </span>
                  </div>
                </button>
              ))}
              
              {/* Search all results option */}
              {query.trim() && (
                <div className="border-t border-neutral-100">
                  <button
                    onClick={handleSearch}
                    className="w-full px-3 py-2 text-left text-sm text-brand-600 hover:bg-brand-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🔍</span>
                      <span>Search for "{query}"</span>
                    </div>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
