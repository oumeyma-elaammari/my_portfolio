import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/img/logo_oumeyma.webp';
import '../styles/About.css';

const educationData = [
  {
    titleKey: 'about.education.engineering',
    period: '2024 - 2027',
    place: 'ENSA Oujda (ENSAO)'
  },
  {
    titleKey: 'about.education.preparatory',
    period: '2022 - 2024',
    place: 'ENSA Oujda (ENSAO)'
  },
  {
    titleKey: 'about.education.bac',
    period: '2021 - 2022',
    place: 'Lycée Ibn Sina Oujda',
    noteKey: 'about.education.honors'
  }
];

const About = () => {
  const { t } = useTranslation();
  const softSkills = t('about.soft', { returnObjects: true });

  return (
    <section id="about" className="about section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('about.title')}</h2>
        <p>{t('about.intro')}</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 justify-content-center align-items-center">
          <div className="col-lg-4 text-center">
            <div className="about-monogram-frame">
              <img
                src={logo}
                alt={t('about.monogramAlt')}
                className="about-monogram"
                width="220"
                height="220"
              />
            </div>
          </div>
          <div className="col-lg-8 content">
            <h3>{t('about.subtitle')}</h3>
            <p className="about-bio py-3">{t('about.bio')}</p>
          </div>
        </div>

        <div className="row gy-4 about-details" data-aos="fade-up" data-aos-delay="150">
          <div className="col-lg-7">
            <h3 className="about-subtitle">
              <i className="bi bi-chevron-right text-primary me-2" aria-hidden="true"></i>
              {t('about.educationTitle')}
            </h3>
            <div className="about-education">
              {educationData.map((item) => (
                <div key={item.titleKey} className="about-timeline-item">
                  <h4>{t(item.titleKey)}</h4>
                  <span className="about-period">{item.period}</span>
                  <p><em>{item.place}</em></p>
                  {item.noteKey && <p>{t(item.noteKey)}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-5 about-facts">
            <div className="about-fact">
              <h3 className="about-subtitle about-subtitle-sm">
                <i className="bi bi-chevron-right text-primary me-2" aria-hidden="true"></i>
                {t('about.locationTitle')}
              </h3>
              <p>{t('about.location')}</p>
            </div>
            <div className="about-fact">
              <h3 className="about-subtitle about-subtitle-sm">
                <i className="bi bi-chevron-right text-primary me-2" aria-hidden="true"></i>
                {t('about.emailTitle')}
              </h3>
              <p>
                <a href="mailto:elaammarioumeima@gmail.com">elaammarioumeima@gmail.com</a>
              </p>
            </div>
            <div className="about-fact">
              <h3 className="about-subtitle about-subtitle-sm">
                <i className="bi bi-chevron-right text-primary me-2" aria-hidden="true"></i>
                {t('about.languagesTitle')}
              </h3>
              <p>{t('about.languages')}</p>
            </div>
            <div className="about-fact">
              <h3 className="about-subtitle about-subtitle-sm">
                <i className="bi bi-chevron-right text-primary me-2" aria-hidden="true"></i>
                {t('about.softTitle')}
              </h3>
              <div className="about-badges">
                {(Array.isArray(softSkills) ? softSkills : []).map((skill) => (
                  <span key={skill} className="about-badge">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
