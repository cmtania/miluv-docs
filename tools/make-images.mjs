// Makes the landing page's web images from the MiLuv app repo (../MiLuv):
//   node tools/make-images.mjs
// Writes public/assets/web/*.webp, the favicon/touch icons, og.jpg (the link
// preview) and, when the promo has been rendered, the promo video + poster.
// Needs the app repo next to this one. Commit public/assets/ afterwards.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import { DOVE, DOVE_FACE, WORDMARK } from '../src/brand.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const APP = resolve(ROOT, '../MiLuv');
const OUT = join(ROOT, 'public/assets/web');
const ASSETS = join(ROOT, 'public/assets');
mkdirSync(OUT, { recursive: true });

const webp = (input, name, width, quality = 82) =>
  sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(join(OUT, `${name}.webp`));

// The live App Store screenshots, for the gallery.
const SLIDES = ['1-widget', '2-distance', '3-nudge', '4-connect', '5-brand', '6-auto-update'];
for (const s of SLIDES) await webp(join(APP, `design/app-store/6.9-inch/${s}.png`), `slide-${s}`, 640);

// App icon (app.json "icon"): page favicon, Apple touch icon, and a crisp copy for banners.
const ICON = join(APP, 'assets/dove-appicon-square.png');
await sharp(ICON).resize(180).png().toFile(join(ASSETS, 'icon.png'));
await sharp(ICON).resize(64).png().toFile(join(ASSETS, 'favicon.png'));
await webp(ICON, 'icon', 160, 90);

// Link preview: blush ground, the dove and the wordmark (all outline paths, no fonts).
const dove = DOVE.map(
  (p) =>
    `<path d="${p.d}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="${p.width}" stroke-linejoin="round" stroke-linecap="round"${p.transform ? ` transform="${p.transform}"` : ''}/>` +
    (p === DOVE[7]
      ? `<circle cx="${DOVE_FACE.cheek.cx}" cy="${DOVE_FACE.cheek.cy}" r="${DOVE_FACE.cheek.r}" fill="rgba(233,185,174,0.85)"/>` +
        `<circle cx="${DOVE_FACE.eye.cx}" cy="${DOVE_FACE.eye.cy}" r="${DOVE_FACE.eye.r}" fill="#3A2A24"/>` +
        `<circle cx="${DOVE_FACE.shine.cx}" cy="${DOVE_FACE.shine.cy}" r="${DOVE_FACE.shine.r}" fill="#fff"/>`
      : ''),
).join('');
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g" cx="50%" cy="20%" r="95%">
      <stop offset="0" stop-color="#FBEFEA"/><stop offset="0.55" stop-color="#F5E6E1"/><stop offset="1" stop-color="#EACDC2"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g transform="translate(150 150) scale(2.55)">${dove}</g>
  <g transform="translate(560 165) scale(2.2)">
    <g transform="translate(4 92)">
      <path d="${WORDMARK.letters}" fill="#3A2A24"/>
      <path d="${WORDMARK.heart}" transform="translate(105.19 -74.93) scale(0.840)" fill="#C68B76"/>
      <path d="${WORDMARK.wave}" fill="none" stroke="#2C8F76" stroke-width="5" stroke-linecap="round"/>
    </g>
  </g>
  <text x="598" y="505" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="40" font-weight="600" fill="#6E5A51">Long-distance, a little closer.</text>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 88 }).toFile(join(OUT, 'og.jpg'));

// The 30-second promo (rendered in ../MiLuv/design/promo), web-sized, plus a poster frame.
const promo = join(APP, 'design/promo/out/miluv-promo.mp4');
if (existsSync(promo)) {
  const ff = (args) => execFileSync('npx', ['remotion', 'ffmpeg', '-y', '-loglevel', 'error', ...args], { cwd: join(APP, 'design/promo'), stdio: 'inherit', shell: true });
  ff(['-i', promo, '-vf', 'scale=540:960', '-c:v', 'libx264', '-crf', '27', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', join(OUT, 'promo.mp4')]);
  const frame = join(OUT, 'poster.png');
  ff(['-ss', '1.6', '-i', promo, '-frames:v', '1', '-vf', 'scale=540:960', frame]);
  await webp(frame, 'promo-poster', 540, 80);
  rmSync(frame);
} else {
  console.warn('No promo render at', promo, '— skipping the video.');
}

console.log('Images written to', OUT);
