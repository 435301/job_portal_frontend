import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Nav, Tab, Button } from 'react-bootstrap';
import * as bootstrap from 'bootstrap'; // ✅ add this line
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import c1 from '../../assets/img/c1.png';
import c2 from '../../assets/img/c2.png';
import c3 from '../../assets/img/c3.png';
import c4 from '../../assets/img/c4.png';
import c5 from '../../assets/img/5.png';
import c6 from '../../assets/img/6.png';
import c7 from '../../assets/img/7.png';
import c8 from '../../assets/img/8.png';

const companies = [
  { logo: c1, name: 'Skype', location: 'London, UK', jobs: 14, title: 'Jr. PHP Developer', badge: 'bg-light-success text-success' },
  { logo: c2, name: 'Pinterest', location: 'Tokyo, Japan', jobs: 5, title: 'Exp. Project Manager', badge: 'bg-light-purple text-purple' },
  { logo: c3, name: 'Shopify', location: 'Paris, France', jobs: 22, title: 'Sr. WordPress Developer', badge: 'bg-light-danger text-danger' },
  { logo: c4, name: 'Deezroo', location: 'Laravel Developer', jobs: 14, title: 'Jr. PHP Developer', badge: 'bg-light-info text-info' },
  { logo: c5, name: 'Photoshop', location: 'London, UK', jobs: 14, title: 'Sr. UI/UX Designer', badge: 'bg-light-success text-success' },
  { logo: c6, name: 'Firefox', location: 'Tokyo, Japan', jobs: 5, title: 'Exp. Project Manager', badge: 'bg-light-purple text-purple' },
  { logo: c7, name: 'AirBNB', location: 'San Francisco, USA', jobs: 22, title: 'Sr. CodeIgniter Developer', badge: 'bg-light-danger text-danger' },
  { logo: c8, name: 'Snapchat', location: 'Los Angeles, USA', jobs: 14, title: 'Jr. PHP Developer', badge: 'bg-light-info text-info' },
];

const CompanyCard = ({ company, delay }) => (
  <Col md={6} lg={3} className={`wow fadeInUp`} data-wow-delay={delay}>
    <div className="job-card  h-100">
      <div className="d-flex align-items-start justify-content-between">
        <div className="d-flex align-items-center">
          <img src={company.logo} className="company-logo" alt={company.name} />
          <div className="ms-3">
            <h5 className="company-name mb-1">{company.name}</h5>
            <p className="company-location mb-0 text-muted"><i className="bi bi-geo-alt"></i> {company.location}</p>
          </div>
        </div>
        <span className={`badge ${company.badge}`}>{company.jobs} jobs</span>
      </div>
      <div className="d-flex align-items-center justify-content-between card-btn mt-4">
        <p className="job-title mb-0 text-muted"><i className="bi bi-briefcase-fill"></i> {company.title}</p>
        <Button className="btn-arrow"><i className="bi bi-arrow-up-right"></i></Button>
      </div>
    </div>
  </Col>
);

const LeadingCompanies = () => {
  const tabListRef = useRef(null);
  const tabContentRef = useRef(null);

  useEffect(() => {
    const moreTab = document.getElementById('more-tab');
    const handleMoreTabClick = (e) => {
      e.preventDefault();
      const newTabs = [
        { id: 'finance-tab', target: '#finance', title: 'Finance' },
        { id: 'education-tab', target: '#education', title: 'Education' },
        { id: 'retail-tab', target: '#retail', title: 'Retail' },
      ];

      newTabs.forEach((tab, index) => {
        if (!document.getElementById(tab.id)) {
          const li = document.createElement('li');
          li.className = 'nav-item';
          li.role = 'presentation';
          const button = document.createElement('button');
          button.className = `nav-link ${index === 0 ? 'active' : ''}`;
          button.id = tab.id;
          button.setAttribute('data-bs-toggle', 'tab');
          button.setAttribute('data-bs-target', tab.target);
          button.type = 'button';
          button.role = 'tab';
          button.setAttribute('aria-controls', tab.target.replace('#', ''));
          button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
          button.textContent = tab.title;
          li.appendChild(button);
          tabListRef.current.insertBefore(li, moreTab.parentElement);

          const div = document.createElement('div');
          div.className = `tab-pane fade ${index === 0 ? 'show active' : ''}`;
          div.id = tab.target.replace('#', '');
          div.role = 'tabpanel';
          div.setAttribute('aria-labelledby', tab.id);
          div.textContent = `${tab.title} content`;
          tabContentRef.current.appendChild(div);
        }
      });

      moreTab.parentElement.remove();
      new bootstrap.Tab(document.querySelector(`#${newTabs[0].id}`)).show();
    };

    if (moreTab) {
      moreTab.addEventListener('click', handleMoreTabClick);
    }

    return () => {
      if (moreTab) {
        moreTab.removeEventListener('click', handleMoreTabClick);
      }
    };
  }, []);

  return (
    <section className="section-container job-section Companies mb-5">
      <Container>
        <h2 className="text-center mb-2">Leading Companies</h2>
        <p className="text-center">Find the job that's perfect for you over 800 new opportunities added every day.</p>
        <Nav variant="tabs" className="mt-5" id="companyTabs" role="tablist" ref={tabListRef}>
          <Nav.Item>
            <Nav.Link eventKey="all" className="px-5" active>All</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="it">IT Services</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tech">Technology</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="health">Healthcare & Services</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="manu">Manufacturing & Production</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link id="more-tab">+4 more</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content id="companyTabsContent" ref={tabContentRef}>
          {['all', 'it', 'tech', 'health', 'manu'].map((tab, index) => (
            <Tab.Pane eventKey={tab} key={tab} className={tab === 'all' ? 'show active' : ''}>
              <Container>
                <Row className="g-3">
                  {companies.map((company, idx) => (
                    <CompanyCard company={company} delay={`${0.1 + idx * 0.2}s`} key={idx} />
                  ))}
                </Row>
              </Container>
            </Tab.Pane>
          ))}
        </Tab.Content>
        <div className="text-center mt-5 wow fadeInUp" data-wow-delay="0.1s">
          <Button className="btn-view-all">
            View all Companies <i className="bi bi-arrow-right"></i>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default LeadingCompanies;