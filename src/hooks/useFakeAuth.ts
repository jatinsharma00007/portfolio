import { useState, useEffect } from "react";

export const useFakeAuth = () => {
  const [isAuthenticated, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated in session storage
    const authStatus = sessionStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setAuth(true);
    }
    setLoading(false);
  }, []);

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "1234") {
      setAuth(true);
      sessionStorage.setItem("isAuthenticated", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuth(false);
    sessionStorage.removeItem("isAuthenticated");
  };

  return { isAuthenticated, loading, login, logout };
}; 