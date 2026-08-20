import React, { useState, useEffect } from 'react';
import '../styles/Skills.css';

const skillsData = [
  // Languages
  { name: 'HTML', icon: 'bi-filetype-html', category: 'languages' },
  { name: 'CSS', icon: 'bi-filetype-css', category: 'languages' },
  { name: 'JavaScript', icon: 'bi-filetype-js', category: 'languages' },
  { name: 'PHP', icon: 'bi-filetype-php', category: 'languages' },
  { name: 'C#', icon: 'bi-filetype-cs', category: 'languages' },
  { name: 'Python', icon: 'bi-filetype-py', category: 'languages' },
  { name: 'Java', icon: 'bi-filetype-java', category: 'languages' },

  // Frameworks & Libraries
  { name: 'React.js', icon: 'bi-braces', category: 'frameworks' },
  { name: 'Spring Boot', icon: 'bi-flower1', category: 'frameworks' },
  { name: 'Jakarta EE', icon: 'bi-cup-hot', category: 'frameworks' },
  { name: 'Symfony', icon: 'bi-code-square', category: 'frameworks' },
  { name: '.NET', icon: 'bi-window', category: 'frameworks' },
  { name: 'Laravel', icon: 'bi-hexagon', category: 'frameworks' },
  { name: 'JavaFX', icon: 'bi-window-stack', category: 'frameworks' },
  { name: 'Tkinter', icon: 'bi-app', category: 'frameworks' },

  // Databases
  { name: 'SQL', icon: 'bi-database', category: 'databases' },
  { name: 'MySQL', icon: 'bi-database-fill', category: 'databases' },
  { name: 'PL/SQL', icon: 'bi-database-gear', category: 'databases' },

  // Design & Modeling
  { name: 'UML', icon: 'bi-diagram-3', category: 'design-modeling' },
  { name: 'Merise', icon: 'bi-diagram-2', category: 'design-modeling' },

  // Project Management & DevOps
  { name: 'Git', icon: 'bi-git', category: 'devops' },
  { name: 'GitHub', icon: 'bi-github', category: 'devops' },
  { name: 'Docker', icon: 'bi-box', category: 'devops' },
  { name: 'Jenkins', icon: 'bi-gear-wide-connected', category: 'devops' },
  { name: 'Maven', icon: 'bi-box-seam', category: 'devops' },
  { name: 'Linux', icon: 'bi-ubuntu', category: 'devops' },
  { name: 'SonarQube', icon: 'bi-shield-check', category: 'devops' },
  { name: 'Jira', icon: 'bi-kanban', category: 'devops' },
  { name: 'Scrum', icon: 'bi-arrow-repeat', category: 'devops' },
  { name: 'Kanban', icon: 'bi-columns', category: 'devops' },
  { name: 'Firebase', icon: 'bi-fire', category: 'devops' },
  { name: 'Power Automate', icon: 'bi-lightning-charge', category: 'devops' },
  { name: 'SharePoint', icon: 'bi-share', category: 'devops' },

  // Machine Learning & Data
  { name: 'Machine Learning', icon: 'bi-robot', category: 'ml-data' },
  { name: 'Pandas', icon: 'bi-table', category: 'ml-data' },
  { name: 'NumPy', icon: 'bi-grid-3x3', category: 'ml-data' },
  { name: 'Matplotlib', icon: 'bi-bar-chart-line', category: 'ml-data' },
  { name: 'OpenCV', icon: 'bi-camera', category: 'ml-data' },
  { name: 'scikit-learn', icon: 'bi-cpu', category: 'ml-data' },
];

const filters = [
  { key: 'all', label: 'All' },
  { key: 'languages', label: 'Languages' },
  { key: 'frameworks', label: 'Frameworks & Libraries' },
  { key: 'databases', label: 'Databases' },
  { key: 'design-modeling', label: 'Design & Modeling' },
  { key: 'devops', label: 'Project Management & DevOps' },
  { key: 'ml-data', label: 'Machine Learning & Data' }
];

const SkillCard = ({ skill }) => (
  <div className="skill-card">
    <div className="skill-icon">
      <i className={`bi ${skill.icon}`}></i>
    </div>
    <h4>{skill.name}</h4>
  </div>
);

const Skills = () => {
  const [filter, setFilter] = useState('all');
  const [filteredSkills, setFilteredSkills] = useState(skillsData);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);

    const timer = setTimeout(() => {
      setFilteredSkills(
        filter === 'all' ? skillsData : skillsData.filter(skill => skill.category === filter)
      );
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filter]);

  const isAllSelected = filter === 'all';

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

      {isAllSelected ? (
        <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
          <div className={`skills-carousel ${isAnimating ? 'animating' : ''}`}>
            <div className="skills-track">
              {[...filteredSkills, ...filteredSkills].map((skill, index) => (
                <SkillCard key={index} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className={`skills-grid ${isAnimating ? 'animating' : ''}`}>
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;
