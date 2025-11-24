import React, { FormEvent, useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormErrors, validateCertificateForm } from "../../common/validation.tsx";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.tsx";
import { addCertificate, updateCertificate } from "../../redux/slices/employeeProfileSlice.tsx";

interface CertificationProps {
  certificationDetails: any;
  onAdd: (formData: any) => void;
  onUpdate: (id: number, formData: any) => void;
  onDelete: (id: number) => void;
}
interface CertificateForm {
  certificateName: "",
  issuedBy: "",
}

const CertificationsSection: React.FC<CertificationProps> = ({ certificationDetails, onAdd, onUpdate, onDelete }) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [editId, setEditId] = useState<number | null>(null);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState<CertificateForm>({
    certificateName: "",
    issuedBy: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }))
  };

  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setFormData({ certificateName: "", issuedBy: "" });
    setErrors({});
  };

  const handleEdit = (certificate: any) => {
    setEditId(certificate.id);
    setFormData({
      certificateName: certificate.certificateName,
      issuedBy: certificate.issuedBy,
    });
    setShow(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateCertificateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    try {
      if (editId) {
        onUpdate(editId, formData)
      } else {
        onAdd(formData)
      }
    } catch (err) {
      console.log(err)
    }
    handleClose();
  };

  const handleDeleteClick = (id: number) => {
    onDelete(id);
  };


  return (
    <>
      {/* ===== Certifications Section ===== */}
      <div className="card-section border rounded-3 bg-white">
        <div className="section-header p-3 mb-0 d-flex justify-content-between align-items-center">
          <div>
            <i className="bi bi-award me-2"></i>
            <span className="fw-semibold">Certifications</span>
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
              <th>Certificate Name</th>
              <th>Issued by</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {certificationDetails?.map((certificate: any) => (
              <tr key={certificate?.id}>
                <td>{certificate?.certificateName}</td>
                <td>{certificate?.issuedBy}</td>
                <td>
                  <i
                    className="bi bi-pencil edit-icon ms-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(certificate)}
                  ></i>
                </td>
                <td>
                  <i
                    className="bi bi-trash edit-icon ms-2 text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteClick(certificate.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Add Certification Modal ===== */}
      <Modal show={show} onHide={handleClose} centered>
        <div className="modal-content border-0 shadow-sm">
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">
              <i className="bi bi-award me-2 "></i>
              {editId ? "Edit Certification" : "Add Certification"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className="text-muted small mb-4">
              {editId ? " Edit details of Certifications you have achieved or completed." : " Add details of Certifications you have achieved or completed."}

            </p>

            {/* Certification Name */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Certification name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="certificateName"
                value={formData.certificateName}
                placeholder="Enter certification name"
                onChange={handleChange}
                className={`form-control py-2 ${errors.certificateName ? "is-invalid" : ""}`}
              />
              {errors.certificateName && <div className="invalid-feedback">{errors.certificateName}</div>}
            </Form.Group>

            {/*  Iussed by */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Issued By<span className="text-danger"> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder=" Enter the issuer name "
                className={`form-control py-2 ${errors.issuedBy ? "is-invalid" : ""}`}
                name="issuedBy"
                onChange={handleChange}
                value={formData.issuedBy}
              />
              {errors.issuedBy && <div className="invalid-feedback">{errors.issuedBy}</div>}
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
              onClick={handleSubmit}
            >
              {editId ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default CertificationsSection;
