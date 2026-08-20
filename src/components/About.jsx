import React from 'react';
import logo from '../assets/img/logo_oumeyma.webp';
import '../styles/About.css';

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container section-title" data-aos="fade-up">
        <h2>About Me</h2>
        <p>Passionate Software Engineering student specializing in full-stack development and Artificial Intelligence. I build intelligent systems and web applications that solve real-world problems — from full-stack platforms to machine learning experiments — and I'm constantly expanding my skill set through hands-on projects.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 justify-content-center align-items-center">
          <div className="col-lg-4 text-center">
            <img
              src={logo}
              className="img-fluid shadow-lg about-img"
              alt="Oumeyma ELAAMMARI"
              width="800"
              height="800"
              loading="lazy"
            />
          </div>
          <div className="col-lg-8 content">
            <h3>Software Engineering Student & AI Enthusiast</h3>
            <p className="fst-italic py-3">
              Currently pursuing my engineering degree at ENSAO with a focus on software development and AI, and actively seeking a PFE internship where I can contribute to meaningful projects, collaborate with experienced teams, and grow as a developer.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-chevron-right text-primary me-2"></i> 
                    <strong>Name:</strong> <span>Oumeyma ELAAMMARI</span>
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-chevron-right text-primary me-2"></i> 
                    <strong>Location:</strong> <span>Morocco</span>
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
                    <strong>Degree:</strong> <span>Software Engineering Student</span>
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-chevron-right text-primary me-2"></i> 
                    <strong>Interests:</strong> <span>AI, Web Development & DevOps</span>
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-chevron-right text-primary me-2"></i> 
                    <strong>Availability:</strong> <span>Open to PFE Internship Opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="py-2">
              As a passionate software engineering student, I've worked on various projects that combine my love for coding with practical problem-solving. From developing full-stack web applications to exploring machine learning algorithms, I'm constantly pushing myself to learn and implement new technologies.
            </p>
            <p>
              Currently seeking a PFA internship opportunity where I can contribute my skills in software development and AI to meaningful projects. I'm particularly interested in roles that allow me to work on innovative solutions, collaborate with experienced professionals, and grow as a developer. 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;