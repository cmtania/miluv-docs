# MiLuv marketing/docs site

A Vite + React landing page for MiLuv, the iPhone widget for the distance between you two, plus the static **Support**, **Privacy Policy**, **Terms of Service** and email-**confirmed** pages. It's deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`. The layout is the same template as the Subwall site (`subs-tracker-wall-docs`), in MiLuv's own palette.

## Run it

```
npm install        # first time only
npm run dev        # local preview with live reload → http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the built dist/ to check it
```

## What's where

- `index.html` → `src/main.jsx`: the landing page (React). The sections, from top to bottom:
  - `Nav.jsx`: floating nav pill with section links; a menu on phones.
  - `Hero.jsx`: headline, App Store button, and an **Apart / Together** switch. Flipping it brings the two hearts together, turns the night sky to blush morning, and swaps the phone from the distance card to the Together card, like the app.
  - `Showcase.jsx`: the highlights ticker, the numbers band, the 30-second promo film, and the App Store screenshot strip.
  - `Story.jsx`: "How it works" as a scroll story: a pinned iPhone that walks through linking up, the distance, getting-closer notifications, photos and Together.
  - `Features.jsx`: the bento grid (nudges, photos, since day one, share cards, privacy, and the Pro features: Calendar, Until we meet, their time and weather, plus getting closer).
  - `Widgets.jsx`: the six Home Screen widgets, free and Pro.
  - `Sections.jsx`: pricing (Free, Pro Monthly, Lifetime), the FAQ accordion, the closing call to action and the footer.
  - `Screens.jsx` and `AppWidgets.jsx`: the app's screens, share card and widgets, **drawn in HTML/CSS after the app's own components** (`components/*.tsx` and `targets/widget/*.swift` in the app repo), sized in iOS points so they stay crisp at any size.
  - `Brand.jsx` + `src/brand.js`: the dove and the wordmark (the app's own outline geometry), the heart, and illustrated stand-ins for profile photos (the page never shows a real person).
  - `src/config.js`: **all the copy, the App Store URL, the story steps, widgets, plans, prices and FAQs.**
  - `src/landing.css` (the shared layout system) and `src/miluv.css` (MiLuv's pieces and the responsive rules).
- `public/` is copied into the build as-is, at the same URLs as before:
  - `support.html`, `privacy.html`, `terms.html`, `confirmed.html` (Supabase's email-confirmation landing page) and their shared `styles.css`;
  - `assets/`: icons, the old logo files, and `web/` (made by the tool below).

Packages: `motion` (animation), `lenis` (smooth scrolling), `@phosphor-icons/react` (icons), and self-hosted fonts via Fontsource: Manrope (the page), Caveat (the hand-written words) and Kalam (the app's own font, inside the drawn screens). All motion respects Reduce Motion.

## Images

`public/assets/web/` is made from the app repo (`../MiLuv`):

```
npm run images
```

It writes the App Store screenshots (`design/app-store/6.9-inch`), the app icon and favicons (`assets/dove-appicon-square.png`), the link preview `og.jpg`, and, if it has been rendered, the promo video and its poster (`design/promo/out/miluv-promo.mp4`). Commit `public/assets/` afterwards.

## Deploy

The site used to be published straight from the branch. It now needs a build, so:

1. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**. Do this **before** pushing this version to `main`: the current site stays live until the first Actions deploy replaces it. (Published from the branch, this version would serve the unbuilt page and 404 the legal pages, which moved into `public/`.)
2. Push to `main`. The **Deploy to GitHub Pages** workflow builds and publishes `https://cmtania.github.io/miluv-docs/`.
3. Check that these still open: `privacy.html`, `terms.html`, `support.html`, `confirmed.html`.

These URLs are used by App Store Connect, the app (`lib/legal.ts`) and Supabase (Site URL → `confirmed.html`), so they must not move.
