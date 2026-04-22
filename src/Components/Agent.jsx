import React, { useState } from 'react';
import '../css/dashboard.css';

const AgentDashboard = () => {

    const [myFields, setMyFields] = useState([
        { id: 1, name: 'North Plot A', crop: 'Maize', plantedDate: '2026-03-10', stage: 'Growing', status: 'Active' },
        { id: 3, name: 'East Greenhouse', crop: 'Tomatoes', plantedDate: '2026-01-15', stage: 'Harvested', status: 'Completed' },
    ]);

    const [updateStages, setUpdateStages] = useState({});

    const handleStageChange = (id, newStage) => {
        setUpdateStages({ ...updateStages, [id]: newStage });
    };

    const submitUpdate = (id) => {
        const newStage = updateStages[id];
        if (!newStage) return;


        console.log(`Updating field ${id} to stage: ${newStage}`);


        setMyFields(myFields.map(field =>
            field.id === id ? { ...field, stage: newStage, status: newStage === 'Harvested' ? 'Completed' : 'Active' } : field
        ));
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>My Assignments</h1>
                <button className="logout-btn">Log Out</button>
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
                        {myFields.map(field => (
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
                                                onChange={(e) => handleStageChange(field.id, e.target.value)}
                                                defaultValue=""
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