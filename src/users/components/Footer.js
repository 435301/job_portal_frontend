import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../assets/img/logo.png';

const Footer = () => {
  return (
    <footer className="footer-section text-white pt-4">
      <div className="border-bottom b-footer pb-3 align-items-center">
        <Container>
          <Row>
            <Col lg={6}>
              <div className="social-icons mt-3">
                <span className="fw-bold me-3">Follow Us</span>
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-twitter"></i></a>
                <a href="#"><i className="bi bi-linkedin"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
              </div>
            </Col>
            {/* <Col lg={6} className="text-end">
              <Row className="text-center">
                <Col xs={6} md={3} className="mb-3 mb-md-0">
                  <h4 className="mb-0 fw-bold text-white">2548</h4>
                  <small>Jobs Posted</small>
                </Col>
                <Col xs={6} md={3} className="mb-3 mb-md-0">
                  <h4 className="mb-0 fw-bold text-white">1562</h4>
                  <small>Jobs Added</small>
                </Col>
                <Col xs={6} md={3} className="mb-3 mb-md-0">
                  <h4 className="mb-0 fw-bold text-white">1785</h4>
                  <small>Freelancer</small>
                </Col>
                <Col xs={6} md={3}>
                  <h4 className="mb-0 fw-bold text-white">5649</h4>
                  <small>Companies</small>
                </Col>
              </Row>
            </Col> */}
          </Row>
        </Container>
      </div>
      <div className="footer-main pb-3 pt-4">
        <Container>
          <Row className="gy-4">
            <Col md={4}>
              <div className="footer-logo mb-3">
                <img src={logo} alt="Logo" className="img-fluid mb-3" />
              </div>
              <p>
                Dolor magna eget est lorem. Eu augue ut lectus arcu. Aliquet risus feugiat in ante metus dictum.
              </p>
              <ul className="list-unstyled mt-3">
                <li className="mb-2"><i className="bi bi-geo-alt me-2"></i>141, First Floor, 12 St Roots Terrace, Los Angeles 90010.</li>
                <li className="mb-2"><i className="bi bi-telephone me-2"></i>+91-123 456 7890</li>
                <li><i className="bi bi-envelope me-2"></i>info@aftergraduate.com</li>
              </ul>
            </Col>
            <Col md={2}>
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled footer-links">
                <li><a href="#">Job Packages</a></li>
                <li><a href="#">Post New Job</a></li>
                <li><a href="#">Job Listings</a></li>
                <li><a href="#">Employers</a></li>
                <li><a href="#">Candidates</a></li>
                <li><a href="#">Terms of Use</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5 className="fw-bold mb-3">For Employees</h5>
              <ul className="list-unstyled footer-links">
                <li><a href="#">Browse Jobs</a></li>
                <li><a href="#">Upload CV</a></li>
                <li><a href="#">Saved Jobs</a></li>
                <li><a href="#">Job Alerts</a></li>
                <li><a href="#">Career Advice</a></li>
                <li><a href="#">Profile Dashboard</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5 className="fw-bold mb-3">For Companies</h5>
              <ul className="list-unstyled footer-links">
                <li><a href="#">Post a Job</a></li>
                <li><a href="#">Manage Jobs</a></li>
                <li><a href="#">Browse Candidates</a></li>
                <li><a href="#">Company Dashboard</a></li>
                <li><a href="#">Hiring Plans</a></li>
                <li><a href="#">Recruitment Support</a></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <p className="mb-0">© 2025 All Rights Reserved | <b><span className="text-info">Aftergraduate.com</span></b></p>
            </Col>
            <Col md={6} className="text-end">
              <p className="mb-0">Designed & Developed by <a href="https://richlabz.com/" target="_blank" className="fw-bold text-info">Richlabz</a></p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;