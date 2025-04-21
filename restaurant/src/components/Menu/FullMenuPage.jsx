import React, { useState, useEffect } from 'react'
import './FullMenuPage.css'
import { getAllMenuItemsAPI } from '../../api/menu'
import { getCategoryAPI } from '../../api/category'
import { useTranslation } from 'react-i18next'
import Modal from 'react-modal'

// Constants
const ITEMS_PER_PAGE = 8
const COMMENTS_PER_PAGE = 3

// Set app element for accessibility (for screen readers)
Modal.setAppElement('#root')

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
  const [selectedItem, setSelectedItem] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [currentCommentPage, setCurrentCommentPage] = useState(1)
  const [comments, setComments] = useState([
    { user: 'Alice', rating: 5, text: 'Tuyệt vời!' },
    { user: 'Bob', rating: 4, text: 'Ngon nhưng hơi mặn.' },
    { user: 'Carol', rating: 5, text: 'Sẽ quay lại lần sau!' },
    { user: 'David', rating: 3, text: 'Ổn, không đặc biệt.' },
    { user: 'Emma', rating: 5, text: 'Best dish ever!' },
    { user: 'Frank', rating: 4, text: 'Dịch vụ tốt, món ăn ngon.' },
  ])

  const [commentRating, setCommentRating] = useState(5)
  const [editingIndex, setEditingIndex] = useState(null)

  // Fetch data on component mount
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

  // Filter and paginate menu items
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

  // Filter and paginate comments
  const paginatedComments = comments.slice(
    (currentCommentPage - 1) * COMMENTS_PER_PAGE,
    currentCommentPage * COMMENTS_PER_PAGE
  )
  const totalCommentPages = Math.ceil(comments.length / COMMENTS_PER_PAGE)

  // Navigation handlers
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handlePageClick = (page) => setCurrentPage(page)

  // Comment handlers
  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return

    const newComment = {
      user: 'Guest',
      rating: commentRating,
      text: commentText,
    }

    if (editingIndex !== null) {
      // Update existing comment
      const updated = [...comments]
      updated[editingIndex] = newComment
      setComments(updated)
      setEditingIndex(null)
    } else {
      // Add new comment
      setComments((prev) => [newComment, ...prev])
    }

    setCommentText('')
    setCommentRating(5)
    setCurrentCommentPage(1)
  }

  // Modal handlers
  const openModal = (item) => {
    setSelectedItem(item)
    setModalOpen(true)
    setCurrentCommentPage(1)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedItem(null)
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
            <p className="loading">{t('fullMenu.loading')}</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : paginatedMenu.length > 0 ? (
            <>
              <ul className="full-menu-items">
                {paginatedMenu.map((item) => (
                  <li
                    key={item.id}
                    className="full-menu-item"
                    onClick={() => openModal(item)}
                  >
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
                      <p className="description">{item.description}</p>
                      <div className="item-meta">
                        <span>
                          {t('fullMenu.price')}: ${item.price.toFixed(2)}
                        </span>
                        <span>
                          {t('fullMenu.spiciness')}:{' '}
                          {t(
                            `fullMenu.spicyOptions.${item.spicyLevel
                              ?.toLowerCase()
                              .replace(/\s+/g, '')}`
                          )}
                        </span>
                        <span>
                          {t('fullMenu.prepTime')}: ⏱ {item.preparationTime}{' '}
                          {t('fullMenu.minutes')}
                        </span>
                        <span
                          className={
                            item.isAvailable ? 'available' : 'out-of-stock'
                          }
                        >
                          {item.isAvailable
                            ? t('fullMenu.availability.available')
                            : t('fullMenu.availability.outOfStock')}
                        </span>
                      </div>
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

      {/* Modal - Popup Detail */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        className="menu-modal"
        overlayClassName="menu-modal-overlay"
        closeTimeoutMS={200}
      >
        {selectedItem && (
          <div className="menu-modal-content">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-header">
              <h2>{selectedItem.name}</h2>
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.name}
                className="modal-image"
              />
            </div>

            <div className="modal-body">
              <p className="modal-description">{selectedItem.description}</p>

              <div className="modal-details">
                <div className="detail-item">
                  <span className="detail-label">{t('fullMenu.price')}:</span>
                  <span className="detail-value">
                    ${selectedItem.price.toFixed(2)}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">
                    {t('fullMenu.spiciness')}:
                  </span>
                  <span className="detail-value">
                    {t(
                      `fullMenu.spicyOptions.${selectedItem.spicyLevel
                        ?.toLowerCase()
                        .replace(/\s+/g, '')}`
                    )}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">
                    {t('fullMenu.prepTime')}:
                  </span>
                  <span className="detail-value">
                    ⏱ {selectedItem.preparationTime} {t('fullMenu.minutes')}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">{t('fullMenu.status')}:</span>
                  <span
                    className={
                      selectedItem.isAvailable ? 'available' : 'out-of-stock'
                    }
                  >
                    {selectedItem.isAvailable
                      ? t('fullMenu.availability.available')
                      : t('fullMenu.availability.outOfStock')}
                  </span>
                </div>
              </div>

              <div className="comments-section">
                <h3>{t('fullMenu.commentsTitle')}</h3>

                {comments.length > 0 ? (
                  <>
                    <ul className="comments-list">
                      {paginatedComments.map((c, i) => {
                        const globalIndex =
                          (currentCommentPage - 1) * COMMENTS_PER_PAGE + i
                        return (
                          <li key={i} className="comment-item">
                            <div className="comment-header">
                              <strong>{c.user}</strong>
                              <span className="rating">
                                {'⭐'.repeat(c.rating)}
                              </span>
                              <button
                                className="edit-comment-btn"
                                onClick={() => {
                                  setCommentText(c.text)
                                  setCommentRating(c.rating)
                                  setEditingIndex(globalIndex)
                                }}
                              >
                                ✏️ {t('fullMenu.edit')}
                              </button>
                            </div>
                            <p className="comment-text">{c.text}</p>
                          </li>
                        )
                      })}
                    </ul>

                    {/* Comment Pagination */}
                    {totalCommentPages > 1 && (
                      <div className="comment-pagination">
                        <button
                          onClick={() =>
                            setCurrentCommentPage((prev) =>
                              Math.max(prev - 1, 1)
                            )
                          }
                          disabled={currentCommentPage === 1}
                        >
                          {t('fullMenu.pagination.prev')}
                        </button>
                        {[...Array(totalCommentPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentCommentPage(i + 1)}
                            className={
                              currentCommentPage === i + 1 ? 'active' : ''
                            }
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button
                          onClick={() =>
                            setCurrentCommentPage((prev) =>
                              Math.min(prev + 1, totalCommentPages)
                            )
                          }
                          disabled={currentCommentPage === totalCommentPages}
                        >
                          {t('fullMenu.pagination.next')}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="no-comments">{t('fullMenu.noComments')}</p>
                )}

                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="comment-form">
                  <h4>
                    {editingIndex !== null
                      ? t('fullMenu.editCommentTitle')
                      : t('fullMenu.commentsTitle')}
                  </h4>
                  <textarea
                    placeholder={t('fullMenu.commentPlaceholder')}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows="3"
                  />
                  <label>{t('fullMenu.ratingLabel')}:</label>
                  <select
                    value={commentRating}
                    onChange={(e) => setCommentRating(parseInt(e.target.value))}
                  >
                    {[5, 4, 3, 2, 1].map((star) => (
                      <option key={star} value={star}>
                        {'⭐'.repeat(star)}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="submit-comment">
                    {editingIndex !== null
                      ? t('fullMenu.saveEdit')
                      : t('fullMenu.submitComment')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default FullMenuPage
