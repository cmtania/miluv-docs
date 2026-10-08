import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AppleLogo, List, X } from '@phosphor-icons/react';

import { APP_STORE_URL, NAV, SPRING } from '../config.js';
import { scrollToId } from '../smooth-scroll.js';

/** A floating glass pill: readable over the hero (apart or together) and the light sections. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => (event) => {
    event.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''} ${open ? 'nav-open' : ''}`}>
      <div className="nav-pill">
        <a className="brand" href="#top" onClick={go('top')}>
          <img src="assets/web/icon.webp" alt="" width="32" height="32" />
          <span className="brand-name">MiLuv</span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          {NAV.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={go(id)}>{label}</a>
          ))}
        </nav>
        <a className="nav-cta" href={APP_STORE_URL} target="_blank" rel="noopener">
          <AppleLogo size={17} weight="fill" />
          Get the app
        </a>
        <button className="nav-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav-sheet"
            aria-label="Sections"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={SPRING}
          >
            {NAV.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={go(id)}>{label}</a>
            ))}
            <a className="btn btn-accent" href={APP_STORE_URL} target="_blank" rel="noopener">
              <AppleLogo size={21} weight="fill" /> Download on the App Store
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
