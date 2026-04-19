import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import the pages we created
import Home from './Pages/Home';
import Auth from './Context/AuthContext';
import AdminDashboard from './Components/Admin';
import AgentDashboard from './Components/Agent';

// These are placeholders for the dashboards you'll build next!

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />

          {/* Protected Routes (You will add logic later to ensure only logged-in users access these) */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/agent" element={<AgentDashboard />} />

          {/* Fallback route - if someone types a random URL, send them home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;