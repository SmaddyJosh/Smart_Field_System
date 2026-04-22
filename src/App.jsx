import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';


import Home from './Pages/Home';
import Auth from './Context/AuthContext';
import AdminDashboard from './Components/Admin';
import AgentDashboard from './Components/Agent';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />


          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/agent" element={<AgentDashboard />} />


          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;