import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProfileDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const profiles = [
    { id: 1, name: "John Doe", description: "Software Engineer", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", description: "Product Manager", email: "jane.smith@example.com" },
    { id: 3, name: "Alice Johnson", description: "UX Designer", email: "alice.johnson@example.com" },
  ];

  const profile = profiles.find((p) => p.id === parseInt(id));

  if (!profile) {
    return <p>Profile not found</p>;
  }

  return (
    <div>
      <h1>Profile Details</h1>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Description:</strong> {profile.description}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <button
        onClick={() => navigate(`/profile/${profile.id}/edit`)}
        style={{ marginTop: "20px", padding: "10px" }}
      >
        Edit Profile
      </button>
      <button
        onClick={() => navigate("/")}
        style={{ marginTop: "20px", padding: "10px", marginLeft: "10px" }}
      >
        Back to List
      </button>
    </div>
  );
};

export default ProfileDetailPage;
