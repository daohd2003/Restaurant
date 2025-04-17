import { useTranslation } from 'react-i18next';
import aboutImg from '/assets/img/about.jpg';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="about section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-6 order-1 order-lg-2">
            <img src={aboutImg} className="img-fluid about-img" alt="" />
          </div>
          <div className="col-lg-6 order-2 order-lg-1 content">
            <h3>{t('about.title')}</h3>
            <p className="fst-italic">
              {t('about.subtitle')}
            </p>
            <ul>
              {t('about.features', { returnObjects: true }).map((feature, index) => (
                <li key={index}>
                  <i className="bi bi-check2-all"></i>{' '}
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <p>{t('about.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;