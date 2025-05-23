import '@/global.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Router } from '@/routes/index';

import { ThemeProvider } from './components/theme-provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </StrictMode>,
);
