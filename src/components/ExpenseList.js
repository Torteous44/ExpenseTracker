import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/ExpenseList.css";
import useWindowWidth from "../hooks/useWindowWidth";
import Spinner from "../components/Spinner"; 

function ExpenseList({ loggedInUserId }) {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ category: "", keyword: "", date: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const windowWidth = useWindowWidth(); // Get the current screen width
  const isMobile = windowWidth <= 768; // Define a breakpoint for mobile

  useEffect(() => {
    if (!loggedInUserId) {
      setMessage("Please log in to view expenses.");
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
    <div className="expense-list-container">
      <h2 className="expense-list-title">Expense Tracker</h2>
      {message && <p className="message">{message}</p>}
      {loading && <div className="spinner-container"><Spinner /></div>}
      {!loading && expenses.length > 0 && (
        <>
          <div className="filters">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="filter-input"
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
              className="filter-input"
            />
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>
          {isMobile ? (
            // Render cards for mobile
            <div className="expense-card-container">
              {filteredExpenses.map((expense) => (
                <div className="expense-card" key={expense.expense_id}>
                  <div className="card-row">
                    <span className="card-label">Amount:</span>
                    <span>${expense.amount.toFixed(2)}</span>
                  </div>
                  <div className="card-row">
                    <span className="card-label">Category:</span>
                    <span>{expense.category.name}</span>
                  </div>
                  <div className="card-row">
                    <span className="card-label">Date:</span>
                    <span>{new Date(expense.datetime).toLocaleString()}</span>
                  </div>
                  <div className="card-row">
                    <span className="card-label">Description:</span>
                    <span>{expense.description}</span>
                  </div>
                  <div className="action-cell">
                    <Link
                      to={`/expenses/${expense.expense_id}`}
                      state={{ expenseData: expense }}
                      className="icon-button"
                      title="Edit Expense"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(expense.expense_id)}
                      className="icon-button"
                      title="Delete Expense"
                    >
                      🗑️
                    </button>
                    {expense.receipt?.url ? (
                      <a
                        href={expense.receipt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button"
                        title="View Receipt"
                      >
                        📄
                      </a>
                    ) : (
                      <div className="placeholder-button" title="No Receipt Available"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Render table for desktop
            <table className="table">
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
                    <td className="action-cell">
                      <Link
                        to={`/expenses/${expense.expense_id}`}
                        state={{ expenseData: expense }}
                        className="icon-button"
                        title="Edit Expense"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(expense.expense_id)}
                        className="icon-button"
                        title="Delete Expense"
                      >
                        🗑️
                      </button>
                      {expense.receipt?.url ? (
                        <a
                          href={expense.receipt.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon-button"
                          title="View Receipt"
                        >
                          📄
                        </a>
                      ) : (
                        <div className="placeholder-button" title="No Receipt Available"></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      {!loading && expenses.length === 0 && (
        <p className="no-data">No expenses found.</p>
      )}
    </div>
  );
}

export default ExpenseList;
