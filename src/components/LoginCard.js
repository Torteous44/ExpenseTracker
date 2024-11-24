import React, { useState } from "react";

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
        onLogin(result.user_id); // Pass user ID to the parent component
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
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2>{isSigningUp ? "Sign Up" : "Log In"}</h2>
        <form onSubmit={handleSubmit}>
          {isSigningUp && (
            <div style={styles.formGroup}>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username || ""}
                onChange={handleChange}
                required={isSigningUp}
                style={styles.input}
              />
            </div>
          )}
          <div style={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? (isSigningUp ? "Signing Up..." : "Logging In...") : isSigningUp ? "Sign Up" : "Log In"}
          </button>
        </form>
        <p style={styles.switchText}>
          {isSigningUp ? "Already have an account? " : "No account? "}
          <span onClick={toggleSignUp} style={styles.switchLink}>
            {isSigningUp ? "Log In" : "Sign Up"}
          </span>
        </p>
        <button onClick={onClose} style={styles.closeButton}>
          ×
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    width: "300px",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "90%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
  },
  switchText: {
    marginTop: "10px",
    fontSize: "14px",
  },
  switchLink: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  message: {
    marginTop: "10px",
    fontSize: "14px",
    color: "red",
  },
};

export default LoginCard;
