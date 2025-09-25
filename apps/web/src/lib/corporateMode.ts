// Corporate Mode utility functions
const sprinkleSelectors = ['h1', 'h2', 'h3', '.btn-primary', 'button[aria-label]'];
const buzzwordMap: Record<string, string> = {
  'Contact': 'Schedule Alignment',
  'Submit': 'Operationalize', 
  'Search': 'Discover Latent Truths',
  'Sign in': 'Authenticate Identity Surface',
  'About': 'Charter'
};

const uiSelectors = 'header nav a, .btn, button, [role="button"], .btn-primary, .btn-secondary, .cta, .site-footer a';

const legalesePhrases = [
  "All KPIs forward-looking; do not invest based on vibes.",
  "Slide readiness values are illustrative and non-binding.",
  "Executive alignment subject to calendar availability."
];

// Header navigation corporate mapping
const NAV_SELECTOR = 'header nav a, .site-header nav a, .mobile-nav a, nav a';
const BADGES = ['LIVE', 'BETA', 'FY25', 'OKR', 'RFP', 'TBD'];

const NAV_MAP: Record<string, string> = {
  'home': 'DASHBOARD™',
  'about': 'CHARTER™',
  'terms': 'GOVERNANCE™',
  'privacy': 'COMPLIANCE™',
  'blog': 'THOUGHT LEADERSHIP™',
  'news': 'THOUGHT LEADERSHIP™',
  'wall': 'INSIGHT WALL™',
  'feed': 'INSIGHT WALL™',
  'learnings': 'KNOWLEDGE BASE™',
  'contact': 'SCHEDULE ALIGNMENT™',
  'sign in': 'AUTHENTICATE IDENTITY SURFACE™',
  'log in': 'AUTHENTICATE IDENTITY SURFACE™',
  'sign up': 'ACTIVATE LICENSE™',
  'join': 'ACTIVATE LICENSE™',
  'search': 'DISCOVER LATENT TRUTHS™',
  'faq': 'ENABLEMENT DESK™',
  'help': 'ENABLEMENT DESK™',
  'pricing': 'COMMERCIALS™'
};

export function setCorporateMode(on: boolean) {
  const root = document.documentElement;
  root.classList.toggle('corp-mode', on);
  localStorage.setItem('corpMode', on ? '1' : '0');
  
  if (on) {
    corporatizeHeaderNav();
    enableCorporateFlair();
    maybeRerollClorg();
  } else {
    decorporatizeHeaderNav();
    disableCorporateFlair();
  }
}

export function initializeCorporateMode() {
  const isOn = localStorage.getItem('corpMode') === '1';
  setCorporateMode(isOn);
}

function enableCorporateFlair() {
  // Sprinkle™
  document.querySelectorAll<HTMLElement>(sprinkleSelectors.join(',')).forEach(el => {
    if (!el.dataset.orig) el.dataset.orig = el.innerText;
    if (!el.innerText.trim().endsWith('™')) el.innerText = el.innerText + '™';
  });

  // Buzzword Autocorrect
  document.querySelectorAll<HTMLElement>(uiSelectors).forEach(el => {
    const t = el.innerText?.trim();
    if (t && buzzwordMap[t]) { 
      if (!el.dataset.orig) el.dataset.orig = t; 
      el.innerText = buzzwordMap[t]; 
    }
  });

  // Executive Summary Pill
  if (shouldShowExecPill() && !document.getElementById('exec-pill')) {
    createExecPill();
  }

  // CTA Footnotes++
  document.querySelectorAll('.hero .btn-primary, button[type="submit"]').forEach(btn => {
    if (btn.parentElement && !btn.parentElement.querySelector('.corp-footnote')) {
      const span = document.createElement('span');
      span.className = 'corp-footnote block mt-1 text-xs text-zinc-500 dark:text-zinc-400';
      span.textContent = 'Results may vary; synergy not guaranteed.';
      btn.parentElement.appendChild(span);
    }
  });

  // Numbers → TBD for metric badges
  document.querySelectorAll<HTMLElement>('.metric-badge, [data-metric-badge]').forEach(el => {
    if (!el.dataset.orig) el.dataset.orig = el.innerText;
    el.innerText = 'TBD*';
    addFinanceNote();
  });

  // Deckification Meter
  if (shouldShowDeckificationMeter()) {
    createDeckificationMeter();
  }

  // Legalese Inflation
  if (shouldShowLegalese()) {
    addLegaleseInflation();
  }

  // Logo Echo
  addLogoEcho();
}

