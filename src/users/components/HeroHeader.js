import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import sliderImage from '../../assets/img/slider-1.png';

const HeroHeader = () => {
  return (
    <div className="hero-header overflow-hidden px-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={7} className="wow fadeInLeft" data-wow-delay="0.1s">
            <h1 className="display-4 text-white mb-4 wow fadeInUp" data-wow-delay="0.3s">
              Get the perfect<br /> <span style={{ color: '#00aaff' }}>new job</span> here
            </h1>
            <p className="fs-5 mb-4 pb-3 wow fadeInUp" data-wow-delay="0.5s">
              Each month, more than 3 million job seekers turn to our website in their search for work,<br />
              making over 140,000 applications every single day.
            </p>
            <p style={{ fontSize: '18px !important' }}>
              Start your <span className="text-primary">job search</span>
            </p>
            <div className="search-bar bg-white rounded-pill shadow-sm d-flex align-items-center justify-content-between px-3 py-2 flex-wrap" style={{ maxWidth: '708px', gap: '4px' }}>
              <div className="d-flex align-items-center flex-grow-1 border-end flex-nowrap">
                <i className="bi bi-briefcase-fill text-muted"></i>
                <Form.Control type="text" className="border-0 shadow-none" placeholder="Search by Job title, skill" />
              </div>
              <div className="d-flex align-items-center pe-3 flex-shrink-1" style={{ minWidth: '150px' }}>
                <i className="bi bi-geo-alt me-2 text-muted"></i>
                <Form.Select className="border-0 shadow-none p-0" style={{ minWidth: '100px', fontSize: '15px' }}>
                  <option>Location</option>
                  <option>New York</option>
                  <option>San Francisco</option>
                  <option>Chicago</option>
                  <option>London</option>
                  <option>Remote</option>
                </Form.Select>
              </div>
              <div className="d-flex align-items-center pe-3 flex-shrink-0">
                <Form.Check type="switch" id="remoteSwitch" className="mb-0 me-2" />
                <Form.Label htmlFor="remoteSwitch" className="ms-1 text-muted small">Remote</Form.Label>
              </div>
              <Button className="btn btn-primary rounded-pill px-4 flex-shrink-0">Search jobs</Button>
            </div>
          </Col>
          <Col lg={5} className="text-center wow fadeInRight" data-wow-delay="0.2s">
            <img src={sliderImage} alt="Job Search Hero" className="RotateMoveLeft img-fluid w-100 h-100" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroHeader;