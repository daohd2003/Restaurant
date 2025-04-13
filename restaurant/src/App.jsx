import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WhyUs from './components/WhyUs';
import Menu from './components/Menu/Menu.jsx';
import Specials from './components/Specials';
import Events from './components/Events';
import BookTable from './components/BookTable';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Chefs from './components/Chefs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './assets/css/main.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/isotope-layout/isotope.pkgd.min.js';
import './assets/vendor/imagesloaded/imagesloaded.pkgd.min.js';
import './assets/vendor/php-email-form/validate.js';
import './assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
  
      AOS.init({
        duration: 1000,
        once: true,
      });
    }, 1000);
  
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div id="preloader"></div>;
  }

  return (
    <>
      <Header />
      <main className="main">
        <Hero />
        <About />
        <WhyUs />
        <Menu />
        <Specials />
        <Events />
        <BookTable />
        <Testimonials />
        <Gallery />
        <Chefs />
        <Contact />
      </main>
      <Footer />
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
}

export default App;