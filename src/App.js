import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseDetails from "./components/ExpenseDetails";
import Analytics from "./components/Analytics";
import LoginCard from "./components/LoginCard";
import SignUpCard from "./components/SignUpCard"; // Import the SignUpCard component
import HomePage from "./components/HomePage";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false); // Add state for sign-up modal
  const [user, setUser] = useState(null);

  const toggleLogin = () => setShowLogin((prev) => !prev);
  const toggleSignUp = () => setShowSignUp((prev) => !prev); // Add toggle for sign-up modal

  const handleLogin = (userId) => {
    console.log("Logged in user ID:", userId);
    setUser(userId);
    setShowLogin(false);
  };

  const handleSignUp = (userId) => {
    console.log("Signed up user ID:", userId);
    setUser(userId);
    setShowSignUp(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div>
        <NavigationMenu
          user={user}
          toggleLogin={toggleLogin}
          onLogout={handleLogout}
          toggleSignUp={toggleSignUp} // Add sign-up toggle
        />
        <div style={{ paddingTop: "50px" }}>
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/add-expense" element={<AddExpenseForm loggedInUserId={user} />} />
            <Route path="/view-expenses" element={<ExpenseList loggedInUserId={user} />} />
            <Route path="/expenses/:id" element={<ExpenseDetails />} />
            <Route path="/reports" element={<Analytics />} />
          </Routes>
        </div>
        {showLogin && <LoginCard onClose={toggleLogin} onLogin={handleLogin} />}
        {showSignUp && <SignUpCard onClose={toggleSignUp} onSignUp={handleSignUp} />}
      </div>
    </Router>
  );
}

export default App;
