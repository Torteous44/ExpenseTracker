import React, { useState } from "react";
import "./styles/SignUpCard.css";

function SignUpCard({ onClose, onSignUp }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/signUpUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("Sign-up successful!");
        onSignUp(result.user_id); // Notify the parent component with the user ID
        setTimeout(onClose, 1000); // Close the modal after a delay
      } else {
        const errorText = await response.text();
        setMessage(`Sign-up failed: ${errorText}`);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-card-overlay">
      <div className="signup-card">
        <button onClick={onClose} className="signup-card-close-button" aria-label="Close">
          ×
        </button>
        <h2 className="title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="inputGroup">
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder=" "
              className="signup-card-input"
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="inputGroup">
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
              className="signup-card-input"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputGroup">
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder=" "
              className="signup-card-input"
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-submit"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        {message && (
          <p
            className={`signup-card-message ${
              message.includes("successful") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUpCard;
