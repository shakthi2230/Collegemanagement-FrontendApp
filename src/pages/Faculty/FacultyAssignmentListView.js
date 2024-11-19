import React, { useState, useEffect ,useContext  } from 'react';
import axios from 'axios';
import { Container, Table, Alert, Button } from 'react-bootstrap';
import BASE_URL from '../../config';
import { useNavigate } from 'react-router-dom';
import { FacultyContext } from "../../context/FacultyContext";

const FacultyAssignmentLists = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { faculty} = useContext(FacultyContext);

  useEffect(() => {
    if (!faculty) {
      navigate('/'); // Redirect if not logged in
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
      const response = await axios.delete(
          `${BASE_URL}/api/faculty/${faculty.id}/assignments/${assignmentId}/delete/`
      );
      // Update the state to remove the deleted assignment from the list
      setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
      alert('Assignment deleted successfully');
    } catch (error) {
      console.error(error);
      setError('Failed to delete the assignment. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Faculty Assignments</h1>
      <Button
        variant="secondary"
        onClick={() => navigate('/faculty-dashboard')}
        className="mb-3"
      >
        Back to Dashboard
      </Button>

      {error && <Alert variant="danger">{error}</Alert>}

      {assignments.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th> Assignment ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Subject</th>
              <th>Assigned Students</th>
              <th>Actions</th>
              
              

            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={index}>
                <td>{assignment.id}</td>
                <td>{assignment.title}</td>
                <td>{assignment.description}</td>
                <td>{new Date(assignment.due_date).toLocaleString()}</td>
                <td>{assignment.subject}</td>
                
                <td>
                  {assignment.students.length > 0
                    ? assignment.students.join(', ')
                    : 'No students assigned'}
                </td>
                <td>
                      {/* Delete button in each row */}
                      <Button 
                        variant="danger" 
                        onClick={() => handleDelete(assignment.id)}
                      >
                        Delete
                      </Button>
                    </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">No assignments found.</Alert>
      )}
    </Container>
  );
};

export default FacultyAssignmentLists;
