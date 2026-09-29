import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'devicon/devicon.min.css';
import './App.css';
import PageBackground from './components/PageBackground';
import Header from './components/Header';
import HomeStage from './components/HomeStage';
import About from './components/About';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Quote from './components/Quote';
import Footer from './components/Footer';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100
    });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="App">
      <PageBackground />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="main" tabIndex={-1}>
        <HomeStage />
        <About />
        <Experience />
        <Portfolio />
        <Skills />
        <Certificates />
        <Contact />
        <Quote />
      </main>
      <Footer />

      <button
        className={`scroll-top ${showScrollTop ? 'active' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <i className="bi bi-arrow-up-short"></i>
      </button>

      <div id="preloader" aria-hidden="true"></div>
    </div>
  );
}

export default App;
