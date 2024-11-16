import React from "react";
import { Link } from "react-router-dom";

function NavigationMenu() {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/add-expense" style={styles.navLink}>
            Add Expense
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/view-expenses" style={styles.navLink}>
            View Expenses
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/reports" style={styles.navLink}>
            Reports
          </Link>
        </li>
        <li style={styles.navItem}>
          <button style={styles.signInButton}>Sign In</button>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#007bff",
    padding: "10px",
  },
  navList: {
    display: "flex",
    justifyContent: "space-around",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: "0 10px",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
  signInButton: {
    backgroundColor: "white",
    color: "#007bff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default NavigationMenu;
