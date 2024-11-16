import React from "react";
import { Bar, Pie } from "react-chartjs-2";

function Analytics() {
  // Simulated expense data (replace with backend API data later)
  const expenses = [
    { amount: 100, category: "Travel", date: "2024-11-15" },
    { amount: 50, category: "Meals", date: "2024-11-14" },
    { amount: 30, category: "Supplies", date: "2024-11-13" },
    { amount: 200, category: "Travel", date: "2024-11-10" },
    { amount: 75, category: "Meals", date: "2024-11-09" },
  ];

  // Calculate totals and summaries
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  // Prepare data for charts
  const barData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Total Amount by Category",
        data: Object.values(categoryTotals),
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
      },
    ],
  };

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h2>Analytics</h2>

      {/* Summary Cards */}
      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Total Expenses</h3>
          <p>${totalAmount}</p>
        </div>
        <div style={styles.card}>
          <h3>Most Frequent Category</h3>
          <p>
            {
              Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0][0]
            }
          </p>
        </div>
      </div>

      {/* Bar Chart */}
      <div style={styles.chart}>
        <h3>Bar Chart: Total Amount by Category</h3>
        <Bar data={barData} />
      </div>

      {/* Pie Chart */}
      <div style={styles.chart}>
        <h3>Pie Chart: Expense Distribution</h3>
        <Pie data={pieData} />
      </div>
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
  cards: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  card: {
    flex: 1,
    margin: "0 10px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  chart: {
    marginTop: "30px",
  },
};

export default Analytics;
