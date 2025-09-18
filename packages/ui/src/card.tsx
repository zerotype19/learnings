import React from 'react';

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border bg-white p-4 shadow-[0_2px_20px_rgba(0,0,0,.05)] ${className}`}>
      {children}
    </div>
  );
}
