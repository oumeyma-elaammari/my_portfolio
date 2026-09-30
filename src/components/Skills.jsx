import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import skillsData from '../data/skillsData';
import '../styles/Skills.css';

const filterKeys = [
  'all',
  'languages',
  'frameworks',
  'databases',
  'design-modeling',
  'devops',
  'ml-data'
];

const SkillCard = ({ skill }) => {
  const BrandIcon = skill.Icon;

  return (
    <div className="skill-card" tabIndex={0}>
      <div className="skill-icon">
        {skill.iconType === 'component' ? (
          <BrandIcon className="skill-brand-icon" aria-hidden="true" />
        ) : skill.iconType === 'devicon' ? (
          <i className={skill.icon} aria-hidden="true"></i>
        ) : (
          <i className={`bi ${skill.icon}`} aria-hidden="true"></i>
        )}
      </div>
      <h4>{skill.name}</h4>
    </div>
  );
};

const Skills = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [filteredSkills, setFilteredSkills] = useState(skillsData);
  const [isAnimating, setIsAnimating] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

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
  const showCarousel = isAllSelected && !reduceMotion;

  return (
    <section id="skills" className="skills section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('skills.title')}</h2>
        <p>{t('skills.intro')}</p>
      </div>

      <div className="container">
        <div
          className="portfolio-filters"
          role="group"
          aria-label={t('skills.filterLabel')}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {filterKeys.map((key) => (
            <button
              key={key}
              type="button"
              className={filter === key ? 'filter-active' : ''}
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {t(`skills.filters.${key}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="skills-panel" data-aos="fade-up" data-aos-delay="100">
        {showCarousel ? (
          <div className="container-fluid">
            <div className={`skills-carousel ${isAnimating ? 'animating' : ''}`}>
              <div className="skills-track">
                {[...filteredSkills, ...filteredSkills].map((skill, index) => (
                  <SkillCard
                    key={`${index < filteredSkills.length ? 'a' : 'b'}-${skill.name}`}
                    skill={skill}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className={`skills-grid ${isAnimating ? 'animating' : ''}`}>
              {filteredSkills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
