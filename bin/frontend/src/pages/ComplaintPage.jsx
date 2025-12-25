import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./ComplaintPage.css";

function ComplaintPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: ""
  });

  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = () => {
    axios.get(`http://localhost:8081/api/complaints/user/${user.id}`)
      .then(res => setComplaints(res.data));
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:8081/api/complaints/user/${user.id}`,
        form
      );

      setForm({ title: "", description: "", category: "" });
      fetchComplaints();   // 🔥 auto refresh list

    } catch {
      alert("Failed to submit complaint");
    }
  };

  return (
    <>
      <Navbar />

      <div className="complaint-container">
        <h2>Submit Complaint</h2>

        <form onSubmit={handleSubmit} className="complaint-form">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Complaint Title" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe your issue" required />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
          <button type="submit">Submit Complaint</button>
        </form>
      </div>

      <div className="my-complaints">
  <h2>My Complaints</h2>

  {complaints.length === 0 && <p style={{color:"#9ca3af"}}>No complaints yet.</p>}

  {complaints.map(c => (
    <div key={c.id} className="complaint-row">
      <div className="complaint-info">
        <h4>{c.title}</h4>
        <p>{c.description}</p>
      </div>

      <div className="complaint-meta">
        <span className={`badge ${c.status.toLowerCase()}`}>
          {c.status}
        </span>
      </div>
    </div>
  ))}
</div>

    </>
  );
}

export default ComplaintPage;
