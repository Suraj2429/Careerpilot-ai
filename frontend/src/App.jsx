import { useEffect, useState } from "react";
import api from "./api/axios";
import Register from "./auth/Register";

function App() {
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await api.get("/health/database");

        if (response.data.status === "connected") {
          setStatus("Backend connected successfully");
        }
      } catch (error) {
        console.error("Backend connection failed:", error);
        setStatus("Backend connection failed");
      }
    };

    checkBackend();
  }, []);

  return (
    <div>
      <Register />
    </div>
  );
}

export default App;