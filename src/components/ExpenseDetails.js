import React from "react";
import { useParams } from "react-router-dom";

function ExpenseDetails() {
  // Simulated data (replace with backend/API call in real application)
  const expenses = [
    {
      id: 1,
      amount: 100,
      category: "Travel",
      date: "2024-11-15",
      description: "Flight tickets",
      receiptUrl: "https://via.placeholder.com/600x400", // Sample image URL
    },
    {
      id: 2,
      amount: 50,
      category: "Meals",
      date: "2024-11-14",
      description: "Lunch meeting",
      receiptUrl: "https://via.placeholder.com/600x400", // Sample image URL
    },
  ];

  // Get the expense ID from the URL
  const { id } = useParams();

  // Find the expense by ID
  const expense = expenses.find((expense) => expense.id === parseInt(id));

  // If no expense is found, return an error message
  if (!expense) {
    return <div style={styles.container}>Expense not found.</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Expense Details</h2>
      <div style={styles.details}>
        <p><strong>Amount:</strong> ${expense.amount}</p>
        <p><strong>Category:</strong> {expense.category}</p>
        <p><strong>Date:</strong> {expense.date}</p>
        <p><strong>Description:</strong> {expense.description}</p>
      </div>
      <div>
        <h3>Receipt:</h3>
        <div style={styles.receiptViewer}>
          {expense.receiptUrl.endsWith(".pdf") ? (
            <iframe
              src={expense.receiptUrl}
              title="Receipt Viewer"
              style={styles.iframe}
            ></iframe>
          ) : (
            <img
              src={expense.receiptUrl}
              alt="Receipt"
              style={styles.image}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  details: {
    marginBottom: "20px",
  },
  receiptViewer: {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
  },
  iframe: {
    width: "100%",
    height: "400px",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
  },
};

export default ExpenseDetails;
