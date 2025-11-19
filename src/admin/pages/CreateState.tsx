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
import { FormErrors, validateStateForm } from "../../common/validation.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.tsx";
import { getUserIpAddress } from "../../common/ipAddress.tsx";
import { createState } from "../../redux/slices/stateSlice.tsx";

interface StateForm {
    countryId: number;
    countryName: string;
    stateName: string;
    status: number | any;
    ipAddress: string;
}

function CreateState() {
    const dispatch = useAppDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const navigate = useNavigate();

    const [formData, setFormData] = useState<StateForm>({
        countryId: 0,
        stateName: "",
        countryName:"",
        status: "",
        ipAddress: "",
    });
    const { countryList, loading } = useSelector(
        (state: RootState) => state.country
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateStateForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }
        const ip = await getUserIpAddress();
          const finalData = { ...formData, ipAddress: ip, };
        try {
            const resultAction = await dispatch(createState(finalData));
            if (createState.fulfilled.match(resultAction)) {
                navigate("/admin/manage-states");
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
                                        Create State
                                    </h4>
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        variant="primary"
                                        className="rounded-pill px-3 shadow-sm"
                                        onClick={() => navigate("/admin/manage-states")}
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>Manage State
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
                                            <Form.Label>Select Country<span className="text-danger"> *</span></Form.Label>
                                            <Form.Select
                                                name="countryId"
                                                value={formData.countryId}
                                                onChange={handleChange}
                                                className={`form-control ${errors.countryId ? "is-invalid" : ""}`}
                                            >
                                                <option value="">Select Country</option>
                                                {countryList.map((edu) => (
                                                    <option key={edu.id} value={edu.id}>
                                                        {edu.countryName}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            {errors.countryId && (
                                                <div className="invalid-feedback">{errors.countryId}</div>
                                            )}
                                        </Form.Group>

                                       
                                    </Col>
                                     <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>State Name<span className="text-danger"> *</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="stateName"
                                                    className={`form-control ${errors.stateName ? "is-invalid" : ""}`}
                                                    placeholder="Enter state name"
                                                    value={formData.stateName}
                                                    onChange={handleChange}
                                                />
                                                {errors.stateName && (
                                                    <div className="invalid-feedback">{errors.stateName}</div>
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
                                        onClick={() => navigate("/admin/manage-states")}
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

export default CreateState;
