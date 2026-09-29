import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { Link } from 'react-scroll';
import cv from '../assets/cv/cv_oumeyma_elaammari.pdf';
import { HERO_TYPED_STRINGS } from '../data/heroTypedStrings';
import HomeBackground from './HomeBackground';
import Stats from './Stats';
import '../styles/Hero.css';

const Hero = () => {
  const typedRef = useRef(null);
  const typedSlotRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const slot = typedSlotRef.current;
    const tagline = taglineRef.current;
    if (!slot || !tagline) return undefined;

    const measure = document.createElement('span');
    measure.style.position = 'absolute';
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
      HERO_TYPED_STRINGS.forEach((value) => {
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
      strings: HERO_TYPED_STRINGS,
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
  }, []);

  return (
    <section id="hero" className="hero section">
      <HomeBackground />
      <div className="hero-stack">
        <div className="container hero-content" data-aos="fade-up" data-aos-delay="100">
          <p className="greeting">
            Welcome to my portfolio<span className="greeting-end">!</span>
          </p>

          <h1>
            Hello<span className="greeting-end">!</span> My name is{' '}
            <span className="highlight">OUMEYMA ELAAMMARI</span>
          </h1>

          <p className="tagline" ref={taglineRef}>
            <span className="tagline-prefix">I'm</span>
            <span className="typed-slot" ref={typedSlotRef}>
              <span ref={typedRef} className="typed-text"></span>
            </span>
          </p>

          <p className="availability">Available for a PFE internship from January 2027</p>

          <div className="hero-buttons">
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={-70}
              className="btn btn-primary"
            >
              Contact Me
            </Link>
            <a href={cv} className="btn btn-outline">
              My Resume
            </a>
          </div>
        </div>

        <Stats embedded />
      </div>
    </section>
  );
};

export default Hero;
