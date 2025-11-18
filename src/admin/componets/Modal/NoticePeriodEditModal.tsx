
import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateEducation } from "../../../redux/slices/educationSlice.tsx";
import { useAppDispatch } from "../../../redux/hooks.tsx";
import { updateNoticePeriod } from "../../../redux/slices/noticePeriodSlice.tsx";

interface NoticePeriod {
  id: number;
  noticePeriodName: string;
  status: number | any;
}

interface NoticePeriodEditModalProps {
  show: boolean;
  onHide: () => void;
  item: NoticePeriod | null;
  onSave: (updated: NoticePeriod) => void;
}

const NoticePeriodEditModal: React.FC<NoticePeriodEditModalProps> = ({ show, onHide, item, onSave, }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<NoticePeriod>({
    id: 0,
    noticePeriodName: "",
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
          <i className="bi bi-pencil-square me-2"></i>Edit Notice Period
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Notice Period Name<span className="text-danger"> *</span></Form.Label>
            <Form.Control
              type="text"
              name="educationName"
              value={formData.noticePeriodName}
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

export default NoticePeriodEditModal;
