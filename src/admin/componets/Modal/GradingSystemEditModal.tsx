
import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../redux/hooks.tsx";

interface GradingSystem {
    id: number;
    gradingType: string;
    status: number | any;
    ipAddress: string;
}

interface GradingSystemEditModalProps {
    show: boolean;
    onHide: () => void;
    item: GradingSystem | null;
    onSave: (updated: GradingSystem) => void;
}

const GradingSystemEditModal: React.FC<GradingSystemEditModalProps> = ({ show, onHide, item, onSave }) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<GradingSystem>({
        id: 0,
        gradingType: "",
        status: "",
        ipAddress: "",
    });

    useEffect(() => {
        if (item) setFormData(item);
    }, [item]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!item) return null;

    return (
        <Modal show={show} onHide={onHide} centered size={"md" as any} backdrop="static">
            <Modal.Header closeButton className="bg-light text-white">
                <Modal.Title>
                    <i className="bi bi-pencil-square me-2"></i>Edit Grading System
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 py-3">
                <Form>
                
                    <Form.Group className="mb-3">
                        <Form.Label>Grading System<span className="text-danger"> *</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="gradingType"
                            value={formData.gradingType}
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
                            <option value="0">Inactive</option>
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

export default GradingSystemEditModal;