function disableCorporateFlair() {
  // Restore text
  document.querySelectorAll<HTMLElement>('[data-orig]').forEach(el => { 
    el.innerText = el.dataset.orig!; 
    delete el.dataset.orig; 
  });
  
  // Remove pill & footnotes
  document.getElementById('exec-pill')?.remove();
  document.querySelectorAll('.corp-footnote').forEach(n => n.remove());
  document.getElementById('finance-note')?.remove();
  document.getElementById('deckification-meter')?.remove();
  document.getElementById('legalese-inflation')?.remove();
  document.querySelectorAll('.logo-echo').forEach(n => n.remove());
}

function shouldShowExecPill(): boolean {
  const h2s = Array.from(document.querySelectorAll('main h2'));
  return h2s.length >= 2;
}

function shouldShowDeckificationMeter(): boolean {
  const h2s = document.querySelectorAll('main h2').length;
  const h3s = document.querySelectorAll('main h3').length;
  const lis = document.querySelectorAll('main li').length;
  const imgs = document.querySelectorAll('main img').length;
  const mainText = document.querySelector('main')?.textContent?.length ?? 0;
  
  return h2s + h3s >= 2 || lis >= 8 || imgs >= 3 || mainText > 1200;
}

function shouldShowLegalese(): boolean {
  return shouldShowDeckificationMeter();
}

function createExecPill() {
  const pill = document.createElement('button');
  pill.id = 'exec-pill';
  pill.className = 'fixed top-14 right-4 z-30 px-3 py-1.5 text-xs rounded-full bg-zinc-900/80 text-white dark:bg-zinc-100/90 dark:text-zinc-900 shadow';
  pill.textContent = 'Executive Summary';
  
  let collapsed = false;
  let stash: HTMLElement[] = [];
  
  pill.onclick = () => {
    const main = document.querySelector('main')!;
    if (!collapsed) {
      stash = Array.from(main.children) as HTMLElement[];
      const bullets = Array.from(main.querySelectorAll('h2')).slice(0, 3).map(h => h.textContent?.trim()).filter(Boolean) as string[];
      
      // Fallback to first paragraph sentences if not enough h2s
      if (bullets.length < 2) {
        const firstP = main.querySelector('p');
        if (firstP) {
          const sentences = firstP.textContent?.split('.').slice(0, 3 - bullets.length) || [];
          bullets.push(...sentences.map(s => s.trim()).filter(Boolean));
        }
      }
      
      main.innerHTML = `<div class="max-w-2xl mx-auto my-12 prose">
        <h2>Executive Summary™</h2>
        <ul>${bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        <p class="text-xs text-zinc-500 mt-6">For details, disable Corporate Mode.</p>
      </div>`;
      collapsed = true;
    } else {
      main.innerHTML = '';
      stash.forEach(n => main.appendChild(n));
      collapsed = false;
    }
  };
  
  document.body.appendChild(pill);
}

