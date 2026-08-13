import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../api/axios";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("access_token")
  );

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const login = async (accessToken) => {
    localStorage.setItem(
      "access_token",
      accessToken
    );

    setToken(accessToken);

    const response = await api.get(
      "/api/users/me"
    );

    setUser(response.data);
  };


  const logout = () => {
    localStorage.removeItem("access_token");

    setToken(null);
    setUser(null);
  };


  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(
          "/api/users/me"
        );

        setUser(response.data);
      } catch (error) {
        console.error(
          "Failed to restore authentication:",
          error
        );

        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}