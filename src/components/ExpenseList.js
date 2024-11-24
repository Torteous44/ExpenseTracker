import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ExpenseList({ loggedInUserId }) {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ category: "", keyword: "", date: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loggedInUserId) {
      setMessage("User ID is missing. Please log in to view expenses.");
      return;
    }

    const fetchExpenses = async () => {
      setLoading(true);
      setMessage("");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/showExpenses?user_id=${loggedInUserId}`
        );

        if (!response.ok) {
          const errorText = await response.text();
          setMessage(`Error: ${errorText}`);
          return;
        }

        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setMessage("An error occurred while fetching expenses.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [loggedInUserId]);

  const handleDelete = async (expenseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/deleteExpense`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: loggedInUserId,
          expense_id: expenseId,
        }),
      });

      if (response.ok) {
        setExpenses(expenses.filter((expense) => expense.expense_id !== expenseId));
        setMessage("Expense successfully deleted.");
      } else {
        const errorText = await response.text();
        setMessage(`Error deleting expense: ${errorText}`);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      setMessage("An error occurred while deleting the expense.");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      filters.category === "" || expense.category_id === filters.category;
    const matchesKeyword =
      filters.keyword === "" ||
      expense.description.toLowerCase().includes(filters.keyword.toLowerCase());
    const matchesDate =
      filters.date === "" || expense.datetime.startsWith(filters.date);
    return matchesCategory && matchesKeyword && matchesDate;
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Expense Tracker</h2>
      {message && <p style={styles.message}>{message}</p>}
      {loading && <p style={styles.loading}>Loading expenses...</p>}
      {!loading && expenses.length > 0 && (
        <>
          <div style={styles.filters}>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              style={styles.filterInput}
            >
              <option value="">All Categories</option>
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
            <input
              type="text"
              name="keyword"
              placeholder="Search by keyword"
              value={filters.keyword}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              style={styles.filterInput}
            />
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
  {filteredExpenses.map((expense) => (
    <tr key={expense.expense_id}>
      <td>${expense.amount.toFixed(2)}</td>
      <td>{expense.category.name}</td>
      <td>{new Date(expense.datetime).toLocaleString()}</td>
      <td>{expense.description}</td>
      <td style={styles.actionCell}>
        <Link
          to={`/expenses/${expense.expense_id}`}
          state={{ expenseData: expense }}
          style={styles.iconButton}
          title="Edit Expense"
        >
          ✏️
        </Link>
        <button
          onClick={() => handleDelete(expense.expense_id)}
          style={styles.iconButton}
          title="Delete Expense"
        >
          🗑️
        </button>
        {expense.receipt?.url ? (
          <a
            href={expense.receipt.url}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.iconButton}
            title="View Receipt"
          >
            📄
          </a>
        ) : (
          <div style={styles.placeholderButton} title="No Receipt Available"></div>
        )}
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </>
      )}
      {!loading && expenses.length === 0 && (
        <p style={styles.noData}>No expenses found.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
    fontSize: "24px",
    marginBottom: "20px",
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "10px",
  },
  filterInput: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    flex: "1",
    maxWidth: "30%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
  },
  actionCell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px", // Spacing between buttons
  },
  iconButton: {
    width: "40px", // Fixed width
    height: "40px", // Fixed height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ddd", // Border for uniformity
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  placeholderButton: {
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px dashed #ccc", // Dashed border for placeholders
    borderRadius: "4px",
    backgroundColor: "#f1f1f1",
  },
  icon: {
    fontSize: "20px",
    color: "#007bff",
  },
  noData: {
    textAlign: "center",
    color: "#555",
  },
  message: {
    color: "red",
    textAlign: "center",
    marginBottom: "15px",
  },
  loading: {
    textAlign: "center",
    color: "#007bff",
    fontWeight: "bold",
  },
};

export default ExpenseList;
