import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useTranslation } from 'react-i18next';

// Import images
import event_bgImg from '/assets/img/events-bg.jpg';
import event_sliderImg1 from '/assets/img/events-slider/events-slider-1.jpg';
import event_sliderImg2 from '/assets/img/events-slider/events-slider-2.jpg';
import event_sliderImg3 from '/assets/img/events-slider/events-slider-3.jpg';

const Events = () => {
  const { t } = useTranslation();

  return (
    <section id="events" className="events section">
      <img className="slider-bg" src={event_bgImg} alt={t('events.title')} data-aos="fade-in" />
      <div className="container">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation={false}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Pagination]}
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <SwiperSlide>
            <div className="row gy-4 event-item">
              <div className="col-lg-6">
                <img src={event_sliderImg1} className="img-fluid" alt={t('events.items.1.title')} />
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0 content">
                <h3>{t('events.items.1.title')}</h3>
                <div className="price">
                  <p>
                    <span>{t('events.items.1.price')}</span>
                  </p>
                </div>
                <p className="fst-italic">
                  {t('events.items.1.shortDesc')}
                </p>
                <ul>
                  {t('events.items.1.features', { returnObjects: true }).map((feature, index) => (
                    <li key={index}>
                      <i className="bi bi-check2-circle" />{' '}
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p>{t('events.items.1.description')}</p>
              </div>
            </div>
          </SwiperSlide>
          {/* End Slider item */}
          <SwiperSlide>
            <div className="row gy-4 event-item">
              <div className="col-lg-6">
                <img src={event_sliderImg2} className="img-fluid" alt={t('events.items.2.title')} />
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0 content">
                <h3>{t('events.items.2.title')}</h3>
                <div className="price">
                  <p>
                    <span>{t('events.items.2.price')}</span>
                  </p>
                </div>
                <p className="fst-italic">
                  {t('events.items.2.shortDesc')}
                </p>
                <ul>
                  {t('events.items.2.features', { returnObjects: true }).map((feature, index) => (
                    <li key={index}>
                      <i className="bi bi-check2-circle" />{' '}
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p>{t('events.items.2.description')}</p>
              </div>
            </div>
          </SwiperSlide>
          {/* End Slider item */}
          <SwiperSlide>
            <div className="row gy-4 event-item">
              <div className="col-lg-6">
                <img src={event_sliderImg3} className="img-fluid" alt={t('events.items.3.title')} />
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0 content">
                <h3>{t('events.items.3.title')}</h3>
                <div className="price">
                  <p>
                    <span>{t('events.items.3.price')}</span>
                  </p>
                </div>
                <p className="fst-italic">
                  {t('events.items.3.shortDesc')}
                </p>
                <ul>
                  {t('events.items.3.features', { returnObjects: true }).map((feature, index) => (
                    <li key={index}>
                      <i className="bi bi-check2-circle" />{' '}
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p>{t('events.items.3.description')}</p>
              </div>
            </div>
          </SwiperSlide>
          {/* End Slider item */}
        </Swiper>
      </div>
    </section>
  );
};

export default Events;
