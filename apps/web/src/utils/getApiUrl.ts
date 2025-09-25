/**
 * Get the correct API URL based on the environment
 * In production, always use the production API
 * In development, use the environment variable or fallback to localhost
 */
export function getApiUrl(): string {
  console.log('DIAGNOSTIC: getApiUrl called');
  console.log('DIAGNOSTIC: import.meta.env.PROD =', import.meta.env.PROD);
  console.log('DIAGNOSTIC: import.meta.env.VITE_API_URL =', import.meta.env.VITE_API_URL);
  console.log('DIAGNOSTIC: window.location.hostname =', window.location.hostname);

  // In production, always use the production API
  if (import.meta.env.PROD || window.location.hostname === 'learnings.org') {
    console.log('DIAGNOSTIC: Returning production API URL due to PROD flag or production hostname.');
    return 'https://api.learnings.org';
  }
  
  const apiUrlFromEnv = import.meta.env.VITE_API_URL;
  if (apiUrlFromEnv && apiUrlFromEnv !== 'http://127.0.0.1:8787') {
    console.log('DIAGNOSTIC: Returning API URL from VITE_API_URL env var.');
    return apiUrlFromEnv;
  }

  console.log('DIAGNOSTIC: Falling back to localhost API URL.');
  return 'http://127.0.0.1:8787';
}
