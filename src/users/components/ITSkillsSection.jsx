import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ITSkillsSection = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
            <tr>
              <td>Android Studio</td>
              <td>-</td>
              <td>2025</td>
              <td>0 year 2 months</td>
              <td>
                <i className="bi bi-pencil edit-icon ms-2"></i>
              </td>
            </tr>
            <tr>
              <td>Visual Studio</td>
              <td>-</td>
              <td>2025</td>
              <td>0 year 2 months</td>
              <td>
                <i className="bi bi-pencil edit-icon ms-2"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== Add Skill Modal ===== */}
      <Modal show={show} onHide={handleClose} centered>
        <div className="modal-content border-0 shadow-sm">
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">
              <i className="bi bi-laptop me-2 "></i> IT skills{" "}
              <span className="text-success fw-semibold fs-6">Add 10%</span>
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
              <Form.Control
                type="text"
                placeholder="Skill / Software name"
                className="py-2"
              />
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
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Last used</Form.Label>
                  <Form.Select className="py-2">
                    <option>Last used</option>
                    <option>2025</option>
                    <option>2024</option>
                    <option>2023</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Experience */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Experience</Form.Label>
              <Row>
                <Col md={6}>
                  <Form.Select className="py-2">
                    <option>Years</option>
                    {[0, 1, 2, 3, 4, 5].map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Select className="py-2">
                    <option>Months</option>
                    {[0, 3, 6, 9, 12].map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </Form.Select>
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
              onClick={handleClose}
            >
              Save
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default ITSkillsSection;
