import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleStudentLogin = () => {
        navigate("/student-login"); // Adjust this path as per your app's structure
    };

    const handleFacultyLogin = () => {
        navigate("/faculty-login");
    };

    return (
        <Container className="text-center mt-5">
            <h1>College Management</h1>
            <div className="mt-4">
                <Button
                    variant="primary"
                    className="me-3"
                    onClick={handleStudentLogin}
                >
                    Student Login
                </Button>
                <Button variant="success" onClick={handleFacultyLogin}>
                    Faculty Login
                </Button>
            </div>
        </Container>
    );
};

export default Home;
