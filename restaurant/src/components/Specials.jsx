import { useTranslation } from 'react-i18next'

const Specials = () => {
  const { t } = useTranslation()

  return (
    <section id="specials" className="specials section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('specials.title')}</h2>
        <p>{t('specials.subtitle')}</p>
      </div>
      {/* End Section Title */}
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="row">
          <div className="col-lg-3">
            <ul className="nav nav-tabs flex-column">
              <li className="nav-item">
                <a
                  className="nav-link active show"
                  data-bs-toggle="tab"
                  href="#specials-tab-1"
                >
                  {t('specials.tabs.1.title')}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#specials-tab-2"
                >
                  {t('specials.tabs.2.title')}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#specials-tab-3"
                >
                  {t('specials.tabs.3.title')}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#specials-tab-4"
                >
                  {t('specials.tabs.4.title')}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#specials-tab-5"
                >
                  {t('specials.tabs.5.title')}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-9 mt-4 mt-lg-0">
            <div className="tab-content">
              <div className="tab-pane active show" id="specials-tab-1">
                <div className="row">
                  <div className="col-lg-8 details order-2 order-lg-1">
                    <h3>{t('specials.tabs.1.name')}</h3>
                    <p className="fst-italic">
                    {t('specials.tabs.1.shortDesc')}
                    </p>
                    <p>
                    {t('specials.tabs.1.desc')}
                    </p>
                  </div>
                  <div className="col-lg-4 text-center order-1 order-lg-2">
                    <img
                      src="assets/img/Signature Truffle Risotto.jpg"
                      alt="Truffle Risotto"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="specials-tab-2">
                <div className="row">
                  <div className="col-lg-8 details order-2 order-lg-1">
                    <h3>{t('specials.tabs.2.name')}</h3>
                    <p className="fst-italic">
                    {t('specials.tabs.2.shortDesc')}
                    </p>
                    <p>
                    {t('specials.tabs.2.desc')}
                    </p>
                  </div>
                  <div className="col-lg-4 text-center order-1 order-lg-2">
                    <img
                      src="assets/img/Autumn Harvest Platter.jpg"
                      alt="Autumn Harvest Platter"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="specials-tab-3">
                <div className="row">
                  <div className="col-lg-8 details order-2 order-lg-1">
                    <h3>{t('specials.tabs.3.name')}</h3>
                    <p className="fst-italic">
                    {t('specials.tabs.3.shortDesc')}
                    </p>
                    <p>
                    {t('specials.tabs.3.desc')}
                    </p>
                  </div>
                  <div className="col-lg-4 text-center order-1 order-lg-2">
                    <img
                      src="assets/img/Sommelier's Selection.webp"
                      alt="Wine Pairing Selection"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="specials-tab-4">
                <div className="row">
                  <div className="col-lg-8 details order-2 order-lg-1">
                    <h3>{t('specials.tabs.4.name')}</h3>
                    <p className="fst-italic">
                    {t('specials.tabs.4.shortDesc')}
                    </p>
                    <p>
                    {t('specials.tabs.4.desc')}
                    </p>
                  </div>
                  <div className="col-lg-4 text-center order-1 order-lg-2">
                    <img
                      src="assets/img/Sunday Brunch Feast.jpg"
                      alt="Sunday Brunch Spread"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="specials-tab-5">
                <div className="row">
                  <div className="col-lg-8 details order-2 order-lg-1">
                    <h3>{t('specials.tabs.5.name')}</h3>
                    <p className="fst-italic">
                    {t('specials.tabs.5.shortDesc')}
                    </p>
                    <p>
                    {t('specials.tabs.5.desc')}
                    </p>
                  </div>
                  <div className="col-lg-4 text-center order-1 order-lg-2">
                    <img
                      src="assets/img/Plant-Based Tasting Menu.jpg"
                      alt="Vegan Tasting Menu"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Specials