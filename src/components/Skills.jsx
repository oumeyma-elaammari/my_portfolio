import React from 'react';
import '../styles/Skills.css';

const skillsData = [
  { name: 'HTML', icon: 'bi-filetype-html' },
  { name: 'CSS', icon: 'bi-filetype-css' },
  { name: 'Java', icon: 'bi-filetype-java' },
  { name: 'JavaScript', icon: 'bi-filetype-js' },
  { name: 'PHP', icon: 'bi-filetype-php' },
  { name: 'Python', icon: 'bi-filetype-py' },
  { name: 'C#', icon: 'bi-filetype-cs' },
  { name: 'React.js', icon: 'bi-braces' },
  { name: 'Angular', icon: 'bi-braces-asterisk' },
  { name: 'Spring Boot', icon: 'bi-flower1' },
  { name: 'Symfony', icon: 'bi-code-square' },
  { name: 'SQL', icon: 'bi-database' },
  { name: 'MySQL', icon: 'bi-database-fill' },
  { name: 'Git', icon: 'bi-git' },
  { name: 'GitHub', icon: 'bi-github' },
  { name: 'Docker', icon: 'bi-box' },
  { name: 'Linux', icon: 'bi-ubuntu' },
  { name: 'Machine Learning', icon: 'bi-robot' },
  { name: 'Pandas', icon: 'bi-filetype-py' },
  { name: 'OpenCV', icon: 'bi-camera' },
];

const Skills = () => {
  // Duplicate skills for seamless loop
  const allSkills = [...skillsData, ...skillsData];

  return (
    <section id="skills" className="skills section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Technical Skills</h2>
        <p>My technical expertise across programming languages, frameworks, and development tools</p>
      </div>

      <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
        <div className="skills-carousel">
          <div className="skills-track">
            {allSkills.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-icon">
                  <i className={`bi ${skill.icon}`}></i>
                </div>
                <h4>{skill.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;