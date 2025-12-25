// src/components/ComplaintForm.jsx
import React, { useState } from 'react';
import './ComplaintForm.css';

function ComplaintForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ title: '', description: '' });
    };

    return (
        <form className="complaint-form" onSubmit={handleSubmit}>
            <h3>Submit a Complaint</h3>
            <input
                type="text"
                name="title"
                placeholder="Complaint Title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Complaint Description"
                value={formData.description}
                onChange={handleChange}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default ComplaintForm;
