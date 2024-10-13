import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import './Dashboard.css';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Track the selected user
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch user submissions from the backend
    fetch("https://threew-assignment-task-1.onrender.com/api/admin/dashboard")
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`Error: ${res.status} - ${text}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Log the fetched data
        setUsers(data);
      })
      .catch((error) => alert(error.message));
  }, []);

  const handleViewUser = (user) => {
    setSelectedUser(user); // Set the selected user to display details
  };

  const handleBackToList = () => {
    setSelectedUser(null); // Go back to the user list view
  };

  const handleBackToSubmitForm = () => {
    navigate("/"); // Navigate back to the user submission form
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="dashboard-container"
    >
      <h1 className="dashboard-title">User Submissions</h1>

      {selectedUser ? (
        <motion.div
          className="user-details"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button className="back-btn" onClick={handleBackToList}>
            Back to List
          </button>
          <h3>{selectedUser.name}</h3>
          <p>Social Handle:<b> {selectedUser.socialHandle} </b></p>
          <div className="image-gallery">
            {selectedUser.images.map((image, idx) => {
              return (
                <div key={idx} className="image-card">
                  <img
                    src={`https://threew-assignment-task-1.onrender.com/${image}`}
                    alt={`User upload ${idx}`}
                    className="uploaded-image"
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <>
          <ol className="user-list">
            {users.length > 0 ? (
              users.map((user, index) => (
                <motion.li
                  key={index}
                  className="user-card"
                  whileHover={{ scale: 1.05 }}
                >
                  <h2>{index + 1}.</h2>
                  <h3>
                    {user.name}
                  </h3>
                  <button
                    className="view-btn"
                    onClick={() => handleViewUser(user)}
                  >
                    View
                  </button>
                </motion.li>
              ))
            ) : (
              <p>No submissions found.</p>
            )}
          </ol>
          
          {/* Back to User Submission Form Button */}
          <motion.button
            className="back-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackToSubmitForm}
          >
            Back to User Submission Form
          </motion.button>
        </>
      )}
    </motion.div>
  );
}

export default Dashboard;
