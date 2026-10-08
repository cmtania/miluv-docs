import { CalendarBlank, Camera, Export, Gear, House, Plus, PencilSimple } from '@phosphor-icons/react';

import { img, PARTNER } from '../config.js';
import { Dove, Heart, HEART, Portrait, Wordmark } from './Brand.jsx';

// Drawn MiLuv screens, laid out like the app (app/(tabs)/index.tsx, components/*Card.tsx).
// Every size is in points of a 390 pt wide iPhone screen (see .app-screen in landing.css).

function StatusBar({ dark = false }) {
  return (
    <div className={`sb ${dark ? 'sb-dark' : ''}`} aria-hidden="true">
      <span>9:41</span>
      <span className="sb-icons">
        <i className="sb-signal" />
        <i className="sb-wifi" />
        <i className="sb-battery" />
      </span>
    </div>
  );
}

function TabBar({ tab = 'home' }) {
  const items = [
    ['home', 'Home', House],
    ['calendar', 'Calendar', CalendarBlank],
    ['settings', 'Settings', Gear],
  ];
  return (
    <div className="tabbar" aria-hidden="true">
      {items.map(([key, label, Icon]) => (
        <span key={key} className={key === tab ? 'on' : ''}>
          <Icon weight={key === tab ? 'fill' : 'regular'} />
          {label}
        </span>
      ))}
    </div>
  );
}

function HomeHeader() {
  return (
    <div className="home-head">
      <Wordmark width={100} />
    </div>
  );
}

/** components/DistanceHeroCard.tsx: hearts (or photos) on a dotted thread, the distance, the name. */
export function DistanceCard({ mode = 'apart', photos = false, couple = false, distance = '1,284 km', ago = 'updated 2m ago' }) {
  return (
    <div className="hero-card">
      <span className="hc-corner hc-left"><Plus weight="bold" /></span>
      <span className="hc-corner hc-right"><Export weight="bold" /></span>
      {mode === 'together' ? (
        <>
          {couple ? <Portrait who="couple" className="hc-couple" /> : <Heart className="hc-couple" fill="#2C8F76" />}
          <b className="hc-stat">Together</b>
          <span className="hc-to">with {PARTNER}</span>
          {!couple && (
            <span className="hc-add">
              <Camera weight="bold" /> Add picture together
            </span>
          )}
        </>
      ) : (
        <>
          <div className="hc-thread">
            {photos ? <Portrait who="you" className="hc-photo" /> : <Heart className="hc-photo" fill="#2C8F76" />}
            <i className="hc-line" />
            {photos ? <Portrait who="sam" className="hc-photo" /> : <Heart className="hc-photo" stroke="#3A2A24" />}
          </div>
          <b className="hc-stat">{distance}</b>
          <span className="hc-to">to {PARTNER}</span>
          <span className="hc-ago">{ago}</span>
        </>
      )}
    </div>
  );
}

function SinceCard() {
  return (
    <div className="dash-card since-card">
      <span className="dc-kicker">Since day one</span>
      <span className="dc-edit"><PencilSimple weight="bold" /></span>
      <b className="since-days">1,134 days</b>
      <span className="since-break">3 years · 1 month · 7 days · 14 hours</span>
      <span className="dc-foot">since Aug 29, 2023</span>
    </div>
  );
}

function NudgeControls() {
  return (
    <div className="nudge-ctl">
      <span className="dc-kicker">Nudge {PARTNER}</span>
      <div className="nudge-msgs">
        <span className="on">I miss you!</span>
        <span>I love you!</span>
        <span>I can’t wait to see you!</span>
      </div>
      <span className="nudge-btn">Nudge It</span>
    </div>
  );
}

function Home({ children }) {
  return (
    <div className="scr scr-home">
      <StatusBar />
      <HomeHeader />
      <div className="home-body">{children}</div>
      <TabBar />
    </div>
  );
}

export function ScreenApart({ photos = false }) {
  return (
    <Home>
      <DistanceCard photos={photos} />
      <SinceCard />
      <i className="dash-divider" />
      <NudgeControls />
    </Home>
  );
}

