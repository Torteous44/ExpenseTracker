import React, { useState } from "react";

function AddExpenseForm({ loggedInUserId }) {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    datetime: "",
    description: "",
  });
  const [receipt, setReceipt] = useState(null); // For file uploads
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(null); // Success/error messages

  const categories = [
    "Groceries",
    "Restaurants",
    "Gas",
    "Public Transit",
    "Rent",
    "Mortgage",
    "Utilities",
    "Doctor Visits",
    "Medications",
    "Health Insurance",
    "Movies",
    "Concerts",
    "Clothing",
    "Electronics",
    "Flights",
    "Hotels",
    "Tuition",
    "Books",
    "Car Insurance",
    "Home Insurance",
    "Haircuts",
    "Cosmetics",
    "Credit Card Payment",
    "Loan Payment",
    "Savings Account Deposit",
    "Charity Donations",
    "Miscellaneous",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Validate file type
    if (file && !["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
      setMessage("Invalid file type. Only JPEG, PNG, and PDF files are allowed.");
      setReceipt(null);
      return;
    }
    setMessage(null); // Clear error if file is valid
    setReceipt(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    console.log("Submitting with User ID:", loggedInUserId);

    if (!loggedInUserId) {
      setMessage("User ID is missing. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const form = new FormData();
      form.append("user_id", loggedInUserId); // Add user_id to FormData
      form.append("category", formData.category);
      form.append("amount", formData.amount);
      form.append("datetime", formData.datetime);
      form.append("description", formData.description);
      if (receipt) {
        form.append("receipt", receipt);
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/addExpense`, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        const result = await response.text();
        setMessage(result);
        setFormData({
          category: "",
          amount: "",
          datetime: "",
          description: "",
        });
        setReceipt(null);
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error submitting expense:", error);
      setMessage("An error occurred while adding the expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={styles.dropdown}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
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
          <label>Date & Time:</label>
          <input
            type="datetime-local"
            name="datetime"
            value={formData.datetime}
            onChange={handleChange}
            required
            style={styles.input}
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
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Receipt (Optional):</label>
          <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
        </div>
        <button type="submit" disabled={loading} style={styles.submitButton}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
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
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  dropdown: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
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
  },
};

export default AddExpenseForm;
