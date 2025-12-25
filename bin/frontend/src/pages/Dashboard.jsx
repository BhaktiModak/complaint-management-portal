import React from 'react';
import './Dashboard.css';
import Navbar from './Navbar';
import ComplaintList from './ComplaintList';


function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <div className='dashboard-container'>
            <Navbar />
            <h2>Welcome, {user?.name || 'User'}..!</h2>

            <div className="dashboard-content">
                <p>This is your dashboard. You can manage your complaints here.</p>
            </div>
        </div>
    );
}

export default Dashboard;