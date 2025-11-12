import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import roleImage from '../../assets/img/m2.png';

const PopularRoles = () => {
  const roles = [
    { title: 'Full Stack Developer', count: '20.7K+ Jobs', delay: '0.1s' },
    { title: 'Mobile / App Development', count: '20.7K+ Jobs', delay: '0.3s' },
    { title: 'Front End Developer', count: '5.7K+ Jobs', delay: '0.5s' },
    { title: 'DevOps Engineer', count: '3.2K+ Jobs', delay: '0.1s' },
    { title: 'Engineering Manager', count: '2.7K+ Jobs', delay: '0.3s' },
    { title: 'Technical Lead', count: '11.2K+ Jobs', delay: '0.5s' },
  ];

  return (
    <section className="popular-roles container mb-5 p-5">
      <Row className="align-items-center">
        <Col lg={5} className="text-center text-lg-start mb-4 mb-lg-0 wow fadeInUp" data-wow-delay="0.1s">
          <img
            src={roleImage}
            alt="Job Roles"
            className="RotateMoveRight img-fluid mb-3 wow fadeInLeft"
            data-wow-delay="0.1s"
            style={{ maxWidth: '150px' }}
          />
          <h2 className="text-white">
            <span>Discover jobs </span>across <br />popular roles
          </h2>
          <p className="text-white mb-0">Select a role and we’ll show you relevant jobs for it!</p>
        </Col>

        {/* Roles section */}
        <Col lg={7}>
          <Row className="g-3">
            {roles.map((role, index) => (
              <Col sm={6} md={6} lg={6} key={index} className="wow fadeInUp" data-wow-delay={role.delay}>
                <div className="role-card p-3 h-100 d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="role-title mb-1">{role.title}</h6>
                    <p className="role-count mb-0">{role.count}</p>
                  </div>
                  <i className="bi bi-chevron-right role-icon"></i>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default PopularRoles;
