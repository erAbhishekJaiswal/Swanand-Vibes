import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utills/authService";

export function PrivateRoute({ children, role }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (role && getUserRole() !== role) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
