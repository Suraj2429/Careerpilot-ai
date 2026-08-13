import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StudentPage from "../pages/StudentPage";
import AdminPage from "../pages/AdminPage";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";


function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/student"
        element={
          <RoleRoute role="student">
            <StudentPage />
          </RoleRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <RoleRoute role="admin">
            <AdminPage />
          </RoleRoute>
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}


export default AppRoutes;