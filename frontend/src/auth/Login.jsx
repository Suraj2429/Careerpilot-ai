import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";


function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, login } = useAuth();


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post(
        "/api/auth/login",
        formData
      );

      await login(response.data.access_token);

      setFormData({
        email: "",
        password: "",
      });

    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">
          <h1>CareerPilot AI</h1>

          <p>
            AI-powered career guidance for students
          </p>
        </div>


        {!user ? (
          <>
            <div className="auth-title">
              <h2>Welcome Back</h2>

              <p>
                Login to continue your career journey
              </p>
            </div>


            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={8}
                  required
                />
              </div>


              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}


              <button
                className="auth-button"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>

            </form>


            <div className="auth-footer">
              <p>
                Don't have an account?{" "}
                <a href="/register">
                  Create account
                </a>
              </p>
            </div>
          </>
        ) : (
          <div className="login-success">

            <div className="success-icon">
              ✓
            </div>

            <h2>Login Successful</h2>

            <p>
              Welcome, <strong>{user.name}</strong>
            </p>

            <div className="user-info">
              <p>
                <strong>Email:</strong>{" "}
                {user.email}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {user.role}
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}


export default Login;