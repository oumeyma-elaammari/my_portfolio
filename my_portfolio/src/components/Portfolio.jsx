import React, { useState, useEffect } from 'react';
import '../styles/Portfolio.css';

const projectsData = [
  {
    id: 1,
    title: 'RoadmapDev',
    category: 'web',
    techStack: 'Symfony • PHP • MySQL',
    description: 'E-learning platform for progressive learning modules with student progress tracking.',
    image: 'ROADMAPDEV.png',
    github: 'https://github.com/oumeyma-elaammari/roadmapdev',
    demo: '#'
  },
  {
    id: 2,
    title: 'RhVerse',
    category: 'mobile',
    techStack: 'Java • Firebase • Android',
    description: 'HR management app for attendance, leave requests, meetings and certificates.',
    image: 'RhVerse_Logo.png',
    github: 'https://github.com/LamyaeHamdaoui/AppRH_Android',
    demo: 'https://drive.google.com/drive/folders/17vJvRvBq4b09NaqqP6iFsyCyZGLJRvB9?usp=drive_link'
  },
  {
    id: 3,
    title: 'ArchvoxLib',
    category: 'desktop',
    techStack: 'Python • Tkinter • Matplotlib',
    description: 'Library management system for books, members and borrowing with statistics.',
    image: 'ArchivoxLib_logo.png',
    github: 'https://github.com/oumeyma-elaammari/Gestion_Bibliotheque_ELAAMMARI_OUMEYMA',
    demo: 'https://github.com/oumeyma-elaammari/Gestion_Bibliotheque_ELAAMMARI_OUMEYMA/blob/main/docs/rapport.pdf'
  },
  {
    id: 4,
    title: 'MemoPharma',
    category: 'desktop',
    techStack: 'JavaFX • MySQL • SceneBuilder',
    description: 'Medical follow-up system for patient management and appointment tracking.',
    image: 'memopharma_logo.png',
    github: 'https://github.com/oumeyma-elaammari/memoPharma',
    demo: '#'
  },
  {
    id: 5,
    title: 'My-Store',
    category: 'web',
    techStack: 'React.js • Laravel • MySQL',
    description: 'Full-stack e-commerce platform with admin dashboard and role-based authentication.',
    image: 'my_store_logo.png',
    github: 'https://github.com/oumeyma-elaammari/my-store',
    demo: '#'
  }
];

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(project => project.category === filter));
    }
  }, [filter]);

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Development' },
    { key: 'mobile', label: 'Mobile Apps' },
    { key: 'desktop', label: 'Desktop Apps' }
  ];

  return (
    <section id="portfolio" className="portfolio section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Portfolio</h2>
        <p>Here are some of my academic projects showcasing my skills in web development, mobile applications, and software engineering.</p>
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

        <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
          {filteredProjects.map((project) => (
            <div key={project.id} className="col-lg-4 col-md-6 portfolio-item">
              <div className="portfolio-content">
                <img 
                  src={require(`../assets/img/${project.image}`)} 
                  className="img-fluid" 
                  alt={project.title}
                />
                <div className="portfolio-info">
                  <h4>{project.title}</h4>
                  <p className="tech-stack">{project.techStack}</p>
                  <p className="description">{project.description}</p>
                  <div className="portfolio-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-github"></i>
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-box-arrow-up-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;