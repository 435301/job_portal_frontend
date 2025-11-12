import React from "react";
import editIcon from "../../assets/img/edit.svg"; // ✅ Import your edit image (adjust path as needed)
import "bootstrap-icons/font/bootstrap-icons.css";

const ResumeSection = () => {
  return (
    <div className="p-0 border rounded-4 mb-4 bg-white ">
      {/* Header */}
      <div className="d-flex justify-content-between p-3 align-items-center mb-3 border-bottom">
        <h6 className="fw-semibold mb-0">
          <i className="bi bi-file-earmark-text me-2"></i> Resume
        </h6>
        <img
          src={editIcon}
          alt="Edit"
          className="edit-icons"
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Resume Info */}
      <div className="px-4 d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div>
          <p className="mb-1 pdf fw-semibold text-dark">Michel_Velayudhan.pdf</p>
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

      {/* Upload Box */}
      <div className="upload-box my-3 mx-3 text-center rounded-3 p-4 border border-dashed">
        <i className="bi bi-cloud-arrow-up fs-4 mb-2 d-block text-primary"></i>
        <small className="text-muted">
          Supported formats: <strong>doc, docx, rtf, pdf</strong> — up to 2MB
        </small>
      </div>
    </div>
  );
};

export default ResumeSection;
