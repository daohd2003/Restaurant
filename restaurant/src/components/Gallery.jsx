import React, { useEffect } from 'react';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';

// Import hình ảnh
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
  useEffect(() => {
    // Cấu hình GLightbox
    const lightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,      // Bật swipe bằng cảm ứng
      keyboardNavigation: true,   // Bật điều hướng bằng bàn phím
      closeButton: true,          // Hiện nút đóng
      loop: true,                // Lặp lại khi đến ảnh cuối
      zoomable: true,            // Cho phép zoom
      draggable: true,           // Cho phép kéo/swipe
      descPosition: 'bottom',    // Vị trí mô tả
      openEffect: 'zoom',        // Hiệu ứng mở
      closeEffect: 'zoom',       // Hiệu ứng đóng
      slideEffect: 'slide',      // Hiệu ứng chuyển ảnh (quan trọng cho swipe)
      moreText: 'Xem thêm',
      moreLength: 60
    });

    return () => lightbox.destroy();
  }, []);

  return (
    <section id="gallery" className="gallery section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Gallery</h2>
        <p>Some photos from Our Restaurant</p>
      </div>

      <div className="container-fluid" data-aos="fade-up" data-aos-delay={100}>
        <div className="row g-0">
          {galleryImages.map((img, index) => (
            <div className="col-lg-3 col-md-4" key={index}>
              <div className="gallery-item">
                <a
                  href={img}
                  className="glightbox"
                  data-gallery="gallery-group"
                >
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