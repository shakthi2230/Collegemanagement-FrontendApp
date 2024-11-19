import React, { useContext } from "react";
import { StudentContext } from "../../context/StudentContext";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { student, logout } = useContext(StudentContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (

    <Container className="mt-5">
      <h1 className="text-center mb-4">Welcome, {student.first_name}!</h1>

      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={student.profile_pic} />

            <Card.Body>
              <Card.Title>{student.first_name} </Card.Title>
              <Card.Text>
                <strong>id:</strong> {student.id}


                <br />
                <strong>First Name:</strong> {student.first_name}
                <br />
                <strong>Last Name Name:</strong> {student.last_name}
                <br />
                <strong>Email:</strong> {student.email}
                <br />
                <strong>Contact:</strong> {student.contact_number}
                <br />
                <strong>Gender:</strong> {student.gender}
                <br />
                <strong>blood group:</strong> {student.blood_group}
                <br />
                <strong>DOB:</strong> {student.dob}
                <br />
                <strong>Address:</strong> {student.address}


              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/student/update-profile')}>
                Update Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Assignments</Card.Title>
              <p>Your assignments will be listed here...</p>
              <Button variant="secondary" onClick={() => navigate('/assignmentslist')}>
                View Assignments
              </Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Logout</Card.Title>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Button variant="primary" onClick={() => navigate('/studentupdateprofile')}>
        Update Profile
      </Button>

    </Container>
  );
};

export default StudentDashboard;

