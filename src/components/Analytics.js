import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function Analytics() {
  // Example data
  const expenses = [
    { amount: 100, category: "Travel" },
    { amount: 50, category: "Meals" },
    { amount: 30, category: "Supplies" },
    { amount: 200, category: "Travel" },
    { amount: 75, category: "Meals" },
  ];

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

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
    <div>
      <h2>Analytics</h2>
      <div>
        <h3>Bar Chart: Total Amount by Category</h3>
        <Bar data={barData} />
      </div>
      <div>
        <h3>Pie Chart: Expense Distribution</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default Analytics;
