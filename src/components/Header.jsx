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
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Profile Section */}
          <div className="header-profile">
            <img src={logo} alt="Oumeyma" className="header-profile-img" />
            <div className="header-info">
              <div className="header-name">OUMEYMA ELAAMMARI</div>
              <div className="header-tag">Software Engineering student • AI Enthusiast</div>
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
                    offset={-70}
                    duration={500}
                    activeClass="active"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links + Mobile Toggle */}
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
            <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu (separate) */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        {/* Close button inside mobile menu */}
        <button className="mobile-nav-close" onClick={toggleMobileMenu}>
          <HiX />
        </button>
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
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
    </>
  );
};

export default Header;