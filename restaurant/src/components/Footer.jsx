import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="footer" className="footer">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <div className="logo d-flex align-items-center">
              <span className="sitename">Restaurantly</span>
            </div>
            <div className="footer-contact pt-3">
              <p>{t('footer.about.address1')}</p>
              <p>{t('footer.about.address2')}</p>
              <p className="mt-3">
                <strong>{t('footer.about.phone')}:</strong> <span>+1 5589 55488 55</span>
              </p>
              <p>
                <strong>{t('footer.about.email')}:</strong> <span>info@example.com</span>
              </p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href=""><i className="bi bi-twitter-x"></i></a>
              <a href=""><i className="bi bi-facebook"></i></a>
              <a href=""><i className="bi bi-instagram"></i></a>
              <a href=""><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>{t('footer.links.title')}</h4>
            <ul>
              <li><a href="#">{t('footer.links.home')}</a></li>
              <li><a href="#">{t('footer.links.about')}</a></li>
              <li><a href="#">{t('footer.links.services')}</a></li>
              <li><a href="#">{t('footer.links.terms')}</a></li>
              <li><a href="#">{t('footer.links.privacy')}</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>{t('footer.services.title')}</h4>
            <ul>
              <li><a href="#">{t('footer.services.webDesign')}</a></li>
              <li><a href="#">{t('footer.services.webDev')}</a></li>
              <li><a href="#">{t('footer.services.product')}</a></li>
              <li><a href="#">{t('footer.services.marketing')}</a></li>
              <li><a href="#">{t('footer.services.graphic')}</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>{t('footer.newsletter.title')}</h4>
            <p>{t('footer.newsletter.desc')}</p>
            <form action="forms/newsletter.php" method="post" className="php-email-form">
              <div className="newsletter-form">
                <input type="email" name="email" placeholder={t('footer.newsletter.placeholder')} />
                <input type="submit" value={t('footer.newsletter.subscribe')} />
              </div>
              <div className="loading">{t('footer.newsletter.loading')}</div>
              <div className="error-message"></div>
              <div className="sent-message">{t('footer.newsletter.success')}</div>
            </form>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>© <span>Copyright</span> <strong className="px-1 sitename">Restaurantly</strong> <span>{t('footer.copyright.allRights')}</span></p>
        <div className="credits">
          {t('footer.copyright.designedBy')} <a href="https://bootstrapmade.com/">BootstrapMade</a> 
          {' '} {t('footer.copyright.distributedBy')} <a href="https://themewagon.com" target="_blank" rel="noreferrer">ThemeWagon</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
