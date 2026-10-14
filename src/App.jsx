import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';

import { Features } from './components/Features.jsx';
import { Hero } from './components/Hero.jsx';
import { Nav } from './components/Nav.jsx';
import { Cta, Faq, Footer, Pricing } from './components/Sections.jsx';
import { Film, Gallery, Marquee, Numbers } from './components/Showcase.jsx';
import { Story } from './components/Story.jsx';
import { Widgets } from './components/Widgets.jsx';
import { startSmoothScroll } from './smooth-scroll.js';

export function App() {
  useEffect(() => startSmoothScroll(), []);
  return (
    // reducedMotion="user": with Reduce Motion on, motion keeps fades but drops movement.
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Features />
        <Widgets />
        <Numbers />
        <Film />
        <Gallery />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </MotionConfig>
  );
}
