import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Table, Spinner } from "react-bootstrap";
import { StudentContext } from "../../context/StudentContext"; // Import StudentContext

const AssignmentList = () => {
  const { student } = useContext(StudentContext); // Access student data from context
  const [assignments, setAssignments] = useState([]);  // Ensure it's an empty array
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
          `http://localhost:8000/api/student/${student.id}/assignments/`
        );
        console.log("API Response: ", response); // Log the entire response

        if (response.data.message) {
          setMessage(response.data.message);  // Set the custom message from the response
        }

        // Safely check if 'assignments' exists and is an array
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
    <Container className="mt-5">
      <h1 className="text-center">Assignments</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Faculty</th>
            <th>Subject</th>
            <th>Assigned Students</th>
          </tr>
        </thead>
        <tbody>
          {assignments && assignments.length === 0 ? (
            // If no assignments, display empty rows with just headers
            <tr>
              <td colSpan="6" className="text-center">
                No assignments available.
              </td>
            </tr>
          ) : (
            assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.title}</td>
                <td>{assignment.description}</td>
                <td>{new Date(assignment.due_date).toLocaleString()}</td>
                <td>{assignment.faculty}</td>
                <td>{assignment.subject}</td>
                <td>
                  {assignment.students && assignment.students.length > 0
                    ? assignment.students.join(", ")
                    : "No students assigned"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AssignmentList;
