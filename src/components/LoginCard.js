import React, { useState } from "react";

function LoginCard({ onClose, onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
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
      const response = await fetch("https://expensemanager4.azurewebsites.net/logInUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.username,
          password: formData.password,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        setMessage(errorText || "Login failed. Please try again.");
        return;
      }
  
      let result;
      const contentType = response.headers.get("Content-Type");
      if (contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = { message: await response.text() };
      }
  
      setMessage(result.message || "Login successful!");
      
      // Pass the user ID to the parent component for further use
      if (result.user_id) {
        onLogin(result.user_id); // Pass user ID to parent component
      } else {
        console.error("Login successful but user_id missing in response.");
        setMessage("An unexpected error occurred. Please try again.");
      }
  
      setTimeout(() => {
        onClose(); // Close login modal after successful login
      }, 1000);
    } catch (error) {
      setMessage("A network error occurred. Please try again later.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Email:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        <button onClick={onClose} style={styles.closeButton}>
          ×
        </button>
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
