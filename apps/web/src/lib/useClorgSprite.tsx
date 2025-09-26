import { useEffect } from "react";

type ClorgOptions = {
  probability?: number;             // default 0.4
  maxPerSession?: number;           // default 5
  phrases?: string[];
  includePaths?: RegExp[];          // optional
  criticalSelectors?: string[];     // to avoid overlapping
};

export function useClorgSprite(opts: ClorgOptions = {}) {
  useEffect(() => {
    console.log('🎯 USECLORGSPRITE HOOK CALLED WITH OPTS:', opts);
    console.log('🎯 Current URL:', window.location.href);
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get("noclorg") === "1") {
        console.log('Clorg disabled via URL param');
        return;
      }
      
      // Test mode - force Clorg to appear
      if (url.searchParams.get("testclorg") === "1") {
        console.log('Clorg test mode enabled - forcing spawn');
        // Skip all other checks and force spawn
      } else if (url.searchParams.get("resetclorg") === "1") {
        console.log('Clorg reset mode - clearing session count');
        localStorage.setItem("clorgSeenCount", "0");
        localStorage.setItem("clorgSeenDay", new Date().toISOString().slice(0, 10));
        // Continue with normal probability check
      } else {
        // Check for corporate mode and adjust probability
        const isCorporateMode = document.documentElement.classList.contains('corp-mode');
        const baseProbability = opts.probability ?? 0.4;
        const probability = isCorporateMode ? 0.7 : baseProbability;
        
        console.log('Clorg probability check:', { isCorporateMode, baseProbability, probability });
        
        const maxPerSession = opts.maxPerSession ?? 5;
        const includePaths = opts.includePaths ?? []; // empty = all routes
        const criticalSelectors = opts.criticalSelectors ?? [
          ".hero .btn-primary",
          "input[type='search']",
          "nav",
          "footer",
          ".modal",
          "[role='dialog']"
        ];

        if (includePaths.length && !includePaths.some(r => r.test(location.pathname))) {
          console.log('Clorg blocked by includePaths');
          return;
        }

        // Daily reset logic
        const today = new Date().toISOString().slice(0, 10);
        const storedDay = localStorage.getItem("clorgSeenDay");
        if (storedDay !== today) {
          localStorage.setItem("clorgSeenDay", today);
          localStorage.setItem("clorgSeenCount", "0");
        }

        const seen = Number(localStorage.getItem("clorgSeenCount") || "0");
        console.log('Clorg seen count:', seen, 'max per session:', maxPerSession);
        if (seen >= maxPerSession) {
          console.log('Clorg blocked by max per session');
          return;
        }

        // Check for corporate mode reroll trigger
        if (isCorporateMode && (window as any).__triggerClorg) {
          (window as any).__triggerClorg = false;
          console.log('Clorg forced spawn due to corporate mode trigger');
          // Force spawn regardless of probability
        } else {
          const random = Math.random();
          console.log('Clorg random check:', random, 'vs probability:', probability);
          if (random > probability) {
            console.log('Clorg blocked by probability');
            return;
          }
        }
      }
      
      console.log('Clorg passed all checks, proceeding to spawn!');

      // Load phrases from window.__NONSENSE__ or fall back.
      const phrases: string[] =
        (window as any).__NONSENSE__?.clorgPhrases || opts.phrases || [
          "Bullet points or die, respectfully."
        ];
      
      console.log('Clorg hook running, phrases available:', phrases.length);
      console.log('Window __NONSENSE__:', (window as any).__NONSENSE__);
      console.log('Opts phrases:', opts.phrases);
      
      if (phrases.length === 0) {
        console.log('No phrases available for Clorg, exiting');
        return;
      }
      
      // Debug: Log available phrases
      console.log('Clorg phrases loaded:', phrases.length, 'phrases available');
      console.log('Sample phrases:', phrases.slice(0, 5));
      console.log('All phrases:', phrases);
      
      // Use session storage to track recently used phrases to avoid repetition
      const recentPhrases = JSON.parse(sessionStorage.getItem('clorgRecentPhrases') || '[]');
      const availablePhrases = phrases.filter(p => !recentPhrases.includes(p));
      
      // If we've used all phrases, reset the recent list
      if (availablePhrases.length === 0) {
        sessionStorage.setItem('clorgRecentPhrases', '[]');
        availablePhrases.push(...phrases);
      }
      
      const phrase = availablePhrases[Math.floor(Math.random() * availablePhrases.length)];
      
      // Add this phrase to recent list (keep last 10)
      const newRecent = [...recentPhrases, phrase].slice(-10);
      sessionStorage.setItem('clorgRecentPhrases', JSON.stringify(newRecent));
      
      console.log('Clorg selected phrase:', phrase);

      // Build DOM
      const container = document.createElement("div");
      container.setAttribute("id", "clorg-sprite");
      container.setAttribute("aria-hidden", "false");
      Object.assign(container.style, {
        position: "fixed",
        zIndex: "40",
        pointerEvents: "auto",
        cursor: "pointer",
        background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
        borderRadius: "50%",
        padding: "20px",
        backdropFilter: "blur(2px)"
      } as CSSStyleDeclaration);

      const img = document.createElement("img");
      img.src = "/clorg.png";
      img.alt = "Clorg, the Stakeholder paperclip";
      img.width = window.innerWidth >= 1024 ? 96 : 72;
      img.style.filter = "drop-shadow(0 4px 10px rgba(0,0,0,.2))";

      const bubble = document.createElement("div");
      bubble.setAttribute("role", "status");
      bubble.setAttribute("aria-live", "polite");
      bubble.textContent = phrase;
      Object.assign(bubble.style, {
        position: "absolute",
        maxWidth: "280px",
        fontSize: "11px",
        lineHeight: "1.2",
        padding: "8px 12px",
        borderRadius: "12px",
        background: "rgba(255,255,255,.95)",
        color: "#0f172a",
        boxShadow: "0 4px 15px rgba(0,0,0,.15)",
        border: "1px solid rgba(0,0,0,.06)",
        pointerEvents: "none"
      } as CSSStyleDeclaration);

      // Dark mode support
      if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
        bubble.style.background = "rgba(24,24,27,.95)";
        bubble.style.color = "#e5e7eb";
        bubble.style.borderColor = "rgba(255,255,255,.08)";
      }

      // Positioning with safe margins
      const safe = { top: 64, bottom: 80, side: 16 };
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const left = Math.floor(Math.random() * (vw - safe.side * 2 - img.width)) + safe.side;
      const top = Math.floor(Math.random() * (vh - safe.top - safe.bottom - img.width)) + safe.top;

      container.style.left = `${left}px`;
      container.style.top = `${top}px`;

      // Bubble side based on quadrant - position to the side of Clorg
      const bubbleOnLeft = left > vw / 2; // if on right half, bubble left side
      Object.assign(bubble.style, bubbleOnLeft
        ? { right: `${img.width + 8}px`, top: "0" }
        : { left: `${img.width + 8}px`, top: "0" });

      // Append
      container.appendChild(img);
      container.appendChild(bubble);
      document.body.appendChild(container);
      
      console.log('🎯 CLORG SPRITE CREATED AND ADDED TO DOM:', container);
      console.log('🎯 Container position:', container.style.left, container.style.top);
      console.log('🎯 Container size:', container.offsetWidth, 'x', container.offsetHeight);
      
      // Add a very obvious visual indicator
      container.style.border = '5px solid red';
      container.style.backgroundColor = 'rgba(255,0,0,0.3)';

      // Entrance animation (respect reduced motion)
      const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (!reduceMotion) {
        container.animate(
          [{ transform: "translateY(8px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
          { duration: 200, easing: "ease-out" }
        );
      }

      // Avoid overlapping critical elements (naive check; re-roll once)
      const collides = () => {
        const r1 = container.getBoundingClientRect();
        return criticalSelectors.some(sel => {
          const el = document.querySelector(sel) as HTMLElement | null;
          if (!el) return false;
          const r2 = el.getBoundingClientRect();
          const overlap = !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
          return overlap;
        });
      };
      if (collides()) {
        const newLeft = Math.max(safe.side, vw - left - img.width - 40);
        container.style.left = `${newLeft}px`;
      }

      // Dismiss on click
      const dismiss = () => {
        console.log('🎯 CLORG SPRITE DISMISSING...');
        alert('CLORG CLICKED! DISMISSING...');
        container.remove();
        localStorage.setItem("clorgSeenCount", String(seen + 1));
      };
      
      // Add click handler to the entire container
      container.addEventListener("click", (e) => {
        console.log('Container clicked');
        e.preventDefault();
        e.stopPropagation();
        dismiss();
      });
      
      // Also add click to the image specifically (no stopPropagation needed)
      img.addEventListener("click", (e) => {
        console.log('Image clicked');
        e.preventDefault();
        e.stopPropagation();
        dismiss();
      });
      
      // Add click handler to the bubble as well
      bubble.addEventListener("click", (e) => {
        console.log('Bubble clicked');
        e.preventDefault();
        e.stopPropagation();
        dismiss();
      });

      // Cleanup on route change
      return () => container.remove();
    } catch {
      // no-op
    }
  }, [opts.probability, opts.maxPerSession, opts.phrases]);
}
