// After `vite build` (the page) and `vite build --ssr` (src/entry-server.jsx → dist-ssr), this
// writes the rendered page into dist/index.html, so search engines, AI crawlers and link previews
// read the real content instead of an empty <div id="root">. It also adds the structured data
// (JSON-LD) Google reads for rich results: the app, the website and the FAQ.
//
//   npm run build   (runs all three steps)

import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');
const SITE = 'https://cmtania.github.io/miluv-docs/';

const server = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const html = server.render();

const strip = (text) => text.replace(/<[^>]+>/g, '');
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'MiLuv – Long-Distance',
    alternateName: 'MiLuv',
    description:
      'A long-distance relationship app for iPhone. A Home Screen widget shows the distance between you and your partner, with a heads-up as you get closer, one-tap nudges, Since day one, a shared date calendar, an Until we meet countdown, and their local time and weather. Never a map, never an address.',
    url: SITE,
    image: `${SITE}assets/web/og.jpg`,
    screenshot: server.SLIDES.map(([name]) => `${SITE}assets/web/slide-${name}.webp`),
    operatingSystem: 'iOS',
    applicationCategory: 'LifestyleApplication',
    downloadUrl: server.APP_STORE_URL,
    installUrl: server.APP_STORE_URL,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Person', name: server.SUPPORT_NAME, email: server.SUPPORT_EMAIL },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MiLuv',
    url: SITE,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: server.FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: strip(a) },
    })),
  },
];
const ldScripts = jsonLd
  .map((data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`)
  .join('\n  ');

const file = join(dist, 'index.html');
let page = readFileSync(file, 'utf8');
if (!page.includes('<div id="root"></div>')) throw new Error('No empty #root in dist/index.html');
page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
page = page.replace('</head>', `  ${ldScripts}\n</head>`);
writeFileSync(file, page);
rmSync(ssrDir, { recursive: true, force: true });

const words = strip(html).split(/\s+/).filter(Boolean).length;
console.log(`Prerendered index.html: ${Math.round(html.length / 1024)} KB of HTML, ${words} words, ${jsonLd.length} JSON-LD blocks.`);
