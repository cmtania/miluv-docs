import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { LockSimple } from '@phosphor-icons/react';

import { SPRING, WIDGETS } from '../config.js';
import { AppWidget } from './AppWidgets.jsx';
import { Reveal, SectionHead } from './common.jsx';

/**
 * Widgets: a Home Screen wallpaper with MiLuv's widgets on it. Picking one on the left swaps
 * the big widget in the middle; two others drift behind it.
 */
export function Widgets() {
  const [pick, setPick] = useState(0);
  const section = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 50, reduce ? 0 : -50]);
  const driftBack = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -30, reduce ? 0 : 30]);
  const current = WIDGETS[pick];

  return (
    <section className="section widgets" id="widgets" ref={section}>
      <div className="widgets-wallpaper" aria-hidden="true" />
      <div className="wrap widgets-grid">
        <div className="widgets-copy">
          <SectionHead
            center={false}
            className="on-dark"
            eyebrow="Widgets"
            title={<>Them, on your <span className="hand">Home Screen.</span></>}
            body="The first thing you see when you pick up your phone. Two widgets come free; MiLuv Pro adds four more. Touch and hold your Home Screen, tap +, and search for MiLuv."
          />
          <Reveal className="widget-list" delay={0.1}>
            <div role="tablist" aria-label="Widgets">
              {WIDGETS.map((w, i) => (
                <button
                  key={w.kind}
                  role="tab"
                  aria-selected={i === pick}
                  className={`widget-tab ${i === pick ? 'on' : ''}`}
                  onClick={() => setPick(i)}
                  onMouseEnter={() => setPick(i)}
                >
                  <span className="widget-tab-text">
                    <b>{w.name}</b>
                    <small>{w.blurb}</small>
                  </span>
                  <span className={`widget-chip ${w.pro ? 'pro' : 'free'}`}>
                    {w.pro && <LockSimple size={12} weight="fill" />}
                    {w.pro ? 'Pro' : 'Free'}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="widgets-stage">
          <motion.div className="widget-float float-a" style={{ y: driftBack }} aria-hidden="true">
            <AppWidget kind="since" size="small" />
          </motion.div>
          <motion.div className="widget-float float-b" style={{ y: drift }} aria-hidden="true">
            <AppWidget kind="meet" size="small" />
          </motion.div>
          <div className={`widget-main shape-${current.size}`}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current.kind}
                role="img"
                aria-label={`The ${current.name} widget`}
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.94, rotate: 2 }}
                transition={SPRING}
              >
                <AppWidget kind={current.kind} size={current.size} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
