import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ExpenseList({ loggedInUserId }) {
  const [expenses, setExpenses] = useState([]); // List of expenses
  const [filters, setFilters] = useState({ category: "", keyword: "", date: "" }); // Filters for the table
  const [message, setMessage] = useState(""); // Error or info messages
  const [loading, setLoading] = useState(false); // Loading state

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
        
        // Log the response for debugging
        console.log("API Response:", response);
    
        if (!response.ok) {
          const errorText = await response.text();
          setMessage(`Error: ${errorText}`);
          return;
        }
    
        const data = await response.json(); // This is where the error occurs
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
      <h2>Expense List</h2>
      {message && <p style={styles.message}>{message}</p>}
      {loading && <p>Loading expenses...</p>}
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
              <option value="1">Travel</option>
              <option value="2">Meals</option>
              <option value="3">Supplies</option>
              {/* Add more categories as needed */}
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
                  <td>{expense.category_id}</td>
                  <td>{new Date(expense.datetime).toLocaleString()}</td>
                  <td>{expense.description}</td>
                  <td>
                  <Link to={`/expenses/${expense.expense_id}`} state={{ expenseData: expense }} style={styles.editButton}>
                    Edit
                  </Link>

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
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  filterInput: {
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px",
    flex: "1",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  editButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "5px 10px",
    borderRadius: "4px",
    textDecoration: "none",
    cursor: "pointer",
  },
  noData: {
    textAlign: "center",
    color: "#555",
  },
  message: {
    color: "red",
    textAlign: "center",
  },
};

export default ExpenseList;
