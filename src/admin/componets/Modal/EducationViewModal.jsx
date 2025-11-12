// src/components/education/EducationViewModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const EducationViewModal = ({ show, onHide, item }) => {
  if (!item) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="md"
      backdrop="static"
      className="rounded-4"
    >
      <Modal.Header closeButton className="bg-light text-white">
        <Modal.Title>
          <i className="bi bi-eye me-2"></i>View Education
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-3">
        <div className="fs-6">
          <p><strong>Education Name:</strong> {item.name}</p>
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Course:</strong> {item.course}</p>
          <p><strong>Created On:</strong> {item.date}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`badge rounded-pill ${
                item.status === "Active" ? "bg-success" : "bg-danger"
              }`}
            >
              {item.status}
            </span>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EducationViewModal;
