import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={styles.container}>
      <h1>Welcome to the Expense Management System</h1>
      <p>Track your expenses, generate reports, and stay on top of your finances!</p>
      <div style={styles.buttonContainer}>
        <Link to="/add-expense" style={styles.button}>
          Add Expense
        </Link>
        <Link to="/view-expenses" style={styles.button}>
          View Expenses
        </Link>
        <Link to="/reports" style={styles.button}>
          Reports
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  button: {
    display: "inline-block",
    margin: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease",
  },
};

export default HomePage;
