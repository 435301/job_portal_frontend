// src/components/education/EducationEditModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EducationEditModal = ({ show, onHide, item, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    course: "",
    status: "",
  });

  useEffect(() => {
    if (item) setFormData(item);
  }, [item]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
    onHide();
  };

  if (!item) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="md" backdrop="static">
      <Modal.Header closeButton className="bg-light text-white">
        <Modal.Title>
          <i className="bi bi-pencil-square me-2"></i>Edit Education
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Education Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Course</Form.Label>
            <Form.Control
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Inactive</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EducationEditModal;
