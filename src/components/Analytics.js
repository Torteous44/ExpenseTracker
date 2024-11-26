import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import "./styles/Analytics.css"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

function Analytics({ loggedInUserId }) {
  // eslint-disable-next-line no-unused-vars
  const [expenses, setExpenses] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [expenseTimeline, setExpenseTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loggedInUserId) {
      setMessage("Please log in to view analytics.");
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

        // Calculate category totals
        const totals = data.reduce((acc, expense) => {
          const category = expense.category?.name || "Uncategorized";
          acc[category] = (acc[category] || 0) + parseFloat(expense.amount || 0);
          return acc;
        }, {});
        setCategoryTotals(totals);

        // Calculate expenses over time
        const timeline = data.reduce((acc, expense) => {
          const date = new Date(expense.datetime).toISOString().split("T")[0];
          acc[date] = (acc[date] || 0) + parseFloat(expense.amount || 0);
          return acc;
        }, {});

        const sortedTimeline = Object.keys(timeline)
          .sort((a, b) => new Date(a) - new Date(b))
          .map((date) => ({
            date,
            amount: timeline[date],
          }));
        setExpenseTimeline(sortedTimeline);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setMessage("An error occurred while fetching analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [loggedInUserId]);

  const barData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Total Amount by Category",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#007bff",
          "#28a745",
          "#ffc107",
          "#dc3545",
          "#17a2b8",
          "#6c757d",
        ],
      },
    ],
  };

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#007bff",
          "#28a745",
          "#ffc107",
          "#dc3545",
          "#17a2b8",
          "#6c757d",
        ],
      },
    ],
  };

  const lineData = {
    labels: expenseTimeline.map((entry) => entry.date),
    datasets: [
      {
        label: "Total Expenses Over Time",
        data: expenseTimeline.map((entry) => entry.amount),
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            size: 10,
          },
        },
        grid: {
          display: true,
          color: "#e0e0e0",
        },
      },
    },
  };

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">Expense Analytics</h2>
      {message && <p className="message">{message}</p>}
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
      {!loading && Object.keys(categoryTotals).length > 0 && (
        <div className="chart-wrapper">
          <div className="chart-container">
            <h3 className="chart-title">Total Amount by Category (Bar Chart)</h3>
            <div className="chart">
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
          <div className="chart-container">
            <h3 className="chart-title">Expense Distribution (Pie Chart)</h3>
            <div className="chart">
              <Pie data={pieData} options={chartOptions} />
            </div>
          </div>
          <div className="chart-container">
            <h3 className="chart-title">Total Expenses Over Time (Line Chart)</h3>
            <div className="chart">
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}
      {!loading && Object.keys(categoryTotals).length === 0 && (
        <p className="no-data">No expense data available for analytics.</p>
      )}
    </div>
  );
  
}


export default Analytics;
