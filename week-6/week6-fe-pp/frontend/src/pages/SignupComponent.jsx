// components/SignupComponent.jsx
import { useState } from "react";
import useSignup from "../hooks/useSignup";

const SignupComponent = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const { signup } = useSignup(setIsAuthenticated);

  const handleSignup = () => {
    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    signup(email, password);
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </label>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default SignupComponent;
