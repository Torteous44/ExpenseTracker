import React, { useState } from "react";
import "./styles/LoginCard.css";

function LoginCard({ onClose, onLogin, onSignUp }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSigningUp, setIsSigningUp] = useState(false); // Toggle between login and sign-up
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleSignUp = () => {
    setIsSigningUp((prev) => !prev);
    setFormData({ email: "", password: "", username: "" }); // Clear form data when switching modes
    setMessage(""); // Clear messages
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const endpoint = isSigningUp
        ? `${process.env.REACT_APP_API_BASE_URL}/signUpUser`
        : `${process.env.REACT_APP_API_BASE_URL}/logInUser`;

      const payload = isSigningUp
        ? { email: formData.email, password: formData.password, username: formData.username }
        : { email: formData.email, password: formData.password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMessage(errorText || "Something went wrong. Please try again.");
        return;
      }

      const result = await response.json();
      setMessage(isSigningUp ? "Account created successfully!" : "Login successful!");

      if (!isSigningUp) {
        onLogin(result); // Pass user ID to the parent component
      }

      setTimeout(() => {
        onClose(); // Close modal after success
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("A network error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="login-card-overlay">
  <div className="login-card">
    <h2>{isSigningUp ? "Sign Up" : "Log In"}</h2>
    <form onSubmit={handleSubmit}>
      {isSigningUp && (
        <div className="login-card-form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
            required={isSigningUp}
            className="login-card-input"
          />
        </div>
      )}
      <div className="login-card-form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="login-card-input"
        />
      </div>
      <div className="login-card-form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="login-card-input"
        />
      </div>
      <button
        type="submit"
        className="login-card-button"
        disabled={loading}
      >
        {loading
          ? isSigningUp
            ? "Signing Up..."
            : "Logging In..."
          : isSigningUp
          ? "Sign Up"
          : "Log In"}
      </button>
    </form>
    <p className="login-card-switch-text">
      {isSigningUp ? "Already have an account? " : "No account? "}
      <span onClick={toggleSignUp} className="login-card-switch-link">
        {isSigningUp ? "Log In" : "Sign Up"}
      </span>
    </p>
    <button onClick={onClose} className="login-card-close-button">
      ×
    </button>
    {message && (
      <p
        className={`login-card-message ${
          message.includes("successfully")
            ? "login-card-message-success"
            : ""
        }`}
      >
        {message}
      </p>
    )}
  </div>
</div>

  );
}



export default LoginCard;
