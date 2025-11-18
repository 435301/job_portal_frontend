import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
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
import { FormErrors, validateSpecializationForm } from "../../common/validation.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.tsx";
import { getUserIpAddress } from "../../common/ipAddress.tsx";
import { createSpecialization } from "../../redux/slices/specializationSlice.tsx";
import { getAllCourses } from "../../redux/slices/courseSlice.tsx";
import { getAllEducations } from "../../redux/slices/educationSlice.tsx";

interface SpecializationForm {
    educationId: number;
    courseId: number;
    specializationName: string;
    status: number | any;
    ipAddress: string;
}

function CreateSpecialization() {
    const dispatch = useAppDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const navigate = useNavigate();

    const [formData, setFormData] = useState<SpecializationForm>({
        educationId: 0,
        courseId: 0,
        specializationName: "",
        status: "",
        ipAddress: "",
    });
    const { educationList } = useSelector(
        (state: RootState) => state.education
    );
    const { courseList } = useSelector(
        (state: RootState) => state.course
    );
    console.log('courseList', courseList)

    useEffect(() => {
        dispatch(getAllCourses());
        dispatch(getAllEducations());
    }, [dispatch]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateSpecializationForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }
        const ip = await getUserIpAddress();
        const finalData = { ...formData, ipAddress: ip, };
        try {
            const resultAction = await dispatch(createSpecialization(finalData));
            if (createSpecialization.fulfilled.match(resultAction)) {
                navigate("/admin/manage-specializations");
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
                                        Create Specialization
                                    </h4>
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        variant="primary"
                                        className="rounded-pill px-3 shadow-sm"
                                        onClick={() => navigate("/admin/manage-specializations")}
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>Manage Specialization
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
                                            <Form.Label>Select Education<span className="text-danger"> *</span></Form.Label>
                                            <Form.Select
                                                name="educationId"
                                                value={formData.educationId}
                                                onChange={handleChange}
                                                className={`form-control ${errors.educationId ? "is-invalid" : ""}`}
                                            >
                                                <option value="">Select Education</option>
                                                {educationList.map((edu) => (
                                                    <option key={edu.id} value={edu.id}>
                                                        {edu.educationName}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            {errors.educationId && (
                                                <div className="invalid-feedback">{errors.educationId}</div>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Select Course<span className="text-danger"> *</span></Form.Label>
                                            <Form.Select
                                                name="courseId"
                                                value={formData.courseId}
                                                onChange={handleChange}
                                                className={`form-control ${errors.courseId ? "is-invalid" : ""}`}
                                            >
                                                <option value="">Select Course</option>
                                                {courseList.map((edu) => (
                                                    <option key={edu.id} value={edu.id}>
                                                        {edu.courseName}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            {errors.courseId && (
                                                <div className="invalid-feedback">{errors.courseId}</div>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Specialization Name<span className="text-danger"> *</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="specializationName"
                                                className={`form-control ${errors.specializationName ? "is-invalid" : ""}`}
                                                placeholder="Enter specialization name"
                                                value={formData.specializationName}
                                                onChange={handleChange}
                                            />
                                            {errors.specializationName && (
                                                <div className="invalid-feedback">{errors.specializationName}</div>
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
                                        onClick={() => navigate("/admin/manage-specializations")}
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

export default CreateSpecialization;
