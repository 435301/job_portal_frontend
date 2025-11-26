import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "./tokenValidate.ts";

// Admin Only
export const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  // If token missing or expired → logout + redirect
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};


export const EmployeeRoute = ({ children }) => {
  const token = localStorage.getItem("employeeToken");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("employeeToken");
    localStorage.removeItem("employee");
    return <Navigate to="/login" replace />;
  }

  return children;
};


export const EmployerRoute = ({ children }) => {
  const token = localStorage.getItem("employerToken");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("employerToken");
    localStorage.removeItem("employer");
    return <Navigate to="/login" replace />;
  }

  return children;
};
