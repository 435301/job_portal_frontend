import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Card, InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import EducationViewModal from "../componets/Modal/EducationViewModal";
import EducationEditModal from "../componets/Modal/EducationEditModal";
import "bootstrap-icons/font/bootstrap-icons.css";

function EducationManage() {
    const navigate = useNavigate();

    const [data, setData] = useState([
        { id: 1, name: "Bachelor of Technology", type: "Degree", course: "Web Designer", date: "12 Aug 2024", status: "Active" },
        { id: 2, name: "Master of Business Administration", type: "Degree", course: "Web Designer", date: "22 May 2024", status: "Inactive" },
    ]);

    const [selectedItem, setSelectedItem] = useState(null);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    // Sidebar state
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState({});
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
    const closeMobileSidebar = () => setIsMobileSidebarOpen(false);
    const toggleSubMenu = (id) => setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));

    const handleView = (item) => { setSelectedItem(item); setShowView(true); };
    const handleEdit = (item) => { setSelectedItem(item); setShowEdit(true); };
    const handleSaveEdit = (updatedItem) => { setData(prev => prev.map(d => d.id === updatedItem.id ? updatedItem : d)); };

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
                <Header toggleMobileSidebar={toggleMobileSidebar} showProfileMenu={showProfileMenu} setShowProfileMenu={setShowProfileMenu} />

                <main className="content p-4">
                    <Container fluid>
                        <Card className="p-3 border-0 card-header shadow-sm mb-2">
                            <Row className="align-items-center">
                                <Col>
                                    <h4 className="fw-bold mb-1 d-flex align-items-center text-dark">
                                        <i className="bi bi-mortarboard-fill me-2 text-primary fs-4"></i>
                                        Education Management
                                    </h4>
                                </Col>
                                <Col xs="auto">
                                    <Button variant="primary" className="rounded-pill px-3 shadow-sm" onClick={() => navigate("/admin/create-education")}>
                                        <i className="bi bi-plus-circle me-2"></i>Add Education
                                    </Button>
                                </Col>
                            </Row>
                        </Card>

                        <Card className="p-3 card-header shadow-sm mb-2">
                            <Row className="align-items-center g-3">
                                <Col md={3}>
                                    <InputGroup>
                                        <Form.Control type="text" placeholder="Search education name..." />
                                    </InputGroup>
                                </Col>
                                <Col md={3}>
                                    <Form.Select className="form-control">
                                        <option value="">Filter by Type</option>
                                        <option value="degree">Degree</option>
                                        <option value="diploma">Diploma</option>
                                        <option value="certificate">Certificate</option>
                                    </Form.Select>
                                </Col>
                                <Col md={3} className="d-flex gap-2">
                                    <Button variant="primary"><i className="bi bi-search"></i></Button>
                                    <Button variant="outline-secondary"><i className="bi bi-arrow-clockwise"></i></Button>
                                </Col>
                            </Row>
                        </Card>

                        <Card className="shadow-sm border-0">
                            <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                                <h6 className="fw-bold mb-0 text-primary"><i className="bi bi-list-task me-2"></i>Education List</h6>
                                <span className="text-muted small">Showing {data.length} results</span>
                            </Card.Header>

                            <Card.Body className="p-0">
                                <Table responsive hover className="mb-0 align-middle">
                                    <thead className="bg-light">
                                        <tr>
                                            <th style={{ width: "60px" }}>#</th>
                                            <th>Education Name</th>
                                            <th>Type</th>
                                            <th>Course</th>
                                            <th>Created On</th>
                                            <th>Status</th>
                                            <th className="text-center" style={{ width: "150px" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.type}</td>
                                                <td>{item.course}</td>
                                                <td>{item.date}</td>
                                                <td>
                                                    <span className={`badge rounded-pill bg-light border ${item.status === "Active" ? "text-success border-success" : "text-danger border-danger"}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-2 justify-content-center">
                                                        <button className="btn btn-icon btn-view" onClick={() => handleView(item)}><i className="bi bi-eye"></i></button>
                                                        <button className="btn btn-icon btn-edit" onClick={() => handleEdit(item)}><i className="bi bi-pencil-square"></i></button>
                                                        <button className="btn btn-icon btn-delete"><i className="bi bi-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <nav aria-label="Company table pagination">
                                    <ul className="pagination justify-content-end mt-3 me-3">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="#!" tabIndex="-1" aria-disabled="true">
                                                <i className="bi bi-chevron-left"></i>
                                            </a>
                                        </li>
                                        <li className="page-item active">
                                            <a className="page-link" href="#!">1</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#!">2</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#!">3</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#!">
                                                <i className="bi bi-chevron-right"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                                {/* Modals */}
                                <EducationViewModal show={showView} onHide={() => setShowView(false)} item={selectedItem} />
                                <EducationEditModal show={showEdit} onHide={() => setShowEdit(false)} item={selectedItem} onSave={handleSaveEdit} />
                            </Card.Body>
                        </Card>
                    </Container>
                </main>
            </div>
        </div>
    );
}

export default EducationManage;
