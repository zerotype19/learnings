import { useEffect, useRef } from 'react';
import tippy, { Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { NonsenseData, NonsenseTip } from '../types/nonsense';

// Custom theme for Learnings tooltips
const createTooltipTheme = () => {
  const style = document.createElement('style');
  style.textContent = `
    .tippy-box[data-theme~='learnings'] {
      background: rgba(255, 255, 255, 0.95);
      color: rgb(39, 39, 42);
      border: 1px solid rgb(228, 228, 231);
      border-radius: 1rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
    
    .tippy-box[data-theme~='learnings'][data-placement^='top'] > .tippy-arrow::before {
      border-top-color: rgba(255, 255, 255, 0.95);
    }
    
    .tippy-box[data-theme~='learnings'][data-placement^='bottom'] > .tippy-arrow::before {
      border-bottom-color: rgba(255, 255, 255, 0.95);
    }
    
    .tippy-box[data-theme~='learnings'][data-placement^='left'] > .tippy-arrow::before {
      border-left-color: rgba(255, 255, 255, 0.95);
    }
    
    .tippy-box[data-theme~='learnings'][data-placement^='right'] > .tippy-arrow::before {
      border-right-color: rgba(255, 255, 255, 0.95);
    }
    
    @media (prefers-color-scheme: dark) {
      .tippy-box[data-theme~='learnings'] {
        background: rgba(24, 24, 27, 0.95);
        color: rgb(244, 244, 245);
        border-color: rgb(63, 63, 70);
      }
      
      .tippy-box[data-theme~='learnings'][data-placement^='top'] > .tippy-arrow::before {
        border-top-color: rgba(24, 24, 27, 0.95);
      }
      
      .tippy-box[data-theme~='learnings'][data-placement^='bottom'] > .tippy-arrow::before {
        border-bottom-color: rgba(24, 24, 27, 0.95);
      }
      
      .tippy-box[data-theme~='learnings'][data-placement^='left'] > .tippy-arrow::before {
        border-left-color: rgba(24, 24, 27, 0.95);
      }
      
      .tippy-box[data-theme~='learnings'][data-placement^='right'] > .tippy-arrow::before {
        border-right-color: rgba(24, 24, 27, 0.95);
      }
    }
  `;
  document.head.appendChild(style);
};

export function useTooltips() {
  const instancesRef = useRef<Instance[]>([]);
  const dataRef = useRef<NonsenseData | null>(null);

  useEffect(() => {
    console.log('useTooltips hook initialized');
    
    // Check if nonsense is disabled or in subtle mode
    const urlParams = new URLSearchParams(window.location.search);
    const noClorg = urlParams.get('noclorg') === '1';
    const localStorageDisabled = localStorage.getItem('nonsenseDisabled') === 'true';
    const subtleMode = localStorage.getItem('nonsenseMode') !== 'loud';
    const forceLoud = urlParams.get('nonsense') === 'hard';
    
    if (noClorg || localStorageDisabled || (subtleMode && !forceLoud)) {
      console.log('Corporate Mode disabled or in subtle mode');
      return;
    }

    // Create custom theme
    createTooltipTheme();

    // Load nonsense data
    const loadNonsenseData = async () => {
      try {
        console.log('Loading nonsense data...');
        const response = await fetch('/nonsense.json');
        const data: NonsenseData = await response.json();
        console.log('Loaded nonsense data:', data);
        dataRef.current = data;
        setupTooltips(data);
      } catch (error) {
        console.error('Failed to load nonsense data:', error);
      }
    };

    const setupTooltips = (data: NonsenseData) => {
      console.log('Setting up tooltips...');
      const currentPath = window.location.pathname;
      const isEnterpriseMode = localStorage.getItem('enterpriseMode') === 'true';
      console.log('Current path:', currentPath, 'Enterprise mode:', isEnterpriseMode);
      
      // Clean up existing instances
      instancesRef.current.forEach(instance => instance.destroy());
      instancesRef.current = [];

      console.log('Processing', data.tooltips.length, 'tooltips');
      data.tooltips.forEach(tip => {
        // Check if tooltip should show on current page
        if (tip.pages && !tip.pages.some(page => {
          if (page === '/') return currentPath === '/';
          return currentPath.startsWith(page);
        })) {
          return;
        }

        // Check once-per-session
        if (tip.oncePerSession) {
          const key = `nonsense_${btoa(tip.selector + tip.text)}`;
          if (localStorage.getItem(key)) {
            return;
          }
        }

        const elements = document.querySelectorAll(tip.selector);
        console.log(`Tooltip selector "${tip.selector}" found ${elements.length} elements`);
        elements.forEach(element => {
          const text = isEnterpriseMode && Math.random() < 0.3 
            ? tip.text + '™' 
            : tip.text;

          const instance = tippy(element as HTMLElement, {
            content: text,
            theme: 'learnings',
            placement: tip.placement || 'top',
            trigger: 'hover focus click',
            delay: isEnterpriseMode ? [100, 50] : [200, 100],
            interactive: false,
            hideOnClick: true,
            onShow: () => {
              // Track analytics
              trackEvent('tooltip', tip.selector, text);
              
              // Mark as seen if once-per-session
              if (tip.oncePerSession) {
                const key = `nonsense_${btoa(tip.selector + tip.text)}`;
                localStorage.setItem(key, 'true');
              }
            }
          });

          instancesRef.current.push(instance);
        });
      });
    };

    const trackEvent = (type: 'tooltip' | 'clorg', id: string, text?: string) => {
      const variant = localStorage.getItem('nonsenseVariant') as 'A' | 'B' || 'A';
      const enterprise = localStorage.getItem('enterpriseMode') === 'true';
      
      const event = {
        type,
        id: btoa(id + (text || '')),
        variant,
        enterprise,
        path: window.location.pathname,
        timestamp: Date.now()
      };

      // Use sendBeacon if available, otherwise fetch
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/nonsense/track', JSON.stringify(event));
      } else {
        fetch('/api/nonsense/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event)
        }).catch(() => {}); // Fire and forget
      }
    };

    loadNonsenseData();

    // Cleanup on unmount
    return () => {
      instancesRef.current.forEach(instance => instance.destroy());
    };
  }, []);

  return { instances: instancesRef.current };
}
