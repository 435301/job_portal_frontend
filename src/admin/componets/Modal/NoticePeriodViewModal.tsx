// src/components/education/EducationViewModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

interface NoticePeriod {
  id: number;
  noticePeriodName: string;
  status: number | any;
}

interface NoticePeriodViewModalProps {
  show: boolean;
  onHide: () => void;
  item: NoticePeriod | null;
}

const NoticePeriodViewModal: React.FC<NoticePeriodViewModalProps> = ({ show, onHide, item }) => {
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
          <i className="bi bi-eye me-2"></i>View Notice Period
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-3">
        <div className="fs-6">
          <p><strong>Notice Period Name:</strong> {item.noticePeriodName}</p>
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

export default NoticePeriodViewModal;
