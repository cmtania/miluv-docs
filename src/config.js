import {
  Bell,
  CalendarHeart,
  Camera,
  EyeSlash,
  Globe,
  HandWaving,
  Heart,
  Hourglass,
  LockKey,
  MapPinSimpleArea,
  Ruler,
  SquaresFour,
} from '@phosphor-icons/react';

export const APP_STORE_URL = 'https://apps.apple.com/app/miluv-long-distance/id6807320657';
// Support contact (also written into public/support.html, privacy.html and terms.html).
export const SUPPORT_NAME = 'Christian Tania';
export const SUPPORT_EMAIL = 'tania.dev.ph@gmail.com';

/** Web images made by tools/make-images.mjs from the app repo. */
export const img = (name, ext = 'webp') => `assets/web/${name}.${ext}`;

/** Names used across the page's drawn screens, matching the app's own previews. */
export const PARTNER = 'Sam';

export const NAV = [
  ['How it works', 'how'],
  ['Features', 'features'],
  ['Widgets', 'widgets'],
  ['Pricing', 'pricing'],
  ['FAQ', 'faq'],
];

/** The scroll story: one pinned iPhone, one drawn screen per step. */
export const STORY = [
  {
    screen: 'connect',
    kicker: 'Link up',
    title: 'One code, just the two of you',
    body: 'Make an account, then one of you creates a code and the other enters it. That’s the whole setup. MiLuv links exactly two people, and either of you can unlink anytime.',
  },
  {
    screen: 'apart',
    kicker: 'The distance',
    title: 'Always know how far apart you are',
    body: 'Home shows the straight-line distance between you and when it last updated. It moves on its own as you both go about your day, in any country or time zone.',
  },
  {
    screen: 'closer',
    kicker: 'Getting closer',
    title: 'A gentle nudge as the distance closes',
    body: 'When you’re heading toward each other, MiLuv lets you know at about 1 km, again at 500 m, and once more when you’ve arrived.',
  },
  {
    screen: 'photos',
    kicker: 'Your faces',
    title: 'Swap the hearts for your photos',
    body: 'Tap + to take a photo or pick one, crop it to a circle, and it replaces your heart on Home, your widget and your share card. Your partner sees it too.',
  },
  {
    screen: 'together',
    kicker: 'Together',
    title: 'And when you’re finally together',
    body: 'Within about 75 m, the card turns to Together. Add a picture of the two of you, and it stays there for whenever you’re side by side.',
  },
];

export const MARQUEE = [
  [Ruler, 'The distance, never the place'],
  [SquaresFour, 'Home Screen widgets'],
  [HandWaving, 'Nudges in one tap'],
  [Bell, 'A heads-up as you get closer'],
  [Camera, 'Your photos on the widget'],
  [Heart, 'Since day one, to the hour'],
  [CalendarHeart, 'Plan your next date'],
  [Hourglass, 'Until we meet'],
  [Globe, 'Their time and weather'],
  [EyeSlash, 'No ads, no trackers'],
];

export const PRIVACY_POINTS = [
  [MapPinSimpleArea, 'No map'],
  [Ruler, 'Distance only'],
  [EyeSlash, 'No trackers'],
  [LockKey, 'No history kept'],
];

/** Big numbers band. Every figure is how the app actually works. */
export const NUMBERS = [
  { value: 2, label: 'people per link, just the two of you' },
  { value: 6, label: 'Home Screen widgets to choose from' },
  { value: 1, label: 'purchase covers Pro for both of you' },
  { value: 0, label: 'maps, addresses or location history' },
];

/**
 * The widgets, drawn after the app's WidgetKit views (targets/widget in the app repo).
 * `kind` picks the drawing in AppWidgets.jsx; `size` is the Home Screen size shown.
 */
