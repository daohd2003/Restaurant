import { useTranslation } from 'react-i18next'

const WhyUs = () => {
  const { t } = useTranslation()
  const cards = t('why_us.cards', { returnObjects: true })

  return (
    <section id="why-us" className="why-us section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('why_us.title')}</h2>
        <p>{t('why_us.subtitle')}</p>
      </div>
      <div className="container">
        <div className="row gy-4">
          {cards.map((card, index) => (
            <div
              className="col-lg-4"
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
              key={index}
            >
              <div className="card-item">
                <span>{`0${index + 1}`}</span>
                <h4>
                  <div className="stretched-link">{card.title}</div>
                </h4>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
