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
  <div className="form-box">
    <button onClick={onClose} className="close-btn">
      ×
    </button>
    <h2 className="title">{isSigningUp ? "Sign Up" : "Log In"}</h2>
    <form onSubmit={handleSubmit} className="form">
      {isSigningUp && (
        <div className="inputGroup">
          <input
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
            placeholder=""
          />
          <label>Username</label>
        </div>
      )}
      <div className="inputGroup">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder=" " 

          required
        />
        <label>Email</label>
      </div>
      <div className="inputGroup">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder= " "
          required
        />
        <label>Password</label>
      </div>
      <button type="submit" className="btn-submit" disabled={loading}>
        {loading
          ? isSigningUp
            ? "Signing Up..."
            : "Logging In..."
          : isSigningUp
          ? "Sign Up"
          : "Log In"}
      </button>
</form>
<p className="form-section switch-account-section">
  {isSigningUp ? "Already have an account? " : "No account? "}
  <button
    type="button"
    className="link-button toggle-account-button"
    onClick={toggleSignUp}
  >
    {isSigningUp ? "Log In" : "Sign Up"}
  </button>
</p>

{message && (
  <p
    className={`message feedback-message ${
      message.includes("successfully") ? "message-success" : ""
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
