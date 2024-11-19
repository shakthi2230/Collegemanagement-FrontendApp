// src/pages/Dashboard.js
import React, { useContext } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FacultyContext } from "../../context/FacultyContext";
import { Link } from "react-router-dom";

const FacultyDashboard = () => {
    const { faculty, logout } = useContext(FacultyContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!faculty) return null;

    return (
        <Container className="mt-5">
            <h2>Welcome, {faculty.first_name} {faculty.last_name}</h2>
            <p>Email: {faculty.email}</p>
            <p>ID: {faculty.id}</p>
            <p>Phone: {faculty.phone_number}</p>
            <p>Subject: {faculty.subject_name}</p>
            <p>Joined on: {new Date(faculty.created_at).toLocaleDateString()}</p>

            <Button variant="danger" onClick={handleLogout}>
                Logout
            </Button>


            <Button
                variant="primary"
                onClick={() => navigate('/student-list')}
                className="mt-3"
            >
                View Student List
            </Button>

            <Button as={Link} to="/faculty-update" variant="secondary">
                Update Profile
            </Button>;

            <Button as={Link} to="/register-student" variant="secondary">
            register-student
            </Button>;
            <Button as={Link} to="/faculty-assignments" variant="secondary">
            faculty-assignments
            </Button>;
            <Button as={Link} to="/assignments-register" variant="secondary">
            assignmetsregister
            </Button>;
            
           

        </Container>
    );
};

export default FacultyDashboard;
