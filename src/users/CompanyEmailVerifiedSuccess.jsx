import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import WOW from "wowjs";
import "../assets/css/login.css";
import "../assets/css/style.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import verifyImage from "../assets/img/reg-2.png"; // Left image
import emailIcon from "../assets/img/icon-5.svg";   // Green verified icon
import arrowIcon from "../assets/img/arrow-small-right.svg"; // 🖼️ Import your arrow image

const EmailVerifiedSuccess = () => {
    useEffect(() => {
        new WOW.WOW({ live: false }).init();
    }, []);

    return (
        <>
            <div className="container-fluid header position-relative overflow-hidden p-0">
                <Navbar />

                <div className="hero-header-2 overflow-hidden px-5 pt-5">
                    <Row className="align-items-center">
                        {/* 🖼️ Left Image Section */}
                        <Col
                            lg={7}
                            className="text-center wow fadeInLeft d-none d-lg-block"
                            data-wow-delay="0.2s"
                        >
                            <img
                                src={verifyImage}
                                alt="Email Verification"
                                className="img-fluid rounded-4"
                                style={{
                                    maxHeight: "550px",
                                    objectFit: "cover",
                                    transition: "0.5s ease-in-out",
                                }}
                            />
                        </Col>

                        {/* ✅ Right Verify Email Card */}
                        <Col lg={5} md={8} sm={10} xs={12}>
                            <Container className="bg-primary-1">
                                <Row className="align-items-center justify-content-center login-container">
                                    <Col xs={12}>
                                        <div
                                            className="verify-card text-center shadow-sm rounded-4 wow fadeInUp"
                                            data-wow-delay="0.3s"
                                        >
                                            {/* Pink Header */}
                                            <div className="verify-header-success py-6">

                                            </div>
                                            <div className="verify-icon mx-auto">
                                                <img
                                                    src={emailIcon}
                                                    alt="Email Icon"
                                                    className=""

                                                />                      </div>
                                            {/* Text Body */}
                                            <div className="verify-body p-4">
                                                <h3 className="fw-bold mb-4">Email Verified Successfully!</h3>
                                                <p className="mb-5">
                                                    Your email address has been <span className="text-success">verified</span>.<br></br> Thank you for confirming your details
                                                </p>


                                                <p className="small mb-4">
                                                    You can now access your account and explore all available features.
                                                </p>

                                                <Button
                                                    variant="dark"
                                                    className="rounded-pill px-5 py-3 fw-semibold"
                                                    onClick={() => (window.location.href = "/login")}
                                                >
                                                    Go to Login   <img className="ms-2"
                                                        src={arrowIcon}
                                                        alt="arrow icon"

                                                    />
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default EmailVerifiedSuccess;
