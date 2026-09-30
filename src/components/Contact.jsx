import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Contact.css';

const Contact = () => {
  const { t } = useTranslation();
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
      const response = await fetch('https://formspree.io/f/mdapneeo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: t('contact.success') });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: t('contact.error') });
      }
    } catch (error) {
      setStatus({ type: 'error', message: t('contact.network') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('contact.title')}</h2>
        <p>
          {t('contact.intro1')}
          <br /><br />
          {t('contact.intro2')}
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-5">
            <div className="info-wrap">
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>{t('contact.locationTitle')}</h3>
                  <p>{t('contact.location')}</p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>{t('contact.emailTitle')}</h3>
                  <p>elaammarioumeima@gmail.com</p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                <i className="bi bi-github flex-shrink-0"></i>
                <div>
                  <h3>{t('contact.githubTitle')}</h3>
                  <p><a href="https://github.com/oumeyma-elaammari" target="_blank" rel="noopener noreferrer">{t('contact.githubLink')}</a></p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
                <i className="bi bi-linkedin flex-shrink-0"></i>
                <div>
                  <h3>{t('contact.linkedinTitle')}</h3>
                  <p><a href="https://www.linkedin.com/in/oumeyma-el-aammari-886115244/" target="_blank" rel="noopener noreferrer">{t('contact.linkedinLink')}</a></p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <form onSubmit={handleSubmit} className="contact-form" data-aos="fade-up" data-aos-delay="200">
              <div className="row gy-4">
                <div className="col-md-6">
                  <label htmlFor="name-field" className="pb-2">{t('contact.name')}</label>
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
                  <label htmlFor="email-field" className="pb-2">{t('contact.email')}</label>
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
                  <label htmlFor="subject-field" className="pb-2">{t('contact.subject')}</label>
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
                  <label htmlFor="message-field" className="pb-2">{t('contact.message')}</label>
                  <textarea
                    name="message"
                    rows="5"
                    id="message-field"
                    className="form-control"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="col-md-12 text-center">
                  <div className="form-status" aria-live="polite" aria-atomic="true">
                    {isLoading && <div className="loading">{t('contact.sending')}</div>}
                    {status.type === 'error' && <div className="error-message" role="alert">{status.message}</div>}
                    {status.type === 'success' && <div className="sent-message">{status.message}</div>}
                  </div>

                  <button type="submit" className="btn btn-primary send" disabled={isLoading}>
                    {t('contact.send')}
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