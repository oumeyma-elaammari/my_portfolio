import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { Link } from 'react-scroll';
import cv from '../assets/cv/cv_oumaima_elaammari.pdf';
import '../styles/Hero.css';

const Hero = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'a Software Engineering student',
        'passionate about AI',
        'looking for a PFA Internship opportunity'
      ],
      typeSpeed: 95,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      startDelay: 500
    });

    return () => typed.destroy();
  }, []);

  return (
    <section id="hero" className="hero section dark-background">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <p className="greeting">Hello !</p>
        <h1>I'm <span className="highlight">Oumeyma ELAAMMARI</span></h1>
        <p className="tagline">
          I'm 
          <span ref={typedRef}></span>
        </p>
        <div className="hero-buttons">
          <Link to="contact" smooth={true} duration={500} className="btn btn-primary">
            Contact Me
          </Link>
          <a href={cv} className="btn btn-outline" >
            My Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;