// Server entry for the build-time prerender (tools/prerender.mjs): the page as an HTML string, plus
// the data the structured data (JSON-LD) is made from.
import { renderToString } from 'react-dom/server';

import { App } from './App.jsx';

export { APP_STORE_URL, FAQS, SLIDES, SUPPORT_EMAIL, SUPPORT_NAME } from './config.js';

export function render() {
  return renderToString(<App />);
}
