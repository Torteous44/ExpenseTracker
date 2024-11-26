import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./styles/EditExpense.css"; // Import the CSS file

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
      form.append("expense_id", expenseData.expense_id);
      form.append("category", formData.category.name || expenseData.category.name);
      form.append("amount", formData.amount || expenseData.amount);
      form.append("description", formData.description || expenseData.description);

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
    <div className="edit-expense-container">
      <h2 className="edit-expense-title">Edit Expense</h2>
      {message && <p className="edit-expense-message">{message}</p>}
      {expenseData && (
        <form onSubmit={handleSubmit} className="edit-expense-form">
<div className="form-group">
  <label>Category:</label>
  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    required
  >
    <option value="" disabled>Select a category</option>
    <option value="1">Groceries</option>
    <option value="2">Restaurants</option>
    <option value="3">Gas</option>
    <option value="4">Public Transit</option>
    <option value="5">Rent</option>
    <option value="6">Mortgage</option>
    <option value="7">Utilities</option>
    <option value="8">Doctor Visits</option>
    <option value="9">Medications</option>
    <option value="10">Health Insurance</option>
    <option value="11">Movies</option>
    <option value="12">Concerts</option>
    <option value="13">Clothing</option>
    <option value="14">Electronics</option>
    <option value="15">Flights</option>
    <option value="16">Hotels</option>
    <option value="17">Tuition</option>
    <option value="18">Books</option>
    <option value="19">Car Insurance</option>
    <option value="20">Home Insurance</option>
    <option value="21">Haircuts</option>
    <option value="22">Cosmetics</option>
    <option value="23">Credit Card Payment</option>
    <option value="24">Loan Payment</option>
    <option value="25">Savings Account Deposit</option>
    <option value="26">Charity Donations</option>
    <option value="27">Miscellaneous</option>
  </select>
</div>

          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date & Time:</label>
            <input
              type="datetime-local"
              name="datetime"
              value={formData.datetime}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Receipt (Optional):</label>
            <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
          </div>
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      )}
    </div>
  );
}

export default EditExpense;
