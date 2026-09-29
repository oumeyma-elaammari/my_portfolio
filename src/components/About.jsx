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
    title: 'Baccalaureate in Physical Sciences',
    period: '2021 - 2022',
    place: 'Lycée Ibn Sina Oujda',
    note: 'High Honors (Mention Très Bien)'
  }
];

const softSkills = [
  'Autonomy & responsibility',
  'Teamwork',
  'Adaptability',
  'Motivation & commitment',
  'Rigor & organization'
];

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container section-title" data-aos="fade-up">
        <h2>About Me</h2>
        <p>A quick look at who I am, my background and what I'm looking for.</p>
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
          </div>
        </div>

        <div className="row gy-4 about-details" data-aos="fade-up" data-aos-delay="150">
          <div className="col-lg-7">
            <h3 className="about-subtitle">
              <i className="bi bi-chevron-right text-primary me-2" aria-hidden="true"></i>
              Education
            </h3>
            <div className="about-education">
              {educationData.map((item) => (
                <div key={item.title} className="about-timeline-item">
                  <h4>{item.title}</h4>
                  <span className="about-period">{item.period}</span>
                  <p><em>{item.place}</em></p>
                  {item.note && <p>{item.note}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-5 about-facts">
            <div className="about-fact">
              <h3 className="about-subtitle about-subtitle-sm">
                <i className="bi bi-chevron-right text-primary me-2" aria-hidden="true"></i>
                Location
              </h3>
              <p>Oujda / Marrakech – open to relocation anywhere in Morocco</p>
            </div>
            <div className="about-fact">
              <h3 className="about-subtitle about-subtitle-sm">
                <i className="bi bi-chevron-right text-primary me-2" aria-hidden="true"></i>
                Email
              </h3>
              <p>
                <a href="mailto:elaammarioumeima@gmail.com">elaammarioumeima@gmail.com</a>
              </p>
            </div>
            <div className="about-fact">
              <h3 className="about-subtitle about-subtitle-sm">
                <i className="bi bi-chevron-right text-primary me-2" aria-hidden="true"></i>
                Languages
              </h3>
              <p>Arabic (native), French &amp; English (fluent)</p>
            </div>
            <div className="about-fact">
              <h3 className="about-subtitle about-subtitle-sm">
                <i className="bi bi-chevron-right text-primary me-2" aria-hidden="true"></i>
                Soft Skills
              </h3>
              <div className="about-badges">
                {softSkills.map((skill) => (
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
