import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import icon1 from '../../assets/img/icon-1.png';
import icon2 from '../../assets/img/icon-2.png';
import icon3 from '../../assets/img/icon-3.png';

const RecentJobs = () => {
  return (
    <section className="py-5 recent-jobs-section">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 wow fadeInUp" data-wow-delay="0.1s">
          <div>
            <h2 className="mb-1">Recent Jobs</h2>
            <p className="mb-0">Find the right role for you in the most in-demand tech fields.</p>
          </div>
          <Button href="#" variant="outline-primary" className="rounded-pill px-4">View all Jobs →</Button>
        </div>
        <Row className="g-4">
          <Col md={4} className="wow fadeInUp" data-wow-delay="0.1s">
            <Card className="job-card border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <img src={icon1} width="45" className="me-3" alt="Stripe Logo" />
                    <div>
                      <h6 className="fw-bold mb-0">Frontend Engineer</h6>
                      <small className="text-muted">Stripe</small>
                    </div>
                  </div>
                  <span className="badge bg-light text-success border rounded-pill px-3">New</span>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="badge bg-danger text-danger px-3 py-2">
                    <i className="bi bi-geo-alt-fill me-1"></i>San Francisco, CA
                  </span>
                  <span className="badge bg-info px-3 py-2">
                    <i className="bi bi-briefcase-fill-fill me-1"></i>Full time
                  </span>
                </div>
                <p className="mb-1">Salary: $120k – $150k</p>
                <div className="text-end d-flex justify-content-between align-items-center mt-4">
                  <small className="text-muted">Posted 2 days ago</small>
                  <Button href="#" className="btn btn-primary">Apply</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="wow fadeInUp" data-wow-delay="0.3s">
            <Card className="job-card border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <img src={icon2} width="45" className="me-3" alt="Figma Logo" />
                    <div>
                      <h6 className="fw-bold mb-0">Frontend Engineer</h6>
                      <small className="text-muted">Figma</small>
                    </div>
                  </div>
                  <span className="badge bg-light text-success border rounded-pill px-3">New</span>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="badge bg-danger text-danger px-3 py-2">
                    <i className="bi bi-geo-alt-fill me-1"></i>San Francisco, CA
                  </span>
                  <span className="badge bg-info px-3 py-2">
                    <i className="bi bi-briefcase-fill-fill me-1"></i>Full time
                  </span>
                </div>
                <p className="mb-1">Salary: $120k – $150k</p>
                <div className="text-end d-flex justify-content-between align-items-center mt-4">
                  <small className="text-muted">Posted 2 days ago</small>
                  <Button href="#" className="btn btn-primary">Apply</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="wow fadeInUp" data-wow-delay="0.5s">
            <Card className="job-card border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <img src={icon3} width="45" className="me-3" alt="AI Logo" />
                    <div>
                      <h6 className="fw-bold mb-0">AI Research Scientist</h6>
                      <small className="text-muted">Stripe</small>
                    </div>
                  </div>
                  <span className="badge bg-light text-success border rounded-pill px-3">New</span>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="badge bg-danger text-danger px-3 py-2">
                    <i className="bi bi-geo-alt-fill me-1"></i>San Francisco, CA
                  </span>
                  <span className="badge bg-info px-3 py-2">
                    <i className="bi bi-briefcase-fill-fill me-1"></i>Full time
                  </span>
                </div>
                <p className="mb-1">Salary: $120k – $150k</p>
                <div className="text-end d-flex justify-content-between align-items-center mt-4">
                  <small className="text-muted">Posted 2 days ago</small>
                  <Button href="#" className="btn btn-primary">Apply</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RecentJobs;