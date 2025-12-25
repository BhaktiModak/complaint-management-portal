import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminComplaintList() {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = () => {
        axios.get("http://localhost:8080/api/complaints/all")
            .then(res => setComplaints(res.data));
    };

    const updateStatus = async (id, status) => {
        await axios.put(`http://localhost:8080/api/complaints/updateStatus/${id}`, { status });
        fetchComplaints(); // refresh
    };

    return (
        <div className="admin-complaints">
            <h3>All Complaints (Admin)</h3>
            {complaints.map(c => (
                <div key={c.id} className="complaint-card">
                    <p><strong>Category:</strong> {c.category}</p>
                    <p><strong>Description:</strong> {c.description}</p>
                    <p><strong>Status:</strong> {c.status}</p>
                    <button onClick={() => updateStatus(c.id, "Solved")}>Mark as Solved</button>
                    <button onClick={() => updateStatus(c.id, "Pending")}>Mark as Pending</button>
                </div>
            ))}
        </div>
    );
}
