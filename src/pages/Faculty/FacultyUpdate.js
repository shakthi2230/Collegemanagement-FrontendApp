import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { FacultyContext } from "../../context/FacultyContext";
import BASE_URL from "../../config";

const FacultyUpdate = () => {
    const { faculty, setFaculty } = useContext(FacultyContext); // Assuming `setFaculty` is provided in the context
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        subject_name: "",
    });
    const [updateMessage, setUpdateMessage] = useState("");
    const [error, setError] = useState("");

    // const BASE_URL = "http://127.0.0.1:8000";

    useEffect(() => {
        if (faculty) {
            setFormData({
                first_name: faculty.first_name || "",
                last_name: faculty.last_name || "",
                phone_number: faculty.phone_number || "",
                subject_name: faculty.subject_name || "",
            });
        }
    }, [faculty]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdateMessage("");
        setError("");

        try {
            const response = await axios.put(
                `${BASE_URL}/api/faculty/${faculty.id}/update/`,
                formData
            );
            setUpdateMessage("Details updated successfully!");
            setFaculty(response.data); // Update the faculty details in context
            sessionStorage.setItem("faculty", JSON.stringify(response.data)); // Update session
        } catch (err) {
            console.error(err);
            // setError("Failed to update details. Please try again.");
        }
    };

    return (
        <Container className="mt-5">
            <h2>Update Faculty Details</h2>
            {updateMessage && <Alert variant="success">{updateMessage}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Subject Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="subject_name"
                        value={formData.subject_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update Details
                </Button>
            </Form>
        </Container>
    );
};

export default FacultyUpdate;