function createDeckificationMeter() {
  if (document.getElementById('deckification-meter')) return;
  
  const main = document.querySelector('main');
  if (!main) return;
  
  const meter = document.createElement('div');
  meter.id = 'deckification-meter';
  meter.className = 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-700 py-2';
  
  const calculatePercentage = () => {
    const bullets = document.querySelectorAll('main li').length;
    const headings = document.querySelectorAll('main h2, main h3').length;
    const images = document.querySelectorAll('main img').length;
    return Math.min(100, bullets * 8 + headings * 5 + images * 7);
  };
  
  const percentage = calculatePercentage();
  
  meter.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 flex items-center gap-3">
      <span class="text-xs font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
        Slide Readiness: ${percentage}%
      </span>
      <div class="flex-1 h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-brand-500 to-accent-pink transition-all duration-1000 ease-out" style="width: ${percentage}%"></div>
      </div>
      <span class="text-xs text-zinc-500 dark:text-zinc-500">
        ${percentage >= 80 ? 'Deck Master' : 
          percentage >= 60 ? 'Slide Ready' : 
          percentage >= 40 ? 'Getting There' : 
          'Needs More Rectangles'}
      </span>
    </div>
  `;
  
  main.insertBefore(meter, main.firstChild);
}

function addFinanceNote() {
  if (document.getElementById('finance-note')) return;
  const note = document.createElement('div');
  note.id = 'finance-note';
  note.className = 'max-w-6xl mx-auto px-4 mt-4 text-[11px] text-zinc-500 dark:text-zinc-400';
  note.textContent = '* pending finance';
  document.querySelector('main')?.appendChild(note);
}

function addLegaleseInflation() {
  if (document.getElementById('legalese-inflation')) return;
  
  const legalese = document.createElement('div');
  legalese.id = 'legalese-inflation';
  legalese.className = 'max-w-6xl mx-auto px-4 mt-8 py-4 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700';
  
  const phrase = legalesePhrases[Math.floor(Math.random() * legalesePhrases.length)];
  legalese.textContent = phrase;
  
  document.querySelector('main')?.appendChild(legalese);
}

function addLogoEcho() {
  const footer = document.querySelector('footer');
  if (!footer || document.querySelector('.logo-echo')) return;
  
  // Create two logo echoes
  for (let i = 0; i < 2; i++) {
    const logo = document.createElement('div');
    logo.className = 'logo-echo absolute w-6 h-6 opacity-25 grayscale pointer-events-none';
    logo.setAttribute('aria-hidden', 'true');
    logo.style.cssText = `
      position: absolute;
      width: 24px;
      height: 24px;
      opacity: 0.25;
      filter: grayscale(100%);
      pointer-events: none;
      ${i === 0 ? 'left: 20px; bottom: 20px;' : 'right: 20px; bottom: 20px;'}
    `;
    
    // Add a simple logo representation (you can replace with actual logo)
    logo.innerHTML = 'L';
    logo.style.fontSize = '16px';
    logo.style.fontWeight = 'bold';
    logo.style.color = '#6b7280';
    logo.style.display = 'flex';
    logo.style.alignItems = 'center';
    logo.style.justifyContent = 'center';
    
    footer.appendChild(logo);
  }
}

function maybeRerollClorg() {
  // Check if Clorg hasn't spawned yet and reroll with higher probability
  if (!(window as any).__clorgSpawned && Math.random() < 0.7) {
    // Trigger Clorg spawn (this would need to be coordinated with the useClorgSprite hook)
    (window as any).__triggerClorg = true;
  }
}

export function corporatizeHeaderNav() {
  document.querySelectorAll<HTMLElement>(NAV_SELECTOR).forEach((a) => {
    const raw = (a.textContent || '').trim();
    if (!raw) return;
    if (!a.dataset.orig) a.dataset.orig = raw;

    // Find normalized key with fuzzy matching
    const key = raw.toLowerCase().replace(/[^\w\s]/g, ''); // Remove special chars
    const match = Object.keys(NAV_MAP).find(k => 
      key === k || 
      key.includes(k) || 
      k.includes(key) ||
      key.replace(/\s+/g, '') === k.replace(/\s+/g, '')
    );
    
    let label = match ? NAV_MAP[match] : (raw.toUpperCase().replace(/\s+/g, ' ') + '™');

    // Inject label + chevron + badge
    a.innerHTML = ''; // Clear existing content
    
    const span = document.createElement('span');
    span.className = 'corp-label';
    span.textContent = label;

    const chev = document.createElement('span');
    chev.className = 'corp-chevron';
    chev.textContent = '›';

    const badge = document.createElement('span');
    badge.className = 'corp-badge';
    badge.textContent = BADGES[Math.floor(Math.random() * BADGES.length)];

    a.appendChild(span);
    a.appendChild(chev);
    a.appendChild(badge);
  });
}

export function decorporatizeHeaderNav() {
  document.querySelectorAll<HTMLElement>(NAV_SELECTOR).forEach((a) => {
    if (a.dataset.orig) {
      a.textContent = a.dataset.orig;
      delete a.dataset.orig;
    }
  });
}

export function isCorporateModeEnabled(): boolean {
  return document.documentElement.classList.contains('corp-mode');
}
