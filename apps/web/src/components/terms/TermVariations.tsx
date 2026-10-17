import { useInitialData } from '../../server/initial-data';
import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../../utils/getApiUrl';

type TermVariation = {
  id: string;
  slug: string;
  title: string;
  definition: string;
  examples?: string;
  tags: string[];
  views: number;
  created_at: string;
};

type TermVariationsProps = {
  currentSlug: string;
  baseTerm: string;
};

export function TermVariations({ currentSlug, baseTerm }: TermVariationsProps) {
  const initial = useInitialData();
  const initialItems = initial?.term?.slug === currentSlug ? initial.variations : undefined;
  const [variations, setVariations] = useState<TermVariation[]>(initialItems || []);
  const [loading, setLoading] = useState(!initialItems);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = getApiUrl();

  useEffect(() => {
    if (initialItems) { setVariations(initialItems); setLoading(false); setError(null); }
    else loadVariations();
  }, [currentSlug]);

  const loadVariations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${apiUrl}/api/terms/variations/${currentSlug}`);
      const data = await response.json();
      
      if (data.success && data.variations) {
        // Filter out the current variation to avoid showing it twice
        const otherVariations = data.variations.filter(
          (variation: TermVariation) => variation.slug !== currentSlug
        );
        setVariations(otherVariations);
      } else {
        setError('Failed to load variations');
      }
    } catch (err) {
      console.error('Error loading variations:', err);
      setError('Failed to load variations');
    } finally {
      setLoading(false);
    }
  };

  const handleVariationClick = (variationSlug: string) => {
    // Navigate to the variation
    window.location.href = `/term/${variationSlug}`;
  };

  if (loading) {
    return (
      <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Other Definitions of "{baseTerm}"
        </h3>
        <div className="space-y-3">
          <div className="animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-2/3 mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || variations.length === 0) {
    return null; // Don't show anything if no variations or error
  }

  return (
    <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Other Definitions of "{baseTerm}"
      </h3>
      <div className="space-y-4">
        {variations.map((variation) => (
          <a
            key={variation.id}
            className="block bg-white rounded-xl p-4 border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer group"
            href={`/term/${encodeURIComponent(variation.slug)}`}
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-slate-700 text-sm leading-relaxed mb-2 group-hover:text-slate-900 transition-colors">
                  {variation.definition}
                </p>
                {variation.examples && (
                  <p className="text-slate-500 text-xs italic">
                    "{variation.examples}"
                  </p>
                )}
              </div>
              <div className="ml-4 flex-shrink-0">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                  <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-6">
        {/* Added space below the definitions */}
      </div>
    </div>
  );
}
