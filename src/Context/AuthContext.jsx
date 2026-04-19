import React, { useState } from 'react';
import '../css/auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'agent' // Default role for registration
    });

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(isLogin ? "Logging in..." : "Registering...", formData);
        // Add your API call here
    };

    return (
        <div className="auth-container">
            <div className="auth-logo-wrapper">
                {/* Simple SVG Sprout/Farm Logo */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22v-6" /><path d="M12 8V2" /><path d="M4 10a8 8 0 0 1 16 0" />
                </svg>
                <h1 className="auth-brand">MULTIFARM</h1>
            </div>

            <div className="auth-card">
                <div className="auth-header">
                    <h2>{isLogin ? 'Log In' : 'Create Account'}</h2>
                    <button type="button" onClick={toggleAuthMode} className="auth-toggle-btn">
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Your email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Your password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label>Select Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="role-select">
                                <option value="agent">Field Agent</option>
                                <option value="admin">Coordinator (Admin)</option>
                            </select>
                        </div>
                    )}

                    <button type="submit" className="auth-submit-btn">
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </form>

                {isLogin && (
                    <div className="auth-footer-links">
                        <a href="#forgot" className="forgot-password">I forgot my password</a>
                    </div>
                )}
            </div>

            <div className="auth-legal">
                <span>© Multifarm 2026</span>
                <div>
                    <a href="#terms">Terms of use</a>
                    <a href="#privacy">Privacy Policy</a>
                </div>
            </div>
        </div>
    );
};

export default Auth;