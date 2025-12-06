import React, { FormEvent, useEffect, useRef, useState } from "react";
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import avatarImage from "../assets/img/profile-1.png";
import editIcon from "../assets/img/edit-63.svg";
import { Modal, Button, Form, } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store.tsx";
import { useAppSelector } from "../redux/hooks.tsx";
import { fetchEmployerProfile, updateCompanyDetails, updateCompanyProfileDetails, updateKycDetails, uploadCompanyLogo } from "../redux/slices/employerProfileSlice.tsx";
import BASE_URL_JOB from "../config/config.jsx";
import profile from "../assets/img/profile.jpg";
import "../assets/css/style.css";
import { getAllRole } from "../redux/slices/RoleSlice.tsx";
import SearchableSelect from "../components/SearchableSelect.tsx";
import { FormErrors, validateCompanyDetailsForm, validateCompanyProfileForm, validateKycDetailsForm } from "../common/validation.tsx";
import EditCompanyProfileModal from "./components/EditCompanyProfileModal.tsx";
import { getAllCities } from "../redux/slices/citiesSlice.tsx";
import { getAllCompanyType } from "../redux/slices/CompanyTypeSlice.tsx";
import { getAllIndustryType } from "../redux/slices/IndustryTypeSlice.tsx";
import { getAllDesignation } from "../redux/slices/DesignationSlice.tsx";
import { getAllOrganizationSize } from "../redux/slices/organizationSizeSlice.tsx";



