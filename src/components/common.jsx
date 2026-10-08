import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import { AppleLogo } from '@phosphor-icons/react';

import { APP_STORE_URL, SPRING } from '../config.js';

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, delay = 0, className, as = 'div', y = 28 }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </Tag>
  );
}

export function SectionHead({ eyebrow, title, body, center = true, className = '' }) {
  return (
    <Reveal className={`section-head ${center ? 'center' : ''} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </Reveal>
  );
}

/**
 * Download link to the App Store, styled like the store badge: Apple logo with
 * "Download on the / App Store". `label` swaps the second line (e.g. "Start free trial").
 */
export function AppStoreButton({ variant = 'dark', label, small = false }) {
  return (
    <a className={`btn store-btn btn-${variant} ${small ? 'btn-small' : ''}`} href={APP_STORE_URL} target="_blank" rel="noopener">
      <AppleLogo size={small ? 20 : 26} weight="fill" />
      {label ? (
        <span className="store-one">{label}</span>
      ) : (
        <span className="store-two">
          <small>Download on the</small>
          <b>App Store</b>
        </span>
      )}
    </a>
  );
}

/** Counts up to `value` the first time it scrolls into view. */
export function CountUp({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 0);
  useEffect(() => {
    if (!inView || reduce) return undefined;
    const controls = animate(0, value, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, value]);
  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}
