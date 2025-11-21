import React, { useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import editIcon from "../../assets/img/edit.svg"; 
import "bootstrap-icons/font/bootstrap-icons.css";

interface EmploymentProps{
  employmentDetails: any;
}
const EmploymentSection : React.FC<EmploymentProps> = ({employmentDetails}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Employment Section Card */}
      <div className="p-0 border rounded-4 mb-4 bg-white ">
        <div className="d-flex p-3 justify-content-between align-items-center border-bottom pb-2 mb-3">
          <h6 className="fw-semibold mb-0">
            <i className="bi bi-person-lines-fill me-2 "></i> Employment
          </h6>
          <img
            src={editIcon}
            alt="Edit"
            className="edit-icons"
            style={{ cursor: "pointer" }}
            onClick={handleShow}
          />
        </div>

        {/* Employment List */}
        <div className="px-3 mb-4">
          <ul className="timeline-list list-unstyled mb-0">
            <li className="timeline-item">
              <h6>Web Designer</h6>
              <a href="#" className="company">Alpabe Corporation</a>
              <span className="meta"><i className="bi bi-dot mx-1"></i>2020-06-03 – 2023-12-31</span>
              <p>Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at
                pretium
                et, accumsan ac est. Integer vehicula rhoncus molestie.</p>
            </li>

            <li className="timeline-item mb-4">
              <h6 className="fw-semibold mb-1">Team Lead UX Design</h6>
              <a href="#" className="company  ">
                Uxper Studio
              </a>
              <span className="meta"><i className="bi bi-dot mx-1"></i>2020-06-03 – 2023-12-31</span>
              <p>Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at
                pretium
                et, accumsan ac est. Integer vehicula rhoncus molestie.</p>
            </li>

            <li className="timeline-item">
              <a href="#" className="company  fw-semibold text-decoration-none">
                + Add Employment
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ===== Employment Modal ===== */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <div className="modal-content">
          {/* ===== Modal Header ===== */}
          <div className="modal-header">
            <h5 className="modal-title" id="employmentModalLabel">
              <i className="bi bi-briefcase-fill me-2"></i> Employment
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>

          {/* ===== Modal Body ===== */}
          <div className="modal-body">
            <p className="text-muted small">
              Details like job title, company name, etc. help employers understand your work.
            </p>

            {/* Current Employment Section */}
            <div className="radio-row mb-4">
              <div className="mb-3 d-flex align-items-center flex-wrap">
                <h6 className="mb-2 me-3">Is this your current employment?<span className="text-danger"> *</span></h6>
                <div className="d-flex align-items-center">
                  <label
                    className="form-check-label fs-6 text-muted small me-3"
                    htmlFor="currentYes"
                  >
                    Yes
                  </label>
                  <div className="form-check form-switch mb-0 me-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="currentYes"
                    />
                  </div>
                  <label
                    className="form-check-label fs-6 text-muted small me-3"
                    htmlFor="currentNo"
                  >
                    No
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <h6 className="mb-3">Employment type<span className="text-danger"> *</span></h6>
                <div className="d-flex">
                  <button className="btn btn-outline-secondary-1 me-1">Full time</button>
                  <button className="btn btn-outline-secondary-1">Internship</button>
                </div>
              </div>
            </div>

            {/* Total Experience */}
            <div className="row mb-3 yers">
              <h6 className="mb-3">Total experience<span className="text-danger"> *</span></h6>
              <div className="col-md-6 ">
                <label htmlFor="expYears">Years</label>
                <Form.Select id="expYears">
                  <option>Years</option>
                  {[0, 1, 2, 3, 4, 5].map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-6">
                <label htmlFor="expMonths">Months</label>
                <Form.Select id="expMonths">
                  <option>Months</option>
                  {[0, 3, 6, 9, 12].map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </Form.Select>
              </div>
            </div>

            {/* Company and Title */}
            <div className="row mb-3 g-3">
              <div className="col-md-12">
                <label className="form-section-label">Current company name<span className="text-danger"> *</span></label>
                <Form.Control type="text" placeholder="Type your company name" />
              </div>
              <div className="col-md-12">
                <label className="form-section-label">Current job title<span className="text-danger"> *</span></label>
                <Form.Control type="text" placeholder="Type your designation" />
              </div>
            </div>

            {/* Joining Date */}
            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-section-label">Joining date<span className="text-danger"> *</span></label>
                <div className="d-flex gap-2">
                  <Form.Select>
                    <option>Year</option>
                    <option>2025</option>
                    <option>2024</option>
                    <option>2023</option>
                  </Form.Select>
                  <Form.Select>
                    <option>Month</option>
                    <option>Jan</option>
                    <option>Feb</option>
                    <option>Mar</option>
                  </Form.Select>
                </div>
              </div>
            </div>

            {/* Current Salary */}
            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-section-label fw-semibold mb-2">
                  Current Salary<span className="text-danger"> *</span>
                </label>
                <div className="input-group">
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-dark">₹</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>₹ (INR)</Dropdown.Item>
                      <Dropdown.Item>$ (USD)</Dropdown.Item>
                      <Dropdown.Item>€ (EUR)</Dropdown.Item>
                      <Dropdown.Item>£ (GBP)</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Form.Control type="text" placeholder="4,00,000" />
                </div>
              </div>
            </div>

            {/* Skills Used */}
            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-section-label">Skills used<span className="text-danger"> *</span></label>
                <Form.Control type="text" placeholder="Add Skills" />
              </div>
            </div>

            {/* Job Profile */}
            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-section-label">Job Profile</label>
                <Form.Control as="textarea" rows={3} placeholder="Type here" />
              </div>
            </div>

            {/* Notice Period */}
            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-section-label">Notice period<span className="text-danger"> *</span></label>
                <Form.Select>
                  <option>Select notice period</option>
                  <option>15 Days</option>
                  <option>1 Month</option>
                  <option>2 Months</option>
                </Form.Select>
              </div>
            </div>
          </div>

          {/* ===== Modal Footer ===== */}
          <div className="modal-footer">
            <Button variant="link"  className="text-muted text-decoration-none" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="dark" className="btn-save" onClick={handleClose}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EmploymentSection;
