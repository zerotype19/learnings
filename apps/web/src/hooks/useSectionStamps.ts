import { useEffect } from 'react';

export function useSectionStamps() {
  useEffect(() => {
    const phrases = [
      "Approved by Stakeholders", 
      "Narrative-Ready", 
      "QBR-Compliant",
      "Enterprise-Grade",
      "Scalable Solution",
      "Best Practice",
      "Industry Standard",
      "Future-Proof"
    ];

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = document.createElement('span');
          el.textContent = phrases[Math.floor(Math.random() * phrases.length)];
          el.className = "absolute top-2 right-3 text-[10px] px-2 py-0.5 rounded bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 opacity-0 transition-opacity duration-300 font-medium";
          
          const parent = entry.target as HTMLElement;
          parent.style.position = parent.style.position || 'relative';
          parent.appendChild(el);
          
          // Fade in
          requestAnimationFrame(() => { 
            el.style.opacity = '1'; 
          });
          
          // Fade out and remove
          setTimeout(() => { 
            el.style.opacity = '0'; 
            setTimeout(() => el.remove(), 300); 
          }, 800);
        }
      });
    }, { threshold: 0.6 });

    // Observe all h2 elements in main content
    const h2Elements = document.querySelectorAll('main h2, main h3');
    h2Elements.forEach(h => obs.observe(h));

    return () => obs.disconnect();
  }, []);
}
