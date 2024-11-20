import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = () => {
  return (
    <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center p-4">
      <Container fluid className="text-center" style={{ maxWidth: '900px' }}>
        <h1 className="fw-bold fs-2 text-dark mb-4">
          Welcome to Shakthi Institute of College System
        </h1>
        <p className="fs-5 text-muted">
          Access student and facultys information seamlessly. Choose your login to get started.
        </p>

        <Row className="mt-4 justify-content-center">
         
          <Col lg={5} md={6} sm={8} xs={12} className="mb-4">
            <Card className="shadow-sm border-0 rounded-3">
              <Card.Body className="text-center">
                <i className="bi bi-person-circle fs-1 text-primary"></i>
                <h3 className="fw-medium text-primary mt-3">Student Login</h3>
                <p className="text-muted">Access your courses, grades, and personal details.</p>
                <Button href="/student-login" variant="primary" className="fw-bold py-2 px-4">
                  Login as Student
                </Button>
              </Card.Body>
            </Card>
          </Col>

          
          <Col lg={5} md={6} sm={8} xs={12} className="mb-4">
            <Card className="shadow-sm border-0 rounded-3">
              <Card.Body className="text-center">
                <i className="bi bi-person-badge-fill fs-1 text-success"></i>
                <h3 className="fw-medium text-success mt-3">Faculty Login</h3>
                <p className="text-muted">Manage student records, subjects, and class information.</p>
                <Button href="/faculty-login" variant="success" className="fw-bold py-2 px-4">
                  Login as Faculty
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
