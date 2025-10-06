import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { processOAuthRedirectAndSession } from './lib/authHandler';

// Process auth before rendering
processOAuthRedirectAndSession().then(() => {
  console.log('Auth handler processed');
}).catch(console.error);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
