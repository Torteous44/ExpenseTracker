import React, { useState } from "react";

function ExpenseList() {
  // Sample data (replace with data fetched from a backend API later)
  const [expenses, setExpenses] = useState([
    { id: 1, amount: 100, category: "Travel", date: "2024-11-15", description: "Flight tickets" },
    { id: 2, amount: 50, category: "Meals", date: "2024-11-14", description: "Lunch meeting" },
    { id: 3, amount: 30, category: "Supplies", date: "2024-11-13", description: "Office supplies" },
  ]);

  const [filters, setFilters] = useState({ category: "", keyword: "", date: "" });

  const handleDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
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
      filters.category === "" || expense.category === filters.category;
    const matchesKeyword =
      filters.keyword === "" ||
      expense.description.toLowerCase().includes(filters.keyword.toLowerCase());
    const matchesDate = filters.date === "" || expense.date === filters.date;
    return matchesCategory && matchesKeyword && matchesDate;
  });

  return (
    <div style={styles.container}>
      <h2>Expense List</h2>
      <div style={styles.filters}>
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          style={styles.filterInput}
        >
          <option value="">All Categories</option>
          <option value="Travel">Travel</option>
          <option value="Meals">Meals</option>
          <option value="Supplies">Supplies</option>
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
            <tr key={expense.id}>
              <td>${expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>
                <button
                  onClick={() => handleDelete(expense.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredExpenses.length === 0 && <p style={styles.noData}>No expenses found.</p>}
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
  deleteButton: {
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  noData: {
    textAlign: "center",
    color: "#555",
  },
};

export default ExpenseList;
