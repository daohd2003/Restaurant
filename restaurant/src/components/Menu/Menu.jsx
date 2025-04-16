import React, { useEffect, useRef, useState } from 'react'
import Isotope from 'isotope-layout'
import imagesLoaded from 'imagesloaded'
import './Menu.css'
import { getCategoryWithMenuItemsAPI } from '../../api/category'
import {
  setupMenuHubListeners,
  removeMenuHubListeners,
} from '../../services/signalR'

const Menu = () => {
  const isotope = useRef()
  const filterKey = useRef('*')
  const [categories, setCategories] = useState([])

  // Fetch API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCategoryWithMenuItemsAPI()
        setCategories(res)
      } catch (err) {
        console.error('Fetch category with menuItems failed', err)
      }
    }
    fetchData()
  }, [])

  // Initialize Isotope
  useEffect(() => {
    const iso = new Isotope('.isotope-container', {
      itemSelector: '.isotope-item',
      layoutMode: 'masonry',
      masonry: { columnWidth: '.isotope-item' },
    })

    isotope.current = iso

    imagesLoaded('.isotope-container').on('progress', () => {
      iso.layout()
    })

    return () => iso.destroy()
  }, [categories])

  // Sửa lại useEffect cho SignalR
  useEffect(() => {
    const callbacks = {
      onMenuUpdated: (updatedCategories) => {
        // Thay đổi tham số từ newItem sang updatedCategories
        setCategories(updatedCategories) // Cập nhật toàn bộ danh sách thay vì từng item
      },
      onCategoryUpdated: (updatedCategories) => {
        setCategories(updatedCategories)
      },
    }

    setupMenuHubListeners(callbacks)

    return () => {
      removeMenuHubListeners()
    }
  }, [])

  // Filter functions
  const handleFilterKeyChange = (key) => {
    filterKey.current = key
    isotope.current.arrange({ filter: key })
  }

  const setActiveFilter = (key) => {
    document.querySelectorAll('.menu-filters li').forEach((btn) => {
      btn.classList.toggle('filter-active', btn.dataset.filter === key)
    })
  }

  const handleFilterClick = (key) => {
    handleFilterKeyChange(key)
    setActiveFilter(key)
  }

  return (
    <section id="menu" className="menu section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Menu</h2>
        <p>Check Our Tasty Menu</p>
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
                All
              </li>
              {categories.map((category) => (
                <li
                  key={category.id}
                  onClick={() => handleFilterClick(`.filter-${category.slug}`)}
                  data-filter={`.filter-${category.slug}`}
                >
                  {category.name}
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
