import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import EditExpense from "./components/EditExpense";
import Analytics from "./components/Analytics";
import LoginCard from "./components/LoginCard";
import SignUpCard from "./components/SignUpCard";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleLogin = () => setShowLogin((prev) => !prev);
  const toggleSignUp = () => setShowSignUp((prev) => !prev);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setShowLogin(false);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const handleSignUp = (newUser) => {
    setUser(newUser);
    setShowSignUp(false);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router basename="/ExpenseTracker/">
      <div>
        <NavigationMenu
          user={user?.username || null}
          toggleLogin={toggleLogin}
          onLogout={handleLogout}
          toggleSignUp={toggleSignUp}
        />

        <div style={{ paddingTop: "50px" }}>
          <Routes>
            <Route
              path="/"
              element={<HomePage user={user} toggleSignUp={toggleSignUp} />}
            />
            <Route
              path="/add-expense"
              element={
                <ProtectedRoute user={user}>
                  <AddExpenseForm loggedInUserId={user?.user_id} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-expenses"
              element={
                <ProtectedRoute user={user}>
                  <ExpenseList loggedInUserId={user?.user_id} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expenses/:id"
              element={
                <ProtectedRoute user={user}>
                  <EditExpense />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute user={user}>
                  <Analytics loggedInUserId={user?.user_id} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={<ProfilePage user={user} />}
            />
          </Routes>
        </div>

              {showLogin && (
        <LoginCard
          onClose={() => setShowLogin(false)} // Explicitly close the modal
          onLogin={handleLogin}
        />
      )}

        {showSignUp && <SignUpCard onClose={toggleSignUp} onSignUp={handleSignUp} />}
      </div>
    </Router>
  );
}

export default App;
