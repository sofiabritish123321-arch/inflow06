import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { processOAuthRedirectAndSession } from './lib/authHandler';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// process auth after mount
processOAuthRedirectAndSession().then(() => {
  console.debug('Auth handler processed')
});
