import React from 'react';
import { useTranslation } from 'react-i18next';
import certificatesData from '../data/certificatesData';
import '../styles/Certificates.css';

const Certificates = () => {
  const { t } = useTranslation();

  return (
    <section id="certificates" className="certificates section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('certificates.title')}</h2>
        <p>{t('certificates.intro')}</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="certificates-grid">
          {certificatesData.map((cert) => (
            <article key={cert.id} className="certificate-item">
              <div className="certificate-body">
                <h4>{cert.title}</h4>
                <p><em>{cert.issuer}</em></p>
                <div className="certificate-skills">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {t(`certificates.skillLabels.${skill}`, { defaultValue: skill })}
                    </span>
                  ))}
                </div>
                <a href={cert.link} className="btn-certificate" target="_blank" rel="noopener noreferrer">
                  {t('certificates.view')} <i className="bi bi-box-arrow-up-right"></i>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
