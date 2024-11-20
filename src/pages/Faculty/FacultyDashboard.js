import React, { useContext } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FacultyContext } from '../../context/FacultyContext';
import { Envelope, Phone, CalendarEvent, PersonFill,FileText } from 'react-bootstrap-icons';
import NavbarComponent from '../../components/NavbarComponent';

const FacultyDashboard = () => {
    const { faculty, logout } = useContext(FacultyContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!faculty) return null;

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarComponent onLogout={handleLogout} />
            <div className="flex-grow-1 p-4 bg-light" style={{ marginTop: '70px' }}>
                <div className="text-center mb-5">
                    <h5>My Profile</h5>
                </div>
                <Container>
                    <Row className="mb-4 justify-content-center">
                        <Col xs={12} sm={6} md={8}>
                            <Card className="shadow-sm mb-3 rounded-3 bg-white p-3" style={{ minHeight: '400px' }}>
                                <Card.Body>
                                    <Row className="mb-3 align-items-center">
                                        <Col xs={4}>
                                            <h6>
                                                <PersonFill className="me-2" />
                                                Name
                                            </h6>
                                        </Col>
                                        <Col xs="auto" className="text-center">
                                            <span>:</span>
                                        </Col>
                                        <Col xs={7}>
                                            <p>{faculty.first_name}</p>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3 align-items-center">
                                        <Col xs={4}>
                                            <h6>
                                                <PersonFill className="me-2" />
                                                Last Name
                                            </h6>
                                        </Col>
                                        <Col xs="auto" className="text-center">
                                            <span>:</span>
                                        </Col>
                                        <Col xs={7}>
                                            <p>{faculty.last_name}</p>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3 align-items-center">
                                        <Col xs={4}>
                                            <h6>
                                                <Envelope className="me-2" />
                                                Email
                                            </h6>
                                        </Col>
                                        <Col xs="auto" className="text-center">
                                            <span>:</span>
                                        </Col>
                                        <Col xs={7}>
                                            <p>{faculty.email}</p>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3 align-items-center">
                                        <Col xs={4}>
                                            <h6>
                                                <FileText className="me-2" />
                                                Subject
                                            </h6>
                                        </Col>
                                        <Col xs="auto" className="text-center">
                                            <span>:</span>
                                        </Col>
                                        <Col xs={7}>
                                            <p>{faculty.subject_name}</p>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3 align-items-center">
                                        <Col xs={4}>
                                            <h6>
                                                <Phone className="me-2" />
                                                Phone
                                            </h6>
                                        </Col>
                                        <Col xs="auto" className="text-center">
                                            <span>:</span>
                                        </Col>
                                        <Col xs={7}>
                                            <p>{faculty.phone_number}</p>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3 align-items-center">
                                        <Col xs={4}>
                                            <h6>
                                                <CalendarEvent className="me-2" />
                                                Joined On
                                            </h6>
                                        </Col>
                                        <Col xs="auto" className="text-center">
                                            <span>:</span>
                                        </Col>
                                        <Col xs={7}>
                                            <p>{new Date(faculty.created_at).toLocaleDateString()}</p>
                                        </Col>
                                    </Row>

                                    <div className="text-center mt-4">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="w-50"
                                            onClick={() => navigate('/faculty-update')}
                                        >
                                            Update Profile
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default FacultyDashboard;
