import React, { useState } from 'react';
import '../css/dashboard.css';

const AdminDashboard = () => {
    // Mock data - replace with a fetch call to your backend later
    const [fields] = useState([
        { id: 1, name: 'North Plot A', crop: 'Maize', agent: 'John Doe', stage: 'Growing', status: 'Active' },
        { id: 2, name: 'South Valley', crop: 'Wheat', agent: 'Jane Smith', stage: 'Planted', status: 'At Risk' },
        { id: 3, name: 'East Greenhouse', crop: 'Tomatoes', agent: 'John Doe', stage: 'Harvested', status: 'Completed' },
    ]);

    // Calculate summaries dynamically
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

            {/* Summary Cards */}
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

            {/* Fields Data Table */}
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