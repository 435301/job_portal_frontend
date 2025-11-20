import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../redux/slices/adminSlice";
import { validateLoginForm } from "../../common/validation.tsx";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1=email/mobile, 2=otp, 3=new password
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotData, setForgotData] = useState({
    emailOrMobile: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { loading, token, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    try {
      const response = await dispatch(adminLogin(formData));;
      if (adminLogin.fulfilled.match(response)) {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error)
    }
  };

  // Forgot password handlers
  const handleForgotChange = (e) => {
    const { name, value } = e.target;
    setForgotData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");

    if (!forgotData.emailOrMobile) {
      setForgotError("Please enter Email or Mobile");
      return;
    }
    // TODO: Replace with actual API call to send OTP
    setForgotSuccess("OTP sent to " + forgotData.emailOrMobile);
    setForgotStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");

    if (!forgotData.otp) {
      setForgotError("Enter OTP");
      return;
    }
    // TODO: Replace with actual API call to verify OTP
    setForgotSuccess("OTP Verified!");
    setForgotStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");

    if (!forgotData.newPassword || !forgotData.confirmPassword) {
      setForgotError("Enter all password fields");
      return;
    }
    if (forgotData.newPassword !== forgotData.confirmPassword) {
      setForgotError("Passwords do not match!");
      return;
    }
    // TODO: Replace with actual API call to reset password
    setForgotSuccess("Password reset successful!");
    setTimeout(() => {
      setShowForgot(false);
      setForgotStep(1);
      setForgotData({ emailOrMobile: "", otp: "", newPassword: "", confirmPassword: "" });
      setForgotSuccess("");
    }, 2000);
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

                {!showForgot ? (
                  /* ================= LOGIN FORM ================= */
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Form.Check type="checkbox" label="Remember me" />

                      <span
                        className="text-primary small"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowForgot(true)}
                      >
                        Forgot Password?
                      </span>
                    </div>

                    <div className="d-grid">
                      <Button variant="primary" type="submit" className="rounded-3" disabled={loading}>
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" /> Logging in...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-box-arrow-in-right me-2"></i> Login
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                ) : (

                  /* ================= FORGOT PASSWORD FLOW ================= */

                  <>
                    {/* ---------- STEP 1 : EMAIL / MOBILE ---------- */}
                    {forgotStep === 1 && (
                      <Form>
                        <h5 className="mb-3">Reset Password</h5>

                        <Form.Group className="mb-3">
                          <Form.Label>Enter Email / Mobile</Form.Label>
                          <Form.Control
                            type="text"
                            name="email"
                            placeholder="Enter registered email or mobile"
                            value={formData.email}
                            onChange={handleChange}
                            className={`${errors.email ? "is-invalid" : ""}`}
                          />
                          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </Form.Group>

                        <div className="text-end mb-3">
                          <Button
                            variant="primary"
                            className="px-3"
                            onClick={() => setForgotStep(2)}
                          >
                            Send OTP
                          </Button>
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

                    {/* ---------- STEP 2 : OTP ---------- */}
                    {forgotStep === 2 && (
                      <Form>
                        <h5 className="mb-3">Verify OTP</h5>

                        <Form.Group className="mb-3">
                          <Form.Label>Enter OTP</Form.Label>
                          <Form.Control
                            type="text"
                            name="otp"
                            placeholder="Enter OTP"
                            value={formData.otp}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <div className="d-flex justify-content-between mb-3">
                          <span
                            className="small text-muted"
                            style={{ cursor: "pointer" }}
                            onClick={() => setForgotStep(1)}
                          >
                            ← Back
                          </span>

                          <Button
                            variant="primary"
                            onClick={() => setForgotStep(3)}
                          >
                            Verify OTP
                          </Button>
                        </div>
                      </Form>
                    )}

                    {/* ---------- STEP 3 : NEW PASSWORD ---------- */}
                    {forgotStep === 3 && (
                      <Form>
                        <h5 className="mb-3">Create New Password</h5>

                        {/* New Password */}
                        <Form.Group className="mb-3 position-relative">
                          <Form.Label>New Password</Form.Label>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="Enter new password"
                            value={formData.newPassword}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        {/* Confirm Password */}
                        <Form.Group className="mb-3 position-relative">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <div className="d-flex justify-content-between mb-3">
                          <span
                            className="small text-muted"
                            style={{ cursor: "pointer" }}
                            onClick={() => setForgotStep(2)}
                          >
                            ← Back
                          </span>

                          <Button variant="primary">
                            Reset Password
                          </Button>
                        </div>
                      </Form>
                    )}
                  </>
                )}

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
