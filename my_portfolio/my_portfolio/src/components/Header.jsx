import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import logo from '../assets/img/logo_oumeyma.png';
import '../styles/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { to: 'hero', label: 'Home' },
    { to: 'about', label: 'About' },
    { to: 'resume', label: 'Resume' },
    { to: 'portfolio', label: 'Projects' },
    { to: 'services', label: 'Services' },
    { to: 'contact', label: 'Contact' }
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo and Name */}
        <div className="header-brand">
          <img src={logo} alt="Oumeyma" className="header-logo" />
          <div className="header-info">
            <h1 className="header-name">Oumeyma ELAAMMARI</h1>
            <p className="header-title">Software Engineering Student • AI Enthusiast</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="navmenu">
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  onClick={closeMobileMenu}
                  activeClass="active"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        <div className="header-social">
          <a href="https://github.com/oumeyma-elaammari" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/oumeyma-el-aammari-886115244/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="mailto:elaammarioumeima@gmail.com">
            <FaEnvelope />
          </a>
          <button className="mobile-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={closeMobileMenu}
                activeClass="active"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;