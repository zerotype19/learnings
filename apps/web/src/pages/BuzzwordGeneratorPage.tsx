import React from 'react';
import { BuzzwordGenerator } from '../components/generators/BuzzwordGenerator';
import { SEO, SEOConfigs } from '../components/SEO';

export function BuzzwordGeneratorPage() {
  return (
    <>
      <SEO 
        title="Buzzword Generator | Learnings.org"
        description="Turn corporate chaos into satirical buzzwords. Generate witty, satirical corporate buzzwords from real workplace scenarios."
        canonical="/generators/buzzword"
      />
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
                🎯 Buzzword Generator
              </h1>
              <div className="mt-2 h-1 w-24 bg-gradient-to-r from-accent-pink via-brand to-accent-sky rounded-full mx-auto"></div>
              <p className="text-slate-600 mt-6 max-w-2xl mx-auto text-lg">
                Turn corporate chaos into satirical buzzwords. Describe any workplace phenomenon and watch it transform into the perfect corporate buzzword.
              </p>
            </div>
          </div>
        </div>

        {/* Generator */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <BuzzwordGenerator />
        </div>

        {/* Examples Section */}
        <div className="bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
              Example Scenarios
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Managers renaming layoffs as 'talent mobility'",
                "Teams doing 5 standups a day, no delivery",
                "Rebranding dashboards monthly without insights",
                "Meetings to plan meetings",
                "Calling interns 'Chief of Staff'",
                "Vendor demo that solves everything",
                "Renaming old idea as AI",
                "Edges shaved in reviews to avoid conflict",
                "Moving work to slides, not prod"
              ].map((example, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg text-sm text-slate-700">
                  {example}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
