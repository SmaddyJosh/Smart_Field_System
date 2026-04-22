import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/dashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState([]);
    const [agents, setAgents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newField, setNewField] = useState({ name: '', crop: '', agent_id: '' });

    const fetchFields = () => {
        fetch('http://localhost:5000/api/fields')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setFields(data);
                else console.error("Backend error:", data);
            })
            .catch(err => console.error('Error fetching fields:', err));
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/auth');
            return;
        }

        fetchFields();
        fetch('http://localhost:5000/api/agents')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setAgents(data);
            })
            .catch(err => console.error('Error fetching agents:', err));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        navigate('/auth');
    };

    const handleAddField = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/fields', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newField)
            });
            if (res.ok) {
                setShowModal(false);
                setNewField({ name: '', crop: '', agent_id: '' });
                fetchFields();
            } else {
                console.error("Failed to add field");
            }
        } catch (err) {
            console.error("Error adding field:", err);
        }
    };

    const totalFields = fields.length;
    const activeFields = fields.filter(f => f.status === 'Active').length;
    const riskFields = fields.filter(f => f.status === 'At Risk').length;
    const completedFields = fields.filter(f => f.status === 'Completed').length;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Coordinator Dashboard</h1>
                <button className="logout-btn" onClick={handleLogout}>Log Out</button>
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
                <button className="primary-btn" onClick={() => setShowModal(true)}>+ Add New Field</button>
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
                                <td>{field.agent || 'Unassigned'}</td>
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

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add New Field</h3>
                        <form className="modal-form" onSubmit={handleAddField}>
                            <div className="form-group">
                                <label>Field Name</label>
                                <input 
                                    type="text" 
                                    value={newField.name} 
                                    onChange={e => setNewField({...newField, name: e.target.value})} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Crop</label>
                                <input 
                                    type="text" 
                                    value={newField.crop} 
                                    onChange={e => setNewField({...newField, crop: e.target.value})} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Assign Agent</label>
                                <select 
                                    value={newField.agent_id} 
                                    onChange={e => setNewField({...newField, agent_id: e.target.value})}
                                >
                                    <option value="">-- Select an Agent --</option>
                                    {agents.map(agent => (
                                        <option key={agent.id} value={agent.id}>{agent.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="primary-btn">Save Field</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard