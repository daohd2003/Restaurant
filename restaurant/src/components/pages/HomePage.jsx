import React from 'react'
import Hero from '../Hero'
import About from '../About'
import WhyUs from '../WhyUs'
import Menu from '../Menu/Menu'
import Specials from '../Specials'
import Events from '../Events'
import BookTable from '../BookTable'
import Testimonials from '../Testimonials'
import Gallery from '../Gallery'
import Chefs from '../Chefs'
import Contact from '../Contact'

const HomePage = () => {
  return (
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
  )
}

export default HomePage
