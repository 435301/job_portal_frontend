import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
// import WOW from "wowjs";
import candidateImage from "../assets/img/reg-1.png";
import employerImage from "../assets/img/reg-2.png";
import "../assets/css/login.css";
import "../assets/css/style.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FormErrors, validateRegisterForm } from "../common/validation.tsx";
import { useAppSelector } from "../redux/hooks.tsx"
import { clearRegisterState, registerEmployee } from "../redux/slices/registerSlice.tsx";
import { fetchCaptcha } from "../redux/slices/captchaSlice.tsx";
import { AppDispatch } from "../redux/store.tsx";
import { getUserIpAddress } from "../common/ipAddress.tsx";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
    const { loading, message, error, verificationCode } = useAppSelector((state) => state.register);
 const { captchaSvg, captchaText } = useAppSelector((state) => state.captcha);
 console.log('captchaText', captchaText, captchaSvg);
  useEffect(() => {
    // new WOW.WOW({ live: false }).init();
     dispatch(fetchCaptcha());
    return () => {
      dispatch(clearRegisterState());
    };
  }, [dispatch]);


  const [activeTab, setActiveTab] = useState("candidate");

  // Form Data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    captcha: "",
    city: "",
    selfOrOther: 1,
    ipAddress: "",
  });


  // Validation Errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleFetchCaptcha = () => dispatch(fetchCaptcha());

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateRegisterForm(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        // const ip = await getUserIpAddress();
        // Update selfOrOther based on activeTab
        const payload = {
          ...formData,
           captcha: captchaText.trim(),
          selfOrOther: activeTab === "candidate" ? 1 : 2,
          ipAddress: "127.02.99.11",
        };
        const resultAction = await dispatch(registerEmployee(payload));
        if (registerEmployee.fulfilled.match(resultAction)) {
  navigate("/verify-email", {
    state: { email: formData.email }
  });
}

      } catch (err) {
        console.error("Registration failed", err);
      }
    }
  };

  const sideImage = activeTab === "candidate" ? candidateImage : employerImage;

  return (
    <>
      <div className="container-fluid header position-relative overflow-hidden p-0">
        <Navbar />

        <div className="hero-header-2 overflow-hidden px-5 pt-5">
          <Row className="align-items-center">

            {/* Left Side Image */}
            <Col
              lg={7}
              className="text-center wow fadeInLeft d-none d-lg-block"
              data-wow-delay="0.2s"
            >
              <img
                src={sideImage}
                alt={activeTab === "candidate" ? "Candidate" : "Employer"}
                className="img-fluid rounded-4"
                style={{ maxHeight: "550px", objectFit: "cover" }}
              />
            </Col>

            {/* Right Side Form */}
            <Col lg={5}>
              <Container className="bg-primary-1">
                <Row className="align-items-center login-container">
                  <Col xs={12}>
                    <div className="card border-0 rounded-4">
                      <div className="card-body p-3 p-md-4 px-5">

                        <div className="text-center mb-4">
                          <h3>Create an Account</h3>
                        </div>

                        {/* Tabs */}
                        <Nav
                          variant="tabs"
                          activeKey={activeTab}
                          onSelect={(k: any) => setActiveTab(k)}
                          className="mt-4"
                        >
                          <Nav.Item>
                            <Nav.Link eventKey="candidate">Candidate</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="employer">Employer</Nav.Link>
                          </Nav.Item>
                        </Nav>

                        {/* Registration Form */}
                        <Form className="mt-4 pt-3 px-3" onSubmit={handleSubmit}>
                          <Row className="g-3">

                            {/* First Name */}
                            <Form.Group className="col-lg-6">
                              <Form.Label>
                                First Name <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="firstName"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={handleChange}
                                isInvalid={!!errors.firstName}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                              </Form.Control.Feedback>
                            </Form.Group>

                            {/* Last Name */}
                            <Form.Group className="col-lg-6">
                              <Form.Label>
                                Last Name <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="lastName"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={handleChange}
                                isInvalid={!!errors.lastName}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                              </Form.Control.Feedback>
                            </Form.Group>

                            {/* Email */}
                            <Form.Group className="col-lg-12">
                              <Form.Label>
                                Email Address <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.email}
                              </Form.Control.Feedback>
                            </Form.Group>

                            {/* Password */}
                            <Form.Group className="col-lg-6 mb-2">
                              <Form.Label>
                                Password <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.password}
                              </Form.Control.Feedback>
                            </Form.Group>

                            {/* Confirm Password */}
                            <Form.Group className="col-lg-6 mb-2">
                              <Form.Label>
                                Confirm Password <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-enter password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.confirmPassword}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                              </Form.Control.Feedback>
                            </Form.Group>
                            {/* CAPTCHA Row */}
                            <Form.Group className="col-lg-12">


                              {/* CAPTCHA Box */}
                              <div className="d-flex align-items-center gap-3">
                                {/* Shown Captcha Text */}
                                <div>
                                  Enter CAPTCHA <span className="text-danger">*</span>
                                </div>
                                <div
                                  className="px-3 py-2 rounded bg-light border fw-bold"
                                  style={{ letterSpacing: "3px", fontSize: "18px" }}
                                   dangerouslySetInnerHTML={{ __html: captchaSvg || "Loading..." }}
                                >
                                  {/* {cat || "Loading..."} */}
                                </div>

                                {/* Refresh Captcha Button */}
                                <Button variant="outline-secondary rounded" className="py-2" onClick={handleFetchCaptcha}>
                                  ↻
                                </Button>
                              </div>

                              {/* Captcha Input */}
                              <Form.Control
                                type="text"
                                name="captcha"
                                placeholder="Enter the text shown above"
                                className="mt-3"
                                value={formData.captcha}       // Bind value
                                onChange={handleChange}        // Handle changes
                                isInvalid={!!errors.captcha}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.captcha}
                              </Form.Control.Feedback>
                            </Form.Group>

                            {/* Button */}
                            <div className="text-center mt-4">
                              <Button variant="dark" className="py-2" type="submit" disabled={loading}>
                                {loading ? "Registering..." : "Register Now"}
                              </Button>
                              <Form.Text className="d-block mt-3 text-muted small">
                                By registering, you agree to our{" "}
                                <a href="#">Privacy Policy</a> and{" "}
                                <a href="#">Terms of Use</a>.
                              </Form.Text>

                            </div>
                          </Row>
                        </Form>

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

export default Register;
