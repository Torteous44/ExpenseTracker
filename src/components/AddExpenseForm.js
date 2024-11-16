import React, { useState } from "react";

function AddExpenseForm() {
  const [formData, setFormData] = useState({
    amount: "",
    category: "Travel",
    date: "",
    description: "",
    receipt: null,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!formData.amount || !formData.date || !formData.description) {
      setError("Please fill out all mandatory fields.");
      return;
    }
    if (
      formData.receipt &&
      !["image/jpeg", "image/png", "application/pdf"].includes(
        formData.receipt.type
      )
    ) {
      setError("Invalid file type. Only JPEG, PNG, or PDF are allowed.");
      return;
    }

    setError(""); // Clear error

    // Log the form data to the console (Replace with API call in real app)
    console.log("Form submitted:", formData);

    // Reset the form
    setFormData({
      amount: "",
      category: "Travel",
      date: "",
      description: "",
      receipt: null,
    });
  };

  return (
    <div style={styles.container}>
      <h2>Add Expense</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="Travel">Travel</option>
            <option value="Meals">Meals</option>
            <option value="Supplies">Supplies</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={styles.textarea}
          ></textarea>
        </div>

        <div style={styles.formGroup}>
          <label>Upload Receipt:</label>
          <input
            type="file"
            name="receipt"
            onChange={handleChange}
            accept="image/jpeg, image/png, application/pdf"
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Add Expense
        </button>
      </form>
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
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    height: "80px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default AddExpenseForm;
