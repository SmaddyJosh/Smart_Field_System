import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/auth.css';

const Auth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'agent'
    });

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setErrorMsg('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);

        const API_BASE = import.meta.env.VITE_API_BASE_URL;
        const url = isLogin ? `${API_BASE}/api/login` : `${API_BASE}/api/register`;

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.message || 'An error occurred during authentication.');
                return;
            }

            // If login is successful, save token
            if (isLogin && data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userRole', data.user.role);
                localStorage.setItem('userId', data.user.id);

                if (data.user.role === 'admin') navigate('/admin');
                else navigate('/agent');
            } else if (!isLogin) {
                // If register successful, auto switch to login
                setIsLogin(true);
                setFormData({ ...formData, password: '' });
                alert("Account created successfully! Please log in.");
            }
        } catch (error) {
            console.error("Auth error:", error);
            setErrorMsg('Unable to connect to the server.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-logo-wrapper">
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

                {errorMsg && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{errorMsg}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <div className="form-group">
                            <label>Your full name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required={!isLogin}
                            />
                        </div>
                    )}

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

                    <button type="submit" className="auth-submit-btn" disabled={isLoading} style={isLoading ? { opacity: 0.7, cursor: 'not-allowed' } : {}}>
                        {isLoading 
                            ? (isLogin ? 'Logging In (Waking Server)...' : 'Creating Account (Waking Server)...') 
                            : (isLogin ? 'Log In' : 'Sign Up')}
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