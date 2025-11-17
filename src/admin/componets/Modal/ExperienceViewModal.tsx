// src/components/education/EducationViewModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

interface Experience {
  id: number;
  experienceName: string;
  status: number | any;
}

interface ExperienceViewModalProps {
  show: boolean;
  onHide: () => void;
  item: Experience | null;
}

const ExperienceViewModal: React.FC<ExperienceViewModalProps> = ({ show, onHide, item }) => {
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
          <i className="bi bi-eye me-2"></i>View Experience
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-3">
        <div className="fs-6">
          <p><strong>Experience Name:</strong> {item.experienceName}</p>
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

export default ExperienceViewModal;
