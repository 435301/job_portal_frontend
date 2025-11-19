
import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../redux/hooks.tsx";

interface State {
    id: number;
    countryId: number;
    countryName: string;
    stateName: string;
    status: number | any;
    ipAddress: string;
}

interface StateEditModalProps {
    show: boolean;
    onHide: () => void;
    item: State | null;
    onSave: (updated: State) => void;
    countryList: { id: number; countryName: string }[];
}

const StateEditModal: React.FC<StateEditModalProps> = ({ show, onHide, item, onSave, countryList }) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<State>({
        id: 0,
        countryId: 0,
        countryName: "",
        stateName: "",
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
                    <i className="bi bi-pencil-square me-2"></i>Edit State
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 py-3">
                <Form>
                    <Form.Group>
                        <Form.Label>Select Country<span className="text-danger"> *</span></Form.Label>
                        <Form.Select
                            name="countryId"
                            value={formData.countryId}
                            onChange={handleChange}
                        >
                            <option value="">Select Education</option>
                            {countryList.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.countryName}
                                </option>
                            ))}
                        </Form.Select>
                       
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>State Name<span className="text-danger"> *</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="stateName"
                            value={formData.stateName}
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

export default StateEditModal;
