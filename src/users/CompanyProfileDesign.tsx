import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import avatarImage from "../assets/img/profile-1.png";
import editIcon from "../assets/img/edit-63.svg";
import { Modal, Button, Form, } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store.tsx";
import { useAppSelector } from "../redux/hooks.tsx";
import { fetchEmployerProfile, uploadCompanyLogo } from "../redux/slices/employerProfileSlice.tsx";
import BASE_URL_JOB from "../config/config.jsx";
import profile from "../assets/img/profile.jpg";
import "../assets/css/style.css";


function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>();
    const employerId = JSON.parse(localStorage.getItem("employer") ?? "{}")?.id;
    const { loading, data, error } = useAppSelector((state: RootState) => state.employerProfile);
    const companyDetails = data?.companyDetails;
    const kycDetails = data?.kycDetails;
    const kyc = kycDetails?.[0];
    console.log('kycDetails', kycDetails)
    const [showModal, setShowModal] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [profilePhoto, setProfilePhoto] = useState<any>();

    useEffect(() => {
        if (employerId) {
            dispatch(fetchEmployerProfile(employerId));
        }
    }, [employerId]);

    useEffect(() => {
        if (companyDetails?.companyLogo) {
            setProfilePhoto(companyDetails?.companyLogo);
        }
    }, [companyDetails]);

    const handleEdit = (sectionName: any) => {
        setActiveSection(sectionName);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleProfilePhoto = (e: any,) => {
        const file = e.target.files[0];
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        setProfilePhoto(previewUrl);
        dispatch(uploadCompanyLogo(file))
    };

    const fileRef = useRef<HTMLInputElement>(null);

    const triggerUpload = () => {
        fileRef.current?.click();
    };

    return (
        <div className="ProfilePage">
            <Header />

            {/* Breadcrumb */}
            <div className="container-fluid bg-breadcrumb py-5"></div>

            {/* ===== Profile Card ===== */}
            <div className="container py-4">
                <div className="profile-card row align-items-center rounded-4 p-4">
                    <div className="col-md-5 border-end d-flex align-items-center mb-4 mb-md-0">
                        <div className="profile-photo-wrapper position-relative " style={{ width: "120px" }}>
                            <img
                                src={profilePhoto ? `${BASE_URL_JOB}${profilePhoto}` : profile}
                                alt=""
                                className="rounded-circle profile-img me-3"
                            />
                            <img
                                src={editIcon}
                                alt="Edit Icon"
                                className="edit-icon ms-4"
                                onClick={triggerUpload}
                            />
                            {loading && (
                                <div className="loading-overlay">
                                    <div className="spinner-border text-primary" role="status" />
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileRef}
                                accept="image/*"
                                className="d-none"
                                onChange={handleProfilePhoto}
                            />
                        </div>

                        <div>
                            <h5 className="mb-1 fw-semibold text-dark availability-1">
                                {companyDetails?.companyName || "Company Name"}

                            </h5>
                            <p className="mb-2">
                                Profile last updated: <strong className="email">{companyDetails?.updatedAt && new Date(companyDetails?.updatedAt).toLocaleString("en-US")}</strong>
                            </p>

                            {/* Progress */}
                            <div className="d-flex align-items-center">
                                <div
                                    className="progress flex-grow-1"
                                    style={{ height: "8px", maxWidth: "250px" }}
                                >
                                    <div className="progress-bar bg-danger" style={{ width: "30%" }}></div>
                                </div>
                                <small className="text-muted ms-2">{companyDetails?.profileCompletion || 0}%</small>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="col-md-7 ps-5">
                        <div className="row g-3">
                            <div className="col-md-4 d-flex align-items-start">
                                <div className="icon-box me-2">
                                    <i className="bi bi-geo-alt-fill"></i>
                                </div>
                                <div>
                                    <div className="fw-semibold text-dark availability">Location</div>
                                    <div className="text-muted small">{companyDetails?.city?.cityName} {companyDetails?.country?.countryName} </div>
                                </div>
                            </div>

                            <div className="col-md-4 d-flex align-items-start">
                                <div className="icon-box me-2">
                                    <i className="bi bi-telephone-fill"></i>
                                </div>
                                <div>
                                    <div className="fw-semibold text-dark availability">Mobile Number</div>
                                    <div className="text-muted small">{companyDetails?.mobile || "-"}</div>
                                </div>
                            </div>

                            <div className="col-md-4 d-flex align-items-start">
                                <div className="icon-box me-2">
                                    <i className="bi bi-envelope-fill"></i>
                                </div>
                                <div>
                                    <div className="fw-semibold text-dark availability">Email</div>
                                    <div className="text-muted small">{companyDetails?.email || "-"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== PERSONAL DETAILS SECTION ===== */}
            <div className="container">

                {/* ===== Account Details Section ===== */}
                <div className="container mb-4">
                    <div className="card rounded-4">
                        <div className="border-bottom p-3 section-title d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold mb-0"> <i className="bi bi-person-lines-fill me-2"></i>Profile Details</h6>
                            <img
                                src={editIcon}
                                alt="Edit"
                                className="edit-icons"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleEdit("account")}
                            />
                        </div>

                        <div className="row g-3 px-3 small-text mb-3">
                            <div className="col-md-3"><strong className="email">Email</strong><div className="fs-6"> {companyDetails?.email || "-"} </div></div>
                            <div className="col-md-3"><strong className="email">Email for Communication</strong><div className="fs-6"> {companyDetails?.alternativeEmail || "-"} </div></div>
                            <div className="col-md-3"><strong className="email">Role</strong><div className="fs-6">{companyDetails?.role?.role || "-"}</div></div>
                            <div className="col-md-3"><strong className="email">Reporting Manager</strong><div className="fs-6">{companyDetails?.reportingManager || "-"}</div></div>
                            <div className="col-md-3"><strong className="email">Mobile Number</strong><div className="fs-6">{companyDetails?.mobile || "-"}</div></div>
                            <div className="col-md-3"><strong className="email">Location</strong><div className="fs-6">{companyDetails?.city?.cityName || "-"}</div></div>
                        </div>
                    </div>
                </div>

                {/* ===== Company Details Section ===== */}
                <div className="container mb-4">
                    <div className="card rounded-4">
                        <div className="border-bottom p-3 section-title d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold mb-0"><i className="bi bi-person-lines-fill me-2"></i> Company Details</h6>
                            <img
                                src={editIcon}
                                alt="Edit"
                                className="edit-icons"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleEdit("company")}
                            />
                        </div>

                        <div className="row g-3 px-3 mb-3 small-text">
                            <div className="col-md-3"><strong className="email">Company Type</strong><div className="fs-6">{companyDetails?.companyType?.companyType || "-"}</div></div>
                            <div className="col-md-3"><strong className="email">Industry Type</strong><div className="fs-6">{companyDetails?.industryType?.industryType || "-"}</div></div>
                            <div className="col-md-3"><strong className="email">Contact Person</strong><div className="fs-6">{companyDetails?.contactPerson || "-"}</div></div>
                            <div className="col-md-3"><strong className="email">Designation</strong><div className="fs-6">{companyDetails?.designation?.designation || "-"}</div></div>
                            <div className="col-md-3"><strong className="email">Size of Organization</strong><div className="fs-6">{companyDetails?.sizeOfOrganization?.title || "-"}</div></div>
                        </div>
                    </div>
                </div>

                {/* ===== KYC Details ===== */}
                <div className="container mb-4 details">
                    <div className="card rounded-4">
                        <div className="border-bottom p-3 section-title d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold mb-0"><i className="bi bi-person-lines-fill me-2"></i>KYC Compliance Details</h6>
                            <img
                                src={editIcon}
                                alt="Edit"
                                className="edit-icons"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleEdit("kyc")}
                            />
                        </div>

                        <div className="row g-3 mb-3 px-3 small-text">

                            <div className="col-md-3"><strong className="email">EIN(Employer Identification Number)</strong><div className="fs-6"> {kyc?.ein || "-"}</div></div>
                            <div className="col-md-3"><strong className="email">Company Email Domain</strong><div className="fs-6">{kyc?.companyEmailDomain || "-"}</div></div>
                            <div className="col-md-3"><strong className="email">Company Address</strong><div className="fs-6">{kyc?.address || "-"}</div></div>
                            <div className="col-md-3"><strong className="email">Government Id</strong><div className="fs-6">{kyc?.govtId || "-"}</div></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BACK TO TOP */}
            <a href="#" className="btn btn-primary btn-lg-square back-to-top">
                <i className="fa fa-arrow-up"></i>
            </a>

            <Footer />

            {/* ========================= MODAL ========================= */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {activeSection === "account" && "Edit Account Details"}
                        {activeSection === "company" && "Edit Company Details"}
                        {activeSection === "kyc" && "Edit KYC Details"}
                        {activeSection === "profile" && "Edit Profile"}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* Account Edit */}
                    {activeSection === "account" && (
                        <Form>
                            <div className="row">

                                {/* Email */}
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" defaultValue="yethamsu@gmail.com" />
                                    </Form.Group>
                                </div>

                                {/* Email For Communication */}
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email for Communication</Form.Label>
                                        <Form.Control type="email" defaultValue="" />
                                    </Form.Group>
                                </div>

                                {/* Role */}
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Role</Form.Label>
                                        <Form.Control type="text" defaultValue="" />
                                    </Form.Group>
                                </div>

                                {/* Reporting Manager */}
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Reporting Manager</Form.Label>
                                        <Form.Control type="text" defaultValue="" />
                                    </Form.Group>
                                </div>

                                {/* Mobile Number */}
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control type="text" defaultValue="" />
                                    </Form.Group>
                                </div>

                                {/* Location */}
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control type="text" defaultValue="" />
                                    </Form.Group>
                                </div>

                            </div>
                        </Form>
                    )}


                    {/* Company Edit */}
                    {activeSection === "company" && (
                        <Form>

                            {/* Company Type */}
                            <Form.Group className="mb-3">
                                <Form.Label>Company Type</Form.Label>
                                <Form.Control type="text" defaultValue="" />
                            </Form.Group>

                            {/* Industry Type */}
                            <Form.Group className="mb-3">
                                <Form.Label>Industry Type</Form.Label>
                                <Form.Control type="text" defaultValue="" />
                            </Form.Group>

                            {/* Contact Person */}
                            <Form.Group className="mb-3">
                                <Form.Label>Contact Person</Form.Label>
                                <Form.Control type="text" defaultValue="" />
                            </Form.Group>

                            {/* Designation */}
                            <Form.Group className="mb-3">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control type="text" defaultValue="" />
                            </Form.Group>
                        </Form>
                    )}

                    {/* KYC Edit */}
                    {activeSection === "kyc" && (
                        <Form>
                            <div className="row">

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>KYC Status</Form.Label>
                                        <Form.Control type="text" defaultValue="" />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" defaultValue="" />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address Label</Form.Label>
                                        <Form.Control type="text" defaultValue="" />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" defaultValue="" />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control type="text" defaultValue="" />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control type="text" defaultValue="" />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" defaultValue="" />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Pincode</Form.Label>
                                        <Form.Control type="text" defaultValue="" />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>GSTIN</Form.Label>
                                        <Form.Control type="text" defaultValue="" />
                                    </Form.Group>
                                </div>

                            </div>
                        </Form>
                    )}
                    {/* PROFILE EDIT */}
                    {activeSection === "profile" && (
                        <Form>
                            <div className="row">

                                {/* Email */}
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" defaultValue="akeebshaik@gmail.com" />
                                    </Form.Group>
                                </div>

                                {/* Mobile Number */}
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control type="text" defaultValue="9880087932" />
                                    </Form.Group>
                                </div>

                                {/* Location */}
                                <div className="col-md-12">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control type="text" defaultValue="Bengaluru, INDIA" />
                                    </Form.Group>
                                </div>

                            </div>
                        </Form>
                    )}

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary">Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProfilePage;
