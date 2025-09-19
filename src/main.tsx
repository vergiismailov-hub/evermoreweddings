import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import App from './App.tsx';
import './index.css';

// SSG export function
export const createApp = () => {
  // Use HashRouter for static generation, BrowserRouter for development
  const Router = typeof window !== 'undefined' && window.location.protocol === 'file:' ? HashRouter : BrowserRouter;
  
  return (
    <StrictMode>
      <LanguageProvider>
        <Router>
          <App />
        </Router>
      </LanguageProvider>
    </StrictMode>
  );
};

// Client-side hydration
if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(createApp());
  }
}

// Export for SSG
export default createApp;