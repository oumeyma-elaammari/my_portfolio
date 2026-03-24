import React from 'react';
import '../styles/Services.css';

const servicesData = [
  {
    id: 1,
    icon: 'bi-braces',
    title: 'Web Development',
    description: 'Full-stack web applications using React.js, Angular, Symfony, and Laravel. Responsive and modern user interfaces with clean backend architecture.',
    delay: 100
  },
  {
    id: 2,
    icon: 'bi-phone',
    title: 'Mobile App Development',
    description: 'Android applications using Java, XML, and Firebase. Feature-rich mobile solutions for HR management, attendance tracking, and more.',
    delay: 200
  },
  {
    id: 3,
    icon: 'bi-robot',
    title: 'AI & Data Science',
    description: 'Machine learning solutions using Python, Pandas, NumPy, and OpenCV. Data analysis and visualization for intelligent decision-making.',
    delay: 300
  },
  {
    id: 4,
    icon: 'bi-database',
    title: 'Database Design',
    description: 'Efficient database architecture with MySQL, PostgreSQL, and Firebase. Data modeling, optimization, and management for scalable applications.',
    delay: 400
  },
  {
    id: 5,
    icon: 'bi-git',
    title: 'DevOps & Version Control',
    description: 'Git/GitHub workflow, Docker containerization, Jenkins CI/CD pipelines. Professional code management and deployment strategies.',
    delay: 500
  },
  {
    id: 6,
    icon: 'bi-kanban',
    title: 'Project Management',
    description: 'Agile methodologies including Scrum and Kanban. Project planning, task management with Jira, and team collaboration.',
    delay: 600
  }
];

const Services = () => {
  return (
    <section id="services" className="services section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>As a software engineering student, I offer a range of technical services to help bring your ideas to life with modern technologies and best practices.</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className="col-lg-4 col-md-6 service-item d-flex" 
              data-aos="fade-up" 
              data-aos-delay={service.delay}
            >
              <div className="icon flex-shrink-0">
                <i className={service.icon}></i>
              </div>
              <div>
                <h4 className="title">{service.title}</h4>
                <p className="description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;