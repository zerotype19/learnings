/**
 * Get the correct API URL based on the environment
 * In production, always use the production API
 * In development, use the environment variable or fallback to localhost
 */
export function getApiUrl(): string {
  // In production, always use the production API
  if (import.meta.env.PROD) {
    return 'https://api.learnings.org';
  }
  // In development, use the environment variable or fallback to localhost
  return import.meta.env.VITE_API_URL || 'http://127.0.0.1:8787';
}
