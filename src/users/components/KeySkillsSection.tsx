import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import editIcon from "../../assets/img/edit.svg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeKeySkill } from "../../redux/slices/employeeProfileSlice.tsx";
import { useAppDispatch } from "../../redux/hooks.tsx";

interface KeySkillsProps {
  keySkills: any;
  skillList: any;
  onSave: (sikllIds: number[]) => void;
}
const KeySkillsSection: React.FC<KeySkillsProps> = ({ keySkills, skillList, onSave }) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [skills, setSkills] = useState<string[]>([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<any[]>([]);
  const [keySkillRowIds, setKeySkillRowIds] = useState<number[]>([]);


  useEffect(() => {
    if (keySkills?.length) {
      setSkills(keySkills.map((item: any) => item?.skill?.skillName));
      setSelectedSkillIds(keySkills.map((item: any) => item?.skillId));
      setKeySkillRowIds(keySkills.map((item: any) => item.id));
    }
  }, [keySkills]);

  const skillIcons: any = {
    Bootstrap: "bi-bootstrap-fill",
    "Material UI": "bi-palette-fill",
    GraphQL: "bi-diagram-3-fill",
    MongoDB: "bi-database-fill",
    TypeScript: "bi-code-slash",
    HTML: "bi-filetype-html",
    JavaScript: "bi-filetype-js",
    "React.JS": "bi-lightning-charge-fill",
  };

  const handleSearchChange = (e: any) => {
    const value = e.target.value;
    setSearchText(value);
    if (!value.trim()) {
      setFilteredSkills([]);
      return;
    }
    const filtered = skillList.filter((item: any) =>
      item.skillName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSkills(filtered);
  };

  const handleSelectSkill = (item: any) => {
    if (!selectedSkillIds.includes(item.id)) {
      setSelectedSkillIds([...selectedSkillIds, item.id]);
      setSkills([...skills, item.skillName]);
    }
    setSearchText("");
    setFilteredSkills([]);
  };

  const handleSuggestedSkillClick = (item: any) => {
    if (!selectedSkillIds.includes(item.id)) {
      setSelectedSkillIds([...selectedSkillIds, item.id]);
      setSkills([...skills, item?.skillName]);
    }
  };


  const handleSave = () => {
    onSave(selectedSkillIds);
    setShow(false);
  };

  // ---- REMOVE SKILL FUNCTION ----
  const removeSkill = (skillName: any) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillName));
  };

  const handleRemove = (id: number) => {
    dispatch(removeKeySkill(id));
    setSkills((prev) => prev.filter((_, i) => keySkillRowIds[i] !== id));
    setSelectedSkillIds((prev) => prev.filter((_, i) => keySkillRowIds[i] !== id));
    setKeySkillRowIds((prev) => prev.filter(itemId => itemId  !== id));
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
                onClick={() => handleRemove(keySkillRowIds[index])}
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
                {skill}
                <button
                  className="remove-btn ms-2"
                  onClick={() => handleRemove(keySkillRowIds[index])}
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

          <Form.Control type="text" placeholder="Add new skill..." className="mt-3" value={searchText} onChange={handleSearchChange} />
          {filteredSkills.length > 0 && (
            <div className="border rounded mt-1 p-2" style={{ maxHeight: "150px", overflowY: "auto" }}>
              {filteredSkills.map((item: any) => (
                <div
                  key={item.id}
                  className="dropdown-item"
                  style={{ cursor: "pointer", padding: "6px" }}
                  onClick={() => handleSelectSkill(item)}
                >
                  {item.skillName}
                </div>
              ))}
            </div>
          )}

          {/* Suggested Skills */}
          <p className="text-muted small mt-4 mb-2">
            Or select from the suggested set of skills
          </p>

          <div className="d-flex flex-wrap gap-2">
            {skillList.map((item: any) => (
              <span key={item.id} className="suggested-skill" style={{ cursor: "pointer" }} onClick={() => handleSuggestedSkillClick(item)}>
                + {item.skillName}
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
          <Button variant="dark" className="rounded-pill px-4" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default KeySkillsSection;
