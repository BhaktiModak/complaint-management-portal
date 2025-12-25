import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Complaint Portal</h2>
      </div>

      <ul className="navbar-links">
        {/* <li><Link to="/dashboard">Dashboard</Link></li> */}
        <li><Link to="/complaints">My Complaints</Link></li>
        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
