import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import editIcon from "../../assets/img/edit.svg";

interface ProfileCardProps {
  personalDetails: any; 
}

const PersonalDetailsSection :React.FC<ProfileCardProps> = ({ personalDetails }) =>{
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
          <div>{personalDetails?.firstName} {personalDetails?.lastName}</div>
        </div>
        <div className="col-md-3">
          <strong>Gender:</strong>
          <div>{personalDetails?.gender?.gender || "-"}</div>
        </div>
        <div className="col-md-3">
          <strong>Marital Status:</strong>
          <div>{personalDetails?.maritalStatus?.maritalStatus || "-"}</div>
        </div>
        <div className="col-md-3">
          <strong>DOB:</strong>
          <div>{personalDetails?.dateOfBirth || "-"}</div>
        </div>

        <div className="col-md-3">
          <strong>Locality:</strong>
          <div>{personalDetails?.city?.cityName || "-"}</div>
        </div>
        <div className="col-md-3">
          <strong>Availability:</strong>
          <div>{personalDetails?.availability?.availability || "-"}</div>
        </div>
        <div className="col-md-3">
          <strong>Experience:</strong>
          <div>{personalDetails?.experience?.experienceName || "-"}</div>
        </div>

        <div className="col-md-3">
          <strong>Work Permit for USA:</strong>
          <div>{personalDetails?.workPermit || "-"}</div>
        </div>

        <div className="col-md-3">
          <strong>Work permit for other countries:</strong>
          <div>{personalDetails?.workPermitCountries || "-"}</div>
        </div>
          <div className="col-md-3">
          <strong>Address:</strong>
          <div>{personalDetails.permanentAddress} - {personalDetails?.pincode}</div>
        </div>
          <div className="col-md-3">
          <strong>Nationality:</strong>
          <div>{personalDetails?.nationality}</div>
        </div>

        <div className="col-md-3">
          <strong>Languages:</strong>
          <div>{personalDetails?.languageProficiency}</div>
        </div>
      
        <div className="col-md-3">
          <strong>Mobile Number:</strong>
          <div>{personalDetails?.mobile || "-"}</div>
        </div>
        <div className="col-md-3">
          <strong>Email ID:</strong>
          <div>{personalDetails?.email || "-"}</div>
        </div>
      </div>

      {/* ===== Popup Modal ===== */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title><i className="bi bi-person-lines-fill"></i> Personal details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Label className="fw-bold">Full Name<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="Enter your full name" />
              </Col>
            </Row>

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
              <Col md={6}>
                <Form.Label className="fw-bold">Date of Birth<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="date" />
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold">Locality<span className="text-danger"> *</span></Form.Label>
                <Form.Select>
                  <option>Select city</option>
                  <option>Hyderabad</option>
                  <option>Bengaluru</option>
                  <option>Chennai</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Label className="fw-bold">Availability<span className="text-danger"> *</span></Form.Label>
                <Form.Select>
                  <option>Select availability</option>
                  <option>within 15 days</option>
                  <option>within 30 days</option>
                  <option>within 45 days</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold">Experience<span className="text-danger"> *</span></Form.Label>
                <Form.Select>
                  <option>Select experience</option>
                  <option>+3 years</option>
                  <option>2-3 years</option>
                  <option>+5 years</option>
                </Form.Select>
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
            <Row className="mb-4">
              <Col md={6}>
                <Form.Label className="fw-bold">Nationality<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="Enter your nationality" />
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
