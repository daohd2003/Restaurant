import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active section detection
      const scrollPosition = window.scrollY + 150;
      document.querySelectorAll('section[id]').forEach((section) => {
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileNavActive && 
          !e.target.closest('.navmenu') && 
          !e.target.closest('.mobile-nav-toggle')) {
        setMobileNavActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileNavActive]);

  const handleMenuClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
      setMobileNavActive(false);
    }
  };

  const toggleDropdown = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  return (
    <header id="header" className={`header fixed-top ${scrolled ? 'header-scrolled' : ''}`}>
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
          <nav id="navmenu" className={`navmenu ${mobileNavActive ? 'active' : ''}`}>
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
                    className={`no-underline ${activeSection === item.id ? 'active' : ''}`}
                    onClick={(e) => handleMenuClick(e, item.id)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}

              {/* Dropdown Menu */}
              <li className={`dropdown ${activeDropdown === 'main' ? 'active' : ''}`}>
                <a 
                  href="#" 
                  className="no-underline"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown('main');
                  }}
                >
                  <span>Dropdown</span>
                  <i className="bi bi-chevron-down toggle-dropdown" />
                </a>
                <ul>
                  <li>
                    <a href="#" className="no-underline">Dropdown 1</a>
                  </li>
                  {/* <li className={`dropdown ${activeDropdown === 'deep' ? 'active' : ''}`}>
                    <a 
                      href="#" 
                      className="no-underline"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown('deep');
                      }}
                    >
                      <span>Deep Dropdown</span>
                      <i className="bi bi-chevron-down toggle-dropdown" />
                    </a>
                    <ul>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <li key={`deep-${i}`}>
                          <a href="#" className="no-underline">Deep Dropdown {i}</a>
                        </li>
                      ))}
                    </ul>
                  </li> */}
                  <li>
                    <a href="#" className="no-underline">Dropdown 2</a>
                  </li>
                  <li>
                    <a href="#" className="no-underline">Dropdown 3</a>
                  </li>
                  <li>
                    <a href="#" className="no-underline">Dropdown 4</a>
                  </li>
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
            Book a Table
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;