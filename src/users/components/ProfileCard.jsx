import React, { useState } from "react";
import avatarImage from "../../assets/img/avatar-27.png";
import editIcon from "../../assets/img/edit-63.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, Badge, Row, Col } from "react-bootstrap";

const ProfileCard = () => {
  // ▬▬▬ MOBILE POPUP ▬▬▬
  const [showPopup, setShowPopup] = useState(false);
  const [mobile, setMobile] = useState("9880087932");

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  // ▬▬▬ PERSONAL DETAILS MODAL ▬▬▬
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);       // When clicking profile image
  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className="profile-card row align-items-center rounded-4 p-4">

        {/* LEFT SECTION */}
        <div className="col-md-5 border-end d-flex align-items-center mb-4 mb-md-0">

          {/* CLICK IMAGE -> OPEN PERSONAL DETAILS POPUP */}
          <img
            src={avatarImage}
            alt="Profile Image"
            className="rounded-circle me-3 profile-img"

          />

          <div>
            <h5 className="mb-1 fw-semibold text-dark availability-1">
              Michel Velayudhan
              <img src={editIcon} alt="Edit Icon" className="ms-4" style={{ cursor: "pointer" }}
                onClick={handleShow} />
            </h5>

            <p className="mb-2">
              Profile last updated: <strong>10 July, 2024</strong>
            </p>

            <div className="d-flex align-items-center">
              <div className="progress flex-grow-1" style={{ height: "8px", maxWidth: "250px" }}>
                <div className="progress-bar bg-danger" style={{ width: "30%" }}></div>
              </div>
              <small className="text-muted ms-2">30%</small>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-md-7 ps-5">
          <div className="row g-3">

            {/* Location */}
            <div className="col-md-4 d-flex align-items-start">
              <div className="icon-box me-2">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <div>
                <div className="fw-semibold text-dark availability">Location</div>
                <div className="text-muted small">Bengaluru, INDIA</div>
              </div>
            </div>

            {/* Mobile Number + EDIT ICON */}
            <div className="col-md-4 d-flex align-items-start position-relative">
              <div className="icon-box me-2">
                <i className="bi bi-telephone-fill"></i>
              </div>

              <div>
                <div className="fw-semibold text-dark availability d-flex align-items-center">
                  Mobile Number
                  <img
                    src={editIcon}
                    alt="Edit"
                    className="ms-2"
                    style={{ width: "16px", cursor: "pointer" }}
                    onClick={openPopup}
                  />
                </div>
                <div className="text-muted small">{mobile}</div>
              </div>
            </div>

            {/* Experience */}
            <div className="col-md-4 d-flex align-items-start">
              <div className="icon-box me-2">
                <i className="bi bi-briefcase-fill"></i>
              </div>
              <div>
                <div className="fw-semibold text-dark availability">Experience</div>
                <div className="text-muted small">5+ Years</div>
              </div>
            </div>

            {/* Email */}
            <div className="col-md-4 d-flex align-items-start">
              <div className="icon-box me-2">
                <i className="bi bi-envelope-fill"></i>
              </div>
              <div>
                <div className="fw-semibold text-dark availability">Email</div>
                <div className="text-muted small">akeebshaik@gmail.com</div>
              </div>
            </div>

            {/* Availability */}
            <div className="col-md-4 d-flex align-items-start">
              <div className="icon-box me-2">
                <i className="bi bi-calendar-check-fill"></i>
              </div>
              <div>
                <div className="fw-semibold text-dark availability">Availability</div>
                <div className="text-muted small">Join within 15 days</div>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* ========== MOBILE NUMBER EDIT POPUP ========== */}
      {showPopup && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3 rounded-4">

              <h5 className="fw-bold mb-3">Edit Mobile Number</h5>

              <input
                type="text"
                className="form-control mb-3"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />

              <div className="d-flex justify-content-end">
                <button className="btn btn-secondary me-2" onClick={closePopup}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={closePopup}>
                  Save
                </button>
              </div>

            </div>
          </div>
        </div>
      )}


      {/* ========== PERSONAL DETAILS MODAL (IMAGE CLICK) ========== */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-person-lines-fill"></i> Personal details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>

            {/* Gender */}
            <div className="mb-4">
              <Form.Label className="fw-bold">Gender</Form.Label>
              <div className="d-flex gap-3">
                <Form.Check inline label="Male" name="gender" type="radio" />
                <Form.Check inline label="Female" name="gender" type="radio" />
                <Form.Check inline label="Transgender" name="gender" type="radio" />
              </div>
            </div>

            {/* More Info */}
            <div className="mb-4">
              <Form.Label className="fw-bold">More information</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {["Single parent", "Working mother", "Retired (60+)", "LGBTQ+"].map((info) => (
                  <Badge key={info} bg="light" text="dark" className="border rounded-pill px-3 py-2">
                    {info}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Marital Status */}
            <div className="mb-4">
              <Form.Label className="fw-bold">Marital status</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {[
                  "Single/unmarried",
                  "Married",
                  "Widowed",
                  "Divorced",
                  "Separated",
                  "Other"
                ].map((status) => (
                  <Badge key={status} bg="light" text="dark" className="border rounded-pill px-3 py-2">
                    {status}
                  </Badge>
                ))}
              </div>
            </div>

            {/* DOB */}
            <Row className="mb-4">
              <Col md={4}>
                <Form.Label className="fw-bold">Date of Birth</Form.Label>
                <Form.Control type="date" />
              </Col>
            </Row>

            {/* CATEGORY + WORK PERMIT */}
            <Row className="mb-4">
              <Col md={12}>
                <Form.Label className="fw-bold">Category</Form.Label>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {[
                    "General",
                    "Scheduled Caste (SC)",
                    "Scheduled Tribe (ST)",
                    "OBC - Creamy",
                    "OBC - Non creamy",
                    "Other"
                  ].map((cat) => (
                    <Badge key={cat} bg="light" text="dark" className="border rounded-pill px-3 py-2">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </Col>

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

            {/* Address */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Label className="fw-bold">Permanent address</Form.Label>
                <Form.Control type="text" placeholder="Enter your permanent address" />
              </Col>

              <Col md={3}>
                <Form.Label className="fw-bold">Hometown</Form.Label>
                <Form.Control type="text" />
              </Col>

              <Col md={3}>
                <Form.Label className="fw-bold">Pincode</Form.Label>
                <Form.Control type="text" />
              </Col>
            </Row>

            {/* Languages */}
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
    </>
  );
};

export default ProfileCard;
