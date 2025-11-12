import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import WOW from 'wowjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import bannerImage from '../../assets/img/bg-5.png';

const Banner = () => {
  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  return (
    <section className="banner-container py-5">
      <Container>
        <Row className="align-items-center justify-content-center text-center text-md-start">
          {/* Left Column */}
          <Col lg={4} md={6} className="wow fadeInUp mb-4 mb-md-0" data-wow-delay="0.1s">
            <h2 className="banner-text fw-bold">
              Find the talent to<br />grow your <span>business</span>.
            </h2>
            <p className="banner-subtitle mb-4">
              Lorem ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <Button className="btn btn-get-started">Get Started</Button>
          </Col>

          {/* Middle Stats */}
          <Col lg={4} md={6} className="wow fadeInUp mb-4 mb-lg-0" data-wow-delay="0.3s">
            <Row className="g-3 justify-content-center align-items-center">
              <Col xs={6}>
                <div className="stats-card text-center p-3">
                  <span className="stats-number d-block fw-bold fs-4">10K+</span>
                  <span className="stats-label">Active Job Postings</span>
                </div>
                <div className="stats-card text-center p-3 mt-3">
                  <span className="stats-number d-block fw-bold fs-4">2K+</span>
                  <span className="stats-label">Hiring Companies</span>
                </div>
              </Col>
              <Col xs={6}>
                <div className="stats-card text-center p-3">
                  <span className="stats-number d-block fw-bold fs-4">5M+</span>
                  <span className="stats-label">Graduates Connected</span>
                </div>
              </Col>
            </Row>
          </Col>

          {/* Right Column (Image) */}
          <Col lg={4} md={8} className="text-center wow fadeInUp mt-4 mt-lg-0" data-wow-delay="0.5s">
            <img
              src={bannerImage}
              alt="Business illustration"
              className="RotateMoveLeft img-fluid"
              style={{ maxHeight: '380px' }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Banner;
