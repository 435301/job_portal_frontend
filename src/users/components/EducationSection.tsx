import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import editIcon from "../../assets/img/edit.svg"; 

interface EducationProps{
  educationDetails: any;
}
const EducationSection : React.FC<EducationProps> = ({educationDetails}) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="p-0 border rounded-4 mb-4 education">
      {/* ======= Header ======= */}
      <div className="d-flex p-3 justify-content-between align-items-center border-bottom pb-2 mb-3">
        <h6 className="fw-semibold mb-0">
          <i className="bi bi-mortarboard-fill me-2"></i> Education
        </h6>

        {/* ✅ Imported image used here */}
        <img
          src={editIcon}
          alt="Edit"
        
          onClick={handleShow}
        />
      </div>

      {/* ======= Education List ======= */}
      <div className="px-3">
        <ul className="timeline-list list-unstyled">
          <li className="timeline-item mb-3">
            <h6>B.Tech/B.E. – Civil Engineering</h6>
            <a href="#" className="company">
              Dr. Ambedkar Institute of Technology, Bangalore
            </a>
            <br />
            <span className="meta text-muted">
              <i className="bi bi-dot mx-1"></i>2020-06-03 – 2023-12-31
            </span>
          </li>
          <li className="timeline-item mb-3">
            <h6>Diploma – Civil Engineering</h6>
            <a href="#" className="company">
              Government Polytechnic College, Hyderabad
            </a>
            <br />
            <span className="meta text-muted">
              <i className="bi bi-dot mx-1"></i>2017-06-01 – 2020-03-31
            </span>
          </li>
          <li className="timeline-item">
            <a href="#" className="company  fw-semibold">
              <i className="bi bi-plus-circle me-1"></i> Add Education
            </a>
          </li>
        </ul>
      </div>

      {/* ======= Education Popup ======= */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="fw-semibold">Education</span>{" "}
            <span className="text-success fs-6">Add 10%</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-4">
            Details like course, university, and more help recruiters identify your educational background
          </p>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Education <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select>
                <option>Select education</option>
                <option>Bachelor's Degree</option>
                <option>Master's Degree</option>
                <option>Diploma</option>
                <option>Doctorate/PhD</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                University/Institute <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control type="text" placeholder="Select university/institute" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Course <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select>
                <option>Select course</option>
                <option>B.Tech</option>
                <option>B.E.</option>
                <option>M.Tech</option>
                <option>MBA</option>
                <option>Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Specialization <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select>
                <option>Select specialization</option>
                <option>Civil Engineering</option>
                <option>Computer Science</option>
                <option>Mechanical Engineering</option>
                <option>Electrical Engineering</option>
                <option>Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Course type <span className="text-danger">*</span>
              </Form.Label>
              <div className="d-flex gap-4 mt-2">
                <Form.Check type="radio" name="courseType" label="Full time" defaultChecked />
                <Form.Check type="radio" name="courseType" label="Part time" />
                <Form.Check type="radio" name="courseType" label="Correspondence/Distance learning" />
              </div>
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label className="fw-semibold">
                  Course duration <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select>
                  <option>Starting year</option>
                  <option>2019</option>
                  <option>2020</option>
                  <option>2021</option>
                  <option>2022</option>
                  <option>2023</option>
                </Form.Select>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Form.Select>
                  <option>Ending year</option>
                  <option>2022</option>
                  <option>2023</option>
                  <option>2024</option>
                  <option>2025</option>
                </Form.Select>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Grading system</Form.Label>
              <Form.Select>
                <option>Select grading system</option>
                <option>Percentage</option>
                <option>CGPA (10 Scale)</option>
                <option>CGPA (4 Scale)</option>
                <option>Grade</option>
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

export default EducationSection;
