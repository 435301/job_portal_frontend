import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import editIcon from "../../assets/img/edit.svg";
import "bootstrap/dist/css/bootstrap.min.css";

interface ProfileTitleProps{
  profileTitle: any;
}

const ProfileTitleSection :React.FC<ProfileTitleProps> = ({profileTitle}) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSave = () => {
    // You can integrate API/update logic here
    setShowModal(false);
  };

  return (
    <div className="p-0 border rounded-4 mb-4">
      {/* ===== Header ===== */}
      <div className="d-flex p-3 justify-content-between align-items-center border-bottom pb-2 mb-3">
        <h6 className="fw-semibold mb-0">
          <i className="bi bi-person-lines-fill me-2"></i> Profile Title
        </h6>
        <img
          src={editIcon}
          alt="Edit"
          className="edit-icons"
          style={{ cursor: "pointer", }}
          onClick={handleShow}
        />
      </div>

      {/* ===== Profile Text ===== */}
      <p className="mb-0 text-muted p-3">
        {profileTitle?.[0].title}
      </p>

      {/* ===== Modal ===== */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-person-lines-fill me-2"></i> Edit Profile Title
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-3">
            Write a short and clear profile title highlighting your skills.
          </p>
          <Form>
            <Form.Group>
              <Form.Label className="fw-semibold">Profile Title<span className="text-danger"> *</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className="h-100"
                value={profileTitle}
                // onChange={(e) => setProfileTitle(e.target.value)}
                placeholder="e.g. Frontend Developer skilled in React.js, HTML, CSS, and JavaScript"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="text-muted text-decoration-none btn btn-link" variant="link" onClick={handleClose}>
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

export default ProfileTitleSection;
