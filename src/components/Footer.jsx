import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
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
              <p className="footer-tagline">Software Engineering Student</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 text-center mb-3 mb-md-0">
            <div className="footer-social">
              <a href="https://github.com/oumeyma-elaammari" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/oumeyma-el-aammari-886115244/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="mailto:elaammarioumeima@gmail.com">
                <FaEnvelope />
              </a>
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