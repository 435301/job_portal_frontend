import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import SearchableSelect from "../../components/SearchableSelect.tsx";

export interface EditModalProps {
    showModal: boolean;
    handleClose: () => void;
    activeSection: string;
    roleOptions: Array<{ label: string; value: number }>;
    formData: Record<string, any>;
    handleChange: (e: any) => void;
    handleSave: any;
    cityOptions: Array<{ label: string; value: number }>;
    errors: any;
}


const EditCompanyProfileModal: React.FC<EditModalProps> = ({
    showModal,
    handleClose,
    activeSection,
    roleOptions,
    formData,
    handleChange,
    handleSave,
    cityOptions,
    errors,
}) => {
    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Form onSubmit={handleSave}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {activeSection === "account" && "Edit Account Details"}
                        {activeSection === "company" && "Edit Company Details"}
                        {activeSection === "kyc" && "Edit KYC Details"}
                        {activeSection === "profile" && "Edit Profile"}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* ACCOUNT EDIT */}
                    {activeSection === "account" && (
                        <Form>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email<span className="text-danger"> *</span></Form.Label>
                                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter the email" className={` ${errors.email ? "is-invalid" : ""}`} />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email for Communication<span className="text-danger"> *</span></Form.Label>
                                        <Form.Control type="email" name="alternativeEmail" value={formData.alternativeEmail} onChange={handleChange} placeholder="Enter the alternate email" className={` ${errors.alternativeEmail ? "is-invalid" : ""}`} />
                                        {errors.alternativeEmail && <div className="invalid-feedback">{errors.alternativeEmail}</div>}
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Role<span className="text-danger"> *</span></Form.Label>
                                        <SearchableSelect
                                            name="roleId"
                                            options={roleOptions}
                                            value={formData.roleId}
                                            onChange={handleChange}
                                            placeholder="Select role"
                                            error={errors.roleId}
                                        />
                                        {errors.roleId && <div className="invalid-feedback">{errors.roleId}</div>}
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Reporting Manager</Form.Label>
                                        <Form.Control type="text" name="reportingManager" value={formData.reportingManager} onChange={handleChange} placeholder="Enter the reporting manager name" className={` ${errors.reportingManager ? "is-invalid" : ""}`} />
                                        {errors.reportingManager && <div className="invalid-feedback">{errors.reportingManager}</div>}
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Mobile Number<span className="text-danger"> *</span></Form.Label>
                                        <Form.Control type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter the mobile number" className={` ${errors.mobile ? "is-invalid" : ""}`} />
                                        {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Location<span className="text-danger"> *</span></Form.Label>
                                        <SearchableSelect
                                            name="cityId"
                                            options={cityOptions}
                                            value={formData.cityId}
                                            onChange={handleChange}
                                            placeholder="Select city"
                                             error={errors.cityId}
                                        />
                                        {errors.cityId && <div className="invalid-feedback">{errors.cityId}</div>}
                                    </Form.Group>
                                </div>
                            </div>
                        </Form>
                    )}

                    {/* COMPANY EDIT */}
                    {activeSection === "company" && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Company Type</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Industry Type</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Contact Person</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                        </Form>
                    )}

                    {/* KYC EDIT */}
                    {activeSection === "kyc" && (
                        <Form>
                            <div className="row">
                                {[
                                    "KYC Status",
                                    "Name",
                                    "Address Label",
                                    "Address",
                                    "Country",
                                    "State",
                                    "City",
                                    "Pincode",
                                    "GSTIN"
                                ].map((label, idx) => (
                                    <div className="col-md-6" key={idx}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>{label}</Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>
                                    </div>
                                ))}
                            </div>
                        </Form>
                    )}

                    {/* PROFILE EDIT */}
                    {activeSection === "profile" && (
                        <Form>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" defaultValue="akeebshaik@gmail.com" />
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control type="text" defaultValue="9880087932" />
                                    </Form.Group>
                                </div>

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
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>

    );
};

export default EditCompanyProfileModal;
