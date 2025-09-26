import React, { useState, useEffect } from 'react';
import { FeedList } from '../components/feed/FeedList';
import { trackEvent } from '../lib/api';
import { SearchBox } from '../components/SearchBox';
import { SEO, SEOConfigs } from '../components/SEO';
import { getApiUrl } from '../utils/getApiUrl';

type QuickAction = {
  id: string;
  label: string;
  icon: string;
  description: string;
  onClick: () => void;
};

export function HomeV2() {
  const [showQuickActions, setShowQuickActions] = useState(true);

  useEffect(() => {
    // Track home page view
    trackEvent('home_view');
  }, []);

  const quickActions: QuickAction[] = [
    {
      id: 'submit',
      label: 'Submit',
      icon: '💡',
      description: 'Add new content',
      onClick: () => {
        trackEvent('home_quick_action_click', { action: 'submit' });
        window.location.href = '/submit';
      }
    },
    {
      id: 'translate',
      label: 'Translate',
      icon: '🎓',
      description: 'Jargon translator',
      onClick: () => {
        trackEvent('home_quick_action_click', { action: 'translate' });
        const event = new CustomEvent('professor:prefill', { detail: '' });
        window.dispatchEvent(event);
      }
    },
    {
      id: 'bingo',
      label: 'Bingo',
      icon: '🎯',
      description: 'Create bingo card',
      onClick: () => {
        trackEvent('home_quick_action_click', { action: 'bingo' });
        window.location.href = '/bingo';
      }
    },
    {
      id: 'roast',
      label: 'Roast',
      icon: '🔥',
      description: 'Buzzword roast',
      onClick: () => {
        trackEvent('home_quick_action_click', { action: 'roast' });
        window.location.href = '/generators';
      }
    }
  ];

  const handleFeedItemClick = (item: any) => {
    switch (item.type) {
      case 'term':
        window.location.href = `/term/${item.data.slug}`;
        break;
      case 'wall':
        window.location.href = '/wall';
        break;
      case 'challenge':
        window.location.href = `/challenges/${item.data.slug}`;
        break;
      case 'generator':
        window.location.href = '/generators';
        break;
    }
  };

  const handleRollJargon = async () => {
    try {
      trackEvent('roll_jargon_click');
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/terms?limit=1&sort=random`);
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const randomTerm = data.items[0];
        window.location.href = `/term/${randomTerm.slug}`;
      } else {
        // Fallback to terms page if no random term found
        window.location.href = '/terms';
      }
    } catch (error) {
      console.error('Failed to fetch random term:', error);
      // Fallback to terms page on error
      window.location.href = '/terms';
    }
  };

  return (
    <>
      <SEO {...SEOConfigs.home} />
      <div className="space-y-4">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="text-center py-4 md:py-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
            Operationalizing the Learnings Layer
          </h1>
          <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
            We harmonize disruption with practical nonsense, so your decks ship themselves.
          </p>
            
          {/* Global Search */}
          <div className="max-w-lg mx-auto mb-6">
            <SearchBox
              onNavigate={(url) => {
                if (url.startsWith('/search')) {
                  trackEvent('search_performed', { source: 'home_hero' });
                  window.history.pushState({}, '', url);
                  window.location.reload();
                } else {
                  // Handle internal navigation
                  const path = url.replace(/^\/+/, '');
                  if (path === '') {
                    // Already on home page
                  } else if (path.startsWith('term/')) {
                    window.location.href = url;
                  } else if (path === 'wall') {
                    window.location.href = url;
                  } else if (path === 'generators') {
                    window.location.href = url;
                  } else if (path === 'challenges') {
                    window.location.href = url;
                  } else {
                    window.location.href = url;
                  }
                }
              }}
              placeholder="Search 2,000+ buzzwords…"
              className="w-full"
            />
          </div>

          {/* Random Term Button */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-4 justify-center">
              <button 
                onClick={handleRollJargon}
                className="inline-flex items-center gap-2 rounded-xl2 bg-brand text-white px-6 py-3 text-sm font-medium hover:bg-brand-700 transition-all duration-200 shadow-soft hover:shadow-lg hover:-translate-y-0.5"
              >
                🎯 Initiate Synergy
              </button>
              <button 
                onClick={() => window.location.href = '/submit'}
                className="inline-flex items-center gap-2 rounded-xl2 border border-slate-300 bg-white text-slate-700 px-6 py-3 text-sm font-medium hover:bg-slate-50 transition-all duration-200"
              >
                💡 Contribute Learnings
              </button>
            </div>
            <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-400">
              Clicking this increases synergy by up to 47%.*
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        {showQuickActions && (
          <div className="py-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                De-jargon me
              </h2>
              <div className="mt-2 h-1 w-24 bg-gradient-to-r from-accent-pink via-brand to-accent-sky rounded-full mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {quickActions.map(action => (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                    {action.icon}
                  </div>
                  <div className="font-semibold text-base mb-1">{action.label}</div>
                  <div className="text-sm text-slate-500">{action.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA Band */}
        <div className="bg-slate-50 py-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Submit your masterpiece
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/submit"
                className="inline-flex items-center gap-2 rounded-xl2 bg-brand text-white px-6 py-3 shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
              >
                💡 Submit a Term
              </a>
              <a
                href="/bingo"
                className="inline-flex items-center gap-2 rounded-xl2 border border-slate-200 bg-white text-slate-700 px-6 py-3 hover:bg-slate-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
              >
                🎯 Buzzword Bingo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Feed Section */}
      <div className="py-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
            Fresh jargon, piping hot
          </h2>
          <div className="mt-2 h-1 w-24 bg-gradient-to-r from-accent-pink via-brand to-accent-sky rounded-full mx-auto"></div>
          <p className="text-slate-600 mt-4">
            Recent terms, wall posts, and community contributions
          </p>
        </div>

        <FeedList onItemClick={handleFeedItemClick} />
      </div>
    </div>
    </>
  );
}