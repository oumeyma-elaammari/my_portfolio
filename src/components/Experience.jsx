import React from 'react';
import { experienceData, activitiesData } from '../data/experienceData';
import '../styles/Experience.css';

const Experience = () => {
  return (
    <section id="experience" className="experience section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Experience</h2>
        <p>
          Internships where I delivered full-stack features and business-process automation in real teams.
        </p>
      </div>

      <div className="container">
        <div className="experience-timeline" data-aos="fade-up" data-aos-delay="100">
          {experienceData.map((item) => (
            <article key={item.id} className="experience-item">
              <div className="experience-meta">
                <h3>{item.title}</h3>
                <span className="experience-period">{item.period}</span>
              </div>
              <p className="experience-company"><em>{item.company}</em></p>
              <div className="experience-tech">
                {item.technologies.map((tech) => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="activities-block" data-aos="fade-up" data-aos-delay="150">
          <h3 className="activities-title">Leadership &amp; Activities</h3>
          <div className="row gy-4">
            {activitiesData.map((activity) => (
              <div key={activity.id} className="col-lg-4 col-md-6">
                <div className="activity-item">
                  <h4>{activity.title}</h4>
                  <ul>
                    {activity.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
