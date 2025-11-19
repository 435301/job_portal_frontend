import React, { useState, ChangeEvent, FormEvent } from "react";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAppDispatch } from "../../redux/hooks.tsx";
import { FormErrors, validateProfilePercentageForm, } from "../../common/validation.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.tsx";
import { getUserIpAddress } from "../../common/ipAddress.tsx";
import { createProfilePercentage } from "../../redux/slices/profilePercentageSlice.tsx";

interface ProfilePercentageForm {
    title: string;
    percentage: number;
    status: number | any;
    ipAddress: string;
}

function CreateProfilePercentage() {
    const dispatch = useAppDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const navigate = useNavigate();

    const [formData, setFormData] = useState<ProfilePercentageForm>({
        title: "",
        percentage: 0,
        status: "",
        ipAddress: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: name === "percentage" ? Number(value) : value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateProfilePercentageForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }
        const ip = await getUserIpAddress();
        const finalData = { ...formData, ipAddress: ip, };
        try {
            const resultAction = await dispatch(createProfilePercentage(finalData));
            if (createProfilePercentage.fulfilled.match(resultAction)) {
                navigate("/admin/manage-profile-percentage");
            }
        } catch (error) {
            console.log(error)
        }
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
    const closeMobileSidebar = () => setIsMobileSidebarOpen(false);
    const toggleSubMenu = (id: string) =>
        setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <div className="admin-layout bg-light min-vh-100">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                isMobileSidebarOpen={isMobileSidebarOpen}
                openMenus={openMenus}
                toggleSidebar={toggleSidebar}
                toggleMobileSidebar={toggleMobileSidebar}
                closeMobileSidebar={closeMobileSidebar}
                toggleSubMenu={toggleSubMenu}
            />

            <div className="main-area">
                <Header
                    toggleMobileSidebar={toggleMobileSidebar}
                    showProfileMenu={showProfileMenu}
                    setShowProfileMenu={setShowProfileMenu}
                />

                <main className="content p-4">
                    <Container fluid>
                        <Card className="p-3 border-0 card-header shadow-sm mb-3">
                            <Row className="align-items-center">
                                <Col>
                                    <h4 className="fw-bold mb-1 d-flex align-items-center text-dark">
                                        <i className="bi bi-mortarboard-fill me-2 text-primary fs-4"></i>
                                        Create Profile Percentage
                                    </h4>
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        variant="primary"
                                        className="rounded-pill px-3 shadow-sm"
                                        onClick={() => navigate("/admin/manage-profile-percentage")}
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>Manage Profile Percentage
                                    </Button>
                                </Col>
                            </Row>
                        </Card>

                        <Card className="border-0 shadow-sm p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                            </div>

                            <Form onSubmit={handleSubmit}>
                                <Row className="g-3">

                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Profile Title<span className="text-danger"> *</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                                placeholder="Enter title"
                                                value={formData.title}
                                                onChange={handleChange}
                                            />
                                            {errors.title && (
                                                <div className="invalid-feedback">{errors.title}</div>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Percentage<span className="text-danger"> *</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="percentage"
                                                className={`form-control ${errors.percentage ? "is-invalid" : ""}`}
                                                placeholder="Enter percentage"
                                                value={formData.percentage}
                                                onChange={handleChange}
                                            />
                                            {errors.percentage && (
                                                <div className="invalid-feedback">{errors.percentage}</div>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Status<span className="text-danger"> *</span></Form.Label>
                                            <Form.Select
                                                name="status"
                                                value={formData.status}

                                                className={`form-control ${errors.status ? "is-invalid" : ""}`}

                                                onChange={handleChange}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </Form.Select>
                                            {errors.status && (
                                                <div className="invalid-feedback">{errors.status}</div>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="text-end mt-4">
                                    <Button
                                        variant="secondary"
                                        className="me-2 rounded-pill px-4"
                                        onClick={() => navigate("/admin/manage-profile-percentage")}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="rounded-pill px-4"
                                    >
                                        <i className="bi bi-save me-2"></i>Save
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </Container>
                </main>
            </div>
        </div>
    );
}

export default CreateProfilePercentage;
