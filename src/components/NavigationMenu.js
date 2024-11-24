import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function NavigationMenu({ toggleLogin, toggleSignUp, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

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
      <div style={styles.navContent}>
        <div style={styles.logoContainer}>
          <Link to="/" style={styles.logo}>
            ExpenseManager
          </Link>
        </div>
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
              {user ? `Hello, ${user}` : "Sign In / Sign Up"}
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
            {!user && menuOpen && (
              <ul style={styles.dropdownMenu}>
                <li onClick={toggleLogin} style={styles.dropdownItem}>
                  Log In
                </li>
                <li onClick={toggleSignUp} style={styles.dropdownItem}>
                  Sign Up
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: "0",
    width: "100%",
    zIndex: "1000",
    backgroundColor: "#007bff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  navContent: {
    maxWidth: "1200px", // Center content within the nav
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px", // Add padding for responsiveness
    height: "60px",
  },
  logoContainer: {
    flexShrink: "0",
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
  },
  navList: {
    display: "flex",
    alignItems: "center",
    margin: "0",
    padding: "0",
    listStyleType: "none",
    gap: "20px", // Add spacing between links
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    transition: "color 0.3s ease",
  },
  signInButton: {
    backgroundColor: "white",
    color: "#007bff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  },
  userContainer: {
    position: "relative",
  },
  dropdownMenu: {
    position: "absolute",
    top: "50px",
    right: "0",
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px 0",
    listStyleType: "none",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: "1001",
    minWidth: "200px",
  },
  dropdownItem: {
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#007bff",
    backgroundColor: "white",
    textAlign: "left",
    borderBottom: "1px solid #eee",
    transition: "background-color 0.3s ease",
  },
};

export default NavigationMenu;
