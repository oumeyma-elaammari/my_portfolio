import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';
import skillsData from '../data/skillsData';
import { internshipCount } from '../data/experienceData';
import '../styles/Stats.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const useCountUp = (target, active, duration = 800) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;

    if (prefersReducedMotion() || target === 0) {
      setValue(target);
      return undefined;
    }

    let frameId;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, target, duration]);

  return value;
};

const StatItem = ({ value, label, suffix = '', href, scrollTo, active }) => {
  const display = useCountUp(typeof value === 'number' ? value : 0, active && typeof value === 'number');
  const content = typeof value === 'number' ? `${display}${suffix}` : value;

  const inner = (
    <>
      <span className="stat-value">{content}</span>
      <span className="stat-label">{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        className="stat-item"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }

  if (scrollTo) {
    return (
      <Link
        className="stat-item"
        to={scrollTo}
        smooth={true}
        duration={500}
        offset={-70}
      >
        {inner}
      </Link>
    );
  }

  return <div className="stat-item">{inner}</div>;
};

const Stats = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="stats section" ref={sectionRef} aria-label="Key figures">
      <div className="container">
        <div className="stats-grid">
          <StatItem
            value={internshipCount}
            label="Internships"
            scrollTo="experience"
            active={active}
          />
          <StatItem
            value={10}
            suffix="+"
            label="Projects"
            href="https://github.com/oumeyma-elaammari?tab=repositories"
            active={active}
          />
          <StatItem
            value={skillsData.length}
            label="Technologies"
            scrollTo="skills"
            active={active}
          />
          <StatItem value="Jan 2027" label="Available" active={active} />
        </div>
      </div>
    </section>
  );
};

export default Stats;
