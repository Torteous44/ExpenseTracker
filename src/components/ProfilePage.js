import React, { useState } from "react";
import "./ProfilePage.css";

const ProfilePage = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.username || "",
    email: user.email || "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simulate saving the data
    setTimeout(() => {
      setMessage("Profile updated successfully!");
      setEditMode(false);
    }, 1000);
  };


  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      {message && <p className="profile-message">{message}</p>}
      <div className="profile-card">
        {editMode ? (
          <form onSubmit={handleFormSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="profile-details">
            <p>
              <strong>Name:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>

          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
