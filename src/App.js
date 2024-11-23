import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseDetails from "./components/ExpenseDetails";
import EditExpense from "./components/EditExpense"; // New import
import Analytics from "./components/Analytics";
import LoginCard from "./components/LoginCard";
import HomePage from "./components/HomePage";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  const toggleLogin = () => setShowLogin((prev) => !prev);

  const handleLogin = (userId) => {
    console.log("Logged in user ID:", userId); // Debugging
    setUser(userId); // Set the logged-in user's ID
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null); // Clear user state
  };

  return (
    <Router>
      <div>
        <NavigationMenu
          user={user}
          toggleLogin={toggleLogin}
          onLogout={handleLogout}
        />
        <div style={{ paddingTop: "50px" }}>
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            {/* Pass logged-in user ID to AddExpenseForm */}
            <Route path="/add-expense" element={<AddExpenseForm loggedInUserId={user} />} />
            {/* Pass logged-in user ID to ExpenseList */}
            <Route path="/view-expenses" element={<ExpenseList loggedInUserId={user} />} />
            {/* Edit Expense Route */}
            <Route path="/expenses/:id" element={<EditExpense loggedInUserId={user} />} />


            <Route path="/expenses/:id" element={<ExpenseDetails />} />
            <Route path="/reports" element={<Analytics />} />
          </Routes>
        </div>
        {showLogin && <LoginCard onClose={toggleLogin} onLogin={handleLogin} />}
      </div>
    </Router>
  );
}

export default App;
