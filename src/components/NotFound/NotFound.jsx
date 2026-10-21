import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = '404 - Page Not Found | VJ Education';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const quickLinks = [
    {
      title: 'Home Page',
      subtitle: 'Main portal & announcements',
      path: '/',
      icon: '🏠'
    },
    {
      title: 'Admissions 2026-27',
      subtitle: 'Online student application',
      path: '/admission',
      icon: '🎓'
    },
    {
      title: 'School Campus',
      subtitle: 'Holistic K-12 schooling',
      path: '/School',
      icon: '🏫'
    },
    {
      title: 'Coaching Institute',
      subtitle: 'Competitive & foundation batches',
      path: '/Coaching',
      icon: '📚'
    },
    {
      title: 'Hostel Facilities',
      subtitle: 'Residential boarding & care',
      path: '/Hostel',
      icon: '🏢'
    },
    {
      title: 'Campus Gallery',
      subtitle: 'Photos, athletic & cultural events',
      path: '/gallery',
      icon: '🖼️'
    },
    {
      title: 'Faculty & Careers',
      subtitle: 'Join our academic team',
      path: '/staff',
      icon: '👨‍🏫'
    },
    {
      title: 'Contact Desk',
      subtitle: 'Reach our helpdesk & admissions',
      path: '/Contact',
      icon: '📞'
    }
  ];

  return (
    <div className="notfound-wrapper">
      {/* Ambient background glows */}
      <div className="notfound-bg-orb orb-primary" aria-hidden="true" />
      <div className="notfound-bg-orb orb-navy" aria-hidden="true" />
      <div className="notfound-bg-orb orb-gold" aria-hidden="true" />

      <main className="notfound-card" role="main">
        {/* Status Pill */}
        <div className="notfound-pill">
          <span className="pulse-indicator" />
          <span>Error 404 • Destination Unavailable</span>
        </div>

        {/* 404 Visual Heading */}
        <div className="notfound-visual">
          <div className="notfound-number" aria-label="404 Error">
            <span>4</span>
            <span className="digit-zero">
              <span className="compass-icon" aria-hidden="true">🧭</span>
            </span>
            <span>4</span>
          </div>
        </div>

        <h1 className="notfound-title">Oops! You seem to have lost your way</h1>
        <p className="notfound-desc">
          The page <code style={{ background: 'var(--primary-subtle)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '4px' }}>{location.pathname}</code> does not exist, has been relocated, or is temporarily unavailable. Don't worry, let's get you back on track!
        </p>

        {/* Navigation Action Buttons */}
        <div className="notfound-actions">
          <Link to="/" className="btn-primary-action">
            <span>🏠</span>
            <span>Back to Homepage</span>
          </Link>
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="btn-secondary-action"
          >
            <span>←</span>
            <span>Go Back Previous Page</span>
          </button>
        </div>

        {/* Quick Destinations Grid */}
        <section className="notfound-explore-section" aria-label="Popular destinations">
          <div className="explore-header">
            <span className="explore-title">Explore Popular Destinations</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quick Links</span>
          </div>
          <div className="explore-grid">
            {quickLinks.map((link) => (
              <Link key={link.path} to={link.path} className="explore-card">
                <span className="card-icon" aria-hidden="true">{link.icon}</span>
                <div className="card-info">
                  <span className="card-title">{link.title}</span>
                  <span className="card-subtitle">{link.subtitle}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Support Assistance Footer */}
        <div className="notfound-support-banner">
          <div className="support-text">
            <span>💬 Need help finding something specific?</span>
          </div>
          <Link to="/Contact" className="support-link">
            Speak to our Admission & Help Desk →
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
