import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import editIcon from "../../assets/img/edit.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BASE_URL_JOB from "../../config/config";

interface ResumeProps {
  resumes: any;
  onUpload: (file: any) => void;
  onDelete: (id: number) => void;
  loading: any
}

const ResumeSection: React.FC<ResumeProps> = ({ resumes, onUpload, onDelete, loading }) => {
  console.log('resumes', resumes)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUpload(file);
  };

  const handleDeleteClick = (id: number) => {
    onDelete(id)
  }

  const handleDownload = async (filePath: string) => {
    try {
      const fileUrl = `${BASE_URL_JOB}${filePath}`;
      const response = await fetch(fileUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("employeeToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to download file");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      // Extract file name
      const fileName = filePath.split("/").pop() || "resume";
      // Create link dynamically
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download failed:", error);
    }
  };


  return (
    <div className="p-0 border rounded-4 mb-4 bg-white">
      {/* ===== Header ===== */}
      <div className="d-flex justify-content-between p-3 align-items-center mb-3 border-bottom">
        <h6 className="fw-semibold mb-0">
          <i className="bi bi-file-earmark-text me-2"></i> Resume
        </h6>

      </div>

      {/* ===== Resume Info ===== */}
      {resumes && resumes.length > 0 ? (
        resumes.map((r: any) => (
          <div
            key={r.id}
            className="px-4 d-flex flex-column flex-md-row align-items-center justify-content-between mb-2"
          >
            <div>
              <p className="mb-1 pdf fw-semibold text-dark">
                {r.resumeFile?.split("/").pop()}
              </p>
              <small className="text-muted">
                Updated on {new Date(r.updatedAt).toDateString()}
              </small>
            </div>

            <div className="d-flex align-items-center gap-2">
              {/* download */}
              <button
                className="btn btn-outline-info rounded btn-sm"
                onClick={() => handleDownload(r.resumeFile)}
              >
                <i className="bi bi-download"></i>
              </button>

              {/* Delete */}
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDeleteClick(r.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted text-center mb-2">No resume uploaded yet.</p>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={fileInputRef}
        className="d-none"
        onChange={handleFileChange}
      />

      {/* Upload Box */}
      <div className="upload-box my-3 mx-3 text-center rounded-3 p-4 border border-dashed"
        style={{ cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
        onClick={!loading ? handleUploadButtonClick : undefined}
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="spinner-border text-primary mb-2" role="status" style={{ width: "2rem", height: "2rem" }}></div>
            <small className="text-muted">Uploading...</small>
          </div>
        ) : (
          <>
            <i className="bi bi-cloud-arrow-up fs-4 mb-2 d-block text-primary"></i>
            <small className="text-muted">
              Formats: <strong>doc, pdf</strong> — up to 5MB
            </small>
          </>
        )}
      </div>


    </div>
  );
};

export default ResumeSection;
