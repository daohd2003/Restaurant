import React, { useEffect, useState } from 'react'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Thêm offset kiểm tra
      
      document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Xử lý click menu
  const handleMenuClick = (e, sectionId) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      // Thêm offset để tính toán vị trí scroll
      const offset = 100 // Điều chỉnh theo chiều cao header của bạn
      const sectionTop = section.offsetTop - offset

      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth',
      })

      setActiveSection(sectionId)
    }
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
              <a href="mailto:contact@example.com" className="no-underline">
                contact@example.com
              </a>
            </i>
            <i className="bi bi-phone d-flex align-items-center ms-4">
              <span>+1 5589 55488 55</span>
            </i>
          </div>
          <div className="languages d-none d-md-flex align-items-center">
            <ul>
              <li>En</li>
              <li>
                <a href="#" className="no-underline">
                  De
                </a>
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
            <h1 className="sitename">Restaurantly</h1>
          </a>

          {/* Nav Menu */}
          <nav id="navmenu" className="navmenu">
            <ul>
              {[
                { id: 'hero', name: 'Home' },
                { id: 'about', name: 'About' },
                { id: 'menu', name: 'Menu' },
                { id: 'specials', name: 'Specials' },
                { id: 'events', name: 'Events' },
                { id: 'chefs', name: 'Chefs' },
                { id: 'gallery', name: 'Gallery' },
                { id: 'contact', name: 'Contact' },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`no-underline ${
                      activeSection === item.id ? 'active' : ''
                    }`}
                    onClick={(e) => handleMenuClick(e, item.id)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}

              {/* Dropdown Menu */}
              <li className="dropdown">
                <a href="#" className="no-underline">
                  <span>Dropdown</span>
                  <i className="bi bi-chevron-down toggle-dropdown" />
                </a>
                <ul>
                  <li>
                    <a href="#" className="no-underline">
                      Dropdown 1
                    </a>
                  </li>
                  <li className="dropdown">
                    <a href="#" className="no-underline">
                      <span>Deep Dropdown</span>
                      <i className="bi bi-chevron-down toggle-dropdown" />
                    </a>
                    <ul>
                      <li>
                        <a href="#" className="no-underline">
                          Deep Dropdown 1
                        </a>
                      </li>
                      <li>
                        <a href="#" className="no-underline">
                          Deep Dropdown 2
                        </a>
                      </li>
                      <li>
                        <a href="#" className="no-underline">
                          Deep Dropdown 3
                        </a>
                      </li>
                      <li>
                        <a href="#" className="no-underline">
                          Deep Dropdown 4
                        </a>
                      </li>
                      <li>
                        <a href="#" className="no-underline">
                          Deep Dropdown 5
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#" className="no-underline">
                      Dropdown 2
                    </a>
                  </li>
                  <li>
                    <a href="#" className="no-underline">
                      Dropdown 3
                    </a>
                  </li>
                  <li>
                    <a href="#" className="no-underline">
                      Dropdown 4
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list" />
          </nav>

          {/* Book a Table Button */}
          <a
            className="btn-book-a-table d-none d-xl-flex no-underline"
            href="#book-a-table"
            onClick={(e) => handleMenuClick(e, 'book-a-table')}
          >
            Book a Table
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
