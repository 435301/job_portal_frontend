import React, { useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import editIcon from "../../assets/img/edit.svg"; // ✅ Correct image import
import "bootstrap-icons/font/bootstrap-icons.css";

const EmploymentSection = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {/* Employment Section Card */}
            <div className="p-0 border rounded-4 mb-4 bg-white ">
                <div className="d-flex p-3 justify-content-between align-items-center border-bottom pb-2 mb-3">
                    <h6 className="fw-semibold mb-0">
                        <i className="bi bi-person-lines-fill me-2 text-primary"></i> Employment
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
                        <li className="timeline-item mb-4">
                            <h6 className="fw-semibold mb-1">Web Designer</h6>
                            <a href="#" className="company d-block text-decoration-none text-secondary">
                                Alpabe Corporation
                            </a>
                            <small className="text-muted">
                                <i className="bi bi-dot mx-1"></i> 2020-06-03 – 2023-12-31
                            </small>
                            <p className="mt-2 mb-0 text-secondary">
                                Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium et,
                                accumsan ac est. Integer vehicula rhoncus molestie.
                            </p>
                        </li>

                        <li className="timeline-item mb-4">
                            <h6 className="fw-semibold mb-1">Team Lead UX Design</h6>
                            <a href="#" className="company d-block text-decoration-none text-secondary">
                                Uxper Studio
                            </a>
                            <small className="text-muted">
                                <i className="bi bi-dot mx-1"></i> 2020-06-03 – 2023-12-31
                            </small>
                            <p className="mt-2 mb-0 text-secondary">
                                Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium et,
                                accumsan ac est. Integer vehicula rhoncus molestie.
                            </p>
                        </li>

                        <li className="timeline-item">
                            <a href="#" className="company text-primary fw-semibold text-decoration-none">
                                + Add Employment
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* ===== Employment Modal ===== */}
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="bi bi-briefcase-fill me-2 "></i> Employment
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="text-muted small mb-4">
                        Details like job title, company name, etc. help employers understand your work background.
                    </p>

                    {/* Current Employment Section */}
                    <div className="row mb-4">
                        <div className="col-md-12 d-flex align-items-center">
                            <h6 className="mb-0 me-3">Is this your current employment?</h6>
                            <Form.Check
                                inline
                                label="Yes"
                                name="currentEmployment"
                                type="radio"
                                id="currentYes"
                            />
                            <Form.Check
                                inline
                                label="No"
                                name="currentEmployment"
                                type="radio"
                                id="currentNo"
                            />
                        </div>

                        <div className="col-md-6">
                            <h6 className="mb-2">Employment type</h6>
                            <div className="d-flex gap-2">
                                <Button variant="outline-secondary">Full-time</Button>
                                <Button variant="outline-secondary">Internship</Button>
                            </div>
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="row mb-3">
                        <h6 className="mb-3">Total experience</h6>
                        <div className="col-md-6 mb-3">
                            <Form.Label>Years</Form.Label>
                            <Form.Select>
                                <option>Years</option>
                                {[...Array(11).keys()].map((y) => (
                                    <option key={y}>{y}</option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <Form.Label>Months</Form.Label>
                            <Form.Select>
                                <option>Months</option>
                                {[0, 3, 6, 9, 12].map((m) => (
                                    <option key={m}>{m}</option>
                                ))}
                            </Form.Select>
                        </div>
                    </div>

                    {/* Company and Title */}
                    <div className="row mb-3 g-3">
                        <div className="col-md-6">
                            <Form.Label>Current company name</Form.Label>
                            <Form.Control type="text" placeholder="Type your company name" />
                        </div>
                        <div className="col-md-6">
                            <Form.Label>Current job title</Form.Label>
                            <Form.Control type="text" placeholder="Type your designation" />
                        </div>
                    </div>

                    {/* Joining Date */}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <Form.Label>Joining date</Form.Label>
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
                        <div className="col-md-6">
                            <Form.Label>Current Salary</Form.Label>
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
                            <Form.Label>Skills used</Form.Label>
                            <Form.Control type="text" placeholder="Add Skills" />
                        </div>
                    </div>

                    {/* Job Profile */}
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <Form.Label>Job Profile</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Type here..." />
                        </div>
                    </div>

                    {/* Notice Period */}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <Form.Label>Notice period</Form.Label>
                            <Form.Select>
                                <option>Select notice period</option>
                                <option>15 Days</option>
                                <option>1 Month</option>
                                <option>2 Months</option>
                            </Form.Select>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="btn-save" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EmploymentSection;
