import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ExpenseDetails({ loggedInUserId }) {
  const { id } = useParams(); // Retrieve `expense_id` from the route parameter
  const [expense, setExpense] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loggedInUserId) {
      setMessage("User ID is missing. Please log in.");
      return;
    }

    const fetchExpense = async () => {
      setLoading(true);
      setMessage("");
      try {
        // Use both expense_id and user_id to fetch details for a single expense
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/showExpenses?user_id=${loggedInUserId}&expense_id=${id}`
        );

        if (!response.ok) {
          const errorText = await response.text();
          setMessage(`Error: ${errorText}`);
          return;
        }

        const data = await response.json();
        if (data.length === 0) {
          setMessage("Expense not found.");
        } else {
          setExpense(data[0]); // Use the first (and only) result
        }
      } catch (error) {
        console.error("Error fetching expense:", error);
        setMessage("An error occurred while fetching the expense.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id, loggedInUserId]);

  if (loading) return <p>Loading...</p>;
  if (message) return <p>{message}</p>;
  if (!expense) return <p>Expense not found.</p>;

  return (
    <div style={styles.container}>
      <h2>Expense Details</h2>
      <p>
        <strong>Amount:</strong> ${expense.amount.toFixed(2)}
      </p>
      <p>
        <strong>Category:</strong> {expense.category_id}
      </p>
      <p>
        <strong>Date:</strong> {new Date(expense.datetime).toLocaleString()}
      </p>
      <p>
        <strong>Description:</strong> {expense.description}
      </p>
      {expense.receipt && (
        <p>
          <strong>Receipt:</strong>{" "}
          <a href={expense.receipt} target="_blank" rel="noopener noreferrer">
            View Receipt
          </a>
        </p>
      )}
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
};

export default ExpenseDetails;
