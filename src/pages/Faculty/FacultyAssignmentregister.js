import React, { useState, useEffect ,useContext } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Row, Col, ListGroup } from 'react-bootstrap';
import BASE_URL from '../../config';
import { useNavigate } from 'react-router-dom';
// import { useFaculty } from '../context/FacultyContext';
import { FacultyContext } from "../../context/FacultyContext";
import { useMemo } from 'react';

const AssignmentsRegister = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { faculty } = useContext(FacultyContext);

  // List of subjects
  const subjects = useMemo(() => [
    { id: 1, name: 'Math' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Science' },
    { id: 4, name: 'History' },
    { id: 5, name: 'Geography' },
    { id: 6, name: 'Physics' },
    { id: 7, name: 'Chemistry' },
    { id: 8, name: 'Biology' },
    { id: 9, name: 'Art' },
    { id: 10, name: 'Physical Education' },
  ], []);

  // Match the faculty subject name to the subject list and set subjectId
  useEffect(() => {
      
    const matchedSubject = subjects.find(
      (subject) => subject.name.toLowerCase() === faculty.subject_name.toLowerCase()
    );
    if (matchedSubject) {
      setSubjectId(matchedSubject.id);
    } else {
      setError('Subject matching the faculty subject name not found.');
    }
  }, [faculty.subject_name, subjects]);

  // Fetch the list of students when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/students/`);
        setStudents(response.data);
      } catch (error) {
        setError('Failed to fetch students. Please try again.');
      }
    };

    fetchStudents();
  }, []);

  // Handle student selection
  const handleStudentSelect = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  // Handle form submission
  const handleAssignWork = async (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate || !subjectId || selectedStudents.length === 0) {
      setError('Please fill all the fields and select students.');
      return;
    }

    try {
      const assignmentData = {
        faculty_id: faculty.id,
        subject_id: subjectId,
        student_ids: selectedStudents,
        title: title,
        description: description,
        due_date: dueDate,
      };

      const response = await axios.post(`${BASE_URL}/api/assign-work/`, assignmentData);
      setSuccess('Assignment created successfully!');
      setTitle('');
      setDescription('');
      setDueDate('');
      setSelectedStudents([]);
      setError('');
      console.log(response.data);
    } catch (error) {
      setError('Failed to assign work. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Assign Work to Students</h1>
      <Button variant="secondary" onClick={() => navigate('/faculty-dashboard')} className="mb-3">
        Back to Dashboard
      </Button>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col md={8}>
          <Form onSubmit={handleAssignWork}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter assignment title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter assignment description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="dueDate" className="mt-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="subject" className="mt-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={faculty.subject_name || 'Not Found'}
                readOnly
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Assign Work
            </Button>
          </Form>
        </Col>

        <Col md={4}>
          <h4 className="text-center">Select Students</h4>
          <ListGroup>
            {students.map((student) => (
              <ListGroup.Item key={student.id}>
                <Form.Check
                  type="checkbox"
                  label={`${student.first_name} ${student.last_name}`}
                  value={student.id}
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => handleStudentSelect(student.id)}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default AssignmentsRegister;
