import React, { useState } from "react";
import { motion } from "framer-motion";
import './UserSubmissionForm.css';

function UserSubmissionForm() {
  const [name, setName] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("socialHandle", socialHandle);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch("http://localhost:5000/api/users/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert("Submission Successful!");
      console.log(data); // Optional: log response data

    } catch (error) {
      console.error("Error during submission:", error);
      alert("Submission failed! Please try again.");
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="form-container"
    >
      <form className="submission-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Submit Your Details</h1>
        <input
          type="text"
          placeholder="Name"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Social Media Handle"
          className="input-field"
          value={socialHandle}
          onChange={(e) => setSocialHandle(e.target.value)}
        />
        <input
          type="file"
          multiple
          className="file-input"
          onChange={handleImageUpload}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="submit-btn"
          type="submit"
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
}

export default UserSubmissionForm;
