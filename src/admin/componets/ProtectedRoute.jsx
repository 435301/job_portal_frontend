import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.admin);
  return token ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
