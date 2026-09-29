import React from 'react';
import logo from '../assets/img/logo_oumeyma.webp';
import '../styles/About.css';

const educationData = [
  {
    title: 'Engineering Cycle - Software Engineering and Artificial Intelligence',
    period: '2024 - 2027',
    place: 'ENSA Oujda (ENSAO)'
  },
  {
    title: 'Preparatory Cycle - Engineering Sciences',
    period: '2022 - 2024',
    place: 'ENSA Oujda (ENSAO)'
  },
  {
    compact: true,
    line: 'Baccalaureate in Physical Sciences · Lycée Ibn Sina Oujda · 2022 · Mention Très Bien'
  }
];

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container section-title" data-aos="fade-up">
        <h2>About Me</h2>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 justify-content-center align-items-center">
          <div className="col-lg-4 text-center">
            <div className="about-monogram-frame">
              <img
                src={logo}
                alt="EO monogram"
                className="about-monogram"
                width="220"
                height="220"
              />
            </div>
          </div>
          <div className="col-lg-8 content">
            <h3>Full-Stack &amp; AI Engineering Student</h3>
            <p className="about-bio py-3">
              I'm a final-year engineering student at ENSAO, specializing in Software Engineering
              and Artificial Intelligence. I'm curious by nature and enjoy understanding how things
              work, then building software that is clean, useful and easy to use. Beyond code,
              my years in student clubs taught me to organize, lead and work well in a team.
              I'm now looking for a PFE internship where I can grow alongside experienced engineers.
            </p>
            <ul className="about-facts list-unstyled">
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-2"></i>
                <strong>Location:</strong>{' '}
                <span>Oujda / Marrakech – open to relocation anywhere in Morocco</span>
              </li>
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-2"></i>
                <strong>Email:</strong> <span>elaammarioumeima@gmail.com</span>
              </li>
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-2"></i>
                <strong>Languages:</strong>{' '}
                <span>Arabic (native), French &amp; English (fluent)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="about-details" data-aos="fade-up" data-aos-delay="150">
          <h3 className="about-subtitle">Education</h3>
          <div className="about-education">
            {educationData.map((item) =>
              item.compact ? (
                <div key={item.line} className="about-timeline-item about-timeline-compact">
                  <p className="about-compact-line">{item.line}</p>
                </div>
              ) : (
                <div key={item.title} className="about-timeline-item">
                  <h4>{item.title}</h4>
                  <span className="about-period">{item.period}</span>
                  <p><em>{item.place}</em></p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
