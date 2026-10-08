import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenis = null;

/**
 * Smooth, inertial page scrolling (Lenis). Skipped entirely for people who
 * turn on Reduce Motion: they get the browser's native scrolling.
 * Returns a cleanup function.
 */
export function startSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -80 } });
  window.lenis = lenis;
  return () => {
    lenis?.destroy();
    lenis = null;
  };
}

/** Scroll to an element by id, eased through Lenis when it's running. */
export function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.1 });
  else target.scrollIntoView({ behavior: 'smooth' });
}
