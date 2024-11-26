import React, { useState } from "react";
import "./AddExpenseForm.css"; // Create and import the CSS file

function AddExpenseForm({ loggedInUserId }) {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    datetime: "",
    description: "",
  });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

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
    if (file && !["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
      setMessage("Invalid file type. Only JPEG, PNG, and PDF files are allowed.");
      setReceipt(null);
      return;
    }
    setMessage(null);
    setReceipt(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
  
    if (!loggedInUserId) {
      setMessage("User ID is missing. Please log in again.");
      setLoading(false);
      return;
    }
  
    try {
      const form = new FormData();
      form.append("user_id", loggedInUserId);
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
        await response.text(); // Read and discard if unused
        setMessage("Expense added successfully!");
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
    <div className="form-container">
      <h2 className="form-title">Add Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label className="form-label">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="form-dropdown"
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
        <div className="form-group">
          <label className="form-label">Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date & Time:</label>
          <input
            type="datetime-local"
            name="datetime"
            value={formData.datetime}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Enter description"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Receipt (Optional):</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="form-file-input"
          />
        </div>
        <button type="submit" disabled={loading} className="form-submit-button">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
}

export default AddExpenseForm;
