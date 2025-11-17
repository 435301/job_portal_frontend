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

                    {/* Account Type Buttons */}
                    <p>You're creating account as</p>
                    <div className="d-flex gap-3 mb-4">
                        <button
                            className={`account-type-btn ${activeAccount === "business" ? "active" : ""
                                }`}
                            onClick={() => setActiveAccount("business")}
                        >
                            🏢 Company Business
                        </button>

                        <button
                            className={`account-type-btn ${activeAccount === "individual" ? "active" : ""
                                }`}
                            onClick={() => setActiveAccount("individual")}
                        >
                            👤 Individual/proprietor
                        </button>
                    </div>

                    {/* FORM */}
                    <Form>
                        {/* Full Name */}
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="As per Pan Card" />
                        </Form.Group>

                        {/* Email */}
                        <Form.Group className="mb-3">
                            <Form.Label>Official Email ID</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email ID" />
                        </Form.Group>

                        {/* Password */}
                        <Form.Group className="mb-3 position-relative">
                            <Form.Label>Create Password</Form.Label>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter New Password"
                            />
                            <span
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                👁️
                            </span>
                        </Form.Group>

                        {/* Continue Button */}
                        <a href="/company-profile" className="btn continue-btn mt-3" type="submit">
                            Continue →
                        </a>
                    </Form>
                </div></div>
            </div>

            {/* FOOTER */}
            <Footer />
        </>
    );
};

export default CompanyDetails;
