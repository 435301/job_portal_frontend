import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../redux/slices/adminSlice";
import { validateLoginForm } from "../../common/validation.tsx";
import { forgotPassword, resetPassword, verifyOtp } from "../../redux/slices/forgotPasswordSlice.tsx";
import { useToggle } from "../../customHooks/useToggle.tsx";
import "../../assets/css/login.css"
import "../../assets/css/style.css";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1=email/mobile, 2=otp, 3=new password
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [showPassword, setShowPassword] = useToggle(false);
  const [showNewPassword, toggleShowNewPassword] = useToggle(false);
  const [showConfirmPassword, toggleShowConfirmPassword] = useToggle(false);
  const [forgotData, setForgotData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { loading, token, error } = useSelector((state) => state.admin);
  const forgotState = useSelector((state) => state.forgotPassword);

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

  const handleForgot = async () => {
    if (!forgotData.email) {
      setErrors({ email: "Email is required" })
      return;
    }
    const res = await dispatch(forgotPassword({ email: forgotData.email }));
    if (forgotPassword.fulfilled.match(res)) {
      console.log(res.payload.status);   // true
      console.log(res.payload.message);  //
      setForgotStep(2);
    }
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

  const handleVerifyOtp = async () => {
    if (!forgotData.otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }
    const res = await dispatch(
      verifyOtp({ email: forgotData.email, otp: Number(forgotData.otp) })
    );
    if (verifyOtp.fulfilled.match(res)) {
      setForgotStep(3);
    }
  };

  const handleResetPassword = async () => {
    if (!forgotData.newPassword || !forgotData.confirmPassword) {
      setErrors({ newPassword: "All fields are required" });
      return;
    }
    if (forgotData.newPassword !== forgotData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }
    const res = await dispatch(
      resetPassword({
        email: forgotData.email,
        newPassword: forgotData.newPassword,
        confirmPassword: forgotData.confirmPassword,
      })
    );

    if (resetPassword.fulfilled.match(res)) {
      setShowForgot(false);
      setForgotStep(1);
      setForgotData({ email: "", otp: "", newPassword: "", confirmPassword: "" });
    }
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
                      <div className="password-field-wrapper">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className={`form-control ${errors.password ? "is-invalid" : ""}`}
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <i
                          className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} password-eye-icon`}
                          onClick={setShowPassword}
                        ></i>
                      </div>

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
                          <Form.Label> Email</Form.Label>
                          <Form.Control
                            type="text"
                            name="email"
                            placeholder="Enter registered email or mobile"
                            value={forgotData.email}
                            onChange={handleForgotChange}
                            className={`${errors.email ? "is-invalid" : ""}`}
                          />
                          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </Form.Group>

                        <div className="text-end mb-3">
                          <Button
                            variant="primary"
                            className="px-3"
                            onClick={handleForgot}

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

                    {/* ---------- STEP 3 : NEW PASSWORD ---------- */}
                    {forgotStep === 3 && (
                      <Form>
                        <h5 className="mb-3">Create New Password</h5>

                        {/* New Password */}
                        <Form.Group className="mb-3 position-relative">
                          <Form.Label>New Password</Form.Label>
                          <div className="password-field-wrapper">
                            <Form.Control
                              type={showNewPassword ? "text" : "password"}
                              name="newPassword"
                              placeholder="Enter new password"
                              value={forgotData.newPassword}
                              onChange={handleForgotChange}
                            />
                            <i
                              className={`bi ${showNewPassword ? "bi-eye-slash" : "bi-eye"} password-eye-icon`}
                              style={{ cursor: "pointer" }}
                              onClick={toggleShowNewPassword}
                            ></i>
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
                            <i
                              className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"} password-eye-icon`}
                              style={{ cursor: "pointer" }}
                              onClick={toggleShowConfirmPassword}
                            ></i>
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

                          <Button onClick={handleResetPassword} >
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
