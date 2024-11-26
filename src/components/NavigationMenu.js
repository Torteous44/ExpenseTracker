import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/NavigationMenu.css";

function NavigationMenu({ toggleLogin, toggleSignUp, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo-container">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            ExpenseManager
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="menu-icon">&#9776;</span> {/* Hamburger Icon */}
        </button>

        {/* Navigation Links */}
        <ul className={`nav-list ${mobileMenuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" className="nav-link" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/add-expense" className="nav-link" onClick={closeMobileMenu}>
              Add Expense
            </Link>
          </li>
          <li>
            <Link to="/view-expenses" className="nav-link" onClick={closeMobileMenu}>
              View Expenses
            </Link>
          </li>
          <li>
            <Link to="/reports" className="nav-link" onClick={closeMobileMenu}>
              Reports
            </Link>
          </li>
          <li className="dropdown-container">
            <button
              className="sign-in-button"
              onClick={user ? toggleDropdown : toggleLogin}
            >
              {user ? `Hello, ${user}` : "Sign In / Sign Up"}
            </button>
            {dropdownOpen && user && (
  <ul className="dropdown-menu">
    <li>
      <Link
        to="/profile"
        className="dropdown-item"
        onClick={closeMobileMenu}
      >
        View Profile
      </Link>
    </li>
    <li>
      <button
        className="dropdown-item"
        onClick={() => {
          onLogout();
          closeMobileMenu();
        }}
      >
        Sign Out
      </button>
    </li>
  </ul>
)}

          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavigationMenu;
