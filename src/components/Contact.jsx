import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Remplacer par ton endpoint
      const response = await fetch('https://formspree.io/f/mdapneeo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Your message has been sent. Thank you!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact Me</h2>
        <p>
          Have a project in mind or looking for a PFA intern? 
          <br /><br />
          Feel free to reach out! I'm always open to discussing new opportunities, collaborations, or just tech conversations ^_^
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-5">
            <div className="info-wrap">
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Location</h3>
                  <p>Oujda / Marrakech, Morocco</p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email</h3>
                  <p>elaammarioumeima@gmail.com</p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                <i className="bi bi-github flex-shrink-0"></i>
                <div>
                  <h3>GitHub</h3>
                  <p><a href="https://github.com/oumeyma-elaammari" target="_blank" rel="noopener noreferrer">My GitHub Profile</a></p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
                <i className="bi bi-linkedin flex-shrink-0"></i>
                <div>
                  <h3>LinkedIn</h3>
                  <p><a href="https://www.linkedin.com/in/oumeyma-el-aammari-886115244/" target="_blank" rel="noopener noreferrer">My LinkedIn Profile</a></p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <form onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="200">
              <div className="row gy-4">
                <div className="col-md-6">
                  <label htmlFor="name-field" className="pb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name-field"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="email-field" className="pb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email-field"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="subject-field" className="pb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    id="subject-field"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="message-field" className="pb-2">Message</label>
                  <textarea
                    name="message"
                    rows="10"
                    id="message-field"
                    className="form-control"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="col-md-12 text-center">
                  {isLoading && <div className="loading">Sending...</div>}
                  {status.type === 'error' && <div className="error-message">{status.message}</div>}
                  {status.type === 'success' && <div className="sent-message">{status.message}</div>}

                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    Send Message <i className="bi bi-send ms-2"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;