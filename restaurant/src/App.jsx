import { useState, useEffect, Profiler } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

import MainLayout from './MainLayout'
import HomePage from './components/pages/HomePage'
import FullMenuPage from './components/Menu/FullMenuPage'
import LoginPage from './components/login/LoginPage';
import ProfilePage from './components/profile/ProfilePage';

import './assets/css/main.css'
import './assets/vendor/bootstrap/css/bootstrap.min.css'
import './assets/vendor/isotope-layout/isotope.pkgd.min.js'
import './assets/vendor/imagesloaded/imagesloaded.pkgd.min.js'
import './assets/vendor/php-email-form/validate.js'
import './assets/vendor/bootstrap/js/bootstrap.bundle.min.js'

function App() {
  const [loading, setLoading] = useState(true)
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      AOS.init({
        duration: 1000,
        once: true,
      })
    }, 1000)

    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true)
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false)
      }
    }

    window.addEventListener('scroll', checkScrollTop)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', checkScrollTop)
    }
  }, [showScroll])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (loading) {
    return <div id="preloader"></div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="menu/all" element={<FullMenuPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <a
        href="#"
        id="scroll-top"
        className={`scroll-top d-flex align-items-center justify-content-center ${
          showScroll ? 'active' : ''
        }`}
        onClick={(e) => {
          e.preventDefault()
          scrollToTop()
        }}
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </Router>
  )
}

export default App
