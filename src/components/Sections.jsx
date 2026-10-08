import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CaretDown, Check, EnvelopeSimple, Sparkle } from '@phosphor-icons/react';

import { FAQS, PLANS, SPRING, SUPPORT_EMAIL, SUPPORT_NAME } from '../config.js';
import { useLocalPrices } from '../hooks.js';
import { Dove3D, Heart, Wordmark } from './Brand.jsx';
import { AppStoreButton, Reveal, SectionHead } from './common.jsx';

export function Pricing() {
  const prices = useLocalPrices();
  return (
    <section className="section pricing" id="pricing">
      <div className="wrap">
        <SectionHead
          eyebrow="Pricing"
          title={<>Free for both of you. <span className="hand">Pro if you like.</span></>}
          body="MiLuv is free. MiLuv Pro is optional, monthly or once for lifetime, and one purchase covers both of you while you’re linked. The App Store charges in your local currency."
        />
        <div className="plans">
          {PLANS.map((plan, i) => {
            const local = plan.priceKey ? prices[plan.priceKey] : plan.price;
            return (
              <Reveal key={plan.name} className={`plan ${plan.featured ? 'plan-featured' : ''}`} delay={i * 0.07}>
                {plan.featured && <div className="plan-glow" aria-hidden="true" />}
                <div className="plan-head">
                  <h3>{plan.name}</h3>
                  {plan.badge && <span className="plan-badge"><Sparkle size={14} weight="fill" /> {plan.badge}</span>}
                </div>
                <div className="plan-price">
                  {local ? <b>{local}</b> : <b className="plan-price-text">{plan.fallback[0]}</b>}
                  <span>
                    {local ? plan.note : plan.fallback[1]}
                    {local && plan.priceKey && prices.approx && <em className="approx"> · approx.</em>}
                  </span>
                </div>
                <p className="plan-body">{plan.body}</p>
                <ul className="checks">
                  {plan.features.map((feature) => (
                    <li key={feature}><Check size={17} weight="bold" />{feature}</li>
                  ))}
                </ul>
                <AppStoreButton variant={plan.featured ? 'accent' : 'outline'} label={plan.cta} small />
              </Reveal>
            );
          })}
        </div>
        <p className="price-note">
          {prices.approx
            ? 'Prices marked approx. are converted to your currency as a guide. The App Store sets the exact price for your country, including any taxes, and shows it before you buy.'
            : 'The monthly plan renews automatically until you cancel it in your Apple ID’s Subscriptions settings. Lifetime is a one-time purchase.'}
        </p>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="wrap faq-grid">
        <div className="faq-side">
          <SectionHead
            center={false}
            eyebrow="FAQ"
            title={<>Questions, <span className="hand">answered.</span></>}
            body={<>Everything else is on the <a href="support.html">Support page</a>.</>}
          />
          <Reveal className="help-card" delay={0.1}>
            <Dove3D pose="sad" width={74} className="help-dove" />
            <b>Still stuck?</b>
            <p>Write to {SUPPORT_NAME}. Most emails get an answer within a day or two.</p>
            <a className="btn btn-outline btn-small" href={`mailto:${SUPPORT_EMAIL}?subject=MiLuv%20support`}>
              <EnvelopeSimple size={18} weight="bold" /> Email support
            </a>
          </Reveal>
        </div>
        <div className="faq-list">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={q} className={`faq-item ${isOpen ? 'open' : ''}`} delay={i * 0.04}>
                <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{q}</span>
                  <CaretDown size={22} weight="bold" className="faq-chevron" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={SPRING}
                    >
                      <p>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Closing call to action: two hearts on the dotted thread close the gap as it scrolls in. */
export function Cta() {
  return (
    <section className="cta">
      <div className="cta-thread" aria-hidden="true">
        <motion.span
          className="cta-heart"
          initial={{ x: '-38vw' }}
          whileInView={{ x: '-34px' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', bounce: 0.25, duration: 1.6, delay: 0.2 }}
        >
          <Heart fill="#2C8F76" />
        </motion.span>
        <i className="cta-line" />
        <motion.span
          className="cta-heart"
          initial={{ x: '38vw' }}
          whileInView={{ x: '34px' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', bounce: 0.25, duration: 1.6, delay: 0.2 }}
        >
          <Heart fill="#C68B76" />
        </motion.span>
      </div>
      <div className="wrap cta-copy">
        <Reveal>
          <Dove3D pose="hi" width={180} className="cta-dove" alt="The MiLuv dove, waving" />
          <h2>Close some of the distance <span className="hand">today.</span></h2>
          <p>Download MiLuv, send your person the code, and add the widget. It takes about a minute.</p>
          <div className="cta-actions">
            <AppStoreButton variant="accent" />
          </div>
          <ul className="cta-facts">
            <li>Free to download</li>
            <li>Distance only, never your location</li>
            <li>One purchase covers you both</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <a className="brand" href="#top" aria-label="MiLuv, back to top">
            <Wordmark width={130} ink="#FCF4F0" />
          </a>
          <p>A Home Screen widget for the distance between you two. For iPhone.</p>
          <AppStoreButton variant="light" small />
        </div>
        <div className="footer-cols">
          <div>
            <b>Product</b>
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="#widgets">Widgets</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div>
            <b>Help</b>
            <a href="#faq">FAQ</a>
            <a href="support.html">Support</a>
            <a href="privacy.html">Privacy Policy</a>
            <a href="terms.html">Terms of Service</a>
          </div>
          <div>
            <b>Contact</b>
            <span className="footer-name">{SUPPORT_NAME}</span>
            <a href={`mailto:${SUPPORT_EMAIL}?subject=MiLuv%20support`}>{SUPPORT_EMAIL}</a>
          </div>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">MiLuv</div>
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} MiLuv. All rights reserved.</span>
        <span>Apple, iPhone and App Store are trademarks of Apple Inc.</span>
      </div>
    </footer>
  );
}
