import React, { useState, useEffect } from 'react';
import { FeedList } from '../components/feed/FeedList';
import { trackEvent } from '../lib/api';

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
        window.location.hash = '/submit';
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
        window.location.hash = '/bingo';
      }
    },
    {
      id: 'roast',
      label: 'Roast',
      icon: '🔥',
      description: 'Buzzword roast',
      onClick: () => {
        trackEvent('home_quick_action_click', { action: 'roast' });
        window.location.hash = '/generators';
      }
    }
  ];

  const handleFeedItemClick = (item: any) => {
    switch (item.type) {
      case 'term':
        window.location.hash = `/term/${item.data.slug}`;
        break;
      case 'wall':
        window.location.hash = '/wall';
        break;
      case 'challenge':
        window.location.hash = `/challenges/${item.data.slug}`;
        break;
      case 'generator':
        window.location.hash = '/generators';
        break;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Learnings Dot Org</h1>
            <p className="text-lg text-neutral-600 mb-6">
              The corporate buzzword dictionary and community
            </p>
            
            {/* Global Search */}
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search terms, wall posts..."
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const query = (e.target as HTMLInputElement).value;
                    if (query.trim()) {
                      trackEvent('search_performed', { source: 'home_hero' });
                      window.location.hash = `/search?q=${encodeURIComponent(query)}`;
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Quick Actions */}
          {showQuickActions && (
            <div className="mb-8">
              <div className="text-center mb-4">
                <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
                <p className="text-sm text-neutral-600">Popular tools and shortcuts</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {quickActions.map(action => (
                  <button
                    key={action.id}
                    onClick={action.onClick}
                    className="bg-white border border-neutral-200 rounded-xl p-4 hover:shadow-md transition-shadow text-center group"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                      {action.icon}
                    </div>
                    <div className="font-medium text-sm mb-1">{action.label}</div>
                    <div className="text-xs text-neutral-500">{action.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#/terms"
              className="px-4 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors"
            >
              📚 Browse Terms
            </a>
            <a
              href="#/wall"
              className="px-4 py-2 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
            >
              📸 Wall Posts
            </a>
            <a
              href="#/generators"
              className="px-4 py-2 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
            >
              🤖 Generators
            </a>
            <a
              href="#/challenges"
              className="px-4 py-2 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
            >
              🏆 Challenges
            </a>
          </div>
        </div>
      </div>

      {/* Feed Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Latest Activity</h2>
          <p className="text-sm text-neutral-600">
            Recent terms, wall posts, and community contributions
          </p>
        </div>

        <FeedList onItemClick={handleFeedItemClick} />
      </div>
    </div>
  );
}