export function ScreenTogether({ couple = true }) {
  return (
    <Home>
      <DistanceCard mode="together" couple={couple} />
      <SinceCard />
      <i className="dash-divider" />
      <NudgeControls />
    </Home>
  );
}

/** app/pair.tsx: one of you creates a code, the other enters it. */
export function ScreenConnect() {
  return (
    <div className="scr scr-connect">
      <StatusBar />
      <div className="connect-body">
        <Dove size={92} className="connect-dove" />
        <b className="connect-title">Connect your person</b>
        <p className="connect-text">One of you creates a code, the other enters it. That’s the whole setup.</p>
        <div className="dash-card code-card">
          <span className="dc-kicker">Create a code</span>
          <b className="code">K7QM4X</b>
          <span className="btn-ghost-app">Share code</span>
          <p className="connect-small">You’ll move to the home screen the moment they join.</p>
        </div>
        <div className="dash-card code-card">
          <span className="dc-kicker">Enter your partner’s code</span>
          <span className="field">ABC123</span>
          <span className="btn-teal">Connect</span>
        </div>
      </div>
    </div>
  );
}

/** The Lock Screen with MiLuv's getting-closer notifications (app wording). */
export function ScreenCloser() {
  return (
    <div className="scr scr-lock">
      <StatusBar dark />
      <div className="lock-date">Saturday, October 11</div>
      <div className="lock-time">9:41</div>
      <div className="lock-notes">
        <LockNote title="Almost there" body={`500 m to ${PARTNER}`} when="now" />
        <LockNote title="Getting closer" body={`You’re within 1 km of ${PARTNER}`} when="6m ago" heart />
        <LockNote title={`${PARTNER} nudged you`} body="I can’t wait to see you!" when="20m ago" />
      </div>
    </div>
  );
}

function LockNote({ title, body, when, heart }) {
  return (
    <div className="lock-note">
      <img src="assets/web/icon.webp" alt="" />
      <div>
        <p className="ln-head"><b>{title}</b><span>{when}</span></p>
        <p className="ln-body">{body}{heart && <Heart className="ln-heart" fill="#E8B23C" />}</p>
      </div>
    </div>
  );
}

/**
 * The share image, as components/ShareCard.tsx draws it (360 × 450 pt, exported at 3×):
 * brand row, a dashed card with the hearts and the distance (or Together), and a footer.
 */
export function ShareCard({ together = false, className = '' }) {
  return (
    <div className={`share-card ${className}`}>
      <div className="sc-in">
        <div className="sc-brand">
          <img src={img('icon')} alt="" />
          <b>MiLuv</b>
        </div>
        <div className="sc-card">
          {together ? (
            <>
              <svg viewBox="0 0 320 110" className="sc-art" aria-hidden="true">
                <circle cx="160" cy="55" r="46" fill="#2C8F76" opacity="0.12" />
                <g transform="translate(115.6,21.25) scale(2.7)"><path d={HEART} fill="#B0725C" /></g>
                <g transform="translate(141.6,21.25) scale(2.7)"><path d={HEART} fill="#2C8F76" /></g>
              </svg>
              <b className="sc-together">Together</b>
              <span className="sc-with">You &amp; {PARTNER}</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 320 140" className="sc-art" aria-hidden="true">
                <path d="M60 66 C 110 54, 150 78, 200 66 S 250 58, 260 66" stroke="#B0725C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <g transform="translate(10.4,37.25) scale(2.3)"><path d={HEART} fill="none" stroke="#2C8F76" strokeWidth="1.4" /></g>
                <g transform="translate(254.4,37.25) scale(2.3)"><path d={HEART} fill="none" stroke="#3A2A24" strokeWidth="1.4" /></g>
                <rect x="100" y="50" width="120" height="32" rx="16" fill="#FBEFEA" stroke="#C68B76" strokeWidth="1.5" strokeDasharray="4 3" />
                <text x="160" y="71" textAnchor="middle" fontFamily="Manrope Variable, Manrope, sans-serif" fontWeight="700" fontSize="13" fill="#3A2A24">1,284 km</text>
              </svg>
              <div className="sc-names"><span>You</span><span>{PARTNER}</span></div>
            </>
          )}
        </div>
        <span className="sc-foot">miluv · a widget for two hearts apart</span>
      </div>
    </div>
  );
}
