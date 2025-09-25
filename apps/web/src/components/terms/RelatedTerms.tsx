import React, { useState, useEffect } from 'react';
import { getShortDescription } from '../../utils/textUtils';

type RelatedTerm = {
  id: string;
  slug: string;
  title: string;
  definition: string;
  tags: string[];
  views: number;
};

type RelatedTermsProps = {
  currentSlug: string;
};

export function RelatedTerms({ currentSlug }: RelatedTermsProps) {
  const [relatedTerms, setRelatedTerms] = useState<RelatedTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';

  useEffect(() => {
    loadRelatedTerms();
  }, [currentSlug]);

  const loadRelatedTerms = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${apiUrl}/api/terms/${currentSlug}/related?limit=5`);
      const data = await response.json();
      
      if (data.success && data.related) {
        setRelatedTerms(data.related);
      } else {
        setError('Failed to load related terms');
      }
    } catch (err) {
      console.error('Error loading related terms:', err);
      setError('Failed to load related terms');
    } finally {
      setLoading(false);
    }
  };

  const handleTermClick = (slug: string) => {
    window.location.href = `/term/${slug}`;
  };

  if (loading) {
    return (
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Related Terms
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || relatedTerms.length === 0) {
    return null; // Don't show anything if no related terms or error
  }

  return (
    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Related Terms
      </h3>
      <div className="space-y-3">
        {relatedTerms.map((term) => (
          <button
            key={term.id}
            onClick={() => handleTermClick(term.slug)}
            className="w-full text-left bg-white rounded-xl p-4 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 group-hover:text-brand-600 transition-colors mb-1">
                  {term.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {getShortDescription(term.definition, 12)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-slate-400">
                    {term.views} views
                  </span>
                  {term.tags && term.tags.length > 0 && (
                    <span className="text-xs text-slate-400">
                      • {term.tags.slice(0, 2).join(', ')}
                    </span>
                  )}
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                  <svg className="w-4 h-4 text-slate-600 group-hover:text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500">
          Keep exploring the corporate jargon dictionary
        </p>
      </div>
    </div>
  );
}
