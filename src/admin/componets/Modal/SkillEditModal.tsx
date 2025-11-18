
import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../../redux/hooks.tsx";
import { updateSkill } from "../../../redux/slices/skillSlice.tsx";

interface Skill {
  id: number;
  skillName: string;
  status: number | any;
}

interface SkillEditModalProps {
  show: boolean;
  onHide: () => void;
  item: Skill | null;
  onSave: (updated: Skill) => void;
}

const SkillEditModal: React.FC<SkillEditModalProps> = ({ show, onHide, item, onSave, }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Skill>({
    id: 0,
    skillName: "",
    status: "",
  });

  useEffect(() => {
    if (item) setFormData(item);
  }, [item]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  if (!item) return null;

  return (
    <Modal show={show} onHide={onHide} centered  size={"md" as any} backdrop="static">
      <Modal.Header closeButton className="bg-light text-white">
        <Modal.Title>
          <i className="bi bi-pencil-square me-2"></i>Edit Skill
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Skill Name</Form.Label>
            <Form.Control
              type="text"
              name="skillName"
              value={formData.skillName}
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
              <option value="">Select Status</option>
              <option value="1">Active</option>
              <option value= "0">Inactive</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={()=>onSave(formData)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SkillEditModal;
