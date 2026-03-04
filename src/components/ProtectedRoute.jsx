import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Example: check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    // Redirect to login if user is not logged in
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;