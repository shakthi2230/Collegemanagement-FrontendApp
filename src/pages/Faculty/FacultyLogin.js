import React, { useState, useContext } from "react";
import { Container, Form, Button, InputGroup, Spinner } from "react-bootstrap";
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
        <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <div
                    className="bg-white p-4 rounded-3 shadow"
                    style={{
                        boxShadow: "0 4px 20px rgba(0, 123, 255, 0.25)", 
                        border: "1px solid rgba(0, 123, 255, 0.5)" 
                    }}
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
                                    className="border-primary"
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
                                    className="border-primary"
                                />
                            </InputGroup>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100 py-2"
                        >
                            {loading ? (
                                <Spinner as="span" animation="border" size="sm" />
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </Form>
                </div>
            </div>
        </Container>
    );
};

export default Login;
