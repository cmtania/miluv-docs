import { motion } from 'motion/react';
import {
  Bell,
  CalendarHeart,
  Camera,
  Champagne,
  Diamond,
  Export,
  ForkKnife,
  Globe,
  HandWaving,
  Heart as HeartIcon,
  HeartStraight,
  Hourglass,
  Island,
  LockKey,
  MoonStars,
  Sparkle,
  Sun,
  SunHorizon,
  TreeEvergreen,
} from '@phosphor-icons/react';

import { img, PARTNER, PRIVACY_POINTS, SPRING } from '../config.js';
import { Dove3D, Heart, Portrait } from './Brand.jsx';
import { Reveal, SectionHead } from './common.jsx';
import { IPhone } from './Devices.jsx';
import { ScreenApart, ShareCard } from './Screens.jsx';

/** Nudge messages, from the app's managed list (supabase/migrations/0015_nudge_messages.sql). */
const NUDGES = [
  ['now', 'I miss you!'],
  ['12m ago', 'I can’t wait to see you!'],
  ['1h ago', 'I need cuddles!'],
];

/** Calendar plan types, as in lib/plans.ts, each with an icon. */
const PLAN_KINDS = [
  [SunHorizon, 'Morning date'], [ForkKnife, 'Lunch date'], [MoonStars, 'Night date'], [Island, 'Weekend date'],
  [HeartStraight, 'Valentine’s'], [TreeEvergreen, 'Christmas'], [Diamond, 'Anniversary'], [CalendarHeart, 'Monthsary'],
  [Champagne, 'New Year'], [Sparkle, 'Custom'],
];

export function Features() {
  return (
    <section className="section features" id="features">
      <div className="wrap">
        <SectionHead
          eyebrow="Features"
          title={<>Little things that make the miles <span className="hand">feel smaller.</span></>}
          body="Nudges, your faces on the widget, every day since day one, and, with MiLuv Pro, plans for when you’ll finally be together."
        />

        <div className="bento">
          <Reveal className="card card-dark bento-nudges">
            <CardText Icon={HandWaving} kicker="Nudges" title="Say “I miss you” in one tap.">
              Pick a sweet message and it lands on their phone right away. One a minute, only ever to the one person you’re linked with.
            </CardText>
            <div className="banners">
              {NUDGES.map(([when, body], i) => (
                <motion.div
                  key={body}
                  className="banner"
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ ...SPRING, delay: 0.15 + i * 0.12 }}
                >
                  <img src={img('icon')} alt="" />
                  <div>
                    <p className="banner-head"><b>MiLuv</b><span>{when}</span></p>
                    <p className="banner-title">{PARTNER} nudged you</p>
                    <p className="banner-body">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <IPhone screens={[['home', <ScreenApart />, 'The Home screen with the nudge buttons']]} className="peek peek-right" />
            <Dove3D pose="nudge" width={150} className="nudges-dove" />
          </Reveal>

          <Reveal className="card card-blush bento-photos" delay={0.06}>
            <CardText Icon={Camera} kicker="Photos" title="Put a face to the distance.">
              Your photo replaces your heart on Home, the widget and your share card, and theirs replaces theirs. Only the two of you can see them.
            </CardText>
            <div className="photos-art" aria-hidden="true">
              <div className="photos-thread">
                <Portrait who="you" className="photos-face" />
                <i />
                <Portrait who="sam" className="photos-face" />
              </div>
              <div className="photos-together">
                <Portrait who="couple" className="photos-couple" />
                <span><Camera weight="bold" /> Add picture together</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="card card-cream bento-since">
            <CardText Icon={HeartIcon} kicker="Since day one" title="Count every day together.">
              Set the day you got together, and watch the days, and the hours, add up. One shared date for both of you.
            </CardText>
            <div className="since-art">
              <b>1,134</b>
              <span>days together</span>
              <div className="since-chips">
                <i>3 years</i><i>1 month</i><i>7 days</i><i>14 hours</i>
              </div>
            </div>
          </Reveal>

          <Reveal className="card bento-share" delay={0.06}>
            <CardText Icon={Export} kicker="Share" title="Make it a keepsake.">
              Turn the distance, or your day count, into a card for Instagram or Messenger. It’s made on your phone, never uploaded.
            </CardText>
            <div className="share-art" aria-hidden="true">
              <ShareCard together className="share-b" />
              <ShareCard className="share-a" />
            </div>
          </Reveal>

          <Reveal className="card card-dark bento-private" delay={0.12}>
            <CardText Icon={LockKey} kicker="Private by design" title="The distance, never the place.">
              Your partner sees how far apart you are and when it was measured. No coordinates, no map, no history.
            </CardText>
            <ul className="private-points">
              {PRIVACY_POINTS.map(([Icon, text]) => (
                <li key={text}><Icon size={20} weight="bold" /> {text}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="card card-teal bento-calendar">
            <CardText Icon={CalendarHeart} kicker="Calendar" title="Plan your next date, together." pro>
              Morning coffee calls, weekend visits, monthsaries and anniversaries. Both of you get a reminder a day before and an hour before.
            </CardText>
            <div className="kinds" aria-hidden="true">
              {PLAN_KINDS.map(([Icon, label], i) => (
                <span key={label} className="kind" style={{ '--i': i }}><Icon size={18} weight="duotone" /> {label}</span>
              ))}
            </div>
          </Reveal>

          <Reveal className="card card-blush bento-meet" delay={0.06}>
            <CardText Icon={Hourglass} kicker="Until we meet" title="Count down to hello." pro>
              Mark a plan “We’ll be together” and the countdown sits on Home and in its own widget.
            </CardText>
            <div className="meet-art">
              <b>12 days · 4 hrs</b>
              <span>until you see {PARTNER}</span>
              <div className="meet-thread" aria-hidden="true">
                <Heart className="meet-heart" fill="#C68B76" />
                <i />
                <Heart className="meet-heart" fill="#2C8F76" />
              </div>
            </div>
          </Reveal>

          <Reveal className="card bento-closer">
            <CardText Icon={Bell} kicker="Getting closer" title="Feel them getting close.">
              Heading toward each other? MiLuv taps you at about 1 km, again at 500 m, and once more when you’ve arrived.
            </CardText>
            <div className="rings" aria-hidden="true">
              <span className="ring r1"><em>1 km</em></span>
              <span className="ring r2"><em>500 m</em></span>
              <span className="ring r3"><em>Arrived</em></span>
              <Heart className="rings-heart" fill="#2C8F76" />
            </div>
          </Reveal>

          <Reveal className="card card-night bento-time" delay={0.06}>
            <CardText Icon={Globe} kicker="Their time & weather" title="Know if it’s night where they are." pro>
              See their local time and weather at a glance, so you know when to call. Weather comes from an area of about 11 km, never their location.
            </CardText>
            <div className="clocks" aria-hidden="true">
              <div className="clock">
                <small>You · Manila</small>
                <b>9:41 <i>PM</i></b>
                <span><MoonStars size={20} weight="fill" className="wx-moon" /> 27° Clear</span>
              </div>
              <div className="clock clock-them">
                <small>{PARTNER} · Dubai</small>
                <b>5:41 <i>PM</i></b>
                <span><Sun size={20} weight="fill" className="wx-sun" /> 34° Sunny</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CardText({ Icon, kicker, title, children, pro }) {
  return (
    <div className="card-text">
      <span className="card-kicker">
        <Icon size={18} weight="bold" /> {kicker}
        {pro && <em className="pro">PRO</em>}
      </span>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
