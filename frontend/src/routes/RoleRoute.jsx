import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function RoleRoute({ role, children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}


export default RoleRoute;