import React from 'react';
import { Navbar as BootstrapNavbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../../assets/img/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  return (
    <BootstrapNavbar expand="lg" className="navbar fixed-top navbar-light px-4 px-lg-5 py-3 py-lg-0">
      <BootstrapNavbar.Brand href="/" className="p-0">
        <img src={logo} alt="Logo" />
      </BootstrapNavbar.Brand>

      <BootstrapNavbar.Toggle aria-controls="navbarCollapse">
        <FontAwesomeIcon icon={faBars} className="text-white" />
      </BootstrapNavbar.Toggle>

      <BootstrapNavbar.Collapse id="navbarCollapse">
        <Nav className="ms-auto py-0">
          <Nav.Link href="/jobs" className="nav-item nav-link active">Jobs</Nav.Link>
          <Nav.Link href="/company" className="nav-item nav-link">Companies</Nav.Link>

          <NavDropdown title="Career Guidance" className="nav-item">
            <NavDropdown.Item href="#">Features</NavDropdown.Item>
            <NavDropdown.Item href="#">Pricing</NavDropdown.Item>
            <NavDropdown.Item href="#">Blog</NavDropdown.Item>
            <NavDropdown.Item href="#">Testimonial</NavDropdown.Item>
            <NavDropdown.Item href="#">404 Page</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="For Employers" className="nav-item">
            <NavDropdown.Item href="#">Features</NavDropdown.Item>
            <NavDropdown.Item href="#">Pricing</NavDropdown.Item>
            <NavDropdown.Item href="#">Blog</NavDropdown.Item>
            <NavDropdown.Item href="#">Testimonial</NavDropdown.Item>
            <NavDropdown.Item href="#">404 Page</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="/candidates" className="nav-item nav-link">Candidates</Nav.Link>

          {/* 🔻 User Icon Dropdown (White Icon) */}
          <NavDropdown
            align="end"
            title={<FontAwesomeIcon icon={faUserCircle} className="fs-3 text-white" />}
            id="user-menu"
            className="ms-3"
          >
            <NavDropdown.Item href="#">My Profile</NavDropdown.Item>
            <NavDropdown.Item href="#">Dashboard</NavDropdown.Item>
            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/change-password">Change Password</NavDropdown.Item>
            <NavDropdown.Item href="/login">Logout</NavDropdown.Item>

          </NavDropdown>

        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
