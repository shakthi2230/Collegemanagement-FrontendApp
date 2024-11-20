import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../context/StudentContext";
import { Container, Form, Button, Alert, Spinner, InputGroup } from "react-bootstrap";
import { EnvelopeFill, LockFill } from "react-bootstrap-icons";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(StudentContext);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(email, password);
      if (response.success) {
        navigate("/student-dashboard"); 
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center bg-light min-vh-100 p-4"
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div
          className="bg-white p-4 rounded-3 shadow"
          style={{
            boxShadow: "0 4px 20px rgba(0, 123, 255, 0.25)", 
            border: "1px solid rgba(0, 123, 255, 0.5)" 
          }}
        >
          <h2 className="text-center mb-4">Student Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}

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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-100 d-flex align-items-center justify-content-center"
            >
              {loading ? <Spinner as="span" animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
