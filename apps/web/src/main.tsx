import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles.css';
import { App } from './modules/App';
import { InitialDataContext, type InitialData } from './server/initial-data';

const root = document.getElementById('root')!;
const payload = document.getElementById('learnings-initial-data');
const initial: InitialData | undefined = payload ? JSON.parse(payload.textContent || '{}') : undefined;
const app = <InitialDataContext.Provider value={initial}><App /></InitialDataContext.Provider>;
if (initial) hydrateRoot(root, app);
else createRoot(root).render(app);
