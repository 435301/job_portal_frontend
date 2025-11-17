import React, { useState, ChangeEvent, FormEvent } from "react";
import Sidebar from "../componets/Sidebar.jsx";
import Header from "../componets/Header.jsx";
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
import {  FormErrors, validateExperienceForm } from "../../common/validation.tsx";
import { createExperience } from "../../redux/slices/experienceSlice.tsx";

interface ExperienceForm {
    experienceName: string;
    status: number | any;
}

function CreateExperience() {
    const dispatch = useAppDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const navigate = useNavigate();

    const [formData, setFormData] = useState<ExperienceForm>({
        experienceName: "",
        status: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateExperienceForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }
        try {
            const resultAction = await dispatch(createExperience(formData));
            if (createExperience.fulfilled.match(resultAction)) {
                navigate("/admin/manage-experience");
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
                                        Create Job Title
                                    </h4>
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        variant="primary"
                                        className="rounded-pill px-3 shadow-sm"
                                        onClick={() => navigate("/admin/manage-experience")}
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>Manage Experience
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
                                            <Form.Label>Experience Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="experienceName"
                                                className={`form-control ${errors.experienceName ? "is-invalid" : ""}`}
                                                placeholder="Enter Experience name"
                                                value={formData.experienceName}
                                                onChange={handleChange}
                                            />
                                            {errors.experienceName && (
                                                <div className="invalid-feedback">{errors.experienceName}</div>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Status</Form.Label>
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
                                        onClick={() => navigate("/admin/manage-experience")}
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

export default CreateExperience;
