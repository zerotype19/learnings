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
                { scenario: "Managers renaming layoffs as talent mobility", expected: "Mobility Washing" },
                { scenario: "Meetings to plan the next meeting", expected: "Calendar Creep" },
                { scenario: "Old product rebranded as AI", expected: "Model Washing" },
                { scenario: "Dashboards refreshed weekly with no insights", expected: "Metric Mirage" },
                { scenario: "Executives reframing problems as opportunities", expected: "Opportunity Theater" },
                { scenario: "Standups all day, zero shipping", expected: "Agile Theater" },
                { scenario: "Renaming bugs as enhancements", expected: "Enhancement Washing" },
                { scenario: "Reorg chaos sold as simplification", expected: "Simplification Spin" },
                { scenario: "Twenty people in 'alignment' meetings", expected: "Alignment Overload" },
                { scenario: "Every plan turned into a framework", expected: "Framework Fever" },
                { scenario: "Interns titled Chief of Staff", expected: "Title Inflation" },
                { scenario: "Pilots that never launch", expected: "Pilot Purgatory" },
                { scenario: "New logo instead of strategy", expected: "Logo Therapy" },
                { scenario: "Process added until nothing ships", expected: "Process Paralysis" },
                { scenario: "Rightsizing used to mask layoffs", expected: "Rightsizing Theater" },
                { scenario: "OKRs rewritten weekly", expected: "Objective Drift" },
                { scenario: "New Slack channels instead of decisions", expected: "Channel Creep" },
                { scenario: "Support rebranded as success with no change", expected: "Success Washing" },
                { scenario: "Roadmap changes every sprint", expected: "Roadmap Roulette" },
                { scenario: "Buying tools to avoid training", expected: "SaaS Bandage" },
                { scenario: "Simple task becomes cross-functional saga", expected: "Complexity Inflation" },
                { scenario: "Only positive metrics reported", expected: "Dashboard Selective" },
                { scenario: "Press release posing as strategy", expected: "PR Strategy" },
                { scenario: "Minor update sold as breakthrough", expected: "Innovation Theater" },
                { scenario: "Mandatory office sold as flexibility", expected: "Flexibility Theater" },
                { scenario: "Renaming layoffs as redeployment", expected: "Redeploy Rhetoric" },
                { scenario: "Endless discovery, no delivery", expected: "Research Loop" },
                { scenario: "Brainstorm replaces commitment", expected: "Ideation Stall" },
                { scenario: "Vendor demo promises everything", expected: "Panacea Pitch" },
                { scenario: "Spreadsheets treated as truth", expected: "Excel Absolutism" }
              ].map((example, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg text-sm">
                  <div className="text-slate-700 mb-1">{example.scenario}</div>
                  <div className="text-brand-600 font-medium">→ {example.expected}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
