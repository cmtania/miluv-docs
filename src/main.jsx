import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import '@fontsource-variable/manrope';
import '@fontsource/caveat/700.css';
import '@fontsource/kalam/400.css';
import '@fontsource/kalam/700.css';

import { Features } from './components/Features.jsx';
import { Hero } from './components/Hero.jsx';
import { Nav } from './components/Nav.jsx';
import { Cta, Faq, Footer, Pricing } from './components/Sections.jsx';
import { Film, Gallery, Marquee, Numbers } from './components/Showcase.jsx';
import { Story } from './components/Story.jsx';
import { Widgets } from './components/Widgets.jsx';
import { startSmoothScroll } from './smooth-scroll.js';
import './landing.css';
import './miluv.css';

function App() {
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
