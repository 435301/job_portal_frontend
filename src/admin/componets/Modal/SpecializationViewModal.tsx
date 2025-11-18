// src/components/education/EducationViewModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

interface Specialization {
  id: number;
  educationName: string;
  courseName: string;
  specializationName: string;
  status: number | any;
}

interface SpecializationViewModalProps {
  show: boolean;
  onHide: () => void;
  item: Specialization | null;
}

const SpecializationViewModal: React.FC<SpecializationViewModalProps> = ({ show, onHide, item }) => {
  if (!item) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size={"md" as any}
      backdrop="static"
      className="rounded-4"
    >
      <Modal.Header closeButton className="bg-light text-white">
        <Modal.Title>
          <i className="bi bi-eye me-2"></i>View Specialization
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-3">
        <div className="fs-6">
          <p><strong>Education Name:</strong> {item.educationName}</p>
           <p><strong>Course Name:</strong> {item.courseName}</p>
           <p><strong>Course Name:</strong> {item.specializationName}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`badge rounded-pill ${
                item.status === 1 ? "bg-success" : "bg-danger"
              }`}
            >
              {item.status === 1? "Active" : "Inactive"}
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

export default SpecializationViewModal;
