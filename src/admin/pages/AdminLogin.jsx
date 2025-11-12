import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // Add your login API call or logic here
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-light"
      style={{
        background:
          "transparent radial-gradient(closest-side at 82% 54%, #2CB0DD 0%, #20477C 100%) 0% 0% no-repeat padding-box",
      }}
    >
      <Container>
        <Row className="justify-content-center mt-3">
          <Col md={5} sm={10}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <i className="bi bi-person-circle fs-1 text-primary"></i>
                  <h4 className="mt-2 fw-bold">Admin Login</h4>
                  <p className="text-muted mb-0">Access your admin dashboard</p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Form.Check type="checkbox" label="Remember me" />
                    <a href="#!" className="text-primary small">
                      Forgot Password?
                    </a>
                  </div>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" className="rounded-3">
                      <i className="bi bi-box-arrow-in-right me-2"></i> Login
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <p className="text-center mt-4 text-white small">
              &copy; {new Date().getFullYear()} Admin Panel
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLogin;
