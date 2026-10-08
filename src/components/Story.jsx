import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';

import { STORY } from '../config.js';
import { Reveal, SectionHead } from './common.jsx';
import { IPhone } from './Devices.jsx';
import { ScreenApart, ScreenCloser, ScreenConnect, ScreenTogether } from './Screens.jsx';

const SCREEN = {
  connect: () => <ScreenConnect />,
  apart: () => <ScreenApart />,
  closer: () => <ScreenCloser />,
  photos: () => <ScreenApart photos />,
  together: () => <ScreenTogether />,
};

/**
 * "How it works" as a scroll story: the iPhone stays pinned while the page scrolls, and its
 * screen moves through the app one step at a time (screens drawn after the app's layouts).
 * On narrow screens it becomes a plain list, one screen per step.
 */
export function Story() {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(STORY.length - 1, Math.max(0, Math.floor(v * STORY.length))));
  });
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Jump to a step: the point in the track where that step becomes active.
  const goTo = (i) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const target = top + ((i + 0.5) / STORY.length) * (el.offsetHeight - window.innerHeight);
    if (window.lenis) window.lenis.scrollTo(target, { duration: 1 });
    else window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const screens = STORY.map((s) => [s.screen, SCREEN[s.screen](), `${s.kicker}: ${s.title}`]);

  return (
    <section className="story" id="how">
      <div className="wrap">
        <SectionHead
          eyebrow="How it works"
          title={<>Closer than it <span className="hand">feels.</span></>}
          body="Set up in about a minute. Then MiLuv quietly keeps count of the distance between you, wherever you both are."
        />
      </div>

      <div className="story-track" ref={track} style={{ '--steps': STORY.length }}>
        <div className="story-sticky">
          <div className="wrap story-grid">
            <ol className="story-steps">
              {STORY.map((step, i) => (
                <li key={step.screen} className={`story-step ${i === active ? 'on' : ''} ${i < active ? 'done' : ''}`}>
                  <button type="button" onClick={() => goTo(i)} aria-current={i === active ? 'step' : undefined}>
                    <span className="story-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="story-text">
                      <small>{step.kicker}</small>
                      <b>{step.title}</b>
                      <span className="story-body"><span>{step.body}</span></span>
                    </span>
                  </button>
                </li>
              ))}
              <span className="story-rail" aria-hidden="true"><motion.i style={{ height: fill }} /></span>
            </ol>
            <div className="story-device">
              <div className="story-halo" aria-hidden="true" />
              <IPhone screens={screens} active={active} className="story-phone" />
              <div className="story-caption" aria-live="polite">
                {String(active + 1).padStart(2, '0')} / {String(STORY.length).padStart(2, '0')} · {STORY[active].kicker}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap story-list">
        {STORY.map((step, i) => (
          <Reveal key={step.screen} className="story-card">
            <span className="story-num">{String(i + 1).padStart(2, '0')}</span>
            <small>{step.kicker}</small>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <IPhone screens={[[step.screen, SCREEN[step.screen](), `${step.kicker}: ${step.title}`]]} className="story-card-phone" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
