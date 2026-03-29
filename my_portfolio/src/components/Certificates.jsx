import React from 'react';
import '../styles/Certificates.css';

const certificatesData = [
  {
    id: 1,
    title: 'Scrum Master Certification',
    issuer: 'Udemy',
    skills: ['Scrum'],
    link: 'https://www.linkedin.com/in/oumeyma-elaammari/details/certifications/1772878347055/single-media-viewer/?profileId=ACoAADyHg6YBMRJze5WQIAe64swjckT2I5sZoc0'
  },
  {
    id: 2,
    title: 'Overview of JUnit Testing',
    issuer: 'Coursera',
    skills: ['JUnit', 'Testing'],
    link: 'https://coursera.org/share/efdbf94612d314b0fd23f33ee80300dd'
  },
  {
    id: 3,
    title: 'Foundational C# with Microsoft',
    issuer: 'freeCodeCamp',
    skills: ['C#', '.NET'],
    link: 'https://freecodecamp.org/certification/oumeymaelaammari/foundational-c-sharp-with-microsoft'
  },
  {
    id: 4,
    title: 'Python for Data Science, AI & Development',
    issuer: 'Coursera',
    skills: ['Python', 'Data Science', 'AI'],
    link: 'https://coursera.org/share/53d2d35a3044ad29269731c954f452d1'
  },
  {
    id: 5,
    title: 'Java Intermediate',
    issuer: 'SoloLearn',
    skills: ['Java', 'OOP'],
    link: 'https://www.sololearn.com/certificates/CC-QAXT5IAN'
  },
  {
    id: 6,
    title: 'Introduction to Java',
    issuer: 'SoloLearn',
    skills: ['Java', 'Programming Fundamentals'],
    link: 'https://www.sololearn.com/certificates/CC-QNLQHX6X'
  },
  {
    id: 7,
    title: 'Version Control',
    issuer: 'Meta',
    skills: ['Git', 'GitHub'],
    link: 'https://coursera.org/share/e2ee333a5b585c2a80708ec4ea4441f0'
  }
];

const Certificates = () => {
  return (
    <section id="certificates" className="certificates section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Certificates</h2>
        <p>Professional certifications and training courses I've completed to enhance my technical skills</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {certificatesData.map((cert) => (
            <div key={cert.id} className="col-lg-4 col-md-6">
              <div className="certificate-item">
                <h4>{cert.title}</h4>
                <p><em>{cert.issuer}</em></p>
                <div className="certificate-skills">
                  {cert.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <a href={cert.link} className="btn-certificate" target="_blank" rel="noopener noreferrer">
                  View Certificate <i className="bi bi-box-arrow-up-right"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;