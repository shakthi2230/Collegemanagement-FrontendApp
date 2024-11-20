import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { StudentContext } from "../../context/StudentContext"; 
import BASE_URL from '../../config';
import StudentNavbar from "../../components/StudentNavbar";  

const AssignmentList = () => {
  const { student } = useContext(StudentContext); 
  const [assignments, setAssignments] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);  

  useEffect(() => {
    if (!student || !student.id) {
      setError("Student ID is not available");
      setLoading(false);
      return;
    }

    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/student/${student.id}/assignments/`
        );
        console.log("API Response: ", response);
        if (response.data.message) {
          setMessage(response.data.message); 
        }
        
        const assignmentsData = Array.isArray(response.data.assignments) ? response.data.assignments : [];
        setAssignments(assignmentsData);
      } catch (err) {
        console.error("Error details:", err);
        setError("Failed to fetch assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [student]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <h4>{error}</h4>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
   
      <StudentNavbar />

      <Container className="mt-5">
        <h1 className="text-center mb-5">Assignments</h1>

        
        {assignments.length === 0 ? (
          <h4 className="text-center">No assignments available.</h4>
        ) : (
          <Row>
            {assignments.map((assignment) => (
              <Col md={4} key={assignment.id} className="mb-4">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{assignment.title}</Card.Title>
                    <Card.Text>
                      <strong>Description:</strong> {assignment.description}
                    </Card.Text>
                    <Card.Text>
                      <strong>Due Date:</strong> {new Date(assignment.due_date).toLocaleString()}
                    </Card.Text>
                    <Card.Text>
                      <strong>Faculty:</strong> {assignment.faculty_first_name}
                    </Card.Text>
                    <Card.Text>
                      <strong>Subject:</strong> {assignment.subject_name}
                    </Card.Text>
                    <Button variant="primary" className="w-100">
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default AssignmentList;
