import React, { FormEvent, useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import editIcon from "../../assets/img/edit.svg";
import { FormErrorsEmployment, validateProfileEducationForm } from "../../common/validation.tsx";
import DeleteConfirmationModal from "../../admin/componets/Modal/DeleteModal.tsx";
import SearchableSelect from "../../components/SearchableSelect.tsx";

interface EducationProps {
  educationDetails: any;
  educationList: any[];
  courseList: any[];
  specializationList: any[];
  courseTypeList: any[];
  GradingSystemList: any[];
  onAdd: (formData: any) => void;
  onUpdate: (id: number, formData: any) => void;
  onDelete: (id: number) => void;
  activeSection: any;
  loading: boolean;
}
const EducationSection: React.FC<EducationProps> = ({ educationDetails, educationList, courseList, specializationList, courseTypeList, GradingSystemList, onAdd, onUpdate, onDelete, activeSection , loading}) => {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [errors, setErrors] = useState<FormErrorsEmployment>({});
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShow = () => setShowModal(true);

  const [formData, setFormData] = useState({
    educationId: 0,
    courseId: 0,
    specificationId: 0,
    university: "",
    courseTypeId: 0,
    courseStartYear: 0,
    courseEndYear: 0,
    gradingSystemId: 0,
    marks: "",
  });

  const educationOptions = educationList.map((item: any) => ({
    value: item.id,
    label: item.educationName,
  }));
  const courseOptions = courseList.map((item: any) => ({
    value: item.id,
    label: item.courseName,
  }));

  const specializationOptions = specializationList.map((item: any) => ({
    value: item.id,
    label: item.specializationName,
  }));

  const gradingSystemOptions = GradingSystemList.map((item: any) => ({
    value: item.id,
    label: item.gradingType,
  }));

  useEffect(() => {
    if (activeSection === "education") {
      setShowModal(true);
    }
  }, [activeSection]);

  const resetForm = () => {
    setEditId(null);
    setFormData({
      educationId: 0,
      courseId: 0,
      specificationId: 0,
      university: "",
      courseTypeId: 0,
      courseStartYear: 0,
      courseEndYear: 0,
      gradingSystemId: 0,
      marks: "",
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    setShowModal(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }))
  };

  const handleCourseType = (value: number) => {
    setFormData({ ...formData, courseTypeId: value });
    setErrors((prev) => ({ ...prev, courseTypeId: "" }))
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    setFormData({
      educationId: item.educationId,
      courseId: item.courseId,
      specificationId: item.specificationId,
      university: item.university,
      courseTypeId: item.courseTypeId,
      courseStartYear: item.courseStartYear,
      courseEndYear: item.courseEndYear,
      gradingSystemId: item.gradingSystemId,
      marks: item.marks,
    });

    setShowModal(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateProfileEducationForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    const payload = {
      ...formData,
      educationId: Number(formData.educationId),
      courseId: Number(formData.courseId),
      specificationId: Number(formData.specificationId),
      courseTypeId: Number(formData.courseTypeId),
      courseStartYear: Number(formData.courseStartYear),
      courseEndYear: Number(formData.courseEndYear),
      gradingSystemId: Number(formData.gradingSystemId),
    };

    if (editId) {
      onUpdate(editId, payload);
    } else {
      onAdd(payload);
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
    <div className="p-0 border rounded-4 mb-4 education">
      {/* ======= Header ======= */}
      <div className="d-flex p-3 justify-content-between align-items-center border-bottom pb-2 mb-3">
        <h6 className="fw-semibold mb-0">
          <i className="bi bi-mortarboard-fill me-2"></i> Education
        </h6>
        <span
          className="add-link text-primary"
          style={{ cursor: "pointer" }}
          onClick={handleShow}
        >
          <i className="bi bi-plus-circle me-1"></i> Add Education
        </span>
      </div>

      {/* ======= Education List ======= */}
      <div className="px-3">
        {educationDetails && educationDetails.length > 0 ? (
          <ul className="timeline-list list-unstyled">
            {educationDetails?.map((item: any, index: number) => (
              <li
                className={`timeline-item ${index !== educationDetails.length - 1 ? "mb-3" : ""}`}
                key={item.id}
              >
                <h6>{item?.education?.educationName}</h6>
                <a href="#" className="company">
                  {item?.university}
                </a>
                <br />
                <span className="meta text-muted">
                  <i className="bi bi-dot mx-1"></i>{item?.courseStartYear} – {item?.courseEndYear}
                </span>
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
            {/* <li className="timeline-item">
            <a
              className="company fw-semibold text-decoration-none"
              style={{ cursor: "pointer" }}
              onClick={handleShow}
            >
              + Add Education
            </a>
          </li> */}

          </ul>
        ) : (
          <p className="text-muted text-center">No education details found.</p>
        )}
      </div>

      {showDeleteModal &&
        <DeleteConfirmationModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          handleConfirm={() => handleDelete(deleteId)}
        />}

      {/* ======= Education Popup ======= */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="fw-semibold">Education Details</span>{" "}
              {/* <span className="text-success fs-6">Add 10%</span> */}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted mb-4">
              Details like course, university, and more help recruiters identify your educational background
            </p>

            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Education <span className="text-danger">*</span>
                    </Form.Label>
                    <SearchableSelect
                      name="educationId"
                      options={educationOptions}
                      value={formData.educationId}
                      onChange={handleChange}
                      placeholder="Select education"
                      error={errors.educationId}
                    />

                    {errors.educationId && <div className="invalid-feedback">{errors.educationId}</div>}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold"   >
                      University/Institute <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Select university/institute" value={formData.university} name="university" className={` ${errors.university ? "is-invalid" : ""}`}
                      onChange={handleChange} />
                    {errors.university && <div className="invalid-feedback">{errors.university}</div>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Course <span className="text-danger">*</span>
                    </Form.Label>
                    <SearchableSelect
                      name="courseId"
                      options={courseOptions}
                      value={formData.courseId}
                      onChange={handleChange}
                      placeholder="Select course"
                      error={errors.courseId}
                    />
                    {errors.courseId && <div className="invalid-feedback">{errors.courseId}</div>}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Specialization <span className="text-danger">*</span>
                    </Form.Label>
                    <SearchableSelect
                      name="specificationId"
                      options={specializationOptions}
                      value={formData.specificationId}
                      onChange={handleChange}
                      placeholder="Select specialization"
                      error={errors.specificationId}
                    />
                    {errors.specificationId && <div className="invalid-feedback">{errors.specificationId}</div>}
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Course Type <span className="text-danger">*</span>
                </Form.Label>

                <div className="d-flex gap-4 mt-2 flex-wrap">
                  {courseTypeList.map((course: any) => (
                    <div key={course.id}>
                      <Form.Check
                        type="radio"
                        name="courseTypeId"
                        id={`courseType-${course.id}`}
                        value={course.id}
                        label={course.courseType}
                        checked={formData.courseTypeId === course.id}
                        onChange={() => handleCourseType(course.id)}
                        className={errors.courseTypeId ? "is-invalid" : ""}
                      />
                    </div>
                  ))}
                </div>
                {errors.courseTypeId && (
                  <div className="invalid-feedback d-block">{errors.courseTypeId}</div>
                )}
              </Form.Group>


              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label className="fw-semibold">
                    Course Duration <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select name="courseStartYear" value={formData.courseStartYear} onChange={handleChange} className={` ${errors.courseStartYear ? "is-invalid" : ""}`}>
                    <option value="">Starting year</option>
                    {[...Array(51)].map((_, i) => {
                      const year = new Date().getFullYear() - i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </Form.Select>
                  {errors.courseStartYear && <div className="invalid-feedback">{errors.courseStartYear}</div>}

                </Col>
                <Col md={6} >
                  <Form.Label className="fw-semibold invisible">placeholder</Form.Label>
                  <Form.Select name="courseEndYear" value={formData.courseEndYear} onChange={handleChange} className={` ${errors.courseEndYear ? "is-invalid" : ""}`}>
                    <option value="">Ending year</option>
                    {[...Array(51)].map((_, i) => {
                      const year = new Date().getFullYear() - i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </Form.Select>
                  {errors.courseEndYear && <div className="invalid-feedback">{errors.courseEndYear}</div>}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} >
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Grading System<span className="text-danger"> *</span></Form.Label>
                    <SearchableSelect
                      name="gradingSystemId"
                      options={gradingSystemOptions}
                      value={formData.gradingSystemId}
                      onChange={handleChange}
                      placeholder="Select grading System"
                      error={errors.gradingSystemId}
                    />
                    {errors.gradingSystemId && <div className="invalid-feedback">{errors.gradingSystemId}</div>}
                  </Form.Group>
                </Col>
                <Col md={6} >
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold"   >
                      Marks <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter marks" value={formData.marks} name="marks" className={` ${errors.marks ? "is-invalid" : ""}`}
                      onChange={handleChange} />
                    {errors.marks && <div className="invalid-feedback">{errors.marks}</div>}
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>

          <Modal.Footer>  
            <Button variant="link" className="text-muted text-decoration-none" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="dark" onClick={handleSubmit}>
              {loading ? "Saving" : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );

};


export default EducationSection;
