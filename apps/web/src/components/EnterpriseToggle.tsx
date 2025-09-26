import React, { useState, useEffect } from 'react';
import { trackEvent } from '../lib/api';
import { setCorporateMode, initializeCorporateMode } from '../lib/corporateMode';

export function EnterpriseToggle() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Corporate Mode temporarily disabled
    // initializeCorporateMode();
    
    // Check current state
    const isOn = localStorage.getItem('corpMode') === '1';
    setIsEnabled(isOn);
  }, []);

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    
    // Corporate Mode temporarily disabled
    // setCorporateMode(newState);

    // Track analytics
    trackToggle(newState);
  };

  const trackToggle = (enabled: boolean) => {
    trackEvent('enterprise_toggle', {
      enabled,
      path: window.location.pathname
    });
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
        Enables Sprinkle™, Executive Summary, and corporate bluewash.
      </div>
    </div>
  );
}
