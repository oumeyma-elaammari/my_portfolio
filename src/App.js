import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
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
      <Header />
      <main className="main">
        <Hero />
        <About />
        <Resume />
        <Skills />
        <Certificates />
        <Portfolio />
        <Services />
        <Contact />
        <Quote />
      </main>
      <Footer />
      
      <div 
        className={`scroll-top ${showScrollTop ? 'active' : ''}`} 
        onClick={scrollToTop}
      >
        <i className="bi bi-arrow-up-short"></i>
      </div>
      
      <div id="preloader"></div>
    </div>
  );
}

export default App;