import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import { FacultyContext } from "../../context/FacultyContext";
import BASE_URL from "../../config";
import NavbarComponent from "../../components/NavbarComponent";
import { useNavigate } from 'react-router-dom';


const FacultyUpdate = () => {
    const { faculty, setFaculty } = useContext(FacultyContext);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        subject:"",
        password: "",
    });
    const [updateMessage, setUpdateMessage] = useState("");
    const [error, setError] = useState("");
    const [fieldError, setFieldError] = useState({
        password: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (faculty) {
            setFormData({
                first_name: faculty.first_name || "",
                last_name: faculty.last_name || "",
                phone_number: faculty.phone_number || "",
                password: "",
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

        if (formData.password.trim() && !/^[a-zA-Z]+$/.test(formData.password)) {
            setFieldError((prevErrors) => ({
                ...prevErrors,
                password: "Password must contain only letters.",
            }));
            return;
        }

        const updatedData = { ...formData };
        if (!updatedData.password.trim()) {
            delete updatedData.password;
        }

        try {
            const response = await axios.put(
                `${BASE_URL}/api/faculty/${faculty.id}/update/`,
                updatedData
            );
            if (response.data.message === "Faculty updated successfully") {
                setFaculty(response.data.faculty);
                sessionStorage.setItem("faculty", JSON.stringify(response.data.faculty));
                alert("Details updated successfully!");
                navigate("/");


            }
        } catch (err) {
            console.error(err);
            setError("Failed to update details. Please try again.");
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
           
            <NavbarComponent />

          
            <Container className="mt-5" style={{ marginTop: "80px" }}>
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <h2 className="text-center mb-4 mt-4">Update Faculty Details</h2>
                        {updateMessage && <Alert variant="success">{updateMessage}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleUpdate} className="shadow-sm p-4 rounded bg-white">
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
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Leave blank to keep the current password"
                                    isInvalid={!!fieldError.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {fieldError.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">
                                Update Details
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default FacultyUpdate;
