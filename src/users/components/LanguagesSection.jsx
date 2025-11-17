import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const LanguagesSection = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const languages = ["English", "Kannada", "Hindi", "Telugu"];

  return (
    <div className="card-section border rounded-4 mb-4">
      {/* ======= Header ======= */}
      <div className="section-header p-3 mb-0 d-flex justify-content-between align-items-center border-bottom">
        <div className="fw-semibold">
          <i className="bi bi-translate me-2"></i> Languages
        </div>
        <span
          className="add-link text-primary fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={handleShow}
        >
          <i className="bi bi-plus-circle me-1"></i> Add details
        </span>
      </div>

      {/* ======= Table ======= */}
      <div className="">
        <table className="table table-borderless align-middle mb-0">
          <thead className="text-muted">
            <tr>
              <th>Language</th>
              <th>Read</th>
              <th>Write</th>
              <th>Speak</th>
              <th>Proficiency</th>
            </tr>
          </thead>
          <tbody>
            {languages.map((lang, index) => (
              <tr key={index}>
                <td className="fw-semibold">{lang}</td>
                <td>
                  <i className="bi bi-check-circle-fill text-success"></i>
                </td>
                <td>
                  <i className="bi bi-check-circle-fill text-success"></i>
                </td>
                <td>
                  <i className="bi bi-check-circle-fill text-success"></i>
                </td>
                <td>Expert</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ======= Add Language Modal ======= */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="fw-semibold"><i class="bi bi-translate me-2"></i> Add Language</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-4">
            Add the languages you know and specify your proficiency level.
          </p>

          <Form>
            {/* Language Name */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Language <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control type="text" placeholder="Enter language" />
            </Form.Group>

            {/* Read / Write / Speak Checkboxes */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Skills <span className="text-danger">*</span>
              </Form.Label>
              <div className="d-flex gap-4 mt-2">
                <Form.Check type="checkbox" label="Read" defaultChecked />
                <Form.Check type="checkbox" label="Write" defaultChecked />
                <Form.Check type="checkbox" label="Speak" defaultChecked />
              </div>
            </Form.Group>

            {/* Proficiency Level */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Proficiency <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select>
                <option>Select proficiency</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="link"  className="text-muted text-decoration-none" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LanguagesSection;
