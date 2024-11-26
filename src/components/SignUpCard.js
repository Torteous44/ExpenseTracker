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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        onSignUp(result.user_id); // Pass the user ID to the parent component
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="signup-card-form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="signup-card-input"
            />
          </div>
          <div className="signup-card-form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="signup-card-input"
            />
          </div>
          <div className="signup-card-form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="signup-card-input"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="signup-card-button"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        {message && <p className="signup-card-message">{message}</p>}
        <button onClick={onClose} className="signup-card-close-button">
          ×
        </button>
      </div>
    </div>
  );
}

export default SignUpCard;
