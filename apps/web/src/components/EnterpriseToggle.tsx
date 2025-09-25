import React, { useState, useEffect } from 'react';

export function EnterpriseToggle() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Load state from localStorage
    const saved = localStorage.getItem('enterpriseMode');
    setIsEnabled(saved === 'true');
  }, []);

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem('enterpriseMode', newState.toString());
    
    // Add/remove class to html for global styling
    if (newState) {
      document.documentElement.classList.add('enterprise-mode');
    } else {
      document.documentElement.classList.remove('enterprise-mode');
    }

    // Track analytics
    trackToggle(newState);
  };

  const trackToggle = (enabled: boolean) => {
    const event = {
      type: 'enterprise_toggle',
      enabled,
      path: window.location.pathname,
      timestamp: Date.now()
    };

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/nonsense/track', JSON.stringify(event));
    } else {
      fetch('/api/nonsense/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(() => {});
    }
  };

  return (
    <div className="flex items-center gap-3 text-sm">
      <label className="flex items-center gap-2 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={handleToggle}
            className="sr-only"
          />
          <div className={`w-10 h-6 rounded-full transition-colors duration-200 ${
            isEnabled 
              ? 'bg-brand-600' 
              : 'bg-zinc-300 dark:bg-zinc-600'
          }`}>
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
              isEnabled ? 'translate-x-4' : 'translate-x-0'
            }`} />
          </div>
        </div>
        <span className="text-zinc-700 dark:text-zinc-300">
          Engage Corporate Mode
        </span>
      </label>
      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        Doubles down on tooltips™ and increases Clorg enthusiasm.
      </div>
    </div>
  );
}
