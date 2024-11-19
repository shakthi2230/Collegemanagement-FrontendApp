import React, { useContext, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { StudentContext } from "../../context/StudentContext";
import BASE_URL from "../../config";
import { useNavigate } from "react-router-dom";

const StudentUpdateProfile = () => {
    const { student, setStudent } = useContext(StudentContext); // Access context to get student data
    const [formData, setFormData] = useState({
        first_name: student.first_name,
        last_name: student.last_name,
        email: student.email,
        contact_number: student.contact_number,
        gender: student.gender,
        blood_group: student.blood_group,
        dob: student.dob,
        address: student.address,
        profile_pic: null,
    });

    const navigate = useNavigate();

    // Handle change of input fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make PUT request to update student profile
            const response = await axios.put(
                `${BASE_URL}/api/student/update/${student.id}/`,
                formData
            );

            console.log("API Response:", response); // Log the response for debugging

            // If the response status is 200 and student data is present
            if (response.status === 200 && response.data && response.data.student) {
                // Show success message
                alert("Profile updated successfully!");

                // Extract updated student data from the response
                const updatedStudent = response.data.student;

                // Update context with the new student data
                setStudent((prevStudent) => ({
                    ...prevStudent,  // Preserve previous data
                    ...updatedStudent,  // Merge with updated data
                }));

                // Optionally update sessionStorage or localStorage
                sessionStorage.setItem("student", JSON.stringify(updatedStudent));

                // Navigate to student dashboard
                navigate("/student-dashboard");
            } else {
                // If response status is not 200, show an error
                alert("Failed to update profile. Please try again.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);

            // Handle errors based on the error response
            if (error.response) {
                // If the server responds with an error
                alert("Error: " + (error.response.data.message || "Please try again."));
            } else if (error.request) {
                // If no response is received
                alert("Network error: No response from server.");
            } else {
                // Any other error
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profile_pic: file });
      };

    return (
        <Container className="mt-5">
            <h1 className="text-center">Update Profile</h1>
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group controlId="profile_pic" className="mb-3">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                        type="file"
                        name="profile_pic"
                        onChange={handleImageChange}
                    />
                </Form.Group>
                <Form.Group controlId="first_name" className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="last_name" className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="contact_number" className="mb-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="contact_number"
                        value={formData.contact_number}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="gender" className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="blood_group" className="mb-3">
                    <Form.Label>Blood Group</Form.Label>
                    <Form.Control
                        type="text"
                        name="blood_group"
                        value={formData.blood_group}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="dob" className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="address" className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update Profile
                </Button>
                <Button
                    variant="secondary"
                    className="ms-3"
                    onClick={() => navigate("/student-dashboard")}
                >
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default StudentUpdateProfile;
