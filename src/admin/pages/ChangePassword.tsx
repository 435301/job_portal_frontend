import React, { ChangeEvent, FormEvent, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FormErrors, validateChangePassword } from "../../common/validation.tsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store.tsx";
import { changePassword } from "../../redux/slices/forgotPasswordSlice.tsx";
import { useNavigate } from "react-router-dom";


const ChangePassword = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const resetForm = () => {
        setFormData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const validation = validateChangePassword(formData);
        setErrors(validation);
        if (Object.keys(validation).length !== 0) return;
        try {
            const response =await dispatch(changePassword(formData));;
            if (changePassword.fulfilled.match(response)) {
                navigate("/admin/login");
            }
        } catch (error) {
            console.log(error)
        }
        resetForm();
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center vh-100 bg-light"
            style={{
                background:
                    "transparent radial-gradient(closest-side at 82% 54%, #2CB0DD 0%, #20477C 100%)",
            }}
        >
            <Container >
                <Row className="justify-content-center mt-5">
                    <Col md={5} sm={10}>
                        <Card className="shadow-lg border-0 rounded-4">
                            <Card.Body className="p-4 p-md-5">
                                <div className="text-center mb-4">
                                    {/* <i className="bi bi-shield-lock fs-1 text-primary"></i> */}
                                    <h4 className="mt-2 fw-bold">Change Password</h4>
                                    <p className="text-muted mb-0">Update your account password</p>
                                </div>

                                <Form onSubmit={handleSubmit}>
                                    {/* Current Password */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Current Password</Form.Label>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            name="oldPassword"
                                            placeholder="Enter current password"
                                            value={formData.oldPassword}
                                            onChange={handleChange}
                                            className={`${errors.oldPassword ? "is-invalid" : ""}`}
                                        />
                                        {errors.oldPassword && (
                                            <div className="invalid-feedback">{errors.oldPassword}</div>
                                        )}
                                    </Form.Group>

                                    {/* New Password */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            name="newPassword"
                                            placeholder="Enter new password"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            className={`${errors.newPassword ? "is-invalid" : ""}`}
                                        />
                                        {errors.newPassword && (
                                            <div className="invalid-feedback">{errors.newPassword}</div>
                                        )}
                                    </Form.Group>

                                    {/* Confirm Password */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Re-enter password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={`${errors.confirmPassword ? "is-invalid" : ""}`}
                                        />
                                        {errors.confirmPassword && (
                                            <div className="invalid-feedback">{errors.confirmPassword}</div>
                                        )}
                                    </Form.Group>

                                    {/* Toggle Show Password */}
                                    <Form.Check
                                        type="checkbox"
                                        label="Show Password"
                                        className="mb-3"
                                        onChange={(e) => setShowPassword(e.target.checked)}
                                    />

                                    <div className="d-grid">
                                        <Button variant="primary" type="submit" className="rounded-3">
                                            <i className="bi bi-unlock-fill me-2"></i>
                                            Update Password
                                        </Button>
                                    </div>
                                </Form>
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

export default ChangePassword;
