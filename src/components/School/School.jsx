import React from 'react';
import { Link } from 'react-router-dom';
import './School.css';

const School = () => {
  const schoolFeatures = [
    {
      icon: '📚',
      title: 'Comprehensive CBSE Curriculum',
      desc: 'Updated learner-centric curriculum blending foundational knowledge with modern practical application.'
    },
    {
      icon: '🎓',
      title: 'Dedicated Expert Faculty',
      desc: 'Empathetic educators with rich experience committed to unlocking every child’s unique potential.'
    },
    {
      icon: '🖥️',
      title: 'Smart Digital Classrooms',
      desc: 'Interactive audio-visual panels and digital content making abstract concepts easy to understand.'
    },
    {
      icon: '⚽',
      title: 'Sports & Cultural Activities',
      desc: 'Athletic tracks, indoor games, art, and music clubs ensuring balanced physical and emotional growth.'
    },
    {
      icon: '🔬',
      title: 'Advanced Science & Robo Labs',
      desc: 'State-of-the-art physics, chemistry, biology, and computer labs for hands-on experimentation.'
    },
    {
      icon: '🚌',
      title: 'Safe GPS Transport Network',
      desc: 'Dependable school buses with real-time GPS tracking and female attendants on all routes.'
    }
  ];

  return (
    <div className="school-page-wrapper">
      {/* Branch Hero Banner */}
      <section className="branch-hero">
        <div className="branch-hero-container">
          <span className="badge-pill gold">Academic Wing</span>
          <h1 className="branch-hero-title">VJ Concept School</h1>
          <p className="branch-hero-subtitle">
            Providing holistic education from Pre-Primary through Senior Secondary with a passion 
            for academic rigor, character building, and individual excellence.
          </p>
          <div className="branch-hero-actions">
            <Link to="/admission" className="btn-primary">
              <span>Apply for School Admission</span>
              <span>→</span>
            </Link>
            <Link to="/Contact" className="btn-secondary">
              <span>Schedule a Campus Visit</span>
            </Link>
          </div>
        </div>
      </section>

      {/* School Highlights Grid */}
      <section className="branch-content-section">
        <div className="branch-content-container">
          <div className="section-header-center">
            <span className="badge-pill primary">Why Choose VJ School</span>
            <h2 className="section-main-heading">World-Class Facilities for Holistic Growth</h2>
            <p className="section-sub-heading">
              Our campus provides an inspiring and secure atmosphere where learning is joyful and engaging.
            </p>
          </div>

          <div className="branch-features-grid">
            {schoolFeatures.map((feat, index) => (
              <div className="branch-feature-card" key={index}>
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">{feat.icon}</span>
                </div>
                <h3 className="feature-card-heading">{feat.title}</h3>
                <p className="feature-card-text">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Joyful Campus Callout */}
          <div className="branch-callout-banner">
            <div className="callout-text">
              <h3>Admissions Open for Session 2026-27</h3>
              <p>Seats are limited per grade to ensure personalized mentorship for each child.</p>
            </div>
            <Link to="/admission" className="btn-gold">
              <span>Fill Admission Form</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default School;