import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ComplaintPage from "./pages/ComplaintPage";


function App() {
  const [user, setUser] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored) return null;
  
    return {
      ...stored,
      role: stored.role.toUpperCase()   // 🔥 THIS LINE FIXES EVERYTHING
    };
  });
  

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Register />} />

        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        <Route
          path="/dashboard"
          element={
            user && user.role === "user"
              ? <Dashboard />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            user && user.role === "ADMIN"
              ? <AdminDashboard />
              : <Navigate to="/login" replace />
          }
        />

        <Route path="/complaints" element={<ComplaintPage />} />
    

      </Routes>
    </BrowserRouter>
  );
}

export default App;
