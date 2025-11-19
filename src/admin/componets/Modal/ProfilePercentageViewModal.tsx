// src/components/education/EducationViewModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ProfilePercentage {
  id: number;
  title: string;
  percentage: number;
  status: number | any;
}

interface ProfilePercentageViewModalProps {
  show: boolean;
  onHide: () => void;
  item: ProfilePercentage | null;
}

const ProfilePercentageViewModal: React.FC<ProfilePercentageViewModalProps> = ({ show, onHide, item }) => {
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
          <i className="bi bi-eye me-2"></i>View Profile Percentage
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-3">
        <div className="fs-6">
           <p><strong>Profile Title:</strong> {item.title}</p>
            <p><strong> Percentage:</strong> {item.percentage}</p>
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

export default ProfilePercentageViewModal;
