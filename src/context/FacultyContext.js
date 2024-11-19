import React, { createContext, useState, useEffect } from "react";

export const FacultyContext = createContext();

export const FacultyProvider = ({ children }) => {
    const [faculty, setFaculty] = useState(() => {
        // Load faculty data from localStorage on initialization
        const savedFaculty = localStorage.getItem("faculty");
        return savedFaculty ? JSON.parse(savedFaculty) : null;
    });

    const login = async (email, password) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/faculty/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setFaculty(data.faculty);
                // Save faculty data to localStorage
                localStorage.setItem("faculty", JSON.stringify(data.faculty));
                return { success: true };
            } else {
                alert(data.message || "Login failed");
                return { success: false };
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Something went wrong!");
            return { success: false };
        }
    };

    const logout = () => {
        setFaculty(null);
        // Remove faculty data from localStorage
        localStorage.removeItem("faculty");
    };

    useEffect(() => {
        // Debugging: Log faculty data
        console.log("Faculty data:", faculty);
    }, [faculty]);

    return (
        <FacultyContext.Provider value={{ faculty, login, logout }}>
            {children}
        </FacultyContext.Provider>
    );
};
