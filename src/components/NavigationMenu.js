import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function NavigationMenu({ toggleLogin, user, onLogout , loggedInUserID }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown menu

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li>
          <Link to="/" style={styles.navLink}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/add-expense" style={styles.navLink}>
            Add Expense
          </Link>
        </li>
        <li>
          <Link to="/view-expenses" style={styles.navLink}>
            View Expenses
          </Link>
        </li>
        <li>
          <Link to="/reports" style={styles.navLink}>
            Reports
          </Link>
        </li>
        <li style={styles.userContainer} ref={dropdownRef}>
          <button
            onClick={user ? toggleMenu : toggleLogin}
            style={styles.signInButton}
          >
            {user ? `Hello, ${user}` : "Sign In"}
          </button>
          {menuOpen && user && (
            <ul style={styles.dropdownMenu}>
              <li onClick={onLogout} style={styles.dropdownItem}>
                Log Out
              </li>
              <li style={styles.dropdownItem}>
                <Link to="/profile" style={styles.navLink}>
                  View Profile
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    margin: "0",
    padding: "0",
    position: "fixed",
    top: "0",
    width: "100%",
    zIndex: "1000",
    backgroundColor: "#007bff",
    height: "50px",
    display: "flex",
    alignItems: "center",
  },
  navList: {
    display: "flex",
    justifyContent: "space-around",
    margin: "0",
    padding: "0",
    listStyleType: "none",
    width: "100%",
    alignItems: "center",
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
  userContainer: {
    position: "relative",
  },
  dropdownMenu: {
    position: "absolute",
    top: "40px",
    right: "0",
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "5px 0", // Reduced padding
    listStyleType: "none",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: "1001",
    minWidth: "150px", // Minimum width for the dropdown
  },
  dropdownItem: {
    padding: "8px 15px", // Compact padding for items
    cursor: "pointer",
    fontSize: "14px", // Slightly smaller font size
    color: "#007bff",
    backgroundColor: "white",
    textAlign: "left",
    borderBottom: "1px solid #eee", // Divider between items
  },
  dropdownItemHover: {
    backgroundColor: "#f1f1f1", // Hover background color
  },
};

export default NavigationMenu;
