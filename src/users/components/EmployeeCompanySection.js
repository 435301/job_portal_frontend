import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import employeeImage from '../../assets/img/banner-home-0.png';
import companyImage from '../../assets/img/banner-home-02.png';

const EmployeeCompanySection = () => {
  return (
    <section className="section-container py-5">
      <Container>
        <Row className="g-4">
          <Col md={6}>
            <div className="card-custom wow fadeInLeft" data-wow-delay="0.1s">
              <Row className="align-items-center">
                <Col lg={6}>
                  <h3 className="card-title mb-3">For Employees</h3>
                  <p className="card-text mb-4">Build your professional profile and get noticed by top companies.</p>
                  <Button className="btn btn-custom">Upload CV</Button>
                </Col>
                <Col lg={6} className="text-center">
                  <img src={employeeImage} alt="Employee" className="img-fluid rounded" />
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={6}>
            <div className="card-custom wow fadeInLeft" data-wow-delay="0.3s">
              <Row className="align-items-center">
                <Col lg={6}>
                  <h3 className="card-title mb-3">For Companies</h3>
                  <p className="card-text mb-4">Find skilled professionals and hire the right talent faster.</p>
                  <Button className="btn btn-custom">Post Jobs</Button>
                </Col>
                <Col lg={6} className="text-center">
                  <img src={companyImage} alt="Employee" className="img-fluid rounded" />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EmployeeCompanySection;