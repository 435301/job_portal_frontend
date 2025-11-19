import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import WOW from "wowjs";
import "../assets/css/login.css";
import "../assets/css/style.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//  Import left-side image
import verifyImage from "../assets/img/reg-2.png"; // update path if needed
import emailIcon from "../assets/img/email.png";
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const email = location.state?.email
  console.log('email', email)
  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  return (
    <>
      <div className="container-fluid header position-relative overflow-hidden p-0">
        <Navbar />

        <div className="hero-header-2 overflow-hidden px-5 pt-5">
          <Row className="align-items-center">
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

            <Col lg={5} md={8} sm={10} xs={12}>
              <Container className="bg-primary-1">
                <Row className="align-items-center justify-content-center login-container">
                  <Col xs={12}>
                    <div
                      className="verify-card text-center shadow-sm rounded-4 wow fadeInUp"
                      data-wow-delay="0.3s"
                    >
                      <div className="verify-header py-6">

                      </div>
                      <div className="verify-icon mx-auto">
                        <img
                          src={emailIcon}
                          alt="Email Icon"
                          className=""
                          
                        />                      </div>
                      {/* Text Body */}
                      <div className="verify-body p-4">
                        <h3 className="fw-bold mb-4">Verify your Email</h3>
                        <p className="mb-0">
                          We’ve emailed a verification link to
                        </p>
                        <p className="fw-semibold text-danger mb-4">
                          {email}
                        </p>
                        <p className=" mb-5 pb-2">
                          Please check your inbox and click the link <br></br>to verify your
                          email address
                        </p>
                        <p className="small ">
                          Didn’t receive the email?{" "}
                          <a
                            href="#"
                            className="text-danger text-decoration-none fw-semibold"
                          >
                            Resend link
                          </a>
                        </p>
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

export default VerifyEmail;
