import React, { useEffect, useRef } from 'react';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

import './Menu.css';

// Import all menu images
import lobsterBisque from '/assets/img/menu/lobster-bisque.jpg';
import breadBarrel from '/assets/img/menu/bread-barrel.jpg';
import cake from '/assets/img/menu/cake.jpg';
import caesar from '/assets/img/menu/caesar.jpg';
import tuscanGrilled from '/assets/img/menu/tuscan-grilled.jpg';
import mozzarella from '/assets/img/menu/mozzarella.jpg';
import greekSalad from '/assets/img/menu/greek-salad.jpg';
import spinachSalad from '/assets/img/menu/spinach-salad.jpg';
import lobsterRoll from '/assets/img/menu/lobster-roll.jpg';

const Menu = () => {
  const isotope = useRef();
  const filterKey = useRef('*');

  // Initialize Isotope after component mounts
  useEffect(() => {
    const iso = new Isotope('.isotope-container', {
      itemSelector: '.isotope-item',
      layoutMode: 'masonry',
      masonry: {
        columnWidth: '.isotope-item'
      }
    });

    isotope.current = iso;

    // Ensure images are loaded before layout
    imagesLoaded('.isotope-container').on('progress', () => {
      iso.layout();
    });

    return () => isotope.current.destroy();
  }, []);

  // Handle filter button clicks
  const handleFilterKeyChange = (key) => {
    filterKey.current = key;
    isotope.current.arrange({ filter: key });
  };

  // Set active filter style
  const setActiveFilter = (key) => {
    const buttons = document.querySelectorAll('.menu-filters li');
    buttons.forEach(btn => {
      btn.classList.toggle('filter-active', btn.dataset.filter === key);
    });
  };

  // Combined filter handler
  const handleFilterClick = (key) => {
    handleFilterKeyChange(key);
    setActiveFilter(key);
  };

  // Menu items data
  const menuItems = [
    { 
      img: lobsterBisque, 
      title: "Lobster Bisque", 
      price: "$5.95", 
      ingredients: "Lorem, deren, trataro, filede, nerada",
      category: "filter-starters"
    },
    { 
      img: breadBarrel, 
      title: "Bread Barrel", 
      price: "$6.95", 
      ingredients: "Lorem, deren, trataro, filede, nerada",
      category: "filter-specialty"
    },
    { 
      img: cake, 
      title: "Crab Cake", 
      price: "$7.95", 
      ingredients: "A delicate crab cake served on a toasted roll with lettuce and tartar sauce",
      category: "filter-starters"
    },
    { 
      img: caesar, 
      title: "Caesar Selections", 
      price: "$8.95", 
      ingredients: "Lorem, deren, trataro, filede, nerada",
      category: "filter-salads"
    },
    { 
      img: tuscanGrilled, 
      title: "Tuscan Grilled", 
      price: "$9.95", 
      ingredients: "Grilled chicken with provolone, artichoke hearts, and roasted red pesto",
      category: "filter-specialty"
    },
    { 
      img: mozzarella, 
      title: "Mozzarella Stick", 
      price: "$4.95", 
      ingredients: "Lorem, deren, trataro, filede, nerada",
      category: "filter-starters"
    },
    { 
      img: greekSalad, 
      title: "Greek Salad", 
      price: "$9.95", 
      ingredients: "Fresh spinach, crisp romaine, tomatoes, and Greek olives",
      category: "filter-salads"
    },
    { 
      img: spinachSalad, 
      title: "Spinach Salad", 
      price: "$9.95", 
      ingredients: "Fresh spinach with mushrooms, hard boiled egg, and warm bacon vinaigrette",
      category: "filter-salads"
    },
    { 
      img: lobsterRoll, 
      title: "Lobster Roll", 
      price: "$12.95", 
      ingredients: "Plump lobster meat, mayo and crisp lettuce on a toasted bulky roll",
      category: "filter-specialty"
    }
  ];

  return (
    <section id="menu" className="menu section">
      {/* Section Title */}
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
              <li 
                onClick={() => handleFilterClick('.filter-starters')}
                data-filter=".filter-starters"
              >
                Starters
              </li>
              <li 
                onClick={() => handleFilterClick('.filter-salads')}
                data-filter=".filter-salads"
              >
                Salads
              </li>
              <li 
                onClick={() => handleFilterClick('.filter-specialty')}
                data-filter=".filter-specialty"
              >
                Specialty
              </li>
            </ul>
          </div>
        </div>

        {/* Menu Items */}
        <div className="row isotope-container" data-aos="fade-up" data-aos-delay={200}>
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className={`col-lg-6 menu-item isotope-item ${item.category}`}
            >
              <img src={item.img} className="menu-img" alt={item.title} />
              <div className="menu-content">
                <a href="#">{item.title}</a>
                <span>{item.price}</span>
              </div>
              <div className="menu-ingredients">
                {item.ingredients}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;