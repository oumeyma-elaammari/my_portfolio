import React from 'react';
import { useTranslation } from 'react-i18next';
import { experienceData, activitiesData } from '../data/experienceData';
import '../styles/Experience.css';

const Experience = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="experience section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('experience.title')}</h2>
        <p>{t('experience.intro')}</p>
      </div>

      <div className="container">
        <div className="experience-timeline" data-aos="fade-up" data-aos-delay="100">
          {experienceData.map((item) => (
            <article key={item.id} className="experience-item">
              <div className="experience-meta">
                <h3>{t(item.titleKey)}</h3>
                <span className="experience-period">{t(item.periodKey)}</span>
              </div>
              <p className="experience-company"><em>{item.company}</em></p>
              <div className="experience-tech">
                {item.technologies.map((tech) => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
              <ul>
                {item.bulletKeys.map((key) => (
                  <li key={key}>{t(key)}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="activities-block" data-aos="fade-up" data-aos-delay="150">
          <h3 className="activities-title">{t('experience.activitiesTitle')}</h3>
          <div className="row gy-4 activities-row">
            {activitiesData.map((activity) => (
              <div key={activity.id} className="col-lg-4 col-md-6 d-flex">
                <article className="activity-item">
                  <div className="activity-header">
                    <h4>{activity.title}</h4>
                    {activity.subtitle ? (
                      <p className="activity-subtitle">{activity.subtitle}</p>
                    ) : null}
                  </div>
                  <ul className="activity-list">
                    {activity.details.map((detail) => (
                      <li key={detail.roleKey} className="activity-row">
                        <span className="activity-role">{t(detail.roleKey)}</span>
                        {detail.date ? (
                          <span className="activity-date">{detail.date}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
