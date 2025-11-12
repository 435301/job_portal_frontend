import React, { useState } from "react";
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

function CreateEducation() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState({});
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        course: "",
        description: "",
        status: "Active",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Education Created:", formData);
        navigate("/admin/education-manage"); // Redirect back after save
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
    const closeMobileSidebar = () => setIsMobileSidebarOpen(false);
    const toggleSubMenu = (id) =>
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
                                        Create Education
                                    </h4>
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        variant="primary"
                                        className="rounded-pill px-3 shadow-sm"
                                        onClick={() => navigate("/admin/education")}
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>Manage Education
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
                                            <Form.Label>Education Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder="Enter education name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Type</Form.Label>
                                            <Form.Select
                                                name="type"
                                                value={formData.type}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            >
                                                <option value="">Select type</option>
                                                <option value="Degree">Degree</option>
                                                <option value="Diploma">Diploma</option>
                                                <option value="Certificate">Certificate</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Course</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="course"
                                                placeholder="Enter course name"
                                                value={formData.course}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Status</Form.Label>
                                            <Form.Select
                                                name="status"
                                                value={formData.status}
                                                className="form-control"
                                                onChange={handleChange}
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                name="description"
                                                placeholder="Enter description..."
                                                value={formData.description}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="text-end mt-4">
                                    <Button
                                        variant="secondary"
                                        className="me-2 rounded-pill px-4"
                                        onClick={() => navigate("/admin/education-manage")}
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

export default CreateEducation;
