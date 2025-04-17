import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = t('testimonials.items', { returnObjects: true });

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('testimonials.title')}</h2>
        <p>{t('testimonials.subtitle')}</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={40}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="init-swiper"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-item">
                <p>
                  <i className="bi bi-quote quote-icon-left" />
                  <span>{item.quote}</span>
                  <i className="bi bi-quote quote-icon-right" />
                </p>
                <img
                  src={item.image}
                  className="testimonial-img"
                  alt={`${item.name} portrait`}
                />
                <h3>{item.name}</h3>
                <h4>{item.role}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
