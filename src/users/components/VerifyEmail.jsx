import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import WOW from "wowjs";
import "../assets/css/login.css";
import "../assets/css/style.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const VerifyEmail = () => {
  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  return (
    <>
      <div className="container-fluid header position-relative overflow-hidden p-0">
        <Navbar />

        <div className="hero-header-2 overflow-hidden px-5 pt-5">
          <Row className="justify-content-center align-items-center">
            <Col lg={6} md={8} sm={10} xs={12}>
              <div
                className="card border-0 shadow-sm rounded-4 text-center wow fadeInUp"
                data-wow-delay="0.3s"
                style={{ backgroundColor: "#fff", padding: "40px" }}
              >
                {/* Email Icon */}
                <div className="mb-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                    alt="Email Icon"
                    style={{ width: "90px", height: "90px" }}
                  />
                </div>

                {/* Heading */}
                <h3 className="fw-bold mb-3">Verify your Email</h3>

                {/* Message */}
                <p className="text-muted mb-2">
                  We’ve emailed a verification link to
                </p>
                <p className="fw-semibold text-danger mb-4">
                  padmavathi.richlabz@gmail.com
                </p>
                <p className="text-muted mb-4">
                  Please check your inbox and click the link to verify your email address.
                </p>

                {/* Resend link */}
                <p className="small text-muted">
                  Didn’t receive the email?{" "}
                  <a
                    href="#"
                    className="text-danger text-decoration-none fw-semibold"
                  >
                    Resend link
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default VerifyEmail;
