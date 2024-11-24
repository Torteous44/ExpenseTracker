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
      setMessage("User ID is missing. Please log in to view analytics.");
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
    <div style={styles.container}>
      <h2 style={styles.title}>Expense Analytics</h2>
      {message && <p style={styles.message}>{message}</p>}
      {loading && <p style={styles.loading}>Loading analytics...</p>}
      {!loading && Object.keys(categoryTotals).length > 0 && (
        <div style={styles.chartWrapper}>
          <div style={styles.chartContainer}>
            <h3 style={styles.chartTitle}>Total Amount by Category (Bar Chart)</h3>
            <div style={styles.chart}>
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
          <div style={styles.chartContainer}>
            <h3 style={styles.chartTitle}>Expense Distribution (Pie Chart)</h3>
            <div style={styles.chart}>
              <Pie data={pieData} options={chartOptions} />
            </div>
          </div>
          <div style={styles.chartContainer}>
            <h3 style={styles.chartTitle}>Total Expenses Over Time (Line Chart)</h3>
            <div style={styles.chart}>
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}
      {!loading && Object.keys(categoryTotals).length === 0 && (
        <p style={styles.noData}>No expense data available for analytics.</p>
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
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  chartWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  chartContainer: {
    flex: "1 1 calc(50% - 20px)",
    maxWidth: "45%",
    height: "400px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  chart: {
    width: "100%",
    height: "350px",
  },
  chartTitle: {
    fontSize: "18px",
    marginBottom: "15px",
    color: "#555",
  },
  loading: {
    textAlign: "center",
    color: "#007bff",
    fontWeight: "bold",
  },
  message: {
    color: "red",
    textAlign: "center",
    marginBottom: "15px",
  },
  noData: {
    textAlign: "center",
    color: "#555",
    fontSize: "18px",
  },
};

export default Analytics;
