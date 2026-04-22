import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';

const AdminDashboard = () => {
    const [fields, setFields] = useState([]);

    useEffect(() => {

        fetch('http://localhost:5000/api/fields')
            .then(res => res.json())
            .then(data => {

                if (Array.isArray(data)) {
                    setFields(data);
                } else {
                    console.error("Backend returned an error instead of an array:", data);
                }
            })
            .catch(err => console.error('Error fetching fields:', err));
    }, []);


    const totalFields = fields.length;
    const activeFields = fields.filter(f => f.status === 'Active').length;
    const riskFields = fields.filter(f => f.status === 'At Risk').length;
    const completedFields = fields.filter(f => f.status === 'Completed').length;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Coordinator Dashboard</h1>
                <button className="logout-btn">Log Out</button>
            </header>


            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-title">Total Fields</div>
                    <div className="stat-value">{totalFields}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Active</div>
                    <div className="stat-value" style={{ color: '#2E7D32' }}>{activeFields}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">At Risk</div>
                    <div className="stat-value" style={{ color: '#C62828' }}>{riskFields}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Completed</div>
                    <div className="stat-value" style={{ color: '#1565C0' }}>{completedFields}</div>
                </div>
            </div>


            <div className="dashboard-header" style={{ marginTop: '2rem' }}>
                <h2>All Fields</h2>
                <button className="primary-btn">+ Add New Field</button>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Field Name</th>
                            <th>Crop</th>
                            <th>Assigned Agent</th>
                            <th>Current Stage</th>
                            <th>System Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map(field => (
                            <tr key={field.id}>
                                <td><strong>{field.name}</strong></td>
                                <td>{field.crop}</td>
                                <td>{field.agent}</td>
                                <td>{field.stage}</td>
                                <td>
                                    <span className={`status-badge status-${field.status.toLowerCase().replace(' ', '')}`}>
                                        {field.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;