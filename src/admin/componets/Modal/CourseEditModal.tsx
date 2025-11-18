
import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../redux/hooks.tsx";
import { updateCourse } from "../../../redux/slices/courseSlice.tsx";

interface Course {
    id: number;
    educationId: number;
    educationName: string;
    courseName: string;
    status: number | any;
    ipAddress: string;
}

interface CourseEditModalProps {
    show: boolean;
    onHide: () => void;
    item: Course | null;
    onSave: (updated: Course) => void;
    educationList: { id: number; educationName: string }[];
}

const CourseEditModal: React.FC<CourseEditModalProps> = ({ show, onHide, item, onSave, educationList }) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<Course>({
        id: 0,
        educationId: 0,
        educationName: "",
        courseName: "",
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
                    <i className="bi bi-pencil-square me-2"></i>Edit Course
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 py-3">
                <Form>
                    <Form.Group>
                        <Form.Label>Select Education<span className="text-danger"> *</span></Form.Label>
                        <Form.Select
                            name="educationId"
                            value={formData.educationId}
                            onChange={handleChange}
                        >
                            <option value="">Select Education</option>
                            {educationList.map((edu) => (
                                <option key={edu.id} value={edu.id}>
                                    {edu.educationName}
                                </option>
                            ))}
                        </Form.Select>
                       
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Course Name<span className="text-danger"> *</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="courseName"
                            value={formData.courseName}
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

export default CourseEditModal;
