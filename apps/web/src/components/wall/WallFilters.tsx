import React from 'react';

type WallFiltersProps = {
  currentTag?: string;
  onTagChange: (tag?: string) => void;
  currentSort: 'trending' | 'new';
  onSortChange: (sort: 'trending' | 'new') => void;
  currentRange: '24h' | '7d' | '30d' | 'all';
  onRangeChange: (range: '24h' | '7d' | '30d' | 'all') => void;
  availableTags?: string[];
};

export function WallFilters({
  currentTag,
  onTagChange,
  currentSort,
  onSortChange,
  currentRange,
  onRangeChange,
  availableTags = []
}: WallFiltersProps) {
  const commonTags = availableTags.length > 0 ? availableTags : [
    'corporate', 'strategy', 'management', 'tech', 'startup', 'consulting'
  ];

  return (
    <div className="bg-white border-b sticky top-16 z-20 py-4">
      <div className="max-w-6xl mx-auto px-4">
        {/* Tags Filter */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-neutral-700 mr-2">Tags:</span>
            <button
              onClick={() => onTagChange(undefined)}
              className={`
                rounded-full border px-3 py-1 text-sm transition-colors
                ${!currentTag 
                  ? 'bg-brand-600 text-white border-brand-600' 
                  : 'border-neutral-200 hover:bg-neutral-50'
                }
              `}
            >
              All
            </button>
            {commonTags.map(tag => (
              <button
                key={tag}
                onClick={() => onTagChange(tag)}
                className={`
                  rounded-full border px-3 py-1 text-sm transition-colors
                  ${currentTag === tag 
                    ? 'bg-brand-600 text-white border-brand-600' 
                    : 'border-neutral-200 hover:bg-neutral-50'
                  }
                `}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Sort and Range Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Sort Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-700">Sort:</span>
            <div className="flex border border-neutral-200 rounded-lg overflow-hidden">
              <button
                onClick={() => onSortChange('trending')}
                className={`
                  px-3 py-1 text-sm transition-colors
                  ${currentSort === 'trending' 
                    ? 'bg-brand-600 text-white' 
                    : 'hover:bg-neutral-50'
                  }
                `}
              >
                Trending
              </button>
              <button
                onClick={() => onSortChange('new')}
                className={`
                  px-3 py-1 text-sm transition-colors border-l border-neutral-200
                  ${currentSort === 'new' 
                    ? 'bg-brand-600 text-white' 
                    : 'hover:bg-neutral-50'
                  }
                `}
              >
                New
              </button>
            </div>
          </div>

          {/* Range Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-700">Range:</span>
            <select
              value={currentRange}
              onChange={(e) => onRangeChange(e.target.value as any)}
              className="text-sm border border-neutral-200 rounded-lg px-3 py-1 bg-white"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="all">All time</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
