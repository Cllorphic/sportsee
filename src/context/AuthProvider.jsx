import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { getToken, saveToken, logout as logoutService } from "../services/auth";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getToken());

  const login = (newToken) => {
    saveToken(newToken);
    setToken(newToken);
  };

  const logout = () => {
    logoutService();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}