// Simple confetti utility for success actions
export function burstAt(element: HTMLElement, options: {
  count?: number;
  duration?: number;
  colors?: string[];
} = {}) {
  const {
    count = 20,
    duration = 600,
    colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981']
  } = options;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Create confetti container
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  // Create confetti pieces
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.left = `${centerX}px`;
    confetti.style.top = `${centerY}px`;
    confetti.style.width = '6px';
    confetti.style.height = '6px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    
    // Random velocity and direction
    const angle = (Math.PI * 2 * i) / count;
    const velocity = 50 + Math.random() * 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 50; // Upward bias
    
    confetti.style.transform = `translate(${vx}px, ${vy}px)`;
    confetti.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
    
    container.appendChild(confetti);
    
    // Animate
    requestAnimationFrame(() => {
      confetti.style.transform = `translate(${vx * 2}px, ${vy * 2 + 200}px)`;
      confetti.style.opacity = '0';
    });
  }

  // Clean up
  setTimeout(() => {
    container.remove();
  }, duration + 100);
}
