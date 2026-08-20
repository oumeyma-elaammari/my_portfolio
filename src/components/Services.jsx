import React from 'react';
import '../styles/Services.css';

const servicesData = [
  {
    id: 1,
    icon: 'bi-braces',
    title: 'Web Development',
    description: 'Building full-stack web applications with responsive, modern user interfaces and clean, scalable server-side architecture — from concept to deployment.',
    delay: 100
  },
  {
    id: 2,
    icon: 'bi-pc-display',
    title: 'Desktop Application Development',
    description: 'Designing cross-platform desktop applications, from database-driven business tools to interactive user interfaces.',
    delay: 200
  },
  {
    id: 3,
    icon: 'bi-robot',
    title: 'AI & Data Science',
    description: 'Developing machine learning and data analysis solutions — from predictive models to image processing pipelines — focused on turning data into actionable insights.',
    delay: 300
  },
  {
    id: 4,
    icon: 'bi-database',
    title: 'Database Design',
    description: 'Designing efficient database architectures with a focus on data modeling, optimization, and scalability.',
    delay: 400
  },
  {
    id: 5,
    icon: 'bi-git',
    title: 'DevOps & Version Control',
    description: 'Managing professional code workflows, containerized deployments, and business process automation, from development to production.',
    delay: 500
  },
  {
    id: 6,
    icon: 'bi-kanban',
    title: 'Project Management',
    description: 'Applying Agile methodologies for planning, task management, and effective team collaboration throughout the project lifecycle.',
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