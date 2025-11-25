import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.tsx";
import { FormErrors, validateITSkillsForm } from "../../common/validation.tsx";
import { addITSkill, updateITSkill } from "../../redux/slices/employeeProfileSlice.tsx";
import { getAllSkills } from "../../redux/slices/skillSlice.tsx";
import { RootState } from "../../redux/store.tsx";

interface ITSkillsProps {
  itSkills: any;
  activeSection: any;
}

interface ITSkillsForm {
  skillId: number | string;
  version: number | any;
  lastUsedYear: number | string;
  expYears: number | string;
  expMonths: number | string;
}
const ITSkillsSection: React.FC<ITSkillsProps> = ({ itSkills, activeSection }) => {
  const dispatch = useAppDispatch();
  const { skillList } = useAppSelector((state: RootState) => state.skill);
  const employeeId = JSON.parse(localStorage.getItem("employee") ?? "{}")?.id;
  console.log('skillList', skillList)
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState<ITSkillsForm>({
    skillId: "",
    version: "",
    lastUsedYear: "",
    expYears: "",
    expMonths: "",

  });

  const [editMode, setEditMode] = useState(false);
  const [editRowId, setEditRowId] = useState<number | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    // if(employeeId){
    dispatch(getAllSkills());
    // }
  }, [dispatch, employeeId]);

  useEffect(() => {
    if (activeSection === "itSkills") {
      setShow(true);
    }
  }, [activeSection]);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    resetForm();
  }

  const resetForm = () => {
    setFormData({
      skillId: "",
      version: "",
      lastUsedYear: "",
      expYears: "",
      expMonths: "",
    })
    setEditMode(false);
    setEditRowId(null);
  };


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleEdit = (row: any) => {
    setEditMode(true);
    setEditRowId(row.id);
    setFormData({
      skillId: String(row.skillId),
      version: row.version || "",
      lastUsedYear: String(row.lastUsedYear || ""),
      expYears: String(row.expYears),
      expMonths: String(row.expMonths)
    });

    setShow(true);
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateITSkillsForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    if (editMode && editRowId) {
      // UPDATE CALL
      dispatch(
        updateITSkill({
          id: editRowId,
          payload: {
            version: formData.version,
            lastUsedYear: Number(formData.lastUsedYear),
            expYears: Number(formData.expYears),
            expMonths: Number(formData.expMonths),
          }
        })
      );
    } else {
      // ADD CALL
      dispatch(
        addITSkill({
          skillId: Number(formData.skillId),
          version: formData.version,
          lastUsedYear: Number(formData.lastUsedYear),
          expYears: Number(formData.expYears),
          expMonths: Number(formData.expMonths),
        })
      );
    }

    handleClose();
  };

  return (
    <>
      {/* ===== IT Skills Section ===== */}
      <div className="card-section border rounded-3 bg-white">
        <div className="section-header p-3 mb-0 d-flex justify-content-between align-items-center">
          <div>
            <i className="bi bi-laptop me-2"></i>
            <span className="fw-semibold">IT Skills</span>
          </div>
          <span
            className="add-link text-primary"
            style={{ cursor: "pointer" }}
            onClick={handleShow}
          >
            <i className="bi bi-plus-circle me-1"></i> Add details
          </span>
        </div>

        <table className="table table-borderless align-middle mb-0">
          <thead>
            <tr>
              <th>Skills</th>
              <th>Version</th>
              <th>Last Used</th>
              <th>Experience</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {itSkills?.map((row: any) => (
              <tr key={row.id}>
                <td>{row.skill?.skillName || ""}</td>
                <td>{row.version || "-"}</td>
                <td>{row.lastUsedYear || "-"}</td>
                <td>
                  {row.expYears} years {row.expMonths} months
                </td>
                <td>
                  <i
                    className="bi bi-pencil edit-icon ms-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(row)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Add Skill Modal ===== */}
      <Modal show={show} onHide={handleClose} centered>
        <div className="modal-content border-0 shadow-sm">
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">
              <i className="bi bi-laptop me-2 "></i>  {editMode ? "Edit IT Skill" : "Add IT Skill"}
              {/* <span className="text-success fw-semibold fs-6">Add 10%</span> */}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className="text-muted small mb-4">
              Mention skills like programming languages (Java, Python),
              software (Microsoft Word, Excel) and more, to show your technical
              expertise.
            </p>

            {/* Skill Name */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Skill / software name <span className="text-danger">*</span>
              </Form.Label>

              <Form.Select
                name="skillId"
                value={formData.skillId || ""}
                onChange={handleChange}
              >
                <option value="">Select skill</option>
                {skillList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.skillName}
                  </option>
                ))}
              </Form.Select>
              {errors.skillId && (
                <div className="text-danger small mt-1">{errors.skillId}</div>
              )}
            </Form.Group>


            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Software version
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Software version"
                    className="py-2"
                    value={formData.version}
                    name="version"
                    onChange={handleChange}
                  />

                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Last used<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="2025"
                    value={formData.lastUsedYear}
                    name="lastUsedYear"
                    onChange={handleChange}
                  />
                  {errors.lastUsedYear && (
                    <div className="text-danger small mt-1">{errors.lastUsedYear}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* Experience */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Experience<span className="text-danger">*</span></Form.Label>
              <Row>
                <Col md={6}>
                  <Form.Control
                    type="number"
                    placeholder="Years"
                    value={formData.expYears}
                    name="expYears"
                    onChange={handleChange}
                  />
                  {errors.expYears && (
                    <div className="text-danger small mt-1">{errors.expYears}</div>
                  )}
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="number"
                    placeholder="Months"
                    value={formData.expMonths}
                    name="expMonths"
                    onChange={handleChange}
                  />
                  {errors.expMonths && (
                    <div className="text-danger small mt-1">{errors.expMonths}</div>
                  )}
                </Col>
              </Row>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer className="border-0">
            <Button
              variant="link"
              className="text-muted text-decoration-none"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="dark"
              className="rounded-pill px-4"
              onClick={handleSave}
            >
              {editMode ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        </div>
      </Modal >
    </>
  );
};

export default ITSkillsSection;
