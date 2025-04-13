import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Testimonials</h2>
        <p>What they're saying about us</p>
      </div>
      {/* End Section Title */}

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
          {/* Testimonial 1 */}
          <SwiperSlide>
            <div className="testimonial-item">
              <p>
                <i className="bi bi-quote quote-icon-left" />
                <span>Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.</span>
                <i className="bi bi-quote quote-icon-right" />
              </p>
              <img src="assets/img/testimonials/testimonials-1.jpg" className="testimonial-img" alt="" />
              <h3>Saul Goodman</h3>
              <h4>Ceo &amp; Founder</h4>
            </div>
          </SwiperSlide>

          {/* Testimonial 2 */}
          <SwiperSlide>
            <div className="testimonial-item">
              <p>
                <i className="bi bi-quote quote-icon-left" />
                <span>Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.</span>
                <i className="bi bi-quote quote-icon-right" />
              </p>
              <img src="assets/img/testimonials/testimonials-2.jpg" className="testimonial-img" alt="" />
              <h3>Sara Wilsson</h3>
              <h4>Designer</h4>
            </div>
          </SwiperSlide>

          {/* Testimonial 3 */}
          <SwiperSlide>
            <div className="testimonial-item">
              <p>
                <i className="bi bi-quote quote-icon-left" />
                <span>Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.</span>
                <i className="bi bi-quote quote-icon-right" />
              </p>
              <img src="assets/img/testimonials/testimonials-3.jpg" className="testimonial-img" alt="" />
              <h3>Jena Karlis</h3>
              <h4>Store Owner</h4>
            </div>
          </SwiperSlide>

          {/* Testimonial 4 */}
          <SwiperSlide>
            <div className="testimonial-item">
              <p>
                <i className="bi bi-quote quote-icon-left" />
                <span>Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.</span>
                <i className="bi bi-quote quote-icon-right" />
              </p>
              <img src="assets/img/testimonials/testimonials-4.jpg" className="testimonial-img" alt="" />
              <h3>Matt Brandon</h3>
              <h4>Freelancer</h4>
            </div>
          </SwiperSlide>

          {/* Testimonial 5 */}
          <SwiperSlide>
            <div className="testimonial-item">
              <p>
                <i className="bi bi-quote quote-icon-left" />
                <span>Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.</span>
                <i className="bi bi-quote quote-icon-right" />
              </p>
              <img src="assets/img/testimonials/testimonials-5.jpg" className="testimonial-img" alt="" />
              <h3>John Larson</h3>
              <h4>Entrepreneur</h4>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;