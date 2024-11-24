import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import EditExpense from "./components/EditExpense";
import Analytics from "./components/Analytics";
import LoginCard from "./components/LoginCard";
import SignUpCard from "./components/SignUpCard";
import HomePage from "./components/HomePage";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);

  // Toggle Login Modal
  const toggleLogin = () => setShowLogin((prev) => !prev);

  // Toggle SignUp Modal
  const toggleSignUp = () => setShowSignUp((prev) => !prev);

  // Handle Login Event
  const handleLogin = (loggedInUser) => {
    console.log("Logged in user:", loggedInUser);
    setUser(loggedInUser); // Expected structure: { username, user_id }
    setShowLogin(false);
  };

  // Handle Sign-Up Event
  const handleSignUp = (newUser) => {
    console.log("Signed up user:", newUser);
    setUser(newUser); // Expected structure: { username, user_id }
    setShowSignUp(false);
  };

  // Handle Logout Event
  const handleLogout = () => {
    console.log("User logged out.");
    setUser(null);
  };

  return (
    <Router>
      <div>
        {/* Navigation Menu */}
        <NavigationMenu
          user={user?.username || null} // Pass only the username
          toggleLogin={toggleLogin}
          onLogout={handleLogout}
          toggleSignUp={toggleSignUp}
        />

        <div style={{ paddingTop: "50px" }}>
          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  user={user}
                  toggleSignUp={toggleSignUp} // Pass sign-up toggle to open modal
                />
              }
            />
            <Route
              path="/add-expense"
              element={
                <AddExpenseForm
                  loggedInUserId={user?.user_id || null} // Pass user ID if logged in
                />
              }
            />
            <Route
              path="/view-expenses"
              element={
                <ExpenseList
                  loggedInUserId={user?.user_id || null} // Pass user ID if logged in
                />
              }
            />
            <Route
              path="/expenses/:id"
              element={<EditExpense />} // Edit Expense expects state to be passed with expense data
            />
            <Route
              path="/reports"
              element={
                <Analytics
                  loggedInUserId={user?.user_id || null} // Pass user ID if logged in
                />
              }
            />
          </Routes>
        </div>

        {/* Modals */}
        {showLogin && <LoginCard onClose={toggleLogin} onLogin={handleLogin} />}
        {showSignUp && <SignUpCard onClose={toggleSignUp} onSignUp={handleSignUp} />}
      </div>
    </Router>
  );
}

export default App;