export const WIDGETS = [
  { kind: 'distance', name: 'Distance', blurb: 'How far apart you are, and when it last moved.', pro: false, size: 'medium' },
  { kind: 'since', name: 'Since day one', blurb: 'Every day together, and the hours ticking on.', pro: false, size: 'small' },
  { kind: 'meet', name: 'Until we meet', blurb: 'A countdown to your next time together.', pro: true, size: 'small' },
  { kind: 'nudge', name: 'Nudge', blurb: 'Their latest nudge, with their photo.', pro: true, size: 'medium' },
  { kind: 'date', name: 'Next date', blurb: 'Your next plan, and the two after it.', pro: true, size: 'medium' },
  { kind: 'time', name: 'Their time & weather', blurb: 'Their clock, their sky, and how far ahead or behind they are.', pro: true, size: 'small' },
];

/** The live App Store screenshots (made in the app repo, design/app-store). */
export const SLIDES = [
  ['1-widget', 'Right there on your Home Screen'],
  ['2-distance', 'Always know how far apart you are'],
  ['3-nudge', 'A gentle nudge as you’re getting closer'],
  ['4-connect', 'One link, just the two of you'],
  ['5-brand', 'For the one you miss'],
  ['6-auto-update', 'It updates the moment you move'],
];

// Exact MiLuv Pro prices per App Store storefront (ISO region -> currency and amount), from
// App Store Connect. Everyone else sees the Philippine price converted as a guide (see APPROX).
export const PRICES = {
  monthly: { PH: { currency: 'PHP', amount: 99 } },
  lifetime: { PH: { currency: 'PHP', amount: 199 } },
};

/**
 * Approximate prices for regions without an exact entry above: the Philippine price converted
 * with rough exchange rates, rounded, and always labelled "approx.". The App Store shows the
 * real local price before anyone buys. Rates are units of each currency per 1 US dollar.
 */
export const APPROX = {
  base: 'PH',
  phpPerUsd: 57,
  usdRates: {
    USD: 1, EUR: 0.92, GBP: 0.78, JPY: 150, INR: 84, AUD: 1.52, CAD: 1.37, SGD: 1.34,
    MYR: 4.45, IDR: 16000, THB: 34, VND: 25500, KRW: 1380, BRL: 5.6, MXN: 18.5, AED: 3.67,
    SAR: 3.75, CHF: 0.88, SEK: 10.5, NOK: 10.8, DKK: 6.9, PLN: 4, NZD: 1.68, HKD: 7.8,
    TWD: 32, ZAR: 18, QAR: 3.64, KWD: 0.31,
  },
  currencyByRegion: {
    US: 'USD', GB: 'GBP', JP: 'JPY', IN: 'INR', AU: 'AUD', CA: 'CAD', SG: 'SGD', MY: 'MYR',
    ID: 'IDR', TH: 'THB', VN: 'VND', KR: 'KRW', BR: 'BRL', MX: 'MXN', AE: 'AED', SA: 'SAR',
    CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK', PL: 'PLN', NZ: 'NZD', HK: 'HKD', TW: 'TWD',
    ZA: 'ZAR', QA: 'QAR', KW: 'KWD', DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR',
    BE: 'EUR', AT: 'EUR', IE: 'EUR', PT: 'EUR', FI: 'EUR', GR: 'EUR',
  },
  fallbackCurrency: 'USD',
};

// A visitor's likely App Store country from their time zone (better than the browser language).
export const REGION_BY_TIMEZONE = {
  'Asia/Manila': 'PH', 'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US',
  'America/Phoenix': 'US', 'America/Los_Angeles': 'US', 'America/Anchorage': 'US',
  'Pacific/Honolulu': 'US', 'Europe/London': 'GB', 'Europe/Dublin': 'IE', 'Europe/Berlin': 'DE',
  'Europe/Paris': 'FR', 'Europe/Madrid': 'ES', 'Europe/Rome': 'IT', 'Europe/Amsterdam': 'NL',
  'Asia/Tokyo': 'JP', 'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN', 'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU', 'Australia/Perth': 'AU', 'America/Toronto': 'CA',
  'America/Vancouver': 'CA', 'Asia/Singapore': 'SG', 'Asia/Kuala_Lumpur': 'MY',
  'Asia/Jakarta': 'ID', 'Asia/Bangkok': 'TH', 'Asia/Ho_Chi_Minh': 'VN', 'Asia/Seoul': 'KR',
  'Asia/Dubai': 'AE', 'Asia/Riyadh': 'SA', 'Asia/Qatar': 'QA', 'Asia/Kuwait': 'KW',
  'Asia/Hong_Kong': 'HK', 'Asia/Taipei': 'TW', 'Pacific/Auckland': 'NZ',
};

