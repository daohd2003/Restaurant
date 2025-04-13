const WhyUs = () => {
    return (
        <section id="why-us" className="why-us section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>WHY US</h2>
          <p>Why Choose Our Restaurant</p>
        </div>
        {/* End Section Title */}
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={100}>
              <div className="card-item">
                <span>01</span>
                <h4>
                  <div className="stretched-link">
                    Lorem Ipsum
                  </div>
                </h4>
                <p>
                  Ulamco laboris nisi ut aliquip ex ea commodo consequat. Et
                  consectetur ducimus vero placeat
                </p>
              </div>
            </div>
            {/* Card Item */}
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
              <div className="card-item">
                <span>02</span>
                <h4>
                  <div className="stretched-link">
                    Repellat Nihil
                  </div>
                </h4>
                <p>
                  Dolorem est fugiat occaecati voluptate velit esse. Dicta veritatis
                  dolor quod et vel dire leno para dest
                </p>
              </div>
            </div>
            {/* Card Item */}
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={300}>
              <div className="card-item">
                <span>03</span>
                <h4>
                  <div className="stretched-link">
                    Ad ad velit qui
                  </div>
                </h4>
                <p>
                  Molestiae officiis omnis illo asperiores. Aut doloribus vitae sunt
                  debitis quo vel nam quis
                </p>
              </div>
            </div>
            {/* Card Item */}
          </div>
        </div>
      </section>      
    );
  };
  
  export default WhyUs;