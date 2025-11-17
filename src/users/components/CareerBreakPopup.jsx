import React from "react";

const CareerBreakPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-content slide-in"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="popup-body text-center p-4">
          <div className="popup-icon mb-3">
            <i className="bi bi-person-circle fs-1 text-primary"></i>
          </div>
          <p className="fw-semibold mb-2">
            Hi Padmavathi, companies value diversity and want to build inclusive teams.
          </p>
          <p className="text-muted mb-3">
            Share your career status to proceed with this job application. Are you on a career break?
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-outline-primary rounded-pill px-4">Yes</button>
            <button className="btn btn-outline-secondary rounded-pill px-4">No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerBreakPopup;
