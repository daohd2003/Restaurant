import chef1Img from '/assets/img/chefs/chefs-1.jpg';
import chef2Img from '/assets/img/chefs/chefs-2.jpg';
import chef3Img from '/assets/img/chefs/chefs-3.jpg';

const Chefs = () => {
  return (
    <section id="chefs" className="chefs section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Team</h2>
        <p>Necessitatibus eius consequatur</p>
      </div>
      {/* End Section Title */}
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay={100}>
            <div className="member">
              <img
                src={chef1Img}
                className="img-fluid"
                alt=""
              />
              <div className="member-info">
                <div className="member-info-content">
                  <h4>Walter White</h4>
                  <span>Master Chef</span>
                </div>
                <div className="social">
                  <a href="">
                    <i className="bi bi-twitter-x" />
                  </a>
                  <a href="">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* End Team Member */}
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
            <div className="member">
              <img
                src={chef2Img}
                className="img-fluid"
                alt=""
              />
              <div className="member-info">
                <div className="member-info-content">
                  <h4>Sarah Jhonson</h4>
                  <span>Patissier</span>
                </div>
                <div className="social">
                  <a href="">
                    <i className="bi bi-twitter-x" />
                  </a>
                  <a href="">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* End Team Member */}
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay={300}>
            <div className="member">
              <img
                src={chef3Img}
                className="img-fluid"
                alt=""
              />
              <div className="member-info">
                <div className="member-info-content">
                  <h4>William Anderson</h4>
                  <span>Cook</span>
                </div>
                <div className="social">
                  <a href="">
                    <i className="bi bi-twitter-x" />
                  </a>
                  <a href="">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* End Team Member */}
        </div>
      </div>
    </section>
  )
}

export default Chefs
