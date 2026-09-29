import React from 'react';
import certificatesData from '../data/certificatesData';
import '../styles/Certificates.css';

const issuerInitial = (issuer) => issuer.trim().charAt(0).toUpperCase();

const Certificates = () => {
  return (
    <section id="certificates" className="certificates section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Certificates</h2>
        <p>Professional certifications and training courses I've completed to enhance my technical skills</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="certificates-grid">
          {certificatesData.map((cert) => (
            <article key={cert.id} className="certificate-item">
              <div className="certificate-issuer-mark" aria-hidden="true">
                {issuerInitial(cert.issuer)}
              </div>
              <div className="certificate-body">
                <h4>{cert.title}</h4>
                <p><em>{cert.issuer}</em></p>
                <div className="certificate-skills">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <a href={cert.link} className="btn-certificate" target="_blank" rel="noopener noreferrer">
                  View Certificate <i className="bi bi-box-arrow-up-right"></i>
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