function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>();
    const employerId = JSON.parse(localStorage.getItem("employer") ?? "{}")?.id;
    const { loading, data, error } = useAppSelector((state: RootState) => state.employerProfile);
    const companyDetails = data?.companyDetails;
    const kycDetails = data?.kycDetails;
    const kyc = kycDetails?.[0];
    const { RoleList } = useAppSelector((state: RootState) => state.role);
    const { CityList } = useAppSelector((state: RootState) => state.city);
    const { CompanyTypeList } = useAppSelector((state: RootState) => state.companyType);
    const { IndustryTypeList } = useAppSelector((state: RootState) => state.industryType);
    const { DesignationList } = useAppSelector((state: RootState) => state.designation);
    const { OrganizationSizeList } = useAppSelector((state: RootState) => state.organizationSize);
    const [showModal, setShowModal] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [profilePhoto, setProfilePhoto] = useState<any>();
    const [errors, setErrors] = useState<FormErrors>({});
      const [uploading, setUploading] = useState(false);
      const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        companyName:"",
        companyDescription:"",
        email: "",
        alternativeEmail: "",
        roleId: 0,
        reportingManager: "",
        mobile: "",
        cityId: 0,
        companyTypeId: 0,
        industryTypeId: 0,
        contactPerson: "",
        designationId: 0,
        sizeOfOrganizationId: 0,
        ein: 0,
        companyEmailDomain: "",
        companyAddress: "",

    });

    const roleOptions = RoleList.map((item: any) => ({
        value: item.id,
        label: item.role,
    }));

    const cityOptions = CityList.map((item: any) => ({
        value: item.id,
        label: item.cityName,
    }));

    const companyTypeOptions = CompanyTypeList.map((item: any) => ({
        value: item.id,
        label: item.companyType,
    }));

    const IndustryTypeOptions = IndustryTypeList.map((item: any) => ({
        value: item.id,
        label: item.industryType,
    }));

    const DesignationOptions = DesignationList.map((item: any) => ({
        value: item.id,
        label: item.designation,
    }));

    const OrganizationSizeOptions = OrganizationSizeList.map((item: any) => ({
        value: item.id,
        label: item.title,
    }));


    useEffect(() => {
        if (employerId) {
            dispatch(fetchEmployerProfile(employerId));
            dispatch(getAllRole());
            dispatch(getAllCities());
            dispatch(getAllCompanyType());
            dispatch(getAllIndustryType());
            dispatch(getAllDesignation());
            dispatch(getAllOrganizationSize());
        }
    }, [employerId]);

    useEffect(() => {
        if (companyDetails?.companyLogo) {
            setProfilePhoto(companyDetails?.companyLogo);
        }
    }, [companyDetails]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: "" }))
    };

    const handleEdit = (section: string) => {
        setActiveSection(section);

        if (section === "account") {
            setFormData(prev => ({
                ...prev,
                companyName:companyDetails?.companyName|| "",
                companyDescription:companyDetails?.companyDescription || "",
                email: companyDetails?.email || "",
                alternativeEmail: companyDetails?.alternativeEmail || "",
                roleId: companyDetails?.roleId || 0,
                reportingManager: companyDetails?.reportingManager || "",
                mobile: companyDetails?.mobile || "",
                cityId: companyDetails?.cityId || 0,
            }));
        }

        if (section === "company") {
            setFormData(prev => ({
                ...prev,
                companyTypeId: companyDetails?.companyTypeId || 0,
                industryTypeId: companyDetails?.industryTypeId || 0,
                contactPerson: companyDetails?.contactPerson || "",
                designationId: companyDetails?.designationId || 0,
                sizeOfOrganizationId: companyDetails?.sizeOfOrganizationId || 0,
            }));
        }

        if (section === "kyc" && kyc) {
            setFormData(prev => ({
                ...prev,
                ein: kyc.ein || "",
                companyEmailDomain: kyc.companyEmailDomain || "",
                companyAddress: kyc.address || "",
            }));
        }
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setFormData({
            companyName:"",
            companyDescription:"",
            email: "",
            alternativeEmail: "",
            roleId: 0,
            reportingManager: "",
            mobile: "",
            cityId: 0,
            companyTypeId: 0,
            industryTypeId: 0,
            contactPerson: "",
            designationId: 0,
            sizeOfOrganizationId: 0,
            ein: 0,
            companyEmailDomain: "",
            companyAddress: "",
        })
        setErrors({});
    }

    const handleProfilePhoto = async (e: any,) => {
        const file = e.target.files[0];
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        setProfilePhoto(previewUrl);
        setUploading(true);

        await dispatch(uploadCompanyLogo(file))
         setUploading(false);
    };

    const fileRef = useRef<HTMLInputElement>(null);

    const triggerUpload = () => {
        fileRef.current?.click();
    };
    const handleSave = (e: FormEvent) => {
        e.preventDefault();
        let validationErrors = {};
        if (activeSection === "account") {
            validationErrors = validateCompanyProfileForm(formData);
        }
        if (activeSection === "company") {
            validationErrors = validateCompanyDetailsForm(formData);
        }
        if (activeSection === "kyc") {
            validationErrors = validateKycDetailsForm(formData);
        }
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        if (activeSection === "account") {
            dispatch(
                updateCompanyProfileDetails({
                    payload: {
                        companyName:formData.companyName,
                        companyDescription:formData.companyDescription,
                        email: formData.email,
                        alternativeEmail: formData.alternativeEmail,
                        roleId: formData.roleId,
                        reportingManager: formData.reportingManager,
                        mobile: formData.mobile,
                        cityId: formData.cityId,
                    },
                })
            );
        }

        if (activeSection === "company") {
            dispatch(
                updateCompanyDetails({
                    payload: {
                        companyTypeId: formData.companyTypeId,
                        industryTypeId: formData.industryTypeId,
                        contactPerson: formData.contactPerson,
                        designationId: formData.designationId,
                        sizeOfOrganizationId: formData.sizeOfOrganizationId,
                    },
                })
            );
        }
        if (activeSection === "kyc") {
            dispatch(
                updateKycDetails({
                    payload: {
                        ein: formData.ein,
                        companyEmailDomain: formData.companyEmailDomain,
                        companyAddress: formData.companyAddress,
                    },
                })
            );
        }
        setShowModal(false);
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
                            {uploading && (
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
                                <div className="progress flex-grow-1" >
                                    <div className="progress-bar progress-bar"
                                        style={{
                                            width: `${Number(data?.profileCompletion) || 0}%`,
                                            transition: "width 0.5s ease"
                                        }}></div>
                                </div>
                                <small className="text-muted ms-2">{data?.profileCompletion || 0} % </small>
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
                <div className="container mb-4 details">
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
                            <div className="col-md-3"><strong className="companyName">Company Name</strong><div className="fs-6"> {companyDetails?.companyName || "-"} </div></div>
                            <div className="col-md-3"><strong className="companyDescription">Company Description</strong><div className="fs-6"> {companyDetails?.companyDescription || "-"} </div></div>
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
                <div className="container mb-4 details">
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
                        </div>
                    </div>
                </div>
            </div>

            {/* BACK TO TOP */}
            <a href="#" className="btn btn-primary btn-lg-square back-to-top">
                <i className="fa fa-arrow-up"></i>
            </a>

            <Footer />

            <EditCompanyProfileModal
                showModal={showModal}
                handleClose={handleClose}
                activeSection={activeSection}
                roleOptions={roleOptions}
                cityOptions={cityOptions}
                companyTypeOptions={companyTypeOptions}
                IndustryTypeOptions={IndustryTypeOptions}
                DesignationOptions={DesignationOptions}
                OrganizationSizeOptions={OrganizationSizeOptions}
                formData={formData}
                handleChange={handleChange}
                handleSave={handleSave}
                errors={errors}
                loading={loading}
            />
        </div>
    );
}

export default ProfilePage;
