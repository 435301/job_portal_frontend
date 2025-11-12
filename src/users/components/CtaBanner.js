import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const CtaBanner = () => {
  return (
    <section className="my-3">
      <Container className="cta-banner py-5 px-0">
        <Row className="banner-box d-flex flex-column flex-md-row align-items-center justify-content-between text-white px-5 py-4">
          <Col lg={9} className="wow fadeInRight" data-wow-delay="0.1s">
            <h2 className="text-white mb-2">
              Find the talent needed to get <br />
              your <span className="text-accent">business</span> growing.
            </h2>
            <p className="mb-0 text-light">Amet minim mollit non deserunt ullamco est sit aliqua dolor.</p>
          </Col>
          <Col lg={3} className="mt-4 mt-md-0 wow fadeInRight" data-wow-delay="0.3s">
            <Button href="#" className="btn btn-light btn-lg rounded-pill px-4">Get Started →</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CtaBanner;