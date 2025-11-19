import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import editIcon from "../../assets/img/edit.svg"; // update the path as needed

const PersonalDetailsSection = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="card-section personal-details">
      {/* ===== Header ===== */}
      <div className="section-header p-3 mb-0 d-flex justify-content-between align-items-center">
        <div>
          <i className="bi bi-person-lines-fill me-2"></i> Personal Details
        </div>
        {/* === Edit icon instead of Add details === */}
        <img
          src={editIcon}
          alt="Edit"
          className="edit-icons"
          style={{ width: "22px", height: "22px", cursor: "pointer" }}
          onClick={handleShow}
        />
      </div>


      {/* ===== Details Display ===== */}
      <div className="row p-3 names">
        <div className="col-md-3">
          <strong>Full Name:</strong>
          <div>Akeeb Shaik</div>
        </div>
        <div className="col-md-3">
          <strong>DOB:</strong>
          <div>July 10, 1997</div>
        </div>
        <div className="col-md-3">
          <strong>Marital Status:</strong>
          <div>Single</div>
        </div>
        <div className="col-md-3">
          <strong>Locality:</strong>
          <div>Hyderabad</div>
        </div>
        <div className="col-md-3">
          <strong>Languages:</strong>
          <div>Telugu, Hindi, English</div>
        </div>
        <div className="col-md-3">
          <strong>Nationality:</strong>
          <div>Indian</div>
        </div>
        <div className="col-md-3">
          <strong>Mobile Number:</strong>
          <div>7780515180</div>
        </div>
        <div className="col-md-3">
          <strong>Email ID:</strong>
          <div>akeebshaik@gmail.com</div>
        </div>
      </div>

      {/* ===== Popup Modal ===== */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title><i className="bi bi-person-lines-fill"></i> Personal details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* ===== Gender ===== */}
            <div className="mb-4">
              <Form.Label className="fw-bold">Gender<span className="text-danger"> *</span></Form.Label>
              <div className="d-flex gap-3">
                <Form.Check inline label="Male" name="gender" type="radio" />
                <Form.Check inline label="Female" name="gender" type="radio" />
                <Form.Check inline label="Transgender" name="gender" type="radio" />
              </div>
            </div>

            {/* ===== Marital Status ===== */}
            <div className="mb-4">
              <Form.Label className="fw-bold">Marital status<span className="text-danger"> *</span></Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {[
                  "Single/unmarried",
                  "Married",
                  "Widowed",
                  "Divorced",
                  "Separated",
                  "Other",
                ].map((status) => (
                  <Badge
                    bg="light"
                    text="dark"
                    className="border rounded-pill px-3 py-2"
                    key={status}
                    style={{ cursor: "pointer" }}
                  >
                    {status}
                  </Badge>
                ))}
              </div>
            </div>

            {/* ===== Date of Birth ===== */}
            <Row className="mb-4">
              <Col md={4}>
                <Form.Label className="fw-bold">Date of Birth<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="date" />
              </Col>

            </Row>

            {/* ===== Work Permits ===== */}
            <Row className="mb-4">
             
              <Col md={6}>
                <Form.Label className="fw-bold">Work permit for USA</Form.Label>
                <Form.Select>
                  <option>Select work permit</option>
                  <option>H1B</option>
                  <option>Green Card</option>
                  <option>Citizen</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold">Work permit for other countries</Form.Label>
                <Form.Control type="text" placeholder="Enter countries (max 3)" />
              </Col>
            </Row>

            {/* ===== Address and Location ===== */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Label className="fw-bold">Permanent address<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="Enter your permanent address" />
              </Col>
              <Col md={3}>
                <Form.Label className="fw-bold">Hometown<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" />
              </Col>
              <Col md={3}>
                <Form.Label className="fw-bold">Pincode<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" />
              </Col>
            </Row>

            {/* ===== Language Proficiency ===== */}
            <div className="mb-3">
              <Form.Label className="fw-bold">Language proficiency</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add languages you know (e.g. English, Hindi, Telugu)"
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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

export default PersonalDetailsSection;
