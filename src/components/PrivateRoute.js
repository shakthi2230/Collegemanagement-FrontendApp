import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FacultyContext } from "../context/FacultyContext";

const PrivateRoute = ({ children }) => {
    const { faculty } = useContext(FacultyContext);

    return faculty ? children : <Navigate to="/faculty-login" />;
};

export default PrivateRoute;
