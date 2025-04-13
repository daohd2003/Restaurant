import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Import images
import event_bgImg from '/assets/img/events-bg.jpg'
import event_sliderImg1 from '/assets/img/events-slider/events-slider-1.jpg'
import event_sliderImg2 from '/assets/img/events-slider/events-slider-2.jpg'
import event_sliderImg3 from '/assets/img/events-slider/events-slider-3.jpg'

const Events = () => {
  return (
    <section id="events" className="events section">
      <img className="slider-bg" src={event_bgImg} alt="" data-aos="fade-in" />
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
                <img src={event_sliderImg1} className="img-fluid" alt="" />
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0 content">
                <h3>Birthday Parties</h3>
                <div className="price">
                  <p>
                    <span>$189</span>
                  </p>
                </div>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check2-circle" />{' '}
                    <span>
                      Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check2-circle" />{' '}
                    <span>
                      Duis aute irure dolor in reprehenderit in voluptate velit.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check2-circle" />{' '}
                    <span>
                      Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </span>
                  </li>
                </ul>
                <p>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur
                </p>
              </div>
            </div>
          </SwiperSlide>
          {/* End Slider item */}
          <SwiperSlide>
            <div className="row gy-4 event-item">
              <div className="col-lg-6">
                <img src={event_sliderImg2} className="img-fluid" alt="" />
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0 content">
                <h3>Private Parties</h3>
                <div className="price">
                  <p>
                    <span>$290</span>
                  </p>
                </div>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check2-circle" />{' '}
                    <span>
                      Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check2-circle" />{' '}
                    <span>
                      Duis aute irure dolor in reprehenderit in voluptate velit.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check2-circle" />{' '}
                    <span>
                      Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </span>
                  </li>
                </ul>
                <p>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur
                </p>
              </div>
            </div>
          </SwiperSlide>
          {/* End Slider item */}
          <SwiperSlide>
            <div className="row gy-4 event-item">
              <div className="col-lg-6">
                <img src={event_sliderImg3} className="img-fluid" alt="" />
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0 content">
                <h3>Custom Parties</h3>
                <div className="price">
                  <p>
                    <span>$99</span>
                  </p>
                </div>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check2-circle" />{' '}
                    <span>
                      Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check2-circle" />{' '}
                    <span>
                      Duis aute irure dolor in reprehenderit in voluptate velit.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check2-circle" />{' '}
                    <span>
                      Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </span>
                  </li>
                </ul>
                <p>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur
                </p>
              </div>
            </div>
          </SwiperSlide>
          {/* End Slider item */}
        </Swiper>
      </div>
    </section>
  )
}

export default Events
