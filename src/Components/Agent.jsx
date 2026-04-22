import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/dashboard.css';

const AgentDashboard = () => {
    const navigate = useNavigate();
    const [myFields, setMyFields] = useState([]);
    const [updateStages, setUpdateStages] = useState({});
    
    // Convert to number for comparison since MySQL returns IDs as numbers
    const userId = Number(localStorage.getItem('userId'));

    const fetchMyFields = () => {
        fetch('http://localhost:5000/api/fields')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // Filter fields to match the logged in agent!
                    const filtered = data.filter(f => f.agent_id === userId);
                    setMyFields(filtered);
                }
            })
            .catch(err => console.error("Error fetching agent fields:", err));
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/auth');
            return;
        }
        fetchMyFields();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        navigate('/auth');
    };

    const handleStageChange = (id, newStage) => {
        setUpdateStages({ ...updateStages, [id]: newStage });
    };

    const submitUpdate = async (id) => {
        const newStage = updateStages[id];
        if (!newStage) return;

        const newStatus = newStage === 'Harvested' ? 'Completed' : 'Active';

        try {
            const res = await fetch(`http://localhost:5000/api/fields/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stage: newStage, status: newStatus })
            });

            if (res.ok) {
                // Clear the dropdown selection and refetch fields to show updated native DB data!
                setUpdateStages({ ...updateStages, [id]: '' });
                fetchMyFields();
            } else {
                console.error("Failed to update field status.");
            }
        } catch (error) {
            console.error("Error submitting update:", error);
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>My Assignments</h1>
                <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-title">Assigned Fields</div>
                    <div className="stat-value">{myFields.length}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Tasks Pending</div>
                    <div className="stat-value">{myFields.filter(f => f.status !== 'Completed').length}</div>
                </div>
            </div>

            <div className="table-container" style={{ marginTop: '2rem' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Field Name</th>
                            <th>Crop</th>
                            <th>Stage</th>
                            <th>Status</th>
                            <th>Action (Update Stage)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myFields.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                                    No fields assigned yet. When your Coordinator assigns you a field, it will appear here.
                                </td>
                            </tr>
                        ) : myFields.map(field => (
                            <tr key={field.id}>
                                <td><strong>{field.name}</strong><br /><small>Planted: {field.plantedDate}</small></td>
                                <td>{field.crop}</td>
                                <td>{field.stage}</td>
                                <td>
                                    <span className={`status-badge status-${field.status.toLowerCase().replace(' ', '')}`}>
                                        {field.status}
                                    </span>
                                </td>
                                <td>
                                    {field.status !== 'Completed' ? (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <select
                                                className="update-select"
                                                value={updateStages[field.id] || ""}
                                                onChange={(e) => handleStageChange(field.id, e.target.value)}
                                            >
                                                <option value="" disabled>Select new stage...</option>
                                                <option value="Planted">Planted</option>
                                                <option value="Growing">Growing</option>
                                                <option value="Ready">Ready</option>
                                                <option value="Harvested">Harvested</option>
                                            </select>
                                            <button
                                                className="primary-btn"
                                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                                onClick={() => submitUpdate(field.id)}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <span style={{ color: '#888' }}>No actions required</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgentDashboard;