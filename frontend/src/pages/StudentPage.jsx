import { useAuth } from "../context/AuthContext";


function StudentPage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Student Dashboard</h1>

      <p>
        Welcome, {user?.name}
      </p>

      <p>
        Email: {user?.email}
      </p>

      <p>
        Role: {user?.role}
      </p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}


export default StudentPage;