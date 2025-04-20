import React, { useState, useEffect } from 'react'
import './FullMenuPage.css'
import { getAllMenuItemsAPI } from '../../api/menu'
import { getCategoryAPI } from '../../api/category'
import { useTranslation } from 'react-i18next'

const ITEMS_PER_PAGE = 8

const FullMenuPage = () => {
  const { t } = useTranslation()
  const [menuData, setMenuData] = useState([])
  const [categories, setCategories] = useState([])

  const [selectedSpicy, setSelectedSpicy] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [maxTime, setMaxTime] = useState(30)

  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const fetchData = async () => {
      try {
        setLoading(true)
        const [menuRes, categoryRes] = await Promise.all([
          getAllMenuItemsAPI(),
          getCategoryAPI(),
        ])

        const data = Array.isArray(menuRes?.data) ? menuRes.data : menuRes || []
        const categoryData = Array.isArray(categoryRes?.data)
          ? categoryRes.data
          : categoryRes || []

        setMenuData(data)
        setCategories(categoryData)
        setError(null)
      } catch (err) {
        console.error('Fetch failed:', err)
        setError(t('fullMenu.error'))
        setMenuData([])
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [t])

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedSpicy, selectedCategory, maxTime])

  const filteredMenu = menuData.filter(
    (item) =>
      (selectedSpicy === '' || item.spicyLevel === selectedSpicy) &&
      (selectedCategory === '' ||
        item.categoryId?.toString() === selectedCategory ||
        item.CategoryId?.toString() === selectedCategory) &&
      item.preparationTime <= maxTime
  )

  const totalPages = Math.ceil(filteredMenu.length / ITEMS_PER_PAGE)
  const paginatedMenu = filteredMenu.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handlePageClick = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="full-menu-wrapper">
      <div className="full-menu-container">
        {/* Filter Panel */}
        <div className="menu-filter">
          <h3>{t('fullMenu.filterTitle')}</h3>

          <div className="filter-group">
            <label>{t('fullMenu.categoryLabel')}</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">{t('fullMenu.categories.all')}</option>
              {categories.map((cat) => (
                <option
                  key={cat.id || cat.Id}
                  value={(cat.id || cat.Id).toString()}
                >
                  {t(
                    `fullMenu.categories.${(cat.name || cat.Name)
                      .toLowerCase()
                      .replace(/\s+/g, '')}`
                  )}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>{t('fullMenu.spicinessLabel')}</label>
            <select
              value={selectedSpicy}
              onChange={(e) => setSelectedSpicy(e.target.value)}
            >
              <option value="">{t('fullMenu.spicyOptions.all')}</option>
              <option value="None">{t('fullMenu.spicyOptions.none')}</option>
              <option value="Mild">{t('fullMenu.spicyOptions.mild')}</option>
              <option value="Medium">
                {t('fullMenu.spicyOptions.medium')}
              </option>
              <option value="Hot">{t('fullMenu.spicyOptions.hot')}</option>
              <option value="Extra Hot">
                {t('fullMenu.spicyOptions.extraHot')}
              </option>
            </select>
          </div>

          <div className="filter-group">
            <label>{t('fullMenu.maxPrepTimeLabel', { time: maxTime })}</label>
            <input
              type="range"
              min="5"
              max="60"
              value={maxTime}
              onChange={(e) => setMaxTime(parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Menu List */}
        <div className="menu-list">
          <h2>{t('fullMenu.menuTitle')}</h2>
          {loading ? (
            <p>{t('fullMenu.loading')}</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : paginatedMenu.length > 0 ? (
            <>
              <ul className="full-menu-items">
                {paginatedMenu.map((item) => (
                  <li key={item.id} className="full-menu-item">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="full-menu-item-image"
                    />
                    <div className="full-menu-item-details">
                      <h4>{item.name}</h4>
                      <p>
                        {t('fullMenu.categoryPrefix')}{' '}
                        {t(
                          `fullMenu.categories.${
                            categories
                              .find(
                                (cat) =>
                                  cat.Id === item.CategoryId ||
                                  cat.id === item.categoryId
                              )
                              ?.Name?.toLowerCase()
                              .replace(/\s+/g, '') ||
                            categories
                              .find((cat) => cat.id === item.categoryId)
                              ?.name?.toLowerCase()
                              .replace(/\s+/g, '') ||
                            'all'
                          }`
                        )}
                      </p>
                      <p>{item.description}</p>
                      <p>
                        {t('fullMenu.price')}: ${item.price.toFixed(2)}
                      </p>
                      <p>
                        {t('fullMenu.spiciness')}:{' '}
                        {t(
                          `fullMenu.spicyOptions.${item.spicyLevel
                            ?.toLowerCase()
                            .replace(/\s+/g, '')}`
                        )}
                      </p>
                      <p>
                        {t('fullMenu.prepTime')}: ⏱ {item.preparationTime} {t('fullMenu.minutes')}
                      </p>
                      <p>
                        {item.isAvailable
                          ? t('fullMenu.availability.available')
                          : t('fullMenu.availability.outOfStock')}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pagination Controls */}
              <div className="pagination">
                <button onClick={handlePrev} disabled={currentPage === 1}>
                  {t('fullMenu.pagination.prev')}
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageClick(i + 1)}
                    className={currentPage === i + 1 ? 'active' : ''}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  {t('fullMenu.pagination.next')}
                </button>
              </div>
            </>
          ) : (
            <p className="no-dishes-message">{t('fullMenu.noDishes')}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FullMenuPage
