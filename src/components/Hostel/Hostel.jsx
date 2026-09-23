import React from 'react';
import { Link } from 'react-router-dom';
import './Hostel.css';

const Hostel = () => {
  const hostelFeatures = [
    {
      icon: '🔒',
      title: '24/7 Security & CCTV',
      desc: 'Round-the-clock security personnel, electronic entry monitoring, and dedicated resident wardens.'
    },
    {
      icon: '🍽️',
      title: 'Hygienic Nutritious Meals',
      desc: 'Four freshly prepared, wholesome vegetarian meals daily with balanced nutrition planned for growing minds.'
    },
    {
      icon: '📚',
      title: 'Supervised Study Hours',
      desc: 'Mandatory quiet evening study halls with faculty mentors available for guidance and discipline.'
    },
    {
      icon: '📶',
      title: 'High-Speed Wi-Fi & Labs',
      desc: 'Controlled internet connectivity for educational research, online test series, and parent video calls.'
    },
    {
      icon: '⚡',
      title: '100% Power & Water Backup',
      desc: 'Uninterrupted power supply with heavy-duty generators and continuous RO purified drinking water.'
    },
    {
      icon: '🧹',
      title: 'Daily Housekeeping & Laundry',
      desc: 'Regular room cleaning, sanitized washrooms, and convenient laundry management for every resident.'
    }
  ];

  return (
    <div className="hostel-page-wrapper">
      {/* Hostel Hero Banner */}
      <section className="hostel-hero">
        <div className="hostel-hero-container">
          <span className="badge-pill gold">Residential Wing</span>
          <h1 className="hostel-hero-title">VJ Student Hostels</h1>
          <p className="hostel-hero-subtitle">
            A secure, homely, and disciplined home-away-from-home for boys and girls, designed to 
            cultivate healthy study habits, mutual respect, and focused academic growth.
          </p>
          <div className="hostel-hero-actions">
            <Link to="/admission" className="btn-primary">
              <span>Apply for Hostel Accommodation</span>
              <span>→</span>
            </Link>
            <Link to="/Contact" className="btn-secondary">
              <span>Visit Hostel Premises</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Hostel Features Grid */}
      <section className="hostel-content-section">
        <div className="hostel-content-container">
          <div className="section-header-center">
            <span className="badge-pill primary">Home Away From Home</span>
            <h2 className="section-main-heading">Safe, Clean & Structured Living</h2>
            <p className="section-sub-heading">
              Every amenity is designed to give students comfort, security, and the ideal environment for study.
            </p>
          </div>

          <div className="hostel-features-grid">
            {hostelFeatures.map((feat, index) => (
              <div className="hostel-feature-card" key={index}>
                <div className="feature-icon-wrapper hostel">
                  <span className="feature-icon">{feat.icon}</span>
                </div>
                <h3 className="feature-card-heading">{feat.title}</h3>
                <p className="feature-card-text">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Location & Contact Details Card */}
          <div className="hostel-location-card">
            <div className="location-info">
              <span className="badge-pill navy">Hostel Campus Address</span>
              <h3 className="location-title">VJ Hostel Premises</h3>
              <p className="location-address">
                📍 Manta Complex, Near SBI Nai Sarai, Bihar Sharif, Nalanda, Bihar - 803101
              </p>
              <p className="location-note">
                Separate residential blocks available for Boys and Girls with strict warden supervision.
              </p>
            </div>
            <div className="location-action">
              <Link to="/Contact" className="btn-gold">
                <span>Inquire About Room Availability</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hostel;