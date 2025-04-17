import heroBg from '/assets/img/hero-bg.jpg'
import { useTranslation } from 'react-i18next'

const Hero = () => {
  const { t } = useTranslation()
  return (
    <section id="hero" className="hero section dark-background" >
      <img src="assets/img/hero-bg.jpg" alt="" data-aos="fade-in" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 d-flex flex-column align-items-center align-items-lg-start">
            <h2 data-aos="fade-up" data-aos-delay={100}>
              {t('hero.title_part1')} <span>{t('hero.title_part2')}</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay={200}>
              {t('hero.description')}
            </p>
            <div
              className="d-flex mt-4"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <a
                href="#menu"
                className="cta-btn"
                style={{ textDecoration: 'none' , cursor: 'pointer'}}
              >
                {t('hero.our_menu')}
              </a>
              <a
                href="#book-a-table"
                className="cta-btn"
                style={{ textDecoration: 'none' , cursor: 'pointer'}}
              >
                {t('hero.book_table')}
              </a>
            </div>
          </div>
          <div className="col-lg-4 d-flex align-items-center justify-content-center mt-5 mt-lg-0">
            <a
              href="https://www.youtube.com/watch?v=32T8Oja5Yn4"
              className="glightbox pulsating-play-btn"
              style={{ cursor: 'pointer'}}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
