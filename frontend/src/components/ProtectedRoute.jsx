import { Navigate } from "react-router-dom";
import { getToken } from "../services/api";

// If there is no token, kick the user back to /login
export default function ProtectedRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />;
}
