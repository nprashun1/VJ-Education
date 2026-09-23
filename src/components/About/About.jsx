import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  const values = [
    {
      icon: '🌱',
      title: 'Holistic Growth',
      desc: 'Developing mental intellect, physical fitness, creative expression, and strong moral grounding.'
    },
    {
      icon: '💡',
      title: 'Conceptual Clarity',
      desc: 'Moving away from rote memorization towards deep conceptual clarity and problem-solving skills.'
    },
    {
      icon: '🤝',
      title: 'Empathy & Community',
      desc: 'Cultivating mutual respect, social responsibility, teamwork, and lifelong friendships.'
    },
    {
      icon: '🏆',
      title: 'Pursuit of Excellence',
      desc: 'Instilling determination and self-belief to excel in board exams, competitive arenas, and life.'
    }
  ];

  return (
    <div className="about-page-wrapper">
      {/* About Hero Header */}
      <section className="about-hero">
        <div className="about-hero-container">
          <span className="badge-pill gold">Who We Are</span>
          <h1 className="about-hero-title">Shaping Character & Academic Brilliance</h1>
          <p className="about-hero-subtitle">
            At VJ Education, choosing the right learning space is the first step toward unlocking 
            your child’s boundless potential. We are an inclusive community passionate about quality education.
          </p>
        </div>
      </section>

      {/* Main Content & Video Card */}
      <section className="about-main-section">
        <div className="about-card-container">
          {/* Video Showcase */}
          <div className="about-video-card">
            <video src="/VJ School.mp4" autoPlay loop muted playsInline className="about-video"></video>
            <div className="video-badge-overlay">
              <span>🏫 VJ Education Campus Overview</span>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="about-story-grid">
            <div className="story-block">
              <span className="badge-pill primary">Our Mission</span>
              <h2 className="story-title">Empowering Every Student to Excel</h2>
              <p className="story-text">
                Our mission is to help students realize their highest potential through compassionate 
                mentorship, scientifically structured curriculum, modern smart classrooms, and personalized 
                attention. We believe that every child enters our gates with unique talents waiting to blossom.
              </p>
            </div>

            <div className="story-block">
              <span className="badge-pill navy">Our Vision</span>
              <h2 className="story-title">A Benchmark of Educational Excellence</h2>
              <p className="story-text">
                To stand as a beacon of academic integrity and student care in Nalanda and Bihar, bridging 
                school education, competitive coaching, and residential safety under one seamless and joyful roof.
              </p>
            </div>
          </div>

          {/* Core Values Grid */}
          <div className="about-values-section">
            <div className="values-header">
              <span className="badge-pill gold">Our Philosophy</span>
              <h2 className="section-main-heading">Core Values That Guide Us</h2>
            </div>

            <div className="values-grid">
              {values.map((v, i) => (
                <div className="value-card" key={i}>
                  <div className="value-icon">{v.icon}</div>
                  <h3 className="value-title">{v.title}</h3>
                  <p className="value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="about-cta-box">
            <div>
              <h3>Ready to be part of the VJ family?</h3>
              <p>Admissions are now open for the upcoming academic session 2026-27.</p>
            </div>
            <div className="about-cta-btns">
              <Link to="/admission" className="btn-primary">Apply Online</Link>
              <Link to="/Contact" className="btn-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
