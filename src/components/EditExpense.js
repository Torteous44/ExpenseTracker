import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function EditExpense({ onUpdate }) {
  const location = useLocation();
  const expenseData = location.state?.expenseData;

  const [formData, setFormData] = useState({
    category: expenseData?.category || "",
    amount: expenseData?.amount || "",
    datetime: expenseData?.datetime || "",
    description: expenseData?.description || "",
  });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!expenseData) {
      setMessage("Expense data is missing. Please go back and try again.");
    }
  }, [expenseData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
      setMessage("Invalid file type. Only JPEG, PNG, and PDF files are allowed.");
      return;
    }
    setReceipt(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!expenseData?.expense_id) {
      setMessage("Unable to update: missing expense ID.");
      setLoading(false);
      return;
    }

    try {
      const form = new FormData();
      form.append("expense_id", expenseData.expense_id); // Required
      form.append("category", formData.category.name || expenseData.category.name); // Required
      form.append("amount", formData.amount || expenseData.amount); // Required
      form.append("description", formData.description || expenseData.description); // Required

      // Optional fields
      if (formData.datetime) {
        form.append("datetime", formData.datetime);
      }
      if (receipt) {
        form.append("receipt", receipt);
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/editExpense`, {
        method: "PUT",
        body: form,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("Expense updated successfully!");
        console.log("Updated Expense:", result);

        // Optionally, call an onUpdate function or navigate back
        if (onUpdate) {
          onUpdate(result);
        }
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error editing expense:", error);
      setMessage("An error occurred while editing the expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Edit Expense</h2>
      {message && <p style={styles.message}>{message}</p>}
      {expenseData && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category.name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Date & Time:</label>
            <input
              type="datetime-local"
              name="datetime"
              value={formData.datetime}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Receipt (Optional):</label>
            <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
          </div>
          <button type="submit" disabled={loading} style={styles.submitButton}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    color: "red",
  },
};

export default EditExpense;
