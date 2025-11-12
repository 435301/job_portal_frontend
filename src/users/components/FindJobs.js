import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import WOW from 'wowjs';
import aboutImage from '../../assets/img/about-center.png';
import aaImage from '../../assets/img/aa.png';
import 'animate.css';

const FindJobs = () => {
  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  return (
    <section className="py-5 find-jobs-section bg-light">
      <Container>
        <Row className="align-items-center g-5">
          {/* Left Image Column */}
          <Col lg={5} md={6} xs={12} className="text-center position-relative">
            <div className="main-img position-relative wow fadeInRight" data-wow-delay="0.3s">
              <img
                src={aboutImage}
                alt="Team"
                className="w-100 RotateMoveRight rounded-4 shadow-sm img-fluid"
              />
              
              {/* Small Floating Card */}
              <div className="floating-card small-card p-0 bg-transparent">
                <img src={aaImage} alt="Floating graphic" className="img-fluid" />
              </div>

              {/* Big Floating Card */}
              <div className="floating-card big-card shadow-sm text-center p-3">
                <h1 className="fw-bold text-primary mb-1 fs-2">25K+</h1>
                <h6 className="mb-3 text-dark small">Completed Cases</h6>
                <Button variant="dark" size="sm">Learn more</Button>
              </div>
            </div>
          </Col>

          {/* Right Text Column */}
          <Col lg={6} md={6} xs={12}>
            <h5 className="mb-2 text-muted">Millions Of Jobs.</h5>
            <h2 className="fw-bold mb-3">Find The One That’s Right For You</h2>
            <p className="mb-4 text-muted">
              Search all the open positions on the web. Get your own personalized salary estimate.
              Read reviews on over 600,000 companies worldwide. The right job is out there.
            </p>
            <div className="d-flex flex-wrap align-items-center gap-3">
              <Button variant="primary" className="px-4 py-2">Search Jobs</Button>
              <a href="#" className="fw-semibold text-decoration-underline text-dark">
                Learn more
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FindJobs;
