import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token =
    localStorage.getItem("adminToken") ||
    localStorage.getItem("employeeToken") ||
    localStorage.getItem("employerToken") ||
    localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const { exp } = jwtDecode(token);
    if (exp * 1000 < Date.now()) {
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }
  } catch (e) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
