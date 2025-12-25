import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import AdminNavbar from "../components/AdminNavbar";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const admin = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8081/api/complaints/admin/${admin.id}`)
      .then(res => setComplaints(res.data));
  }, []);

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:8081/api/complaints/${id}/status`,
      null,
      { params: { status } }
    ).then(res => {
      setComplaints(prev =>
        prev.map(c => c.id === id ? res.data : c)
      );
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
    <AdminNavbar></AdminNavbar>
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        
      </div>

      <div className="admin-grid">
      {complaints.map(c => (
  <details key={c.id} className="admin-card">
    <summary>
      <strong>{c.title}</strong>
      <span className={`status ${c.status.toLowerCase()}`}>{c.status}</span>
    </summary>

    <p>{c.description}</p>

    <div className="actions">
      <button className="resolve" onClick={() => updateStatus(c.id, "RESOLVED")}>Resolve</button>
      <button className="reject" onClick={() => updateStatus(c.id, "REJECTED")}>Reject</button>
    </div>
  </details>
))}
      </div>
    </div>

    </>
  );
}


export default AdminDashboard;
