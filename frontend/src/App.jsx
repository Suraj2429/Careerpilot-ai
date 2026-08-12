import { useEffect, useState } from "react";
import api from "./api/axios";

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
      <h1>CareerPilot AI</h1>
      <p>{status}</p>
    </div>
  );
}

export default App;