import { CalendarBlank, CalendarHeart, GlobeHemisphereEast, HandWaving, Hourglass, Island, Sun } from '@phosphor-icons/react';

import { PARTNER } from '../config.js';
import { Heart, Portrait } from './Brand.jsx';

// MiLuv's Home Screen widgets, drawn after the app's WidgetKit views (targets/widget/*.swift):
// blush container, rounded type, a small-caps kicker. Sizes are widget points (see .wdg in CSS).

function Kicker({ Icon, children }) {
  return (
    <span className="wk">
      {Icon && <Icon weight="fill" />}
      {children}
    </span>
  );
}

function Distance() {
  return (
    <div className="w-col w-center">
      <div className="w-thread">
        <Heart className="w-heart" fill="#2C8F76" />
        <i />
        <Heart className="w-heart" stroke="#3A2A24" />
      </div>
      <b className="w-big">1,284 km</b>
      <span className="w-dim">to {PARTNER}</span>
      <span className="w-faint">2m ago</span>
    </div>
  );
}

function Since() {
  return (
    <div className="w-col w-center">
      <Kicker>Since day one</Kicker>
      <b className="w-big w-xl">1,134</b>
      <span className="w-dim">days</span>
      <span className="w-accent">3y 1m 7d 14h</span>
    </div>
  );
}

function Meet() {
  return (
    <div className="w-col w-center">
      <Kicker Icon={Hourglass}>Until we meet</Kicker>
      <b className="w-big w-accent-big">12 days · 4 hrs</b>
      <span className="w-dim">until you see {PARTNER}</span>
      <span className="w-faint">Weekend date</span>
    </div>
  );
}

function Nudge() {
  return (
    <div className="w-row">
      <Portrait who="sam" className="w-photo" />
      <div className="w-col">
        <Kicker Icon={HandWaving}>Nudge</Kicker>
        <b className="w-title">{PARTNER} nudged you</b>
        <span className="w-accent">I miss you!</span>
        <span className="w-faint">just now</span>
      </div>
    </div>
  );
}

function DateTile({ day = 'FRI', date = '17' }) {
  return (
    <span className="w-datetile">
      <small>{day}</small>
      <b>{date}</b>
    </span>
  );
}

function NextDate() {
  return (
    <div className="w-row w-top">
      <div className="w-col">
        <Kicker Icon={CalendarBlank}>Next date</Kicker>
        <div className="w-row w-tight">
          <DateTile />
          <div className="w-col">
            <b className="w-title">Dinner date</b>
            <span className="w-dim">7:00 PM</span>
            <span className="w-accent">in 3 days</span>
          </div>
        </div>
      </div>
      <div className="w-col w-after">
        <span className="wk">After that</span>
        <span className="w-item"><Island weight="duotone" className="w-ico" /> <span><b>Weekend date</b><small>Sat, Oct 25</small></span></span>
        <span className="w-item"><CalendarHeart weight="duotone" className="w-ico" /> <span><b>Monthsary</b><small>Fri, Nov 29</small></span></span>
      </div>
    </div>
  );
}

function TheirTime() {
  return (
    <div className="w-col w-center">
      <Kicker Icon={GlobeHemisphereEast}>{PARTNER}’s time</Kicker>
      <span className="w-clock">5:41<small>PM</small></span>
      <span className="w-weather"><Sun weight="fill" className="w-sun" /> <b>34°</b> Sunny</span>
      <span className="w-faint">Dubai · 4h behind</span>
      <span className="w-attr">Apple Weather</span>
    </div>
  );
}

const DRAW = { distance: Distance, since: Since, meet: Meet, nudge: Nudge, date: NextDate, time: TheirTime };

/** One widget. `size`: 'small' | 'medium'. */
export function AppWidget({ kind, size = 'small', className = '', style }) {
  const Draw = DRAW[kind];
  return (
    <div className={`wdg wdg-${size} ${className}`} style={style}>
      <div className="wdg-in">
        <Draw />
      </div>
    </div>
  );
}
