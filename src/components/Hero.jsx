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

    const applyTypedWidth = () => {
      const typedEl = typedRef.current;
      const source = typedEl || tagline;
      const style = window.getComputedStyle(source);
      measure.style.font = style.font;
      measure.style.fontSize = style.fontSize;
      measure.style.fontWeight = style.fontWeight;
      measure.style.letterSpacing = style.letterSpacing;

      let maxWidth = 0;
      typedStrings.forEach((value) => {
        measure.textContent = value;
        maxWidth = Math.max(maxWidth, measure.offsetWidth);
      });
      measure.textContent = '|';
      maxWidth = Math.max(maxWidth, measure.offsetWidth);

      slot.style.setProperty('--typed-max-width', `${Math.ceil(maxWidth + 4)}px`);
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
            {t('hero.welcome')}<span className="greeting-end"> !</span>
          </p>

          <h1>
            {t('hero.hello')}<span className="greeting-end"> !</span> {t('hero.nameLead')}{' '}
            <span className="highlight">OUMEYMA ELAAMMARI</span>
          </h1>

          <p className="tagline" ref={taglineRef}>
            <span className="tagline-prefix">{t('hero.prefix')}</span>
            <span className="typed-slot" ref={typedSlotRef}>
              <span ref={typedRef} className="typed-text"></span>
            </span>
          </p>

          <p className="availability">{t('hero.availability')}</p>

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
