import React, { FormEvent, useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown, Badge } from "react-bootstrap";
import editIcon from "../../assets/img/edit.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAppDispatch } from "../../redux/hooks.tsx";
import { FormErrorsEmployment, validateEmploymentForm, } from "../../common/validation.tsx";
import "../../assets/css/style.css";
import DeleteConfirmationModal from "../../admin/componets/Modal/DeleteModal.tsx";

interface EmploymentProps {
  employmentDetails: any;
  onAdd: (formData: any) => void;
  onUpdate: (id: number, formData: any) => void;
  onDelete: (id: number) => void;
  EmploymentTypeList: any[];
  NoticePeriodList: any[];
  CurrencyTypeList: any[];
  activeSection: any;
}

interface EmploymentForm {
  isCurrentEmployment: boolean,
  employmentTypeId: number,
  totalExpYears: number,
  totalExpMonths: number,
  currentCompanyName: string,
  currentJobTitle: string,
  joiningYear: number,
  joiningMonth: number,
  endingYear: number,
  endingMonth: number,
  currencyId: number,
  currentSalary: number,
  skillsUsed: string,
  noticePeriodId: number,
  jobProfile: "",

}

const EmploymentSection: React.FC<EmploymentProps> = ({ employmentDetails, EmploymentTypeList, NoticePeriodList, CurrencyTypeList, onAdd, onUpdate, onDelete, activeSection }) => {
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<FormErrorsEmployment>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState<EmploymentForm>({
    isCurrentEmployment: false,
    employmentTypeId: 0,
    totalExpYears: 0,
    totalExpMonths: 0,
    currentCompanyName: "",
    currentJobTitle: "",
    joiningYear: 0,
    joiningMonth: 0,
    endingYear: 0,
    endingMonth: 0,
    currencyId: 0,
    currentSalary: 0,
    skillsUsed: "",
    noticePeriodId: 0,
    jobProfile: "",
  });

  useEffect(() => {
    if (activeSection === "employment") {
      setShow(true);
    }
  }, [activeSection]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const numericFields = [
      "employmentTypeId",
      "totalExpYears",
      "totalExpMonths",
      "joiningYear",
      "joiningMonth",
      "endingYear",
      "endingMonth",
      "currencyId",
      "currentSalary",
      "noticePeriodId"
    ];
    setFormData({
      ...formData,
      [name]: numericFields.includes(name) ? Number(value) : value
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  const handlEmploymentType = (id: any) => {
    setFormData({ ...formData, employmentTypeId: id });
  };

  const handleSwitch = () => {
    setFormData({ ...formData, isCurrentEmployment: !formData.isCurrentEmployment });
  };
  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setFormData({
      isCurrentEmployment: false,
      employmentTypeId: 0,
      totalExpYears: 0,
      totalExpMonths: 0,
      currentCompanyName: "",
      currentJobTitle: "",
      joiningYear: 0,
      joiningMonth: 0,
      endingYear: 0,
      endingMonth: 0,
      currencyId: 0,
      currentSalary: 0,
      skillsUsed: "",
      noticePeriodId: 0,
      jobProfile: "",
    });
    setErrors({});
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    setFormData({
      isCurrentEmployment: item.isCurrentEmployment === 1,
      employmentTypeId: item.employmentTypeId,
      totalExpYears: item.totalExpYears,
      totalExpMonths: item.totalExpMonths,
      currentCompanyName: item.currentCompanyName,
      currentJobTitle: item.currentJobTitle,
      joiningYear: item.joiningYear,
      joiningMonth: item.joiningMonth,
      endingYear: item.endingYear,
      endingMonth: item.endingMonth,
      currencyId: item.currencyId,
      currentSalary: item.currentSalary,
      skillsUsed: item.skillsUsed,
      noticePeriodId: item.noticePeriodId,
      jobProfile: item.jobProfile,
    });
    setShow(true);
  };

  const handleSubmit = (e: FormEvent) => {
    console.log('firat')
    e.preventDefault();
    console.log("Form submitted");
    const validationErrors = validateEmploymentForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    try {
      const payload = {
        ...formData,
        isCurrentEmployment: formData.isCurrentEmployment ? 1 : 0,
      };
      if (editId) {
        onUpdate(editId, payload)
      } else {
        onAdd(payload)
      }
    } catch (err) {
      console.log(err)
    }
    handleClose();
  };

  const handleDelete = (id: any) => {
    onDelete(id);
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  return (
    <>
      {/* Employment Section Card */}
      <div className="p-0 border rounded-4 mb-4 bg-white ">
        <div className="d-flex p-3 justify-content-between align-items-center border-bottom pb-2 mb-3">
          <h6 className="fw-semibold mb-0">
            <i className="bi bi-person-lines-fill me-2 "></i> Employment
          </h6>
          <span
            className="add-link text-primary"
            style={{ cursor: "pointer" }}
            onClick={handleShow}
          >
            <i className="bi bi-plus-circle me-1"></i> Add details
          </span>
        </div>

        {/* Employment List */}

        <div className="px-3 mb-4">
          <ul className="timeline-list list-unstyled mb-0">

            {employmentDetails?.map((item: any, index: number) => (
              <li
                className={`timeline-item ${index !== employmentDetails.length - 1 ? "mb-4" : ""}`}
                key={item.id}
              >
                <h6 className={`${index !== 0 ? "fw-semibold mb-1" : ""}`}>
                  {item.currentJobTitle}
                </h6>

                <a href="#" className="company">
                  {item.currentCompanyName}
                </a>

                <span className="meta">
                  <i className="bi bi-dot mx-1"></i>
                  {item.joiningYear}-{item.endingYear}
                </span>

                <span> <p>{item.jobProfile}</p></span>
                <i
                  className="bi bi-pencil edit-icon ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEdit(item)}
                ></i>

                <i
                  className="bi bi-trash edit-icon ms-2 text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteClick(item.id)}
                ></i>
              </li>
            ))}

            {/* ===== Add Employment Row ===== */}
            <li className="timeline-item">
              <a
                className="company fw-semibold text-decoration-none"
                style={{ cursor: "pointer" }}
                onClick={handleShow}
              >
                + Add Employment
              </a>
            </li>

          </ul>
        </div>

      </div>
      {showDeleteModal &&
        <DeleteConfirmationModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          handleConfirm={() => handleDelete(deleteId)}
        />}

      {/* ===== Employment Modal ===== */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Form onSubmit={handleSubmit}>
          <div className="modal-content">
            {/* ===== Modal Header ===== */}
            <div className="modal-header">
              <h5 className="modal-title" id="employmentModalLabel">
                <i className="bi bi-briefcase-fill me-2"></i> Employment
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>

            {/* ===== Modal Body ===== */}
            <div className="modal-body">
              <p className="text-muted small">
                Details like job title, company name, etc. help employers understand your work.
              </p>

              {/* Current Employment Section */}
              <div className="radio-row mb-4">
                <div className="mb-3 d-flex align-items-center flex-wrap">
                  <h6 className="mb-2 me-3">Is this your current employment?<span className="text-danger"> *</span></h6>
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={formData.isCurrentEmployment}
                      onChange={handleSwitch}
                    />
                    <label className="ms-2">
                      {formData.isCurrentEmployment ? "Yes" : "No"}
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <h6 className="mb-3">Employment type<span className="text-danger"> *</span></h6>
                  {EmploymentTypeList?.map((item: any) => (
                    <Badge
                      key={item.id}
                      bg={formData.employmentTypeId === item.id ? "dark" : "light"}
                      text={formData.employmentTypeId === item.id ? "light" : "dark"}
                      className={` border rounded-pill px-3 py-2 ${errors.employmentTypeId ? "is-invalid" : ""}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => handlEmploymentType(item.id)}
                    >
                      {item?.employmentType}
                    </Badge>
                  ))}
                  {errors.employmentTypeId && <div className="invalid-feedback">{errors.employmentTypeId}</div>}
                </div>
              </div>

              {/* Total Experience */}
              <div className="row mb-3 yers">
                <h6 className="mb-3">Total experience<span className="text-danger"> *</span></h6>
                <div className="col-md-6 ">
                  <label >Years</label>
                  <Form.Select value={formData.totalExpYears} name="totalExpYears" onChange={handleChange} className={`form-control ${errors.totalExpYears ? "is-invalid" : ""}`} >
                    <option value="">Years</option>
                    {[...Array(51).keys()].map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.totalExpYears && <div className="invalid-feedback">{errors.totalExpYears}</div>}
                </div>
                <div className="col-md-6">
                  <label>Months</label>
                  <Form.Select name="totalExpMonths" value={formData.totalExpMonths} onChange={handleChange} className={`form-control  ${errors.totalExpMonths ? "is-invalid" : ""}`} >
                    <option value="">Months</option>
                    {[...Array(12).keys()].map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.totalExpMonths && <div className="invalid-feedback">{errors.totalExpMonths}</div>}
                </div>
              </div>

              {/* Company and Title */}
              <div className="row mb-3 g-3">
                <div className="col-md-12">
                  <label className="form-section-label">Current company name<span className="text-danger"> *</span></label>
                  <Form.Control type="text" placeholder="Type your company name" className={`form-control  ${errors.currentCompanyName ? "is-invalid" : ""}`} name="currentCompanyName" value={formData.currentCompanyName} onChange={handleChange} />
                  {errors.currentCompanyName && <div className="invalid-feedback">{errors.currentCompanyName}</div>}

                </div>
                <div className="col-md-12">
                  <label className="form-section-label">Current job title<span className="text-danger"> *</span></label>
                  <Form.Control type="text" placeholder="Type your designation" name="currentJobTitle" value={formData.currentJobTitle} onChange={handleChange} className={`form-control  ${errors.currentJobTitle ? "is-invalid" : ""}`} />
                  {errors.currentJobTitle && <div className="invalid-feedback">{errors.currentJobTitle}</div>}
                </div>
              </div>

              {/* Joining Date */}
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-section-label">Joining date<span className="text-danger"> *</span></label>
                  <div className="d-flex gap-2">
                    <Form.Select name="joiningYear" value={formData.joiningYear} onChange={handleChange} className={`form-control  ${errors.joiningYear ? "is-invalid" : ""}`}>
                      <option value="">Years</option>
                      {[...Array(30)].map((_, i) => {
                        const year = new Date().getFullYear() - i;
                        return <option key={year} value={year}>{year}</option>;
                      })}
                    </Form.Select>
                    {errors.joiningYear && <div className="invalid-feedback">{errors.joiningYear}</div>}

                    <Form.Select name="joiningMonth" value={formData.joiningMonth} onChange={handleChange} className={`form-control  ${errors.joiningMonth ? "is-invalid" : ""}`} >
                      <option value="">Months</option>
                      {[
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                      ].map((m, i) => (
                        <option key={i + 1} value={i + 1}>
                          {m}
                        </option>
                      ))}

                    </Form.Select>
                    {errors.joiningMonth && <div className="invalid-feedback">{errors.joiningMonth}</div>}

                  </div>
                </div>
              </div>
              {/* Ending Date */}
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-section-label">Ending date<span className="text-danger"> *</span></label>
                  <div className="d-flex gap-2">
                    <Form.Select name="endingYear" value={formData.endingYear} onChange={handleChange} className={`form-control  ${errors.endingYear ? "is-invalid" : ""}`}>
                      <option value="">Years</option>
                      {[...Array(30)].map((_, i) => {
                        const year = new Date().getFullYear() - i;
                        return <option key={year} value={year}>{year}</option>;
                      })}
                    </Form.Select>
                    {errors.endingYear && <div className="invalid-feedback">{errors.endingYear}</div>}

                    <Form.Select name="endingMonth" value={formData.endingMonth} onChange={handleChange} className={`form-control  ${errors.endingMonth ? "is-invalid" : ""}`} >
                      <option value="">Months</option>
                      {[
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                      ].map((m, i) => (
                        <option key={i + 1} value={i + 1}>
                          {m}
                        </option>
                      ))}

                    </Form.Select>
                    {errors.endingMonth && <div className="invalid-feedback">{errors.endingMonth}</div>}

                  </div>
                </div>
              </div>

              {/* Current Salary */}
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-section-label fw-semibold mb-2">
                    Current Salary<span className="text-danger"> *</span>
                  </label>
                  <div className="input-group">
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-dark">
                        {CurrencyTypeList.find((c: any) => c.id === formData.currencyId)?.currencyType || "Select"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {CurrencyTypeList.map((item: any) => (
                          <Dropdown.Item
                            key={item.id}
                            onClick={() => setFormData({ ...formData, currencyId: item.id })}
                          >
                            {item.currencyType}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control type="text" placeholder="4,00,000" name="currentSalary" value={formData.currentSalary} onChange={handleChange} className={`form-control  ${errors.currentSalary ? "is-invalid" : ""}`} />
                    {errors.currentSalary && <div className="invalid-feedback">{errors.currentSalary}</div>}
                  </div>
                </div>
              </div>

              {/* Skills Used */}
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-section-label">Skills used<span className="text-danger"> *</span></label>
                  <Form.Control type="text" placeholder="Add Skills" name="skillsUsed" value={formData.skillsUsed} onChange={handleChange} className={`form-control  ${errors.skillsUsed ? "is-invalid" : ""}`} />
                  {errors.skillsUsed && <div className="invalid-feedback">{errors.skillsUsed}</div>}
                </div>
              </div>

              {/* Job Profile */}
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-section-label">Job Profile</label>
                  <Form.Control as="textarea" rows={3} placeholder="Type here" name="jobProfile" value={formData.jobProfile} onChange={handleChange} />
                </div>
              </div>

              {/* Notice Period */}
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-section-label">Notice period<span className="text-danger"> *</span></label>
                  <Form.Select name="noticePeriodId" value={formData.noticePeriodId} onChange={handleChange} className={`form-control  ${errors.noticePeriodId ? "is-invalid" : ""}`}>
                    <option>Select notice period</option>
                    {NoticePeriodList.map((item: any) => (
                      <option key={item?.id} value={item.id}>
                        {item.noticePeriodName}
                      </option>
                    ))}

                  </Form.Select>
                  {errors.noticePeriodId && <div className="invalid-feedback">{errors.noticePeriodId}</div>}
                </div>
              </div>
              <div className="modal-footer">
                <Button variant="link" className="text-muted text-decoration-none" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="dark" className="btn-save" type="submit">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Modal>

    </>
  );
};

export default EmploymentSection;
