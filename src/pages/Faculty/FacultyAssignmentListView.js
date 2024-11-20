import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Alert, Button, Modal } from 'react-bootstrap';
import BASE_URL from '../../config';
import { useNavigate } from 'react-router-dom';
import { FacultyContext } from "../../context/FacultyContext";
import NavbarComponent from '../../components/NavbarComponent';

const FacultyAssignmentLists = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { faculty } = useContext(FacultyContext);

  useEffect(() => {
    if (!faculty) {
      navigate('/'); 
      return;
    }

    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/faculty/${faculty.id}/assignments/`);
        setAssignments(response.data.assignments);
      } catch (error) {
        setError('Failed to fetch assignments. Please try again.');
      }
    };

    fetchAssignments();
  }, [faculty, navigate]);

  const handleDelete = async (assignmentId) => {
    try {
      await axios.delete(`${BASE_URL}/api/faculty/${faculty.id}/assignments/${assignmentId}/delete/`);
      setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
      alert('Assignment deleted successfully');
    } catch (error) {
      console.error(error);
      setError('Failed to delete the assignment. Please try again.');
    }
  };

  const handleCardClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAssignment(null);
  };

  return (
    <>
      <NavbarComponent />
      <Container className="mt-5 pt-4">
        <h1 className="text-center mb-4">Faculty Assignments</h1>


        {error && <Alert variant="danger">{error}</Alert>}

        {assignments.length > 0 ? (
          <Row className="g-4">
            {assignments.map((assignment, index) => (
              <Col key={index} xs={12} sm={6} md={4}>
                <Card className="shadow-sm" onClick={() => handleCardClick(assignment)} style={{ cursor: 'pointer' }}>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{assignment.title}</Card.Title>
                    <Card.Text>
                      <strong>Due Date:</strong> {new Date(assignment.due_date).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text>
                      <strong>Subject:</strong> {assignment.subject}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(assignment.id);
                        }}
                      >
                        Delete work
                      </Button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(assignment); 
                        }}
                      >
                        View more 
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

            ))}
          </Row>
        ) : (
          <Alert variant="info" className="text-center">No assignments found.</Alert>
        )}

       
        <Modal show={showModal} onHide={handleCloseModal} centered>
          {selectedAssignment && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{selectedAssignment.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p><strong>Description:</strong> {selectedAssignment.description}</p>
                <p><strong>Due Date:</strong> {new Date(selectedAssignment.due_date).toLocaleString()}</p>
                <p><strong>Subject:</strong> {selectedAssignment.subject}</p>
                <p><strong>Assigned Students:</strong> {selectedAssignment.students.length > 0 ? selectedAssignment.students.join(', ') : 'No students assigned'}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>

              </Modal.Footer>
            </>
          )}
        </Modal>
      </Container>
    </>
  );
};

export default FacultyAssignmentLists;
