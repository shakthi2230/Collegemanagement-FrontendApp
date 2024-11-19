import React, { useState, useContext } from "react";
import { Container, Form, Button, InputGroup, Spinner, Alert } from "react-bootstrap";
import { EnvelopeFill, LockFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { FacultyContext } from "../../context/FacultyContext"; 

const Login = () => {
    const { login } = useContext(FacultyContext); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { success } = await login(email, password); 
        setLoading(false);
        if (success) {
            navigate("/faculty-dashboard");
        } else {
            alert("Login failed"); 
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                backgroundColor: "#f4faff", 
            }}
        >
            <div
                style={{
                    maxWidth: "400px",
                    width: "100%",
                    backgroundColor: "#ffffff", 
                    boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.15)", 
                    borderRadius: "12px", 
                    padding: "2.5rem", 
                    transition: "transform 0.3s ease", 
                }}
                className="hover-shadow"
            >
                 <h2 className="text-center mb-4">Faculty Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <EnvelopeFill />
                            </InputGroup.Text>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    borderRadius: "8px",
                                    borderColor: "#007bff", 
                                }}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <LockFill />
                            </InputGroup.Text>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    borderRadius: "8px", 
                                    borderColor: "#007bff", 
                                }}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                        className="w-100 d-flex align-items-center justify-content-center py-2"
                        style={{
                            borderRadius: "8px", 
                            backgroundColor: "#007bff", 
                            border: "none",
                            fontWeight: "bold", 
                            transition: "background-color 0.3s ease", 
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"} 
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"} 
                    >
                        {loading ? (
                            <Spinner as="span" animation="border" size="sm" />
                        ) : (
                            "Login"
                        )}
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default Login;
