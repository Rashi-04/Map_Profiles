import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [profiles, setProfiles] = useState([
    { id: 1, name: "John Doe", description: "Software Engineer", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", description: "Product Manager", email: "jane.smith@example.com" },
    { id: 3, name: "Alice Johnson", description: "UX Designer", email: "alice.johnson@example.com" },
  ]);

  const [newProfile, setNewProfile] = useState({ name: "", description: "", email: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProfile = () => {
    if (!newProfile.name || !newProfile.description || !newProfile.email) {
      alert("Please fill in all fields.");
      return;
    }

    const newId = profiles.length ? profiles[profiles.length - 1].id + 1 : 1;
    setProfiles([...profiles, { ...newProfile, id: newId }]);
    setNewProfile({ name: "", description: "", email: "" });
    alert("Profile added successfully!");
  };

  const handleDeleteProfile = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this profile?");
    if (confirmDelete) {
      setProfiles(profiles.filter((profile) => profile.id !== id));
      alert("Profile deleted successfully!");
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search profiles by name or description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
      />

      {/* Add New Profile Form */}
      <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
        <h3>Add New Profile</h3>
        <input
          type="text"
          placeholder="Name"
          value={newProfile.name}
          onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProfile.description}
          onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={newProfile.email}
          onChange={(e) => setNewProfile({ ...newProfile, email: e.target.value })}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={handleAddProfile} style={{ padding: "5px" }}>
          Add Profile
        </button>
      </div>

      {/* Profile List */}
      <div>
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            style={{ margin: "20px", border: "1px solid #ccc", padding: "10px" }}
          >
            <h3>{profile.name}</h3>
            <p>{profile.description}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <button
              onClick={() => navigate(`/profile/${profile.id}`)}
              style={{ marginRight: "10px", padding: "5px" }}
            >
              View Details
            </button>
            <button
              onClick={() => navigate(`/profile/${profile.id}/edit`)}
              style={{ marginRight: "10px", padding: "5px" }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteProfile(profile.id)}
              style={{ padding: "5px", backgroundColor: "red", color: "white" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
