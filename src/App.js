import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollTopBottom, setScrollTopBottom] = useState(72);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100
    });

    const updateScrollTop = () => {
      setShowScrollTop(window.scrollY > 300);
      const footer = document.querySelector('.footer');
      const base = window.innerWidth <= 768 ? 84 : 72;
      if (!footer) {
        setScrollTopBottom(base);
        return;
      }
      const overlap = window.innerHeight - footer.getBoundingClientRect().top;
      setScrollTopBottom(overlap > 0 ? Math.ceil(overlap + 24) : base);
    };

    updateScrollTop();
    window.addEventListener('scroll', updateScrollTop, { passive: true });
    window.addEventListener('resize', updateScrollTop);
    return () => {
      window.removeEventListener('scroll', updateScrollTop);
      window.removeEventListener('resize', updateScrollTop);
    };
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
        {t('app.skip')}
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
        aria-label={t('app.scrollTop')}
        style={{ '--scroll-top-bottom': `${scrollTopBottom}px` }}
      >
        <i className="bi bi-arrow-up-short"></i>
      </button>

      <div id="preloader" aria-hidden="true"></div>
    </div>
  );
}

export default App;
