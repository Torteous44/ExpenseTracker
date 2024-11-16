import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseDetails from "./components/ExpenseDetails";
import Analytics from "./components/Analytics";

function App() {
  return (
    <Router>
      <div>
        <NavigationMenu />
        <Routes>
          {/* Route for Add Expense */}
          <Route path="/add-expense" element={<AddExpenseForm />} />

          {/* Route for View Expenses */}
          <Route path="/view-expenses" element={<ExpenseList />} />

          {/* Route for Expense Details */}
          <Route path="/expenses/:id" element={<ExpenseDetails />} />

          {/* Placeholder route for Reports */}
          <Route path="/reports" element={<h2>Reports Page</h2>} />
          
          <Route path="/reports" element={<Analytics />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
