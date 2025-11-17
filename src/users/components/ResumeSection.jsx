import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap"; // ✅ Added this line
import editIcon from "../../assets/img/edit.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ResumeSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [headline, setHeadline] = useState(
    "Looking for jobs requiring following skills: HTML, CSS, React.js, JavaScript, UI Design"
  );

  const handleEditClick = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);

  const handleSave = () => {
    console.log("Saved headline:", headline);
    setShowPopup(false);
  };

  return (
    <div className="p-0 border rounded-4 mb-4 bg-white">
      {/* ===== Header ===== */}
      <div className="d-flex justify-content-between p-3 align-items-center mb-3 border-bottom">
        <h6 className="fw-semibold mb-0">
          <i className="bi bi-file-earmark-text me-2"></i> Resume
        </h6>
        <img
          src={editIcon}
          alt="Edit"
          className="edit-icons"
          style={{ cursor: "pointer" }}
          onClick={handleEditClick}
        />
      </div>

      {/* ===== Resume Info ===== */}
      <div className="px-4 d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div>
          <p className="mb-1 pdf fw-semibold text-dark">
            Michel_Velayudhan.pdf
          </p>
          <small className="text-muted">Updated on July 10, 2025</small>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-info rounded btn-sm">
            <i className="bi bi-upload"></i>
          </button>
          <button className="btn btn-outline-danger btn-sm">
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>

      {/* ===== Upload Box ===== */}
      <div className="upload-box my-3 mx-3 text-center rounded-3 p-4 border border-dashed">
        <i className="bi bi-cloud-arrow-up fs-4 mb-2 d-block text-primary"></i>
        <small className="text-muted">
          Supported formats: <strong>doc, docx, rtf, pdf</strong> — up to 2MB
        </small>
      </div>

      {/* ===== Popup Modal ===== */}
      <Modal show={showPopup} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-file-earmark-text-fill me-2"></i>
            Edit Resume Headline
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="mb-4 text-muted">
            It is the first thing recruiters notice in your profile. Write a
            concise headline introducing yourself to employers.
          </p>
          <textarea
            className="form-control"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Enter your resume headline or summary here..."
            style={{
              height: "120px",
              resize: "none",
              borderRadius: "8px",
            }}
          />
          <p className="text-end mt-3 text-muted small">
            125 Character(s) left
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="link"  className="text-muted text-decoration-none" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResumeSection;
