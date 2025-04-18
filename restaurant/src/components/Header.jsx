import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import 'bootstrap-icons/font/bootstrap-icons.css'

const Header = () => {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileNavActive, setMobileNavActive] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Active section detection
      const scrollPosition = window.scrollY + 200 // Tăng offset để chắc chắn bắt được section hero
      const sections = document.querySelectorAll('section[id]')

      // Nếu scroll lên đầu trang, active hero
      if (window.scrollY === 0) {
        setActiveSection('hero')
        return
      }

      let currentSection = 'hero' // Mặc định là hero

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          currentSection = section.id
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileNavActive &&
        !e.target.closest('.navmenu') &&
        !e.target.closest('.mobile-nav-toggle')
      ) {
        setMobileNavActive(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [mobileNavActive])

  const handleMenuClick = (e, sectionId) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth',
      })
      setActiveSection(sectionId)
      setMobileNavActive(false)
    }
  }

  const toggleDropdown = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId)
  }

  return (
    <header
      id="header"
      className={`header fixed-top ${scrolled ? 'header-scrolled' : ''}`}
    >
      {/* Top Bar */}
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center">
              <a href={`mailto:${t('header.email')}`} className="no-underline">
                {t('header.email')}
              </a>
            </i>
            <i className="bi bi-phone d-flex align-items-center ms-4">
              <span>{t('header.phone')}</span>
            </i>
          </div>
          <div className="languages d-none d-md-flex align-items-center">
            <ul>
              <li
                onClick={() => changeLanguage('en')}
                className={i18n.language === 'en' ? 'active' : ''}
              >
                <img src="/flags/us.svg" alt="English" width="24" height="16" />
              </li>
              <li
                onClick={() => changeLanguage('vi')}
                className={i18n.language === 'vi' ? 'active' : ''}
              >
                <img
                  src="/flags/vn.svg"
                  alt="Tiếng Việt"
                  width="24"
                  height="16"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          {/* Logo */}
          <a
            href="index.html"
            className="logo d-flex align-items-center me-auto me-xl-0 no-underline"
            onClick={(e) => handleMenuClick(e, 'hero')}
          >
            <h1 className="sitename">{t('header.logo')}</h1>
          </a>

          {/* Nav Menu */}
          <nav
            id="navmenu"
            className={`navmenu ${mobileNavActive ? 'active' : ''}`}
          >
            <ul>
              {Object.entries(
                t('header.nav_items', { returnObjects: true })
              ).map(([key, value]) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className={`no-underline ${
                      activeSection === key ? 'active' : ''
                    }`}
                    onClick={(e) => handleMenuClick(e, key)}
                  >
                    {value}
                  </a>
                </li>
              ))}

              {/* Dropdown Menu */}
              <li
                className={`dropdown ${
                  activeDropdown === 'main' ? 'active' : ''
                }`}
              >
                <a
                  href="#"
                  className="no-underline"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleDropdown('main')
                  }}
                >
                  <span>{t('header.dropdown.title')}</span>
                  <i className="bi bi-chevron-down toggle-dropdown" />
                </a>
                <ul>
                  {t('header.dropdown.items', { returnObjects: true }).map(
                    (item, index) => (
                      <li key={`dropdown-${index}`}>
                        <a href="#" className="no-underline">
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </li>
            </ul>
          </nav>

          {/* Mobile Toggle Button */}
          <button
            className="mobile-nav-toggle d-lg-none"
            onClick={() => setMobileNavActive(!mobileNavActive)}
            aria-label="Toggle menu"
          >
            <i className={`bi ${mobileNavActive ? 'bi-x' : 'bi-list'}`}></i>
          </button>

          {/* Book a Table Button */}
          <a
            className="btn-book-a-table d-none d-xl-flex no-underline"
            href="#book-a-table"
            onClick={(e) => handleMenuClick(e, 'book-a-table')}
          >
            {t('header.book_table')}
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