export const PLANS = [
  {
    name: 'Free',
    price: 'Free',
    note: 'for both of you',
    body: 'Everything you need to feel a little closer.',
    features: [
      'The distance, updating on its own',
      'Getting-closer notifications',
      'Nudges',
      'Your photos and a picture together',
      'Since day one and share cards',
      'Distance and Since day one widgets',
    ],
    cta: 'Download free',
  },
  {
    name: 'Pro Monthly',
    priceKey: 'monthly',
    note: 'per month',
    fallback: ['Monthly', 'in your currency'],
    body: 'All of Pro, month to month. Cancel anytime.',
    features: [
      'Everything in Free',
      'Shared Calendar with reminders',
      'Until we meet countdown',
      'Their time and weather',
      'Nudge, Next date and Their time widgets',
    ],
    cta: 'Subscribe',
  },
  {
    name: 'Lifetime',
    priceKey: 'lifetime',
    note: 'once, no subscription',
    fallback: ['One-time price', 'in your currency, on the App Store'],
    body: 'Pay once and keep Pro forever. One purchase covers both of you.',
    features: [
      'Everything in Pro',
      'Pay once, never again',
      'Future Pro updates included',
    ],
    cta: 'Get Lifetime',
    featured: true,
    badge: 'Best value',
  },
];

// Short list for the landing page; the full set is on support.html.
export const FAQS = [
  {
    q: 'Can my partner see where I am?',
    a: 'No. Your partner only ever sees the distance between you and when it was measured: never your coordinates, never a map, never an address. Only your latest position is stored, and it’s overwritten on every update.',
  },
  {
    q: 'Does my partner need the app too?',
    a: 'Yes. You both need MiLuv on an iPhone and an account of your own. One of you shares a link code and the other enters it. MiLuv links exactly two people.',
  },
  {
    q: 'Can we be in different countries or time zones?',
    a: 'Yes. Distance is distance: the widget shows the straight-line distance between you wherever you both are. With MiLuv Pro you also see their local time and weather.',
  },
  {
    q: 'How often does it update, and will it drain my battery?',
    a: 'In the background, MiLuv updates each time you’ve moved about 200 m. It doesn’t track you continuously, so it’s light on battery. Opening the app refreshes it right away. It’s approximate, usually within about 100 m, and never a live tracker.',
  },
  {
    q: 'Is MiLuv free?',
    a: 'Yes. MiLuv is free, and MiLuv Pro is an optional upgrade, monthly or once for lifetime. Pro adds the shared Calendar with reminders, the Until we meet countdown, their time and weather, and the Nudge, Next date and Their time widgets.',
  },
  {
    q: 'Does my partner need to buy Pro too?',
    a: 'No. One purchase covers both of you while you’re linked. If you unlink, the person who bought it keeps Pro.',
  },
  {
    q: 'Can I write my own nudge?',
    a: 'Not yet. Nudges are a short list of sweet, ready-made messages like “I miss you!”, one a minute, sent only to the one person you’re linked with.',
  },
  {
    q: 'Why does MiLuv ask for “Always” location?',
    a: 'So the widget and the getting-closer notifications keep working while the app is closed. MiLuv still works with “While Using”: it just updates only while the app is open.',
  },
];

/** Apple-style spring: critically damped (no bounce). */
export const SPRING = { type: 'spring', bounce: 0, duration: 0.6 };
