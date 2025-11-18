
import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../../redux/hooks.tsx";
import { updateSkill } from "../../../redux/slices/skillSlice.tsx";
import { updateJobTitle } from "../../../redux/slices/JobTitleSlice.tsx";

interface JobTitle {
  id: number;
  jobTitleName: string;
  status: number | any;
}

interface JobTitleEditModalProps {
  show: boolean;
  onHide: () => void;
  item: JobTitle | null;
  onSave: (updated: JobTitle) => void;
}

const JobTitleEditModal: React.FC<JobTitleEditModalProps> = ({ show, onHide, item, onSave, }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<JobTitle>({
    id: 0,
    jobTitleName: "",
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
          <i className="bi bi-pencil-square me-2"></i>Edit Job Title
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Job Title Name</Form.Label>
            <Form.Control
              type="text"
              name="jobTitleName"
              value={formData.jobTitleName}
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

export default JobTitleEditModal;
