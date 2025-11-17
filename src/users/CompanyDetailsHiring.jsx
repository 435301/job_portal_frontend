import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const CompanyDetails = () => {
    const [activeAccount, setActiveAccount] = useState("business");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            {/* HEADER */}
            <div className="container-fluid p-0">
                <Navbar />
            </div>

            {/* PAGE WRAPPER */}
            <div className="company-wrapper d-flex justify-content-center align-items-center">
                <div className="mt-4">  <div className="company-box shadow-lg rounded-4 p-4 mt-5">

                    {/* Title */}
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">Company details</h2>
                        <p className="text-muted small">
                            We need these details to identify you and create your account
                        </p>
                    </div>
                      <p>Hiring for</p>
                    {/* Account Type Buttons */}
                    <div className="d-flex gap-3  mb-4">

                        <button
                            className={`account-type-btn ${activeAccount === "business" ? "active" : ""
                                }`}
                            onClick={() => setActiveAccount("business")}
                        >
                            🏢 Your Company
                        </button>

                        <button
                            className={`account-type-btn ${activeAccount === "individual" ? "active" : ""
                                }`}
                            onClick={() => setActiveAccount("individual")}
                        >
                            👤 A Consultancy
                        </button>
                    </div>

                    {/* FORM */}
                    <Form>

                        {/* Company Name */}
                        <Form.Group className="mb-3">
                            <Form.Label>Company</Form.Label>
                            <Form.Control type="text" placeholder="As per Pan Card" />
                        </Form.Group>

                        {/* Number of Employees - Dropdown */}
                        <Form.Group className="mb-3">
                            <Form.Label>Number of employees</Form.Label>
                            <Form.Select className="form-control">
                                <option>Select</option>
                                <option>1 - 10</option>
                                <option>11 - 50</option>
                                <option>51 - 200</option>
                                <option>201 - 500</option>
                                <option>500+</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Your Designation */}
                        <Form.Group className="mb-3">
                            <Form.Label>Your designation</Form.Label>
                            <Form.Control type="text" placeholder="Enter designation" />
                        </Form.Group>

                        {/* Company Address - Textarea */}
                        <Form.Group className="mb-3">
                            <Form.Label>Company address</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter company address"
                            />
                        </Form.Group>

                        {/* Continue Button */}
                        <Button className="continue-btn mt-3" type="submit">
                            Continue →
                        </Button>
                    </Form>

                </div></div>
            </div>

            {/* FOOTER */}
            <Footer />
        </>
    );
};

export default CompanyDetails;
