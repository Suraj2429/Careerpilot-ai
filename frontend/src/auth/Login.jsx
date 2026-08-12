import { useState } from "react";
import api from "../api/axios";


function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


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
    setUser(null);
    setLoading(true);

    try {
      const response = await api.post(
        "/api/auth/login",
        formData
      );

      const { access_token } = response.data;

      localStorage.setItem(
        "access_token",
        access_token
      );

      const profileResponse = await api.get(
        "/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      setUser(profileResponse.data);

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
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && (
        <p>
          {error}
        </p>
      )}

      {user && (
        <div>
          <h3>Login successful</h3>

          <p>
            Welcome, {user.name}
          </p>

          <p>
            Email: {user.email}
          </p>

          <p>
            Role: {user.role}
          </p>
        </div>
      )}
    </div>
  );
}


export default Login;