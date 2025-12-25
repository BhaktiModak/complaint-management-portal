import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-logo">
        <h2>Admin Panel</h2>
      </div>

      <ul className="navbar-links">
        {/* <li><Link to="/admin-dashboard">Dashboard</Link></li> */}
        <li><button onClick={logout} className="logout-btn">Logout</button></li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
