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
import { employeeLogin, employerLogin } from "../redux/slices/loginSlice.tsx";
import { useDispatch, useSelector } from "react-redux";
import { validateLoginForm, FormErrors } from "../common/validation.tsx";
import { AppDispatch, RootState } from "../redux/store.tsx";
import { forgotPasswordEmployee, resetPasswordEmployee, verifyOtpEmployee } from "../redux/slices/forgotPasswordSlice.tsx";
import { forgotPasswordHandler, resetPasswordHandler, verifyOtpHandler } from "./components/forgotPassword.tsx";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, employeeToken } = useSelector((state: RootState) => state.employeeLogin);

  // Tabs
  const [activeTab, setActiveTab] = useState("candidate");
  const [candidateForm, setCandidateForm] = useState({
    email: "",
    password: "",
  });

  const [employerForm, setEmployerForm] = useState({
    email: "",
    password: "",
  });

  const formData = activeTab === "candidate" ? candidateForm : employerForm;
  const setFormData = activeTab === "candidate" ? setCandidateForm : setEmployerForm;

  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1=email/mobile, 2=otp, 3=new password
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [forgotData, setForgotData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (activeTab === "candidate") {
      setCandidateForm({ ...candidateForm, [name]: value });
    } else {
      setEmployerForm({ ...employerForm, [name]: value });
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
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
      if (activeTab === "candidate") {
        const response = await dispatch(employeeLogin(formData));;
        if (employeeLogin.fulfilled.match(response)) {
          navigate("/profile");
        }
      }
      if (activeTab === "employer") {
        const response = await dispatch(employerLogin(formData));;
        if (employerLogin.fulfilled.match(response)) {
          navigate("/company-profile");
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  // Forgot password handlers
  const handleForgotChange = (e: any) => {
    const { name, value } = e.target;
    setForgotData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForgot = async () => {
    if (!forgotData.email) {
      setErrors({ email: "Email is required" })
      return;
    }
    const role = activeTab === "candidate" ? "employee" : "employer";
    const res = await forgotPasswordHandler(dispatch, role, forgotData.email);
    if (res.payload?.status === true) {
      setForgotStep(2);
    }
  };


  const handleVerifyOtp = async () => {
    if (!forgotData.otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }
    const role = activeTab === "candidate" ? "employee" : "employer";
    const res = await verifyOtpHandler(dispatch, role, forgotData.email, Number(forgotData.otp));
    if (res.payload?.status === true) {
      setForgotStep(3);
    }
  };

  const handleResetPassword = async () => {
    if (!forgotData.newPassword || !forgotData.confirmPassword) {
      setErrors({ newPassword: "new password is required" });
      return;
    }
    if (forgotData.newPassword !== forgotData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }
    const role = activeTab === "candidate" ? "employee" : "employer";
    const res = await resetPasswordHandler(dispatch, role, forgotData.email, forgotData.newPassword, forgotData.confirmPassword);
    if (res.payload?.status === true) {
      setShowForgot(false);
      setForgotStep(1);
      setForgotData({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: ""
      });
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
            {!showForgot ? (
              /* ================= LOGIN FORM ================= */
              <Col lg={5}>
                <Container className="bg-primary-1">
                  <Row className="align-items-center login-container">
                    <Col xs={12}>
                      <div className="card border-0 rounded-4">
                        <div className="card-body p-3 p-md-4 px-5">
                          <div className="text-center mb-4">
                            <h3>Welcome Back!</h3>
                            <p className="text-muted small">Log in to continue your journey.</p>
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

                          {/* Login Form */}
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
                              <span
                                className="text-decoration-none small"
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowForgot(true)}
                              >
                                Forgot Password?
                              </span>
                            </div>

                            {/* Login button */}
                            <div className="text-center mt-3">
                              <Button variant="dark" type="submit" className="px-4" disabled={loading}>
                                {loading ? (
                                  <>
                                    <Spinner animation="border" size="sm" className="me-2" /> Logging in...
                                  </>
                                ) : (
                                  "Login"
                                )}
                              </Button>

                              <Form.Text className="d-block mt-3 text-muted small">
                                Don’t have an account? <a href="/register">Register here</a>.
                              </Form.Text>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Col>

            ) : (
              /* ================= FORGOT PASSWORD FLOW ================= */
              <Col lg={5}>
                <Container className="bg-primary-1">
                  <Row className="align-items-center login-container">
                    <Col xs={12}>
                      <div className="card border-0 rounded-4">
                        <div className="card-body p-4 px-5">

                          {/* STEP 1 - Enter email/mobile */}
                          {forgotStep === 1 && (
                            <Form className="mt-4" onSubmit={(e) => e.preventDefault()}>
                              <h5 className="mb-3">Reset Password</h5>

                              <Form.Group className="mb-3">
                                <Form.Label>Enter Email</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter registered email"
                                  name="email"
                                  value={forgotData.email}
                                  onChange={handleForgotChange}
                                  isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.email}
                                </Form.Control.Feedback>
                              </Form.Group>

                              <div className="d-flex justify-content-end mb-3">
                                <span
                                  className="text-primary small"
                                  style={{ cursor: "pointer" }}
                                  onClick={handleForgot}
                                >
                                  Send OTP
                                </span>
                              </div>
                              <div
                                className="small text-muted"
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowForgot(false)}
                              >
                                ← Back to Login
                              </div>
                            </Form>
                          )}

                          {/* STEP 2 - OTP */}
                          {forgotStep === 2 && (
                            <Form className="mt-4">
                              <h5 className="mb-3">Verify OTP</h5>
                              <Form.Group className="mb-3">
                                <Form.Label>Enter OTP</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="otp"
                                  placeholder="Enter OTP"
                                  value={forgotData.otp}
                                  onChange={handleForgotChange}
                                />
                              </Form.Group>

                              <div className="d-flex justify-content-between mb-3">
                                <span
                                  className="small text-muted"
                                  style={{ cursor: "pointer" }}
                                  onClick={handleVerifyOtp}
                                >
                                  ← Back
                                </span>

                                <Button
                                  variant="primary"
                                  onClick={handleVerifyOtp}
                                >
                                  Verify OTP
                                </Button>
                              </div>
                            </Form>
                          )}

                          {/* STEP 3 - New Password */}
                          {forgotStep === 3 && (
                            <Form className="mt-4">
                              {/* New Password */}
                              <Form.Group className="mb-3 position-relative">
                                <Form.Label>New Password</Form.Label>
                                <div className="password-field-wrapper">
                                  <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
                                    placeholder="Enter new password"
                                    value={forgotData.newPassword}
                                    onChange={handleForgotChange}
                                  />
                                </div>
                              </Form.Group>

                              {/* Confirm Password */}
                              <Form.Group className="mb-3 position-relative">
                                <Form.Label>Confirm Password</Form.Label>
                                <div className="password-field-wrapper">
                                  <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm new password"
                                    value={forgotData.confirmPassword}
                                    onChange={handleForgotChange}
                                  />
                                </div>
                              </Form.Group>

                              <div className="d-flex justify-content-between mb-3">
                                <span
                                  className="small text-muted"
                                  style={{ cursor: "pointer" }}
                                  onClick={handleResetPassword}
                                >
                                  ← Back
                                </span>

                                <Button variant="primary" onClick={handleResetPassword}>Reset Password</Button>
                              </div>
                            </Form>
                          )}

                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Col>
            )}

          </Row>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
