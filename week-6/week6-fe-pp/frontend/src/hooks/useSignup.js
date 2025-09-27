// hook/useSignup.js
import { useNavigate } from "react-router-dom"; 
import { setSessionUser } from "../utils/session";

const useSignup = (setIsAuthenticated) => {
  const navigate = useNavigate();

  const signup = async (email, password) => {
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
         setSessionUser(user);
        console.log("User signed up successfully!");
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Signup failed", response);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return { signup };
};

export default useSignup;
