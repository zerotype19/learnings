import React, { createContext, useContext } from 'react';
import type { NonsenseData } from '../types/nonsense';

export type InitialData = {
  path: string;
  nonsense: NonsenseData;
  feed?: { items: any[]; nextCursor?: string | null };
  term?: any;
  related?: any[];
  variations?: any[];
};
export const InitialDataContext = createContext<InitialData | undefined>(undefined);
export const useInitialData = () => useContext(InitialDataContext);
