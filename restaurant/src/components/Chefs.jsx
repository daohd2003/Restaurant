import React from 'react';
import { useTranslation } from 'react-i18next';
import chef1Img from '/assets/img/chefs/chefs-1.jpg';
import chef2Img from '/assets/img/chefs/chefs-2.jpg';
import chef3Img from '/assets/img/chefs/chefs-3.jpg';

const Chefs = () => {
  const { t } = useTranslation();

  const chefs = t('chefs.members', { returnObjects: true });

  const chefImages = [chef1Img, chef2Img, chef3Img];

  return (
    <section id="chefs" className="chefs section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('chefs.title')}</h2>
        <p>{t('chefs.subtitle')}</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {chefs.map((chef, index) => (
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={(index + 1) * 100} key={index}>
              <div className="member">
                <img src={chefImages[index]} className="img-fluid" alt={chef.name} />
                <div className="member-info">
                  <div className="member-info-content">
                    <h4>{chef.name}</h4>
                    <span>{chef.position}</span>
                  </div>
                  <div className="social">
                    <a href=""><i className="bi bi-twitter-x" /></a>
                    <a href=""><i className="bi bi-facebook" /></a>
                    <a href=""><i className="bi bi-instagram" /></a>
                    <a href=""><i className="bi bi-linkedin" /></a>
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

export default Chefs;
