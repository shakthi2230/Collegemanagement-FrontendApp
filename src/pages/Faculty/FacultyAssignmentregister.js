import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Row, Col, ListGroup, Tab, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FacultyContext } from "../../context/FacultyContext";
import { FileText, Calendar, Person, CheckCircle } from 'react-bootstrap-icons';
import NavbarComponent from '../../components/NavbarComponent';
import BASE_URL from '../../config';

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


  const handleStudentSelect = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };


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
    <div className="d-flex flex-column min-vh-100">
  
      <NavbarComponent onLogout={() => navigate('/')} />

  
      <Container className="mt-5 pt-5">
        <h1 className="text-center">Assign Work to Students</h1>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Row className="justify-content-center">
          <Col md={6} className="border rounded p-4 shadow-sm">
            <Tab.Container defaultActiveKey="assignmentForm">
              <Nav variant="tabs" className="justify-content-center mb-3">
                <Nav.Item>
                  <Nav.Link eventKey="assignmentForm">Assignment Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="studentSelection">Select Students</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
            
                <Tab.Pane eventKey="assignmentForm">
                  <Form onSubmit={handleAssignWork}>
                    <Form.Group controlId="title">
                      <Form.Label><FileText size={20} /> Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter assignment title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="description" className="mt-3">
                      <Form.Label><FileText size={20} /> Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter assignment description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="dueDate" className="mt-3">
                      <Form.Label><Calendar size={20} /> Due Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="subject" className="mt-3">
                      <Form.Label><Person size={20} /> Subject</Form.Label>
                      <Form.Control
                        type="text"
                        value={faculty.subject_name || 'Not Found'}
                        readOnly
                        disabled
                      />
                    </Form.Group>
                  </Form>
                </Tab.Pane>

             
                <Tab.Pane eventKey="studentSelection">
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
                          required
                        />
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Tab.Pane>
              </Tab.Content>

              <Button
                variant="primary"
                onClick={handleAssignWork}
                className="mt-3 w-100"
              >
                Assign Work
              </Button>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AssignmentsRegister;
