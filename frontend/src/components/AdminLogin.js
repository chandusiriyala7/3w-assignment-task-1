import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import './AdminLogin.css'; // Import CSS for styling

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if both fields are non-empty
    if (username && password) {
      // Simulate storing token in localStorage
      localStorage.setItem("adminToken", "dummyToken"); // Replace with an actual token if needed
      alert("Login Successful");
      navigate("/admin/dashboard"); // Redirect to the dashboard
    } else {
      alert("Please enter both username and password");
    }
  };

  // Handle navigation back to user submission form
  const handleBackToUserForm = () => {
    navigate("/"); // Redirect to user submission form
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Admin Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <motion.button
          type="submit"
          className="login-button"
          whileHover={{ scale: 1.05 }} // Scale effect on hover
          whileTap={{ scale: 0.95 }} // Scale effect on click
        >
          Login
        </motion.button>
        
        <p className="auth-note">
          Note: Authentication isn't done for admin login for easier view of dashboard.
        </p>

        <motion.button
          type="button"
          className="back-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBackToUserForm}
        >
          Back to User Submission Form
        </motion.button>
      </form>
    </motion.div>
  );
}

export default AdminLogin;
