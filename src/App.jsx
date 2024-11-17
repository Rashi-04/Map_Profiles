import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProfileListPage from "./pages/ProfileListPage";
import AdminPanel from "./pages/AdminPanel";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Profile List</Link>
        <Link to="/admin">Admin Panel</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProfileListPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/profile/:id" element={<ProfileDetailPage />} />
        <Route path="/profile/:id/edit" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
