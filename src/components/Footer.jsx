import React from 'react';
import { useTranslation } from 'react-i18next';
import SocialLinks from './SocialLinks';
import '../styles/Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer position-relative">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-6 text-center text-md-start mb-3 mb-md-0">
            <div className="footer-logo">
              <h3 className="footer-name">OUMEYMA <span>ELAAMMARI</span></h3>
              <p className="footer-tagline">{t('footer.tagline')}</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 text-center mb-3 mb-md-0">
            <div className="footer-social">
              <SocialLinks />
            </div>
          </div>

          <div className="col-lg-4 text-center text-lg-end">
            <div className="footer-copyright">
              <p>© {currentYear} {t('footer.rights')}</p>
              <p className="footer-heart">{t('footer.made')} <i className="bi bi-heart-fill"></i> {t('footer.by')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;