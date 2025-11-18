
import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../redux/hooks.tsx";
import { updateCourse } from "../../../redux/slices/courseSlice.tsx";
import { updateCourseType } from "../../../redux/slices/courseTypeSlice.tsx";

interface CourseType {
    id: number;
    courseType: string;
    status: number | any;
    ipAddress: string;
}

interface CourseTypeEditModalProps {
    show: boolean;
    onHide: () => void;
    item: CourseType | null;
    onSave: (updated: CourseType) => void;
}

const CourseTypeEditModal: React.FC<CourseTypeEditModalProps> = ({ show, onHide, item, onSave }) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<CourseType>({
        id: 0,
        courseType: "",
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
                
                    <Form.Group className="mb-3">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="courseType"
                            value={formData.courseType}
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

export default CourseTypeEditModal;
