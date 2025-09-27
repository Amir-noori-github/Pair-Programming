// hook/useLogin.js

import { useNavigate } from "react-router-dom";
import { setSessionUser } from "../utils/session";

const useLogin = (setIsAuthenticated) => {
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        setSessionUser(user);
        console.log("User logged in successfully!");
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return { login };
};

export default useLogin;
