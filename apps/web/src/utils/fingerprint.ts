export function getFingerprint(): string {
  const key = 'learnings_fingerprint';
  let fingerprint = localStorage.getItem(key);
  
  if (!fingerprint) {
    // Generate a unique fingerprint
    fingerprint = 'fp_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem(key, fingerprint);
  }
  
  return fingerprint;
}
