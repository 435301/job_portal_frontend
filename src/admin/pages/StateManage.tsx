import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Card, InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import DeleteConfirmationModal from "../componets/Modal/DeleteModal.tsx";
import { deleteState, getAllStates, updateState } from "../../redux/slices/stateSlice.tsx";
import { getAllCountry } from "../../redux/slices/countrySlice.tsx";
import StateViewModal from "../componets/Modal/StateViewModal.tsx";
import StateEditModal from "../componets/Modal/StateEditModal.tsx";

interface State {
    id: number;
    countryId: number;
    countryName: string;
    stateName: string;
    status: number;
    ipAddress: string;
    createdBy?: number;
    updatedBy?: number;
    createdAt?: string;
    updatedAt?: string;
}

function StateManage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { StateList, loading } = useSelector(
        (state: RootState) => state.state
    );
    const { countryList } = useSelector(
        (state: RootState) => state.country
    );

    const [selectedItem, setSelectedItem] = useState<State | null>(null);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [stateDelete, setStateDelete] = useState<number | null>(null);

    // Sidebar states
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [countryFilter, setCountryFilter] = useState("");


    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleMobileSidebar = () =>
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    const closeMobileSidebar = () => setIsMobileSidebarOpen(false);
    const toggleSubMenu = (id: string) =>
        setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));

    useEffect(() => {
        dispatch(getAllStates({ page, search: searchTerm, status: statusFilter || undefined , countryId: countryFilter ? Number(countryFilter) : undefined,}));
        dispatch(getAllCountry());
    }, [dispatch, dispatch, page, searchTerm, statusFilter, countryFilter]);

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
        setCountryFilter("");
        dispatch(getAllStates({ page: 1, search: "", status: "", countryId: undefined ,}));
    };

    const handleView = (item: State) => {
        setSelectedItem(item);
        setShowView(true);
    };

    const handleEdit = (item: State) => {
        setSelectedItem(item);
        setShowEdit(true);
    };

    const handleSaveEdit = (updatedItem: State) => {
        dispatch(updateState({ id: updatedItem.id, updateData: updatedItem }));
        setShowEdit(false);
    };

    const handleDeleteClick = (id: any) => {
        setStateDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (stateDelete !== null) {
            await dispatch(deleteState(stateDelete));
            setShowDeleteModal(false);
            setStateDelete(null);
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
                                        State Management
                                    </h4>
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        variant="primary"
                                        className="rounded-pill px-3 shadow-sm"
                                        onClick={() => navigate("/admin/create-state")}
                                    >
                                        <i className="bi bi-plus-circle me-2"></i>Add State
                                    </Button>
                                </Col>
                            </Row>
                        </Card>

                        <Card className="p-3 card-header shadow-sm mb-2">
                            <Row className="align-items-center g-3">
                                <Col md={3}>
                                    <Form.Select
                                        className="form-control"
                                        value={countryFilter}
                                        onChange={(e) => setCountryFilter(e.target.value)}
                                    >
                                        <option value="">Select Country</option>
                                        <option value="">All</option>

                                        {countryList.map((country) => (
                                            <option key={country.id} value={country.id}>
                                                {country.countryName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={3}>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Search State name..."
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
                                    <i className="bi bi-list-task me-2"></i>State List
                                </h6>
                                <span className="text-muted small">
                                    Showing {StateList?.length || 0} results
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
                                                <th>Country Name</th>
                                                <th>State Name</th>
                                                <th>Status</th>
                                                <th className="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {StateList?.length > 0 ? (
                                                StateList.map((item: State, index: number) => (
                                                    console.log('item', item),
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.countryName}</td>
                                                        <td>{item.stateName}</td>
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
                                                        No State records found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                )}
                            </Card.Body>
                        </Card>

                        {/* Modals */}
                        <StateViewModal
                            show={showView}
                            onHide={() => setShowView(false)}
                            item={selectedItem}
                        />
                        <StateEditModal
                            show={showEdit}
                            onHide={() => setShowEdit(false)}
                            item={selectedItem}
                            onSave={handleSaveEdit}
                            countryList={countryList}
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
export default StateManage;
