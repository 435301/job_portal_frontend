
import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../../redux/hooks.tsx";
import { updateSkill } from "../../../redux/slices/skillSlice.tsx";
import { updateInstitution } from "../../../redux/slices/institutionSlice.tsx";

interface Institution {
  id: number;
  institutionName: string;
  status: number | any;
}

interface InstitutionEditModalProps {
  show: boolean;
  onHide: () => void;
  item: Institution | null;
  onSave: (updated: Institution) => void;
}

const InstitutionEditModal: React.FC<InstitutionEditModalProps> = ({ show, onHide, item, onSave, }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Institution>({
    id: 0,
    institutionName: "",
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
          <i className="bi bi-pencil-square me-2"></i>Edit Institution
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Institution Name<span className="text-danger"> *</span></Form.Label>
            <Form.Control
              type="text"
              name="institutionName"
              value={formData.institutionName}
              onChange={handleChange}
            />
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Status<span className="text-danger"> *</span></Form.Label>
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

export default InstitutionEditModal;
