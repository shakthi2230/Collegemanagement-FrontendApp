import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = () => {
  return (
    <div
      style={{
        backgroundColor: '#f4f4f9',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Container fluid   className="text-center " style={{ maxWidth: '900px' }}>
    
        <h1 style={{ fontWeight: '600', fontSize: '2.5rem', color: '#333', marginBottom: '1.5rem' }}>
          Welcome to our College managemnt
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          Access student and faculty information seamlessly. Choose your login to get started.
        </p>

 
        <Row className="mt-4 justify-content-center">
      
          <Col lg={5} md={6} sm={8} xs={12} className="mb-4">
            <Card
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease-in-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
            >
              <Card.Body className="text-center">
                <i className="bi bi-person-circle" style={{ fontSize: '2rem', color: '#007bff' }}></i>
                <h3 style={{ fontWeight: '500', color: '#007bff', marginTop: '1rem' }}>Student Login</h3>
                <p style={{ color: '#666' }}>Access your courses, grades, and personal details.</p>
                <Button href="/student-login" variant="primary" style={{ fontWeight: 'bold', padding: '0.5rem 2rem' }}>
                  Login as Student
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5} md={6} sm={8} xs={12} className="mb-4">

            <Card
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease-in-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
            >
              <Card.Body className="text-center">
                <i className="bi bi-person-badge-fill" style={{ fontSize: '2rem', color: '#28a745' }}></i>
                <h3 style={{ fontWeight: '500', color: '#28a745', marginTop: '1rem' }}>Faculty Login</h3>
                <p style={{ color: '#666' }}>Manage student records, subjects, and class information.</p>
                <Button href="/faculty-login" variant="success" style={{ fontWeight: 'bold', padding: '0.5rem 2rem' }}>
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
