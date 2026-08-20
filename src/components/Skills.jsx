import React from 'react';
import '../styles/Skills.css';

const skillsGroups = [
  {
    title: 'Languages',
    skills: [
      { name: 'HTML', icon: 'bi-filetype-html' },
      { name: 'CSS', icon: 'bi-filetype-css' },
      { name: 'JavaScript', icon: 'bi-filetype-js' },
      { name: 'Java', icon: 'bi-filetype-java' },
      { name: 'PHP', icon: 'bi-filetype-php' },
      { name: 'Python', icon: 'bi-filetype-py' },
      { name: 'C#', icon: 'bi-filetype-cs' },
      { name: 'SQL', icon: 'bi-database' },
    ]
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'React.js', icon: 'bi-braces' },
      { name: 'Angular', icon: 'bi-braces-asterisk' },
      { name: 'Spring Boot', icon: 'bi-flower1' },
      { name: 'Symfony', icon: 'bi-code-square' },
    ]
  },
  {
    title: 'Data & AI',
    skills: [
      { name: 'Machine Learning', icon: 'bi-robot' },
      { name: 'Pandas', icon: 'bi-table' },
      { name: 'OpenCV', icon: 'bi-camera' },
    ]
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', icon: 'bi-git' },
      { name: 'GitHub', icon: 'bi-github' },
      { name: 'MySQL', icon: 'bi-database-fill' },
      { name: 'Docker', icon: 'bi-box' },
      { name: 'Linux', icon: 'bi-ubuntu' },
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="skills section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Technical Skills</h2>
        <p>My technical expertise across programming languages, frameworks, and development tools</p>
      </div>

      {skillsGroups.map((group) => {
        const groupSkills = [...group.skills, ...group.skills];
        return (
          <div key={group.title} className="skills-group">
            <div className="container">
              <h3 className="skills-group-title">{group.title}</h3>
            </div>
            <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
              <div className="skills-carousel">
                <div className="skills-track">
                  {groupSkills.map((skill, index) => (
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
          </div>
        );
      })}
    </section>
  );
};

export default Skills;
