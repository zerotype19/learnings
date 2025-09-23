// Feature flag utilities for gradual rollout

export type FeatureFlag = 
  | 'terms_hub_enabled'
  | 'wall_enabled'
  | 'search_v2_enabled'
  | 'submit_v2_enabled'
  | 'wall_public'
  | 'home_feed_v2'
  | 'admin_queue_enabled';

// Cache for feature flags to avoid repeated API calls
let flagCache: Record<string, boolean> = {};
let cacheExpiry = 0;

export async function isFeatureEnabled(flag: FeatureFlag): Promise<boolean> {
  // Check cache first
  if (Date.now() < cacheExpiry && flagCache[flag] !== undefined) {
    return flagCache[flag];
  }

  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.learnings.org';
    const response = await fetch(`${apiUrl}/api/feature-flags/${flag}`, {
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      const enabled = data.enabled === true;
      
      // Update cache
      flagCache[flag] = enabled;
      cacheExpiry = Date.now() + 60000; // 1 minute cache
      
      return enabled;
    }
  } catch (error) {
    console.warn(`Failed to check feature flag ${flag}:`, error);
  }

  // Default values for Phase 1
  const defaults: Record<FeatureFlag, boolean> = {
    terms_hub_enabled: true,
    wall_enabled: false,
    search_v2_enabled: true,
    submit_v2_enabled: true,
    wall_public: false,
    home_feed_v2: false,
    admin_queue_enabled: true,
  };

  return defaults[flag] || false;
}

// Synchronous version for components that need immediate values
export function isFeatureEnabledSync(flag: FeatureFlag): boolean {
  return flagCache[flag] || false;
}

// Clear cache (useful for testing or admin updates)
export function clearFeatureFlagCache(): void {
  flagCache = {};
  cacheExpiry = 0;
}
