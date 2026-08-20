import React, { useState, useEffect } from 'react';
import '../styles/Skills.css';

const skillsData = [
  { name: 'HTML', icon: 'bi-filetype-html', category: 'languages' },
  { name: 'CSS', icon: 'bi-filetype-css', category: 'languages' },
  { name: 'JavaScript', icon: 'bi-filetype-js', category: 'languages' },
  { name: 'Java', icon: 'bi-filetype-java', category: 'languages' },
  { name: 'PHP', icon: 'bi-filetype-php', category: 'languages' },
  { name: 'Python', icon: 'bi-filetype-py', category: 'languages' },
  { name: 'C#', icon: 'bi-filetype-cs', category: 'languages' },
  { name: 'SQL', icon: 'bi-database', category: 'languages' },
  { name: 'React.js', icon: 'bi-braces', category: 'frameworks' },
  { name: 'Angular', icon: 'bi-braces-asterisk', category: 'frameworks' },
  { name: 'Spring Boot', icon: 'bi-flower1', category: 'frameworks' },
  { name: 'Symfony', icon: 'bi-code-square', category: 'frameworks' },
  { name: 'Machine Learning', icon: 'bi-robot', category: 'data-ai' },
  { name: 'Pandas', icon: 'bi-table', category: 'data-ai' },
  { name: 'OpenCV', icon: 'bi-camera', category: 'data-ai' },
  { name: 'Git', icon: 'bi-git', category: 'tools-devops' },
  { name: 'GitHub', icon: 'bi-github', category: 'tools-devops' },
  { name: 'MySQL', icon: 'bi-database-fill', category: 'tools-devops' },
  { name: 'Docker', icon: 'bi-box', category: 'tools-devops' },
  { name: 'Linux', icon: 'bi-ubuntu', category: 'tools-devops' },
];

const filters = [
  { key: 'all', label: 'All' },
  { key: 'languages', label: 'Languages' },
  { key: 'frameworks', label: 'Frameworks' },
  { key: 'data-ai', label: 'Data & AI' },
  { key: 'tools-devops', label: 'Tools & DevOps' }
];

const Skills = () => {
  const [filter, setFilter] = useState('all');
  const [filteredSkills, setFilteredSkills] = useState(skillsData);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);

    const timer = setTimeout(() => {
      if (filter === 'all') {
        setFilteredSkills(skillsData);
      } else {
        setFilteredSkills(skillsData.filter(skill => skill.category === filter));
      }
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filter]);

  const loopedSkills = [...filteredSkills, ...filteredSkills];

  return (
    <section id="skills" className="skills section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Technical Skills</h2>
        <p>My technical expertise across programming languages, frameworks, and development tools</p>
      </div>

      <div className="container">
        <ul className="portfolio-filters" data-aos="fade-up" data-aos-delay="100">
          {filters.map((f) => (
            <li
              key={f.key}
              className={filter === f.key ? 'filter-active' : ''}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
        <div className={`skills-carousel ${isAnimating ? 'animating' : ''}`}>
          <div className="skills-track" key={filter}>
            {loopedSkills.map((skill, index) => (
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
