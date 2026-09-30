import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { HiMenu, HiX } from 'react-icons/hi';
import logo from '../assets/img/logo_oumeyma.webp';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import '../styles/Header.css';

const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { to: 'hero', label: t('nav.home') },
    { to: 'about', label: t('nav.about') },
    { to: 'experience', label: t('nav.experience') },
    { to: 'portfolio', label: t('nav.projects') },
    { to: 'skills', label: t('nav.skills') },
    { to: 'certificates', label: t('nav.certificates') },
    { to: 'contact', label: t('nav.contact') }
  ];

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-profile">
            <img src={logo} alt="Oumeyma" className="header-profile-img" width="45" height="45" />
            <div className="header-info">
              <div className="header-name">OUMEYMA ELAAMMARI</div>
              <div className="header-tag">{t('header.tagline')}</div>
            </div>
          </div>

          <nav className="navmenu" aria-label={t('header.primary')}>
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

          <div className="header-social">
            <LanguageToggle />
            <ThemeToggle />
            <button
              className="mobile-nav-toggle"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? t('header.menuClose') : t('header.menuOpen')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="mobile-nav active"
          role="dialog"
          aria-modal="true"
          aria-label={t('header.mobile')}
        >
          <button className="mobile-nav-close" onClick={closeMobileMenu} aria-label={t('header.menuClose')}>
            <HiX />
          </button>
          <LanguageToggle className="lang-switch-mobile" />
          <ThemeToggle className="theme-toggle-mobile" showLabel />
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
      )}
    </>
  );
};

export default Header;
