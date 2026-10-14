import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/manrope';
import '@fontsource/caveat/700.css';
import '@fontsource/kalam/400.css';
import '@fontsource/kalam/700.css';

import { App } from './App.jsx';
import './landing.css';
import './miluv.css';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The build writes the page into #root as HTML (tools/prerender.mjs), so search engines and link
// previews see the full content; here React picks it up. In dev it's empty and renders from scratch.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
