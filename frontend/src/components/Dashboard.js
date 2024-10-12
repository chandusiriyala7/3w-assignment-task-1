import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import './Dashboard.css';

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user submissions from the backend
    fetch("http://localhost:5000/api/admin/dashboard")
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="dashboard-container"
    >
      <h1 className="dashboard-title">User Submissions</h1>
      <div className="user-list">
        {users.length > 0 ? (
          users.map((user, index) => (
            <motion.div
              key={index}
              className="user-card"
              whileHover={{ scale: 1.05 }}
            >
              <h3>{user.name}</h3>
              <p>{user.socialHandle}</p>
              <div className="image-gallery">
                {user.images.map((image, idx) => {
                  console.log("Image URL:", image); // Log each image URL
                  return <img key={idx} src={image} alt={`User upload ${idx}`} />;
                })}
              </div>
            </motion.div>
          ))
        ) : (
          <p>No submissions found.</p>
        )}
      </div>
    </motion.div>
  );
}

export default Dashboard;
