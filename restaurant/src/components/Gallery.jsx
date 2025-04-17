import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';

const galleryImages = [
  '/assets/img/gallery/gallery-1.jpg',
  '/assets/img/gallery/gallery-2.jpg',
  '/assets/img/gallery/gallery-3.jpg',
  '/assets/img/gallery/gallery-4.jpg',
  '/assets/img/gallery/gallery-5.jpg',
  '/assets/img/gallery/gallery-6.jpg',
  '/assets/img/gallery/gallery-7.jpg',
  '/assets/img/gallery/gallery-8.jpg'
];

const Gallery = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const lightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      keyboardNavigation: true,
      closeButton: true,
      loop: true,
      zoomable: true,
      draggable: true,
      descPosition: 'bottom',
      openEffect: 'zoom',
      closeEffect: 'zoom',
      slideEffect: 'slide',
      moreText: t('gallery.moreText', 'View more'),
      moreLength: 60
    });

    return () => lightbox.destroy();
  }, [t]);

  return (
    <section id="gallery" className="gallery section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('gallery.title')}</h2>
        <p>{t('gallery.subtitle')}</p>
      </div>

      <div className="container-fluid" data-aos="fade-up" data-aos-delay={100}>
        <div className="row g-0">
          {galleryImages.map((img, index) => (
            <div className="col-lg-3 col-md-4" key={index}>
              <div className="gallery-item">
                <a href={img} className="glightbox" data-gallery="gallery-group">
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="img-fluid"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
