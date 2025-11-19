
import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../redux/hooks.tsx";

interface City {
    id: number;
    countryId: number;
    countryName: string;
    stateId: number;
    stateName: string;
    cityName: string;
    status: number | any;
    ipAddress: string;
}

interface CityEditModalProps {
    show: boolean;
    onHide: () => void;
    item: City | null;
    onSave: (updated: City) => void;
    countryList: { id: number; countryName: string }[];
    StateList: { id: number; stateName: string }[];
}

const CityEditModal: React.FC<CityEditModalProps> = ({ show, onHide, item, onSave, countryList, StateList }) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<City>({
        id: 0,
        countryId: 0,
        countryName: "",
        stateId: 0,
        stateName: "",
        cityName: "",
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
                    <i className="bi bi-pencil-square me-2"></i>Edit City
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
                            <option value="">Select Country</option>
                            {countryList.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.countryName}
                                </option>
                            ))}
                        </Form.Select>

                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Select State<span className="text-danger"> *</span></Form.Label>
                        <Form.Select
                            name="stateId"
                            value={formData.stateId}
                            onChange={handleChange}
                        >
                            <option value="">Select course</option>
                            {StateList.map((state) => (
                                <option key={state.id} value={state.id}>
                                    {state.stateName}
                                </option>
                            ))}
                        </Form.Select>

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>City Name<span className="text-danger"> *</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="cityName"
                            value={formData.cityName}
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
                <Button variant="primary" onClick={() => onSave(formData)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CityEditModal;
