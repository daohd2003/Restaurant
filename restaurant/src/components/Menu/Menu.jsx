import React, { useEffect, useRef, useState, useCallback } from 'react';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import './Menu.css';
import { getCategoryWithMenuItemsAPI } from '../../api/category';
import {
  setupMenuHubListeners,
  removeMenuHubListeners,
} from '../../services/signalR';
import { useTranslation } from 'react-i18next';

const Menu = () => {
  const isotope = useRef();
  const filterKey = useRef('*');
  const [categories, setCategories] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { t } = useTranslation();

  // Fetch API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCategoryWithMenuItemsAPI();
        setCategories(res);
      } catch (err) {
        console.error('Fetch category with menuItems failed', err);
      }
    };
    fetchData();
  }, []);

  // Initialize Isotope
  useEffect(() => {
    if (!categories.length) return;

    const iso = new Isotope('.isotope-container', {
      itemSelector: '.isotope-item',
      layoutMode: 'masonry',
      masonry: { columnWidth: '.isotope-item' },
    });

    isotope.current = iso;
    setIsInitialized(true);

    imagesLoaded('.isotope-container').on('progress', () => {
      iso.layout();
    });

    return () => {
      iso.destroy();
      setIsInitialized(false);
    };
  }, [categories.length]); // Chỉ phụ thuộc vào độ dài categories

  // Xử lý cập nhật dữ liệu và bố cục
  useEffect(() => {
    if (!isInitialized || !isotope.current) return;

    isotope.current.reloadItems();
    isotope.current.arrange({ filter: filterKey.current });

    imagesLoaded('.isotope-container').on('progress', () => {
      isotope.current.layout();
    });
  }, [categories, isInitialized]); // Chạy lại khi categories hoặc trạng thái khởi tạo thay đổi

  // SignalR listeners - không cần phụ thuộc vào filterKey
  useEffect(() => {
    if (!isInitialized) return;

    const callbacks = {
      onMenuUpdated: (updatedCategories) => {
        setCategories(prev => {
          // So sánh sâu để tránh cập nhật không cần thiết
          return JSON.stringify(prev) === JSON.stringify(updatedCategories) 
            ? prev 
            : updatedCategories;
        });
      },
      onCategoryUpdated: (updatedCategories) => {
        setCategories(prev => {
          return JSON.stringify(prev) === JSON.stringify(updatedCategories) 
            ? prev 
            : updatedCategories;
        });
      },
    };

    setupMenuHubListeners(callbacks);

    return () => {
      removeMenuHubListeners();
    };
  }, [isInitialized]); // Chỉ phụ thuộc vào isInitialized

  // Sử dụng useCallback để tránh tạo hàm mới mỗi lần render
  const handleFilterKeyChange = useCallback((key) => {
    filterKey.current = key;
    if (isotope.current) {
      isotope.current.arrange({ filter: key });
    }
  }, []);

  const setActiveFilter = useCallback((key) => {
    const buttons = document.querySelectorAll('.menu-filters li');
    buttons.forEach((btn) => {
      btn.classList.toggle('filter-active', btn.dataset.filter === key);
    });
  }, []);

  const handleFilterClick = useCallback((key) => {
    handleFilterKeyChange(key);
    setActiveFilter(key);
  }, [handleFilterKeyChange, setActiveFilter]);

  return (
    <section id="menu" className="menu section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('menu.title')}</h2>
        <p>{t('menu.subtitle')}</p>
      </div>

      <div className="container">
        {/* Filter Buttons */}
        <div className="row" data-aos="fade-up" data-aos-delay={100}>
          <div className="col-lg-12 d-flex justify-content-center">
            <ul className="menu-filters isotope-filters">
              <li
                onClick={() => handleFilterClick('*')}
                data-filter="*"
                className="filter-active"
              >
                {t('menu.filters.all')}
              </li>
              {categories.map((category) => (
                <li
                  key={category.id}
                  onClick={() => handleFilterClick(`.filter-${category.slug}`)}
                  data-filter={`.filter-${category.slug}`}
                >
                  {t(`menu.filters.${category.name}`, category.name)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Menu Items */}
        <div
          className="row isotope-container"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          {categories.flatMap((category) =>
            category.menuItems?.map((item) => (
              <div
                key={item.id}
                className={`col-lg-6 menu-item isotope-item filter-${category.slug}`}
              >
                <img src={item.imageUrl} className="menu-img" alt={item.name} />
                <div className="menu-content">
                  <a href="#">{item.name}</a>
                  <span>${item.price.toFixed(2)}</span>
                </div>
                <div className="menu-ingredients">{item.description}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Menu