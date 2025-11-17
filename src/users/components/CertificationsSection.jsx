import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CertificationsSection = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
              <th>Level</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Firebase Developer</td>
              <td>Google Firebase</td>
              <td>Intermediate</td>
              <td>
                <i className="bi bi-pencil edit-icon ms-2"></i>
              </td>
            </tr>
            <tr>
              <td>Android Development</td>
              <td>Google / Udacity</td>
              <td>Beginner</td>
              <td>
                <i className="bi bi-pencil edit-icon ms-2"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== Add Certification Modal ===== */}
      <Modal show={show} onHide={handleClose} centered>
        <div className="modal-content border-0 shadow-sm">
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">
              <i className="bi bi-award me-2 "></i> Certifications
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className="text-muted small mb-4">
              Add details of Certifications you have achieved or completed.
            </p>

            {/* Certification Name */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Certification name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter your certification name"
                className="py-2"
              />
            </Form.Group>

            {/* Certification ID */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Certification completion ID
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Please mention your course completion ID"
                className="py-2"
              />
            </Form.Group>

            {/* Certification URL */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Certification URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please mention your completion URL"
                className="py-2"
              />
            </Form.Group>

            {/* Certification Validity */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Certification validity
              </Form.Label>
              <Row className="align-items-center gy-2 gx-2 flex-wrap-nowrap">
                {/* From Month */}
                <Col xs="auto" className="flex-grow-1">
                  <Form.Select className="py-2">
                    <option>MM</option>
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ].map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </Form.Select>
                </Col>

                {/* From Year */}
                <Col xs="auto" className="flex-grow-1">
                  <Form.Select className="py-2">
                    <option>YYYY</option>
                    {[2025, 2024, 2023, 2022, 2021].map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </Form.Select>
                </Col>

                {/* "To" label */}
                <Col xs="auto" className="text-center fw-semibold">
                  To
                </Col>

                {/* To Month */}
                <Col xs="auto" className="flex-grow-1">
                  <Form.Select className="py-2">
                    <option>MM</option>
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ].map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </Form.Select>
                </Col>

                {/* To Year */}
                <Col xs="auto" className="flex-grow-1">
                  <Form.Select className="py-2">
                    <option>YYYY</option>
                    {[2025, 2024, 2023, 2022, 2021].map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>


              {/* Expiry Checkbox */}
              <Form.Check
                type="checkbox"
                label="This certification does not expire"
                className="mt-3"
              />
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

export default CertificationsSection;
