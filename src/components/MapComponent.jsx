import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet's CSS

const MapComponent = ({ location }) => {
  if (!location) return null;

  const [lat, lng] = location;

  // Ensures the map re-centers when the location changes
  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lng], 13); // Center the map
    }, [lat, lng, map]);
    return null;
  };

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
      className="leaflet-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]}>
        <Popup>Selected Profile Location</Popup>
      </Marker>
      <MapUpdater />
    </MapContainer>
  );
};

export default MapComponent;
