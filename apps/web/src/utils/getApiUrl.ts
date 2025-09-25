/**
 * Get the correct API URL based on the environment
 * In production, always use the production API
 * In development, use the environment variable or fallback to localhost
 */
export function getApiUrl(): string {
  // In production, always use the production API
  if (import.meta.env.PROD || window.location.hostname === 'learnings.org') {
    return 'https://api.learnings.org';
  }
  
  const apiUrlFromEnv = import.meta.env.VITE_API_URL;
  if (apiUrlFromEnv && apiUrlFromEnv !== 'http://127.0.0.1:8787') {
    return apiUrlFromEnv;
  }

  return 'http://127.0.0.1:8787';
}
