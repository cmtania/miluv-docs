import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Pause, Play, SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';

import { img, MARQUEE, NUMBERS, SLIDES, SPRING } from '../config.js';
import { Dove3D } from './Brand.jsx';
import { CountUp, Reveal, SectionHead } from './common.jsx';

/** A slow ticker of what MiLuv does, doubled so it loops seamlessly. */
export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-label="Highlights">
      <div className="marquee-track">
        {items.map(([Icon, text], i) => (
          <span key={i} className="marquee-item" aria-hidden={i >= MARQUEE.length ? true : undefined}>
            <Icon size={22} weight="duotone" /> {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Numbers() {
  return (
    <section className="numbers">
      <div className="wrap numbers-grid">
        {NUMBERS.map(({ value, suffix, label }, i) => (
          <Reveal key={label} className="number" delay={i * 0.08}>
            <b><CountUp value={value} suffix={suffix} /></b>
            <span>{label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const FILM_POINTS = [
  ['The widget', 'The distance, right on your Home Screen.'],
  ['Getting closer', 'A heads-up at 1 km, 500 m and when you’ve arrived.'],
  ['Nudges', 'A sweet message in one tap.'],
  ['Share cards', 'The distance as a picture to post.'],
];

/** The 30-second promo (rendered in the app repo, design/promo), muted until you ask. */
export function Film() {
  const video = useRef(null);
  const box = useRef(null);
  const inView = useInView(box, { margin: '-120px' });
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Plays while on screen (unless Reduce Motion is on), pauses when scrolled away.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView && !reduce) v.play().then(() => setPlaying(true)).catch(() => {});
    else {
      v.pause();
      setPlaying(false);
    }
  }, [inView, reduce]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="section film" id="film">
      <div className="film-glow" aria-hidden="true" />
      <div className="wrap film-grid">
        <div>
          <SectionHead
            center={false}
            className="on-dark"
            eyebrow="In 30 seconds"
            title={<>See it <span className="hand">in motion.</span></>}
            body="A quick look at MiLuv’s free features: the widget, the getting-closer notifications, nudges and share cards."
          />
          <ul className="film-points">
            {FILM_POINTS.map(([title, body], i) => (
              <Reveal as="li" key={title} delay={0.06 * i}>
                <b>{title}</b>
                <span>{body}</span>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal className="film-card-wrap" delay={0.1}>
          <div className="film-card" ref={box}>
            <video
              ref={video}
              src={img('promo', 'mp4')}
              poster={img('promo-poster')}
              muted={muted}
              loop
              playsInline
              preload="none"
              aria-label="MiLuv promo video, 30 seconds"
            />
            <div className="film-controls">
              <button type="button" onClick={toggle} aria-label={playing ? 'Pause video' : 'Play video'}>
                {playing ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
              </button>
              <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Turn sound on' : 'Turn sound off'}>
                {muted ? <SpeakerSlash size={18} weight="fill" /> : <SpeakerHigh size={18} weight="fill" />}
              </button>
            </div>
          </div>
          <Dove3D pose="excited" width={150} className="film-dove" />
        </Reveal>
      </div>
    </section>
  );
}

/** The App Store screenshots in a snapping, draggable strip. */
export function Gallery() {
  const strip = useRef(null);
  const step = (dir) => {
    const el = strip.current;
    if (!el) return;
    const card = el.querySelector('.slide');
    el.scrollBy({ left: dir * (card ? card.offsetWidth + 24 : 400), behavior: 'smooth' });
  };

  // Drag to scroll with a mouse (touch already scrolls natively).
  const drag = useRef(null);
  const onDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { x: e.clientX, left: strip.current.scrollLeft };
    strip.current.classList.add('dragging');
  };
  const onMove = (e) => {
    if (!drag.current) return;
    strip.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const onUp = () => {
    drag.current = null;
    strip.current?.classList.remove('dragging');
  };

  return (
    <section className="section gallery" id="gallery">
      <div className="wrap gallery-head">
        <SectionHead
          center={false}
          eyebrow="On the App Store"
          title={<>Take the <span className="hand">full tour.</span></>}
          body="MiLuv’s App Store screenshots, with a made-up couple."
        />
        <div className="gallery-controls">
          <div className="gallery-arrows">
            <button aria-label="Previous screenshots" onClick={() => step(-1)}><ArrowLeft size={20} weight="bold" /></button>
            <button aria-label="Next screenshots" onClick={() => step(1)}><ArrowRight size={20} weight="bold" /></button>
          </div>
        </div>
      </div>
      <div className="gallery-strip" ref={strip} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
        {SLIDES.map(([name, alt], i) => (
          <motion.figure
            key={name}
            className="slide"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ ...SPRING, delay: Math.min(i, 4) * 0.05 }}
          >
            <img src={img(`slide-${name}`)} alt={`App Store screenshot ${i + 1} of ${SLIDES.length}: ${alt}`} loading="lazy" draggable={false} />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
