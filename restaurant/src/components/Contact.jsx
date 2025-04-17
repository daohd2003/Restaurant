import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="contact section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('contact.title')}</h2>
        <p>{t('contact.subtitle')}</p>
      </div>

      <div className="mb-5" data-aos="fade-up" data-aos-delay={200}>
        <iframe
          style={{ border: 0, width: '100%', height: 400 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3837.3859424448915!2d108.16327815004767!3d15.888839132243067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31420529b9a535cd%3A0xf15e51647d30c0fa!2zTkjDgCBTw4FDSCBD4bqoTSBMw50!5e0!3m2!1svi!2s!4v1744517149586!5m2!1svi!2s"
          frameBorder={0}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      {/* End Google Maps */}

      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="row gy-4">
          <div className="col-lg-4">
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={300}>
              <i className="bi bi-geo-alt flex-shrink-0" />
              <div>
                <h3>{t('contact.locationTitle')}</h3>
                <p>{t('contact.locationDetail')}</p>
              </div>
            </div>
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={400}>
              <i className="bi bi-telephone flex-shrink-0" />
              <div>
                <h3>{t('contact.openHoursTitle')}</h3>
                <p>{t('contact.openHoursDetail')}</p>
              </div>
            </div>
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={400}>
              <i className="bi bi-telephone flex-shrink-0" />
              <div>
                <h3>{t('contact.callTitle')}</h3>
                <p>{t('contact.callDetail')}</p>
              </div>
            </div>
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={500}>
              <i className="bi bi-envelope flex-shrink-0" />
              <div>
                <h3>{t('contact.emailTitle')}</h3>
                <p>{t('contact.emailDetail')}</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <form
              action="forms/contact.php"
              method="post"
              className="php-email-form"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="row gy-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder={t('contact.form.name')}
                    required=""
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder={t('contact.form.email')}
                    required=""
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder={t('contact.form.subject')}
                    required=""
                  />
                </div>
                <div className="col-md-12">
                  <textarea
                    name="message"
                    rows={6}
                    className="form-control"
                    placeholder={t('contact.form.message')}
                    required=""
                  />
                </div>
                <div className="col-md-12 text-center">
                  <div className="loading">{t('contact.form.loading')}</div>
                  <div className="error-message" />
                  <div className="sent-message">{t('contact.form.success')}</div>
                  <button type="submit">{t('contact.form.send')}</button>
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
