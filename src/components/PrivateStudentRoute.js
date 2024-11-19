// src/components/PrivateStudentRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";

const PrivateStudentRoute = ({ children }) => {
  const { student } = useContext(StudentContext);

  return student ? children : <Navigate to="student-login" />;
};

export default PrivateStudentRoute;
