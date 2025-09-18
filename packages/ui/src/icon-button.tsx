import React from 'react';

export function IconButton({ children, onClick, className = "" }: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string;
}) {
  return (
    <button 
      onClick={onClick} 
      className={`rounded-xl border px-3 py-1.5 text-xs hover:bg-neutral-50 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
