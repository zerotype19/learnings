import React, { createContext, useContext } from 'react';

export type InitialData = {
  path: string;
  letters?: string[];
  directory?: { terms: any[]; letter: string; page: number; total: number; letters: string[] };
  wall?: { items: any[]; nextCursor?: string };
  generators?: any[];
  feed?: { items: any[]; nextCursor?: string | null };
  term?: any;
  related?: any[];
  variations?: any[];
};
export const InitialDataContext = createContext<InitialData | undefined>(undefined);
export const useInitialData = () => useContext(InitialDataContext);
