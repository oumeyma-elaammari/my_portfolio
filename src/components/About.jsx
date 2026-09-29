import React from 'react';
import '../styles/About.css';

const educationData = [
  {
    title: 'Engineering Cycle - Software Engineering and Artificial Intelligence',
    period: '2024 - 2027',
    place: 'ENSA Oujda, Morocco'
  },
  {
    title: 'Preparatory Cycle - Engineering Sciences',
    period: '2022 - 2024',
    place: 'ENSA Oujda, Morocco'
  },
  {
    title: 'Baccalaureate in Physical Sciences',
    period: '2021 - 2022',
    place: 'Lycée Ibn Sina Oujda, Morocco',
    note: 'Graduated with High Honors (Mention Très Bien)'
  }
];

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container section-title" data-aos="fade-up">
        <h2>About Me</h2>
        <p>
          Software Engineering student at ENSAO, specializing in full-stack development and Artificial Intelligence.
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 justify-content-center align-items-center">
          <div className="col-lg-4 text-center">
            <div className="about-photo-frame">
              {/* Replace with a real portrait image when available. */}
              <div
                className="about-photo-placeholder"
                role="img"
                aria-label="Profile photo placeholder for Oumeyma ELAAMMARI"
              >
                <span>Photo</span>
                <small>Coming soon</small>
              </div>
            </div>
          </div>
          <div className="col-lg-8 content">
            <h3>Software Engineering Student &amp; AI Enthusiast</h3>
            <p className="fst-italic py-3">
              I build web applications and AI-oriented systems through academic projects and internships — from full-stack platforms to machine learning experiments. Looking for a PFE internship where I can contribute to real products, collaborate with experienced teams, and grow as a developer.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-chevron-right text-primary me-2"></i>
                    <strong>Location:</strong>{' '}
                    <span>Oujda / Marrakech – open to relocation anywhere in Morocco</span>
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-chevron-right text-primary me-2"></i>
                    <strong>Email:</strong> <span>elaammarioumeima@gmail.com</span>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-chevron-right text-primary me-2"></i>
                    <strong>Degree:</strong>{' '}
                    <span>Engineering Degree – Software Engineering &amp; AI, ENSAO (2027)</span>
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-chevron-right text-primary me-2"></i>
                    <strong>Availability:</strong>{' '}
                    <span>Available for a PFE internship from January 2027</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row gy-4 about-details" data-aos="fade-up" data-aos-delay="150">
          <div className="col-lg-7">
            <h3 className="about-subtitle">Education</h3>
            {educationData.map((item) => (
              <div key={item.title} className="about-timeline-item">
                <h4>{item.title}</h4>
                <span className="about-period">{item.period}</span>
                <p><em>{item.place}</em></p>
                {item.note && <p>{item.note}</p>}
              </div>
            ))}
          </div>
          <div className="col-lg-5">
            <h3 className="about-subtitle">Languages</h3>
            <ul className="about-languages list-unstyled">
              <li><strong>Arabic:</strong> Native</li>
              <li><strong>French:</strong> Fluent</li>
              <li><strong>English:</strong> Fluent</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
