import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import '../styles/Portfolio.css';

const projectsData = [
  {
    id: 6,
    title: 'SmarTest',
    category: ['web', 'desktop'],
    techStack: '.NET • React.js • Spring Boot • MySQL • Groq API',
    description: 'Secure, intelligent quiz and exam management platform with real-time communication, JWT authentication, and AI-powered question generation via the Groq API.',
    image: 'SmarTest-AppIcon.webp',
    imgWidth: 512,
    imgHeight: 512,
    github: 'https://github.com/oumeyma-elaammari/smarTest',
    demo: null,
    demoType: null
  },
  {
    id: 5,
    title: 'My-Store',
    category: ['web'],
    techStack: 'React.js • Laravel • MySQL',
    description: 'Full-stack e-commerce platform with admin dashboard and role-based authentication — Cleverix internship.',
    image: 'my_store_logo.webp',
    imgWidth: 886,
    imgHeight: 435,
    github: 'https://github.com/oumeyma-elaammari/my-store',
    demo: '/videos/mystore.mp4',
    demoType: 'video',
    experienceRef: true
  },
  {
    id: 1,
    title: 'RoadmapDev',
    category: ['web'],
    techStack: 'Symfony • PHP • MySQL',
    description: 'E-learning platform for progressive learning modules with student progress tracking.',
    image: 'ROADMAPDEV.webp',
    imgWidth: 1263,
    imgHeight: 608,
    github: 'https://github.com/oumeyma-elaammari/roadmapdev',
    demo: '/videos/roadmapdev.mp4',
    demoType: 'video'
  },
  {
    id: 2,
    title: 'RhVerse',
    category: ['mobile'],
    techStack: 'Java • Firebase • Android',
    description: 'Team project – role: Full-Stack Developer. HR management app for attendance, leave requests, meetings and certificates.',
    image: 'RhVerse_Logo.webp',
    imgWidth: 420,
    imgHeight: 231,
    github: 'https://github.com/LamyaeHamdaoui/AppRH_Android',
    demo: 'https://drive.google.com/drive/folders/17vJvRvBq4b09NaqqP6iFsyCyZGLJRvB9?usp=drive_link',
    demoType: 'link'
  },
  {
    id: 3,
    title: 'ArchvoxLib',
    category: ['desktop'],
    techStack: 'Python • Tkinter • Matplotlib',
    description: 'Library management system for books, members and borrowing with statistics.',
    image: 'ArchivoxLib_logo.webp',
    imgWidth: 583,
    imgHeight: 300,
    github: 'https://github.com/oumeyma-elaammari/Gestion_Bibliotheque_ELAAMMARI_OUMEYMA',
    demo: '/videos/archivoxlib.mp4',
    demoType: 'video'
  },
  {
    id: 4,
    title: 'MemoPharma',
    category: ['desktop'],
    techStack: 'JavaFX • MySQL • SceneBuilder',
    description: 'Medical follow-up system for patient management and appointment tracking.',
    image: 'memopharma_logo.webp',
    imgWidth: 426,
    imgHeight: 273,
    github: 'https://github.com/oumeyma-elaammari/memoPharma',
    demo: '/videos/MemoPharmaApp.mp4',
    demoType: 'video'
  },
  {
    id: 7,
    title: 'CBIR - Image Retrieval System',
    category: ['desktop'],
    techStack: 'Python • Tkinter • OpenCV',
    description: 'Content-based image retrieval system indexing the Corel-1000 dataset via color histograms (RGB, HSV, LAB), with configurable bins and similarity metrics (intersection, Euclidean, Chi², correlation).',
    image: 'CBIR.webp',
    imgWidth: 1359,
    imgHeight: 720,
    github: 'https://github.com/oumeyma-elaammari/CBIR',
    demo: null,
    demoType: null
  }
];

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);

    const timer = setTimeout(() => {
      if (filter === 'all') {
        setFilteredProjects(projectsData);
      } else {
        setFilteredProjects(projectsData.filter(project => project.category.includes(filter)));
      }
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filter]);

  const openVideoModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Development' },
    { key: 'mobile', label: 'Mobile Apps' },
    { key: 'desktop', label: 'Desktop Apps' }
  ];

  return (
    <>
      <section id="portfolio" className="portfolio section light-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>Projects</h2>
          <p>Here are some of my academic and internship projects — spanning web, mobile, and desktop development — showcasing my approach to building practical, well-structured software.</p>
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

          <div className={`portfolio-grid ${isAnimating ? 'animating' : ''}`}>
            <div className="row gy-4 isotope-container">
              {filteredProjects.map((project) => (
                <div key={project.id} className="col-lg-4 col-md-6 portfolio-item">
                  <div className="portfolio-content">
                    <div className="portfolio-media">
                      <img
                        src={require(`../assets/img/${project.image}`)}
                        className="img-fluid"
                        alt={project.title}
                        width={project.imgWidth}
                        height={project.imgHeight}
                        loading="lazy"
                      />
                    </div>
                    <div className="portfolio-info">
                      <h4>{project.title}</h4>
                      <p className="tech-stack">{project.techStack}</p>
                      <p className="description">{project.description}</p>
                      {project.experienceRef && (
                        <Link
                          to="experience"
                          smooth={true}
                          duration={500}
                          offset={-70}
                          className="experience-link"
                        >
                          See Cleverix internship
                        </Link>
                      )}
                      <div className="portfolio-links">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub`}>
                          <i className="bi bi-github"></i>
                        </a>
                        {project.demoType === 'video' && (
                          <button
                            className="demo-video-btn"
                            onClick={() => openVideoModal(project.demo)}
                            aria-label={`Play ${project.title} demo video`}
                          >
                            <i className="bi bi-play-circle-fill"></i>
                          </button>
                        )}
                        {project.demoType === 'link' && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} demo`}>
                            <i className="bi bi-box-arrow-up-right"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedVideo && (
        <div className="video-modal" onClick={closeVideoModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={closeVideoModal} aria-label="Close video">
              <i className="bi bi-x-lg"></i>
            </button>
            <video controls autoPlay className="video-player">
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
