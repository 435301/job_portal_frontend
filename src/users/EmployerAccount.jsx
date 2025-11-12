import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import WOW from "wowjs";

import "../assets/css/login.css";
import "../assets/css/style.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const EmployerAccount = () => {
    useEffect(() => {
        new WOW.WOW({ live: false }).init();
    }, []);

    return (
        <>
            {/* Header & Page Wrapper */}
            <div className="container-fluid header-1 position-relative overflow-hidden p-0 min-vh-100 d-flex flex-column">
                {/* Navbar */}
                <Navbar />

                {/* Centered Form Section */}
                <div className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
                    <Container>
                        <Row className="justify-content-center mt-5">
                            <Col lg={6} md={8} sm={10}>
                                <div
                                    className="card border-0 rounded-4 shadow-sm wow fadeInUp"
                                    data-wow-delay="0.2s"
                                >
                                    <div className="card-body p-4">
                                        <div className="text-center mb-4">
                                            <h3 className="fw-bold">Create an Employer Account</h3>
                                          
                                        </div>

                                        {/* Employer Login Form */}
                                        <Form>
                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>Company Name<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter your company name"
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>First Name<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>Last Name<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>Email<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="Enter your email address"
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>Mobile Number<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter your mobile number"
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>State<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter your state"
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>City<span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter your city"
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>How did you hear about us?</Form.Label>
                                                        <Form.Select>
                                                            <option value="">Select an option</option>
                                                            <option>Google Search</option>
                                                            <option>LinkedIn</option>
                                                            <option>Friend or Colleague</option>
                                                            <option>Social Media</option>
                                                            <option>Other</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <div className="d-flex align-items-center mb-4 mt-3">
                                                <input
                                                    className="form-check-input me-3"
                                                    type="checkbox"
                                                    id="termsCheck"
                                                    defaultChecked={false} // or true if you want it pre-checked
                                                />
                                                <label htmlFor="termsCheck" className="form-check-label">
                                                    I agree to the terms & conditions
                                                </label>
                                            </div>

                                            <div className=" mt-4">
                                                <Button type="submit" variant="dark" className="px-4 mb-2">
                                                  Continue
                                                </Button>

                                            </div>
                                        </Form>

                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
};

export default EmployerAccount;
