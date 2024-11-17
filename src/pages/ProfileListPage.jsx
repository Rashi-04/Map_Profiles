import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";

const ProfileListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState({});
  const navigate = useNavigate();

  const profiles = [
    { id: 1, name: "John Doe", description: "Software Engineer", email: "john.doe@example.com", location: [37.7749, -122.4194] },
    { id: 2, name: "Jane Smith", description: "Product Manager", email: "jane.smith@example.com", location: [34.0522, -118.2437] },
    { id: 3, name: "Alice Johnson", description: "UX Designer", email: "alice.johnson@example.com", location: [40.7128, -74.0060] },
  ];

  const fetchLocationName = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      return data.display_name || "Unknown Location";
    } catch (error) {
      console.error("Error fetching location name:", error);
      return "Unknown Location";
    }
  };

  useEffect(() => {
    const loadLocationNames = async () => {
      const locationPromises = profiles.map(async (profile) => {
        const [lat, lng] = profile.location;
        const locationName = await fetchLocationName(lat, lng);
        return { id: profile.id, locationName };
      });

      const resolvedLocations = await Promise.all(locationPromises);
      const locationMap = resolvedLocations.reduce((acc, loc) => {
        acc[loc.id] = loc.locationName;
        return acc;
      }, {});

      setLocations(locationMap);
    };

    loadLocationNames();
  }, [profiles]);

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewOnMap = (location) => {
    setSelectedLocation(location);
    document.getElementById("mapSection").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <h1>Profile List</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
      />

      {/* Profiles */}
      <div>
        {filteredProfiles.map((profile) => (
          <div key={profile.id} style={{ margin: "20px", border: "1px solid #ccc", padding: "10px" }}>
            <h3>{profile.name}</h3>
            <p>{profile.description}</p>
            <p>
              <strong>Location:</strong> {locations[profile.id] || "Loading..."}
            </p>
            <button
              onClick={() => navigate(`/profile/${profile.id}`)}
              style={{ marginRight: "10px", padding: "5px" }}
            >
              View Details
            </button>
            <button
              onClick={() => handleViewOnMap(profile.location)}
              style={{ padding: "5px", backgroundColor: "#007BFF", color: "white" }}
            >
              View on Map
            </button>
          </div>
        ))}
      </div>

      {/* Map Section */}
      <div
        id="mapSection"
        style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}
      >
        {selectedLocation && (
          <>
            <h3>Map View</h3>
            <MapComponent location={selectedLocation} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileListPage;
