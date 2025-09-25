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
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get("noclorg") === "1") return;

      const probability = opts.probability ?? 0.4;
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

      if (includePaths.length && !includePaths.some(r => r.test(location.pathname))) return;

      // Daily reset logic
      const today = new Date().toISOString().slice(0, 10);
      const storedDay = localStorage.getItem("clorgSeenDay");
      if (storedDay !== today) {
        localStorage.setItem("clorgSeenDay", today);
        localStorage.setItem("clorgSeenCount", "0");
      }

      const seen = Number(localStorage.getItem("clorgSeenCount") || "0");
      if (seen >= maxPerSession) return;

      if (Math.random() > probability) return;

      // Load phrases from window.__NONSENSE__ or fall back.
      const phrases: string[] =
        (window as any).__NONSENSE__?.clorgPhrases || opts.phrases || [
          "Bullet points or die, respectfully."
        ];
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];

      // Build DOM
      const container = document.createElement("div");
      container.setAttribute("id", "clorg-sprite");
      container.setAttribute("aria-hidden", "false");
      Object.assign(container.style, {
        position: "fixed",
        zIndex: "40",
        pointerEvents: "auto",
        cursor: "pointer"
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
        maxWidth: "220px",
        fontSize: "12px",
        lineHeight: "1.2",
        padding: "8px 10px",
        borderRadius: "10px",
        background: "rgba(255,255,255,.95)",
        color: "#0f172a",
        boxShadow: "0 6px 20px rgba(0,0,0,.15)",
        border: "1px solid rgba(0,0,0,.06)",
        pointerEvents: "auto"
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

      // Bubble side based on quadrant
      const bubbleOnLeft = left > vw / 2; // if on right half, bubble left side
      Object.assign(bubble.style, bubbleOnLeft
        ? { right: `${img.width + 8}px`, top: "0" }
        : { left: `${img.width + 8}px`, top: "0" });

      // Append
      container.appendChild(img);
      container.appendChild(bubble);
      document.body.appendChild(container);

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
        container.remove();
        localStorage.setItem("clorgSeenCount", String(seen + 1));
      };
      container.addEventListener("click", dismiss);

      // Cleanup on route change
      return () => container.remove();
    } catch {
      // no-op
    }
  }, [opts.probability, opts.maxPerSession]);
}
