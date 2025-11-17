import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Card, InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import DeleteConfirmationModal from "../componets/Modal/DeleteModal.tsx";
import { deleteCourse, getAllCourses, updateCourse } from "../../redux/slices/courseSlice.tsx";
import CourseViewModal from "../componets/Modal/CourseViewModal.tsx";
import CourseEditModal from "../componets/Modal/CourseEditModal.tsx";
import { getAllEducations } from "../../redux/slices/educationSlice.tsx";

interface Course {
    id: number;
    educationId: number;
    educationName: string;
    courseName: string;
    status: number;
    ipAddress: string;
    createdBy?: number;
    updatedBy?: number;
    createdAt?: string;
    updatedAt?: string;
}

function CourseManage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { courseList, loading } = useSelector(
        (state: RootState) => state.course
    );
    const { educationList } = useSelector(
        (state: RootState) => state.education
    );
    console.log('courseList', courseList)

    const [selectedItem, setSelectedItem] = useState<Course | null>(null);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [courseDelete, setCourseDelete] = useState<number | null>(null);

    // Sidebar states
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [educationFilter, setEducationFilter] = useState("");


    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleMobileSidebar = () =>
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    const closeMobileSidebar = () => setIsMobileSidebarOpen(false);
    const toggleSubMenu = (id: string) =>
        setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));

    useEffect(() => {
        dispatch(getAllCourses({ page, search: searchTerm, showStatus: statusFilter || undefined , educationId: educationFilter ? Number(educationFilter) : undefined,}));
        dispatch(getAllEducations());
    }, [dispatch, dispatch, page, searchTerm, statusFilter, educationFilter]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value);
    };

    const handleReset = () => {
        setSearchTerm("");
        setStatusFilter("");
        setPage(1);
        setEducationFilter("");
        dispatch(getAllCourses({ page: 1, search: "", showStatus: "", educationId: undefined ,}));
    };

    const handleView = (item: Course) => {
        setSelectedItem(item);
        setShowView(true);
    };

    const handleEdit = (item: Course) => {
        setSelectedItem(item);
        setShowEdit(true);
    };

    const handleSaveEdit = (updatedItem: Course) => {
        dispatch(updateCourse({ id: updatedItem.id, updateData: updatedItem }));
        setShowEdit(false);
    };

    const handleDeleteClick = (id: any) => {
        setCourseDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (courseDelete !== null) {
            await dispatch(deleteCourse(courseDelete));
            setShowDeleteModal(false);
            setCourseDelete(null);
        }
    };
    

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
                        <Card className="p-3 border-0 card-header shadow-sm mb-2">
                            <Row className="align-items-center">
                                <Col>
                                    <h4 className="fw-bold mb-1 d-flex align-items-center text-dark">
                                        <i className="bi bi-mortarboard-fill me-2 text-primary fs-4"></i>
                                        Course Management
                                    </h4>
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        variant="primary"
                                        className="rounded-pill px-3 shadow-sm"
                                        onClick={() => navigate("/admin/create-course")}
                                    >
                                        <i className="bi bi-plus-circle me-2"></i>Add Course
                                    </Button>
                                </Col>
                            </Row>
                        </Card>

                        <Card className="p-3 card-header shadow-sm mb-2">
                            <Row className="align-items-center g-3">
                                <Col md={3}>
                                    <Form.Select
                                        className="form-control"
                                        value={educationFilter}
                                        onChange={(e) => setEducationFilter(e.target.value)}
                                    >
                                        <option value="">Select Education</option>
                                        <option value="">All</option>

                                        {educationList.map((edu) => (
                                            <option key={edu.id} value={edu.id}>
                                                {edu.educationName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={3}>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Search course name..."
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md={3}>
                                    <Form.Select className="form-control" value={statusFilter}
                                        onChange={handleStatusChange}>
                                        <option value="">Select Status</option>
                                        <option value="">All</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>

                                    </Form.Select>
                                </Col>
                                <Col md={3} className="d-flex gap-2">

                                    <Button variant="outline-secondary" onClick={handleReset}>
                                        <i className="bi bi-arrow-clockwise"></i>
                                    </Button>
                                </Col>
                            </Row>
                        </Card>

                        <Card className="shadow-sm border-0">
                            <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                                <h6 className="fw-bold mb-0 text-primary">
                                    <i className="bi bi-list-task me-2"></i>Course List
                                </h6>
                                <span className="text-muted small">
                                    Showing {courseList?.length || 0} results
                                </span>
                            </Card.Header>

                            <Card.Body className="p-0">
                                {loading ? (
                                    <div className="text-center p-4">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <Table responsive hover className="mb-0 align-middle">
                                        <thead className="bg-light">
                                            <tr>
                                                <th>#</th>
                                                <th>Education Name</th>
                                                <th>Course Name</th>
                                                <th>Status</th>
                                                <th className="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courseList?.length > 0 ? (
                                                courseList.map((item: Course, index: number) => (
                                                    console.log('item', item),
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.educationName}</td>
                                                        <td>{item.courseName}</td>
                                                        <td>
                                                            <span
                                                                className={`badge rounded-pill bg-light border ${item.status === 1
                                                                    ? "text-success border-success"
                                                                    : "text-danger border-danger"
                                                                    }`}
                                                            >
                                                                {item.status === 1 ? "Active" : "Inactive"}
                                                            </span>
                                                        </td>

                                                        <td className="text-center">
                                                            <div className="d-flex gap-2 justify-content-center">
                                                                <button
                                                                    className="btn btn-icon btn-view"
                                                                    onClick={() => handleView(item)}
                                                                >
                                                                    <i className="bi bi-eye"></i>
                                                                </button>
                                                                <button
                                                                    className="btn btn-icon btn-edit"
                                                                    onClick={() => handleEdit(item)}
                                                                >
                                                                    <i className="bi bi-pencil-square"></i>
                                                                </button>
                                                                <button
                                                                    className="btn btn-icon btn-delete"
                                                                    onClick={() => handleDeleteClick(item.id)}
                                                                >
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={4} className="text-center py-3">
                                                        No course records found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                )}
                            </Card.Body>
                        </Card>

                        {/* Modals */}
                        <CourseViewModal
                            show={showView}
                            onHide={() => setShowView(false)}
                            item={selectedItem}
                        />
                        <CourseEditModal
                            show={showEdit}
                            onHide={() => setShowEdit(false)}
                            item={selectedItem}
                            onSave={handleSaveEdit}
                            educationList={educationList}
                        />
                        {showDeleteModal &&
                            <DeleteConfirmationModal
                                show={showDeleteModal}
                                handleClose={() => setShowDeleteModal(false)}
                                handleConfirm={handleDelete}
                            />}

                    </Container>
                </main>
            </div>
        </div>
    );
}
export default CourseManage;
