import React from 'react';
import { Link } from 'react-router-dom';
import './Coaching.css';

const Coaching = () => {
  const coachingFeatures = [
    {
      icon: '🎯',
      title: 'Competitive Exam Prep',
      desc: 'Specialized batches and rigorous curricula tailored for JEE Mains & Advanced, NEET-UG, and Olympiads.'
    },
    {
      icon: '📝',
      title: 'Comprehensive Study Material',
      desc: 'Meticulously researched DPPs (Daily Practice Problems), theory booklets, and high-yield question banks.'
    },
    {
      icon: '📊',
      title: 'Weekly Computer-Based Tests',
      desc: 'Simulated real-exam atmosphere with instant AI-powered performance analysis, ranking, and error breakdown.'
    },
    {
      icon: '👨‍🏫',
      title: 'Dedicated Doubt Counters',
      desc: 'One-on-one doubt resolution with faculty after every class so that no student is left behind.'
    },
    {
      icon: '📈',
      title: 'Parent-Teacher Analytics',
      desc: 'Transparent tracking of attendance, test scores, and chapter mastery shared continuously with parents.'
    },
    {
      icon: '💡',
      title: 'Topper Mentorship Seminars',
      desc: 'Interactive strategy and mental wellness sessions led by IITians, doctors, and academic counselors.'
    }
  ];

  return (
    <div className="coaching-page-wrapper">
      {/* Coaching Hero Banner */}
      <section className="coaching-hero">
        <div className="coaching-hero-container">
          <span className="badge-pill navy">Competitive Wing</span>
          <h1 className="coaching-hero-title">VJ Coaching Institute</h1>
          <p className="coaching-hero-subtitle">
            Empowering aspiring engineers, doctors, and academic leaders with disciplined guidance, 
            cutting-edge test systems, and unmatched mentorship.
          </p>
          <div className="coaching-hero-actions">
            <Link to="/admission" className="btn-primary">
              <span>Enroll in Coaching Batch</span>
              <span>→</span>
            </Link>
            <Link to="/Contact" className="btn-secondary">
              <span>Request Counseling</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Coaching Features Grid */}
      <section className="coaching-content-section">
        <div className="coaching-content-container">
          <div className="section-header-center">
            <span className="badge-pill primary">The VJ Advantage</span>
            <h2 className="section-main-heading">Proven Methodology for Top Ranks</h2>
            <p className="section-sub-heading">
              Our structured approach combines concept mastery, intensive problem solving, and personalized feedback.
            </p>
          </div>

          <div className="coaching-features-grid">
            {coachingFeatures.map((feat, index) => (
              <div className="coaching-feature-card" key={index}>
                <div className="feature-icon-wrapper coaching">
                  <span className="feature-icon">{feat.icon}</span>
                </div>
                <h3 className="feature-card-heading">{feat.title}</h3>
                <p className="feature-card-text">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Testimonial / Performance Banner */}
          <div className="coaching-callout-banner">
            <div className="callout-text">
              <h3>Target JEE & NEET 2026-27 Batches Open</h3>
              <p>Special foundation courses for Classes 8th, 9th, 10th and intensive batches for 11th, 12th & Repeaters.</p>
            </div>
            <Link to="/admission" className="btn-gold">
              <span>Apply for Scholarship Test</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coaching;