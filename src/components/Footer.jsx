import React from 'react';
import SocialLinks from './SocialLinks';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer position-relative">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-6 text-center text-md-start mb-3 mb-md-0">
            <div className="footer-logo">
              <h3 className="footer-name">OUMEYMA <span>ELAAMMARI</span></h3>
              <p className="footer-tagline">Full-Stack &amp; AI Engineering Student</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 text-center mb-3 mb-md-0">
            <div className="footer-social">
              <SocialLinks />
            </div>
          </div>

          <div className="col-lg-4 text-center text-lg-end">
            <div className="footer-copyright">
              <p>© {currentYear} All Rights Reserved</p>
              <p className="footer-heart">Made with <i className="bi bi-heart-fill"></i> by Oumeyma</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;