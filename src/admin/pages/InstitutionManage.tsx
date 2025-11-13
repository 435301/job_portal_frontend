import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Card, InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import DeleteConfirmationModal from "../componets/Modal/DeleteModal.tsx";
import { deleteInstitution, getAllInstitutions, updateInstitution } from "../../redux/slices/institutionSlice.tsx";
import InstitutionViewModal from "../componets/Modal/InstitutionViewModal.tsx";
import InstitutionEditModal from "../componets/Modal/InstitutionEditModal.tsx";

interface Institution {
    id: number;
    institutionName: string;
    status: number;
    createdBy?: number;
    updatedBy?: number;
    createdAt?: string;
    updatedAt?: string;
}

function InstitutionManage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { institutionList, loading } = useSelector(
        (state: RootState) => state.institution
    );
    console.log('institutionList',institutionList)

    const [selectedItem, setSelectedItem] = useState<Institution | null>(null);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [institutionDelete, setInstitutionDelete] = useState<number | null>(null);

    // Sidebar states
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);


    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleMobileSidebar = () =>
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    const closeMobileSidebar = () => setIsMobileSidebarOpen(false);
    const toggleSubMenu = (id: string) =>
        setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));

    useEffect(() => {
        dispatch(getAllInstitutions({ page, search: searchTerm, showStatus: statusFilter }));
    }, [dispatch, page, searchTerm, statusFilter]);

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
        dispatch(getAllInstitutions({ page: 1 }));
    };

    const handleView = (item: Institution) => {
        setSelectedItem(item);
        setShowView(true);
    };

    const handleEdit = (item: Institution) => {
        setSelectedItem(item);
        setShowEdit(true);
    };

    const handleSaveEdit = (updatedItem: Institution) => {
        dispatch(updateInstitution({ id: updatedItem.id, updateData: updatedItem }));
        setShowEdit(false);
    };

    const handleDeleteClick = (id: any) => {
        setInstitutionDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (institutionDelete !== null) {
            await dispatch(deleteInstitution(institutionDelete));
            setShowDeleteModal(false);
            setInstitutionDelete(null);
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
                                        Institution Management
                                    </h4>
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        variant="primary"
                                        className="rounded-pill px-3 shadow-sm"
                                        onClick={() => navigate("/admin/create-institution")}
                                    >
                                        <i className="bi bi-plus-circle me-2"></i>Add Institution
                                    </Button>
                                </Col>
                            </Row>
                        </Card>

                        <Card className="p-3 card-header shadow-sm mb-2">
                            <Row className="align-items-center g-3">
                                <Col md={3}>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Search institution name..."
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
                                    <i className="bi bi-list-task me-2"></i>InstitutionList List
                                </h6>
                                <span className="text-muted small">
                                    Showing {institutionList?.length || 0} results
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
                                                <th>Institution Name</th>
                                                <th>Status</th>
                                                <th className="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {institutionList?.length > 0 ? (
                                                institutionList.map((item: Institution, index: number) => (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.institutionName}</td>
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
                                                        No Institution records found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                )}
                            </Card.Body>
                        </Card>

                        {/* Modals */}
                        <InstitutionViewModal
                            show={showView}
                            onHide={() => setShowView(false)}
                            item={selectedItem}
                        />
                        <InstitutionEditModal
                            show={showEdit}
                            onHide={() => setShowEdit(false)}
                            item={selectedItem}
                            onSave={handleSaveEdit}
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
export default InstitutionManage;
