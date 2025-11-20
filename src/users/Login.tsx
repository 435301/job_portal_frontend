import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Container, Row, Col, Form, Button, Nav, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "../assets/css/login.css";
import "../assets/css/style.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.js";
import candidateImage from "../assets/img/login-1.png";
import employerImage from "../assets/img/reg-2.png";
import { useNavigate } from "react-router-dom";
import { employeeLogin } from "../redux/slices/loginSlice.tsx";
import { useDispatch, useSelector } from "react-redux";
import { validateLoginForm, FormErrors } from "../common/validation.tsx";
import { AppDispatch, RootState } from "../redux/store.tsx";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // new WOW.WOW({ live: false }).init();
  }, []);

  const { loading, error, employeeToken } = useSelector((state: RootState) => state.employeeLogin);

  // Tabs
  const [activeTab, setActiveTab] = useState("candidate");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };


  // Handle submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    try {
      const response = await dispatch(employeeLogin(formData));;
      if (employeeLogin.fulfilled.match(response)) {
        navigate("/profile");
      }
    } catch (error) {
      console.log(error)
    }
  };

  //  Dynamic image based on tab
  const sideImage = activeTab === "candidate" ? candidateImage : employerImage;

  return (
    <>
      <div className="container-fluid header position-relative overflow-hidden p-0">
        <Navbar />

        <div className="hero-header-2 overflow-hidden px-5 pt-5">
          <Row className="align-items-center">
            {/*  Left Image Section */}
            <Col
              lg={7}
              className="text-center wow fadeInLeft d-none d-lg-block"
              data-wow-delay="0.2s"
            >
              <img
                src={sideImage}
                alt={activeTab === "candidate" ? "Candidate" : "Employer"}
                className="img-fluid rounded-4"
                style={{
                  maxHeight: "550px",
                  objectFit: "cover",
                  transition: "0.5s ease-in-out",
                }}
              />
            </Col>

            {/*  Login Form */}
            <Col lg={5}>
              <Container className="bg-primary-1">
                <Row className="align-items-center login-container">
                  <Col xs={12}>
                    <div className="card border-0 rounded-4">
                      <div className="card-body p-3 p-md-4 px-5">
                        <div className="text-center mb-4">
                          <h3>Welcome Back!</h3>
                          <p className="text-muted small">
                            Log in to continue your journey.
                          </p>
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

                        <Form className="mt-4 pt-3 px-3" onSubmit={handleSubmit}>
                          {/* Email */}
                          <Form.Group className="mb-3">
                            <Form.Label>
                              Email Address <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder="Enter your Registered email"
                              value={formData.email}
                              onChange={handleChange}
                              isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* Password */}
                          <Form.Group className="mb-3 position-relative">
                            <Form.Label>
                              Password <span className="text-danger">*</span>
                            </Form.Label>

                            <div className="password-field-wrapper">
                              <Form.Control
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                              />

                              <i
                                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} password-eye-icon`}
                                onClick={() => setShowPassword(!showPassword)}
                              />
                            </div>

                            {errors.password && (
                              <div className="invalid-feedback d-block">{errors.password}</div>
                            )}
                          </Form.Group>


                          {/* Forgot password */}
                          <div className="text-end mb-3">
                            <a href="#" className="text-decoration-none small">
                              Forgot Password?
                            </a>
                          </div>

                          {/* Login Button */}
                          <div className="text-center mt-3">
                            <Button variant="dark" type="submit" className="px-4" disabled={loading}>
                              {loading ? (
                                <>
                                  <Spinner animation="border" size="sm" className="me-2" /> Logging in...
                                </>
                              ) : (
                                <>
                                   Login
                                </>
                              )}
                            </Button>


                            <Form.Text className="d-block mt-3 text-muted small">
                              Don’t have an account?{" "}
                              <a href="/register">Register here</a>.
                            </Form.Text>
                          </div>
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

export default Login;
