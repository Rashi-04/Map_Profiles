import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const profiles = [
    { id: 1, name: "John Doe", description: "Software Engineer", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", description: "Product Manager", email: "jane.smith@example.com" },
    { id: 3, name: "Alice Johnson", description: "UX Designer", email: "alice.johnson@example.com" },
  ];

  const profile = profiles.find((p) => p.id === parseInt(id));
  const [formData, setFormData] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save logic (e.g., API call) would go here.
    alert("Profile updated successfully!");
    navigate(`/profile/${id}`);
  };

  if (!profile) {
    return <p>Profile not found</p>;
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            style={{ marginLeft: "10px", padding: "5px", width: "300px", height: "100px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>
      <button onClick={handleSave} style={{ padding: "10px" }}>
        Save
      </button>
      <button onClick={() => navigate(`/profile/${id}`)} style={{ padding: "10px", marginLeft: "10px" }}>
        Cancel
      </button>
    </div>
  );
};

export default EditProfilePage;
