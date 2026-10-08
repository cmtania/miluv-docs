import { useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDown } from '@phosphor-icons/react';

import { img, PARTNER, SPRING } from '../config.js';
import { scrollToId } from '../smooth-scroll.js';
import { AppWidget } from './AppWidgets.jsx';
import { Heart } from './Brand.jsx';
import { AppStoreButton } from './common.jsx';
import { IPhone } from './Devices.jsx';
import { ScreenApart, ScreenTogether, ShareCard } from './Screens.jsx';

// Things floating around the phone: [key, left %, top %, width (px), rotation, depth].
const FLOATERS = [
  ['distance', -6, 8, 300, -6, 1.3],
  ['since', 82, 2, 158, 7, 1.0],
  ['nudge', -2, 66, 300, 4, 1.5],
  ['share', 76, 56, 270, -5, 1.15],
];

export function Hero() {
  const [together, setTogether] = useState(false);
  const section = useRef(null);
  const reduce = useReducedMotion();

  // Scroll: the stage starts tilted back and rises upright as the page scrolls.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const tilt = useTransform(scrollYProgress, [0, 0.45], [reduce ? 0 : 18, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [reduce ? 1 : 0.92, 1]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  // Pointer: the floating cards drift a little with the mouse, deeper ones more.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const onPointerMove = (event) => {
    if (reduce || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section ref={section} className={`hero ${together ? 'is-together' : ''}`} id="top" onPointerMove={onPointerMove}>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-night" />
        <div className="hero-bg-day" />
        <div className="hero-stars" />
        {/* The thread across the sky: two hearts that meet when you flip to Together. */}
        <div className="hero-thread">
          <i className="hero-thread-line" />
          <Heart className="hero-thread-heart left" fill="#2C8F76" />
          <Heart className="hero-thread-heart right" fill="#C68B76" />
        </div>
      </div>

      <div className="wrap hero-copy">
        <motion.span className="pill hero-pill" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}>
          <i /> For iPhone · Free to download
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.06 }}>
          Know how far love
          <br />
          <span className="hand">has to travel.</span>
        </motion.h1>
        <motion.p className="lead" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.12 }}>
          MiLuv keeps the distance between you and the one you miss on your Home Screen, with a gentle nudge as it
          closes. Never a map, never an address. Just the two of you.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.18 }}>
          <AppStoreButton variant={together ? 'dark' : 'light'} />
          <a
            className="btn btn-ghost"
            href="#how"
            onClick={(event) => {
              event.preventDefault();
              scrollToId('how');
            }}
          >
            See how it works <ArrowDown size={18} weight="bold" />
          </a>
          <div className="hero-switch">
            <div className="together-toggle" role="radiogroup" aria-label="Apart or together">
              {[
                [false, 'Apart'],
                [true, 'Together'],
              ].map(([value, label]) => (
                <button key={label} type="button" role="radio" aria-checked={together === value} className={together === value ? 'on' : ''} onClick={() => setTogether(value)}>
                  {together === value && <motion.span layoutId="together-pill" className="together-pill" transition={SPRING} />}
                  <span className="tog-label">{label}</span>
                </button>
              ))}
            </div>
            <p>
              <b>{together ? 'Together, finally.' : 'Go on, bring them home.'}</b>
              <span>{together ? `The card turns to Together with ${PARTNER}.` : 'Just like in the app, the card follows.'}</span>
            </p>
          </div>
        </motion.div>
      </div>

      <div className="hero-stage-wrap">
        <motion.div className="hero-stage" style={{ rotateX: tilt, scale, y: lift }}>
          <IPhone
            className="hero-iphone"
            active={together ? 1 : 0}
            screens={[
              ['apart', <ScreenApart />, `MiLuv's Home screen: 1,284 km to ${PARTNER}, updated 2 minutes ago`],
              ['together', <ScreenTogether />, `MiLuv's Home screen when you're together: Together with ${PARTNER}, with a picture of the two of you`],
            ]}
          />
          {FLOATERS.map(([key, left, top, width, rotate, depth], i) => (
            <Floater key={key} left={left} top={top} width={width} rotate={rotate} depth={depth} sx={sx} sy={sy} delay={0.5 + i * 0.08}>
              <FloaterArt kind={key} />
            </Floater>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FloaterArt({ kind }) {
  if (kind === 'distance') return <AppWidget kind="distance" size="medium" />;
  if (kind === 'since') return <AppWidget kind="since" size="small" />;
  if (kind === 'share') return <ShareCard />;
  return (
    <div className="banner banner-hero">
      <img src={img('icon')} alt="" />
      <div>
        <p className="banner-head"><b>MiLuv</b><span>now</span></p>
        <p className="banner-title">{PARTNER} nudged you</p>
        <p className="banner-body">I miss you!</p>
      </div>
    </div>
  );
}

function Floater({ children, left, top, width, rotate, depth, sx, sy, delay }) {
  const x = useTransform(sx, (v) => v * 60 * depth);
  const y = useTransform(sy, (v) => v * 40 * depth);
  return (
    <motion.div
      className="floater"
      aria-hidden="true"
      style={{ left: `${left}%`, top: `${top}%`, '--fw': `${width}px`, x, y }}
      initial={{ opacity: 0, scale: 0.6, rotate: rotate * 2 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ ...SPRING, duration: 0.9, delay }}
    >
      <div className="floater-bob" style={{ animationDelay: `${-depth * 2}s`, animationDuration: `${5 + depth * 2}s` }}>
        {children}
      </div>
    </motion.div>
  );
}
