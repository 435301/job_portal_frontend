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
    companyTypeOptions: Array<{ label: string; value: number }>;
    IndustryTypeOptions: Array<{ label: string; value: number }>;
    DesignationOptions: Array<{ label: string; value: number }>;
    OrganizationSizeOptions: Array<{ label: string; value: number }>;
    loading: boolean;
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
    companyTypeOptions,
    IndustryTypeOptions,
    DesignationOptions,
    OrganizationSizeOptions,
    loading
}) => {
    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Form onSubmit={handleSave}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {activeSection === "account" && "Edit Profile Details"}
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
                                        <Form.Label>Company Name<span className="text-danger"> *</span></Form.Label>
                                        <Form.Control type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter the company name" className={` ${errors.companyName ? "is-invalid" : ""}`} />
                                        {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email<span className="text-danger"> *</span></Form.Label>
                                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter the email" className={` ${errors.email ? "is-invalid" : ""}`} />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email for Communication</Form.Label>
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
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Company Type</Form.Label>
                                        <SearchableSelect
                                            name="companyTypeId"
                                            options={companyTypeOptions}
                                            value={formData.companyTypeId}
                                            onChange={handleChange}
                                            placeholder="Select Company Type"
                                            error={errors.companyTypeId}
                                        />
                                        {errors.companyTypeId && <div className="invalid-feedback">{errors.companyTypeId}</div>}
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Industry Type</Form.Label>
                                        <SearchableSelect
                                            name="industryTypeId"
                                            options={IndustryTypeOptions}
                                            value={formData.industryTypeId}
                                            onChange={handleChange}
                                            placeholder="Select Industry Type"
                                            error={errors.industryTypeId}
                                        />
                                        {errors.industryTypeId && <div className="invalid-feedback">{errors.industryTypeId}</div>}
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Contact Person</Form.Label>
                                        <Form.Control type="text"
                                            name="contactPerson"
                                            value={formData.contactPerson}
                                            onChange={handleChange}
                                            placeholder="Enter the contact person"
                                            className={` ${errors.contactPerson ? "is-invalid" : ""}`} />
                                        {errors.contactPerson && <div className="invalid-feedback">{errors.contactPerson}</div>}
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Designation</Form.Label>
                                        <SearchableSelect
                                            name="designationId"
                                            options={DesignationOptions}
                                            value={formData.designationId}
                                            onChange={handleChange}
                                            placeholder="Select Designation"
                                            error={errors.designationId}
                                        />
                                        {errors.designationId && <div className="invalid-feedback">{errors.designationId}</div>}
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Organization Size</Form.Label>
                                        <SearchableSelect
                                            name="sizeOfOrganizationId"
                                            options={OrganizationSizeOptions}
                                            value={formData.sizeOfOrganizationId}
                                            onChange={handleChange}
                                            placeholder="Select Organization Size"
                                            error={errors.sizeOfOrganizationId}
                                        />
                                        {errors.sizeOfOrganizationId && <div className="invalid-feedback">{errors.sizeOfOrganizationId}</div>}
                                    </Form.Group>
                                </div>
                            </div>
                        </Form>
                    )}

                    {/* KYC EDIT */}
                    {activeSection === "kyc" && (
                        <Form>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>EIN<span className="text-danger"> *</span></Form.Label>
                                        <Form.Control type="text"
                                            name="ein"
                                            value={formData.ein}
                                            onChange={handleChange}
                                            placeholder="Enter the EIN "
                                            className={` ${errors.ein ? "is-invalid" : ""}`} />
                                        {errors.ein && <div className="invalid-feedback">{errors.ein}</div>}
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Company Email Domain<span className="text-danger"> *</span></Form.Label>
                                        <Form.Control type="text"
                                            name="companyEmailDomain"
                                            value={formData.companyEmailDomain}
                                            onChange={handleChange}
                                            placeholder="Enter the Company Email Domain "
                                            className={` ${errors.companyEmailDomain ? "is-invalid" : ""}`} />
                                        {errors.companyEmailDomain && <div className="invalid-feedback">{errors.companyEmailDomain}</div>}
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Company Address<span className="text-danger"> *</span></Form.Label>
                                        <Form.Control type="text"
                                            name="companyAddress"
                                            value={formData.companyAddress}
                                            onChange={handleChange}
                                            placeholder="Enter the Company Address "
                                            className={` ${errors.companyAddress ? "is-invalid" : ""}`} />
                                        {errors.companyAddress && <div className="invalid-feedback">{errors.companyAddress}</div>}
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Government ID<span className="text-danger"> *</span></Form.Label>
                                        <Form.Control type="text"
                                            name="govtId"
                                            value={formData.govtId}
                                            onChange={handleChange}
                                            placeholder="Enter the govt id "
                                            className={` ${errors.govtId ? "is-invalid" : ""}`} />
                                        {errors.govtId && <div className="invalid-feedback">{errors.govtId}</div>}
                                    </Form.Group>
                                </div>
                            </div>
                        </Form>
                    )}

                 
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave}> {loading ? "Saving Changes" :"Save Changes"}</Button>
                </Modal.Footer>
            </Form>
        </Modal>

    );
};

export default EditCompanyProfileModal;
