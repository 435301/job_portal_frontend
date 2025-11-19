import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import editIcon from "../../assets/img/edit.svg";
import "bootstrap-icons/font/bootstrap-icons.css";

const KeySkillsSection = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ---- Manage skills in state ----
  const [skills, setSkills] = useState([
    "Bootstrap",
    "Material UI",
    "GraphQL",
    "MongoDB",
    "TypeScript",
    "HTML",
    "JavaScript",
    "React.JS",
  ]);

  const skillIcons = {
    Bootstrap: "bi-bootstrap-fill",
    "Material UI": "bi-palette-fill",
    GraphQL: "bi-diagram-3-fill",
    MongoDB: "bi-database-fill",
    TypeScript: "bi-code-slash",
    HTML: "bi-filetype-html",
    JavaScript: "bi-filetype-js",
    "React.JS": "bi-lightning-charge-fill",
  };

  // ---- REMOVE SKILL FUNCTION ----
  const removeSkill = (skillName) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillName));
  };

  return (
    <>
      {/* ===== Key Skills Card ===== */}
      <div className="p-0 border rounded-4 mb-4 bg-white">
        <div className="d-flex p-3 justify-content-between align-items-center border-bottom pb-2 mb-3">
          <h6 className="fw-semibold mb-0">
            <i className="bi bi-bar-chart-fill me-2"></i> Key Skills
          </h6>
          <img
            src={editIcon}
            alt="Edit"
            className="edit-icons"
            onClick={handleShow}
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* ===== Skills List (MAIN SECTION) WITH REMOVE ICON ===== */}
        <div className="d-flex flex-wrap gap-2 px-3 mb-3">
          {skills.map((skill, index) => (
            <span key={index} className="badge-skill position-relative">
              <i className={`bi ${skillIcons[skill]} me-2`}></i>
              {skill}

              {/* REMOVE BUTTON (VISIBLE OUTSIDE MODAL ALSO) */}
              <button
                className="remove-btn ms-2"
                onClick={() => removeSkill(skill)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* ===== Modal ===== */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-diagram-3-fill me-2"></i> Key Skills
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="text-muted small mb-3">
            Add skills that best define your expertise (Minimum 1)
          </p>

          <h6 className="fw-semibold mb-2">Skills<span className="text-danger"> *</span></h6>

          {/* ===== Skills Inside Modal ALSO with Remove ===== */}
          <div className="mb-3 d-flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="badge-skill position-relative">
                <i className={`bi ${skillIcons[skill]} me-1`}></i>
                {skill}
                <button
                  className="remove-btn ms-2"
                  onClick={() => removeSkill(skill)}
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <Form.Control type="text" placeholder="Add new skill..." className="mt-3" />

          {/* Suggested Skills */}
          <p className="text-muted small mt-4 mb-2">
            Or select from the suggested set of skills
          </p>

          <div className="d-flex flex-wrap gap-2">
            {["Next.js", "Redux", "Webpack", "Ember.js", "Node.js"].map(
              (suggestion, index) => (
                <span key={index} className="suggested-skill">
                  + {suggestion}
                </span>
              )
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="link"
            className="text-muted text-decoration-none"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="dark" className="rounded-pill px-4" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default KeySkillsSection;
