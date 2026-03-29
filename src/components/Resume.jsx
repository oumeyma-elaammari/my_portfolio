import React from 'react';
import '../styles/Resume.css';

const Resume = () => {
  return (
    <section id="resume" className="resume section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Resume</h2>
        <p>
          <em >
            Software Engineering student at ENSAO, specializing in full-stack development and artificial intelligence. 
            Passionate about building scalable and intelligent applications using modern technologies. 
            Highly motivated, team-oriented, and actively seeking a PFA internship to apply and expand my technical skills in real-world projects.
          </em>
        </p>
      </div>

      <div className="container">
        <div className="row">
          {/* Left Column */}
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h3 className="resume-title">Education</h3>
            <div className="resume-item">
              <h4>Engineering Cycle - Software Engineering</h4>
              <h5>2024 - 2027</h5>
              <p><em>ENSA Oujda, Morocco</em></p>
            </div>

            <div className="resume-item">
              <h4>Preparatory Cycle - Engineering Sciences</h4>
              <h5>2022 - 2024</h5>
              <p><em>ENSA Oujda, Morocco</em></p>
            </div>

            <div className="resume-item">
              <h4>Baccalaureate in Physical Sciences</h4>
              <h5>2021 - 2022</h5>
              <p><em>Lycée Ibn Sina Oujda, Morocco</em></p>
              <p>Graduated with High Honors (Mention Très Bien)</p>
            </div>
         <h3 className="resume-title">Professional Experience</h3>
            <div className="resume-item">
              <h4>Full-Stack Development Intern</h4>
              <h5>July 2025</h5>
              <p><em>Cleverix, Morocco</em></p>
              <ul>
                <li>Developed a full-stack e-commerce application using React and Laravel</li>
                <li>Designed and implemented an admin dashboard for user, product, and order management</li>
                <li>Implemented secure authentication and role-based access control</li>
              </ul>
            </div>

          </div>

          {/* Right Column */}
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
   

<h3 className="resume-title">Extracurricular Activities</h3>

<div className="resume-item">
  <h4>Club Altruisme - ENSAO</h4>
  <h5>2022 - 2025</h5>
  <p><em>Head of Al-Masjid Cell (2024 - 2025)</em></p>
  <p><em>Vice President (2023 - 2024)</em></p>
  <p><em>Active Member - Design & Editing Cell (2022 - 2025)</em></p>
</div>

<div className="resume-item">
  <h4>Club Génie Informatique - ENSAO</h4>
  <h5>2024 - 2025</h5>
  <p><em>Active Member - Design Cell</em></p>
  <p><em>Participation in the organization of Computer Science Day (4th edition)</em></p>
</div>

<div className="resume-item">
  <h4>Maison des Sciences de l'Oriental</h4>
  <h5>2024 - 2025</h5>
  <p><em>Participation in the Science Festival (12th edition)</em></p>
</div>
            <h3 className="resume-title">Languages</h3>
            <div className="resume-item">
              <ul>
                <li><strong>Arabic:</strong> Native</li>
                <li><strong>French:</strong> Fluent</li>
                <li><strong>English:</strong> Fluent</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;