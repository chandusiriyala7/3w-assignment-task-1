import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import UserSubmissionForm from "./components/UserSubmissionForm";
import Dashboard from "./components/Dashboard";

function App() {
  const isAdminAuthenticated = () => {
    // Check if admin token exists in localStorage (to check if logged in)
    return !!localStorage.getItem("adminToken");
  };

  return (
    <Router>
      <Routes>
        {/* Route for user submission form */}
        <Route path="/" element={<UserSubmissionForm />} />

        {/* Route for admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected route for admin dashboard */}
        <Route
          path="/admin/dashboard"
          element={isAdminAuthenticated() ? <Dashboard /> : <Dashboard /> /*<Navigate to="/admin/dashboard" /> */}
        />
      </Routes>
    </Router>
  );
}

export default App;
