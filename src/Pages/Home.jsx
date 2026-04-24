import React from 'react';
import '../css/home.css';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';

const Home = () => {
    return (
        <div className="home-container">

            <nav className="navbar">
                <div className="nav-brand">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22v-6" /><path d="M12 8V2" /><path d="M4 10a8 8 0 0 1 16 0" />
                    </svg>
                    <span>MULTIFARM</span>
                </div>

                <ul className="nav-links">
                    <li><a href="#home" className="active">HOME</a></li>
                    <li><a href="#features">FEATURES</a></li>
                    <li><a href="#about">ABOUT</a></li>
                    <li><a href="#contact">CONTACT</a></li>
                </ul>

                <div className="nav-actions">

                    <a href="/auth" className="nav-login">Log In</a>
                    <a href="/auth" className="nav-register-btn">Get Started</a>
                </div>
            </nav>


            <main className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Make your fields <br />
                        <span className="highlight">more productive</span>
                    </h1>
                    <p className="hero-description">
                        A comprehensive field monitoring system designed for coordinators and agents.
                        Track crop stages, manage assignments, and record vital observations seamlessly
                        from planting to harvest.
                    </p>
                    <a href="/auth" className="cta-button">ACCESS DASHBOARD</a>
                </div>

                <div className="hero-image-container">
                    <img
                        src={heroImg}
                        alt="Smart Field Tractor Analysis"
                        className="hero-image"
                        style={{ width: '100%', height: 'auto', borderRadius: '16px', boxShadow: '0 20px 50px rgba(46, 125, 50, 0.2)', transition: 'all 0.3s ease' }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 25px 60px rgba(46, 125, 50, 0.35)' }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(46, 125, 50, 0.2)' }}
                    />
                </div>
            </main>
        </div>
    );
};

export default Home;