import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { Link } from 'react-scroll';
import cv from '../assets/cv/cv_oumeyma_elaammari.pdf';
import '../styles/Hero.css';

const Hero = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'Software Engineering Student',
        'Full-Stack Developer',
        'AI Enthusiast',
        'PFE Intern Candidate'
      ],
      typeSpeed: 90,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      startDelay: 500,
      cursorChar: '|',
      smartBackspace: true,
      showCursor: true
    });

    return () => typed.destroy();
  }, []);

  return (
    <section id="hero" className="hero section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        
        <p className="greeting"> Welcome to my portfolio ! </p>

        <h1>
          Hello ! My name is <span className="highlight">OUMEYMA ELAAMMARI</span>
        </h1>
        
        <p className="tagline">
          I'm 
          <span ref={typedRef} className="typed-text"></span>
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
          <a 
            href={cv} 
            className="btn btn-outline"
          >
          
            My Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;