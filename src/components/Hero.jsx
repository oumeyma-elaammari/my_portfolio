import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import cv from '../assets/cv/cv_oumeyma_elaammari.pdf';
import '../styles/Hero.css';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const typedRef = useRef(null);
  const typedSlotRef = useRef(null);
  const taglineRef = useRef(null);
  const french = String(i18n.resolvedLanguage || i18n.language || 'en')
    .toLowerCase()
    .startsWith('fr');
  const exclamationGap = french ? '\u00A0' : ' ';
  const availability = t('hero.availability');
  const availabilitySplit = availability.search(/PFE\b/);
  const availabilityLead = availabilitySplit > 0 ? availability.slice(0, availabilitySplit) : availability;
  const availabilityKeep = availabilitySplit > 0 ? availability.slice(availabilitySplit) : '';

  useEffect(() => {
    const typedStrings = i18n.t('hero.typed', { returnObjects: true });
    const slot = typedSlotRef.current;
    const tagline = taglineRef.current;
    if (!slot || !tagline || !Array.isArray(typedStrings)) return undefined;

    const measure = document.createElement('span');
    measure.style.position = 'fixed';
    measure.style.top = '0';
    measure.style.left = '0';
    measure.style.visibility = 'hidden';
    measure.style.pointerEvents = 'none';
    measure.style.whiteSpace = 'nowrap';
    document.body.appendChild(measure);

    const syncMeasureFont = (source) => {
      const style = window.getComputedStyle(source);
      measure.style.font = style.font;
      measure.style.fontSize = style.fontSize;
      measure.style.fontWeight = style.fontWeight;
      measure.style.letterSpacing = style.letterSpacing;
    };

    const measureLongest = (source) => {
      syncMeasureFont(source);
      let maxWidth = 0;
      typedStrings.forEach((value) => {
        measure.textContent = value;
        maxWidth = Math.max(maxWidth, measure.offsetWidth);
      });
      measure.textContent = '|';
      return maxWidth + measure.offsetWidth;
    };

    const applyTypedWidth = () => {
      const typedEl = typedRef.current;
      const source = typedEl || tagline;
      const narrow = window.innerWidth <= 480;

      if (!narrow) {
        tagline.style.fontSize = '';
        tagline.style.minHeight = '';
        syncMeasureFont(source);
        let maxWidth = 0;
        typedStrings.forEach((value) => {
          measure.textContent = value;
          maxWidth = Math.max(maxWidth, measure.offsetWidth);
        });
        measure.textContent = '|';
        maxWidth = Math.max(maxWidth, measure.offsetWidth);
        slot.style.setProperty('--typed-max-width', `${Math.ceil(maxWidth + 4)}px`);
        return;
      }

      tagline.style.fontSize = '';
      slot.style.removeProperty('--typed-max-width');
      const available = tagline.parentElement ? tagline.parentElement.clientWidth : window.innerWidth;
      let size = parseFloat(window.getComputedStyle(tagline).fontSize);
      const minSize = 13;
      let maxWidth = measureLongest(source);

      while (maxWidth > available && size > minSize) {
        size = Math.max(minSize, +(size - 0.5).toFixed(1));
        tagline.style.fontSize = `${size}px`;
        maxWidth = measureLongest(typedEl || tagline);
        if (size === minSize) break;
      }

      const typedStyle = window.getComputedStyle(tagline);
      const fontSize = parseFloat(typedStyle.fontSize);
      const lineHeight = typedStyle.lineHeight === 'normal' ? fontSize * 1.45 : parseFloat(typedStyle.lineHeight);
      tagline.style.minHeight = `${Math.ceil(lineHeight)}px`;
    };

    applyTypedWidth();
    window.addEventListener('resize', applyTypedWidth);

    const typed = new Typed(typedRef.current, {
      strings: typedStrings,
      typeSpeed: 90,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      startDelay: 500,
      cursorChar: '|',
      smartBackspace: true,
      showCursor: true
    });

    return () => {
      typed.destroy();
      window.removeEventListener('resize', applyTypedWidth);
      measure.remove();
    };
  }, [i18n]);

  return (
    <section id="hero" className="hero section">
      <div className="hero-stack">
        <div className="container hero-content" data-aos="fade-up" data-aos-delay="100">
          <p className="greeting">
            {t('hero.welcome')}<span className="greeting-end"><span className="greeting-gap">{exclamationGap}</span>!</span>
          </p>

          <p className="hero-intro">{t('hero.greeting')}</p>

          <h1>OUMEYMA ELAAMMARI</h1>

          <p className="tagline" ref={taglineRef}>
            <span className="typed-slot" ref={typedSlotRef}>
              <span ref={typedRef} className="typed-text"></span>
            </span>
          </p>

          <p className="availability">
            <span className="availability-dot" aria-hidden="true" />
            <span className="availability-text">
              {availabilityLead}
              {availabilityKeep ? <span className="availability-keep">{availabilityKeep}</span> : null}
            </span>
          </p>

          <div className="hero-buttons">
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={-70}
              className="btn btn-primary"
            >
              {t('hero.contact')}
            </Link>
            <a href={cv} className="btn btn-outline">
              {t('hero.resume')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
