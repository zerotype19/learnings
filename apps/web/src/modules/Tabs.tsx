import React from 'react';

const tabs = [
  { href: "#/", label: "Terms" },
  { href: "#/wall", label: "Wall" },
  { href: "#/challenges", label: "Challenges" },
  { href: "#/linkedin", label: "Generators" },
  { href: "#/suggest", label: "Suggest" },
  { href: "#/analytics", label: "Analytics" },
];

export function Tabs({ currentPage, onPageChange }: { currentPage: string; onPageChange: (page: string) => void }) {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="inline-flex rounded-2xl border bg-white p-1 shadow-sm">
        {tabs.map(t => {
          const pageKey = t.href === "#/" ? "home" : t.href.replace("#/", "");
          const active = currentPage === pageKey;
          return (
            <a
              key={t.href}
              href={t.href}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(pageKey);
              }}
              className={`rounded-xl px-3 py-1.5 text-sm transition-colors ${
                active 
                  ? "bg-brand-50 text-brand-700 border border-brand-100" 
                  : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {t.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
