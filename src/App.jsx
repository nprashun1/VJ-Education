import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Media from './components/Media/Media'
import Event from './components/Event/Event'

function App() {
  const [notices, setNotices] = useState([])
  const [noticeFilter, setNoticeFilter] = useState('all')

  useEffect(() => {
    fetch('https://vj-education.onrender.com/api/notices')
      .then(res => res.json())
      .then(data => setNotices(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error("Failed to load notices:", err);
        // Fallback default notices so UI is never empty
        setNotices([
          { _id: '1', title: 'Admissions Open for Session 2026-27 for all classes.', link: '/admission', date: 'New' },
          { _id: '2', title: 'Annual Sports & Cultural Meet registration begins next week.', link: '/gallery', date: 'Upcoming' },
          { _id: '3', title: 'Special Weekend Doubt Clearing Classes for Board Students.', link: '/Coaching', date: 'Notice' }
        ]);
      });
  }, [])

  return (
    <div className="home-wrapper">
      {/* ---------- HERO SECTION ---------- */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-sparkle">✨</span>
              <span>Admissions Open for Academic Session 2026-27</span>
            </div>

            <h1 className="hero-title">
              Empowering Minds, <br />
              <span className="hero-title-highlight">Shaping Brighter Futures</span>
            </h1>

            <p className="hero-subtitle">
              VJ Education provides a nurturing, values-driven environment combining world-class 
              Schooling, rigorous Coaching, and secure Hostel facilities to unlock every student's potential.
            </p>

            <div className="hero-actions">
              <Link to="/admission" className="btn-primary hero-btn">
                <span>Enroll Your Child</span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/School" className="btn-secondary hero-btn">
                <span>Explore School Campus</span>
              </Link>
              <Link to="/Contact" className="btn-outline-light hero-btn">
                <span>Enquire Now</span>
              </Link>
            </div>

            {/* Joyful Feature Highlights */}
            <div className="hero-highlights">
              <div className="highlight-pill">
                <span className="pill-icon">🌟</span>
                <span>CBSE Curriculum</span>
              </div>
              <div className="highlight-pill">
                <span className="pill-icon">🎯</span>
                <span>JEE & NEET Coaching</span>
              </div>
              <div className="highlight-pill">
                <span className="pill-icon">🏡</span>
                <span>Safe AC Hostel</span>
              </div>
              <div className="highlight-pill">
                <span className="pill-icon">💻</span>
                <span>Digital Smart Classes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Counter Strip */}
        <div className="hero-stats-strip">
          <div className="stats-container">
            <div className="stat-card">
              <span className="stat-number">1500+</span>
              <span className="stat-label">Students Enrolled</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Academic Success</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <span className="stat-number">50+</span>
              <span className="stat-label">Expert Educators</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years of Trust</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- DUAL SPOTLIGHT: NOTICE BOARD & ADMISSION ---------- */}
      <section className="spotlight-section">
        <div className="spotlight-container">
          {/* Modern Notice Board */}
          <div className="modern-notice-card">
            <div className="notice-header">
              <div className="notice-header-left">
                <div className="notice-icon-box">📢</div>
                <div>
                  <h2 className="notice-card-title">Notice Board</h2>
                  <span className="notice-card-subtitle">Official Updates & Circulars</span>
                </div>
              </div>
              <span className="live-status-pill">
                <span className="pulse-dot"></span> Live
              </span>
            </div>

            <div className="notice-body-wrapper">
              <div className="notice-scroll-list">
                {notices.length === 0 ? (
                  <div className="no-notices-modern">
                    <span className="empty-icon">📭</span>
                    <p>No circulars available at this moment.</p>
                  </div>
                ) : (
                  notices.map((notice, idx) => (
                    <div key={notice._id || idx} className="notice-card-item">
                      <div className="notice-item-badge">
                        <span className="notice-tag">Notice</span>
                      </div>
                      <div className="notice-item-content">
                        {notice.link ? (
                          <a 
                            href={notice.link} 
                            target={notice.link.startsWith('http') ? '_blank' : '_self'} 
                            rel="noopener noreferrer"
                            className="notice-link"
                          >
                            {notice.title}
                            <span className="notice-arrow">↗</span>
                          </a>
                        ) : (
                          <span className="notice-text">{notice.title}</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="notice-footer">
              <span className="notice-tip">💡 Tip: Tap on any notice to view details</span>
            </div>
          </div>

          {/* Joyful Admission Card */}
          <div className="admission-spotlight-card">
            <div className="admission-badge-top">
              <span>🌟 Admissions 2026-27</span>
            </div>
            <h2 className="admission-title">Begin Your Child's Journey to Excellence</h2>
            <p className="admission-desc">
              We provide a disciplined yet vibrant atmosphere where curiosity is celebrated and 
              every child is nurtured with personalized attention.
            </p>

            <div className="admission-perks-list">
              <div className="perk-item">
                <span className="perk-check">✓</span>
                <span>Pre-Primary to Senior Secondary (Science, Commerce, Arts)</span>
              </div>
              <div className="perk-item">
                <span className="perk-check">✓</span>
                <span>Merit-based scholarships available for eligible students</span>
              </div>
              <div className="perk-item">
                <span className="perk-check">✓</span>
                <span>State-of-the-art Science & Computer Laboratories</span>
              </div>
              <div className="perk-item">
                <span className="perk-check">✓</span>
                <span>Door-to-door safe GPS-enabled school transport</span>
              </div>
            </div>

            <div className="admission-card-actions">
              <Link to="/admission" className="btn-primary admission-cta-btn">
                <span>Fill Online Admission Form</span>
                <span>→</span>
              </Link>
              <Link to="/Contact" className="btn-contact-outline">
                <span>Talk to Counselor</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- OUR 3 INTEGRATED BRANCHES ---------- */}
      <section className="branches-showcase-section">
        <div className="section-header-center">
          <span className="badge-pill primary">The VJ Ecosystem</span>
          <h2 className="section-main-heading">Integrated Excellence Under One Umbrella</h2>
          <p className="section-sub-heading">
            From comprehensive schooling to competitive coaching and home-like hostel care.
          </p>
        </div>

        <div className="branches-grid">
          {/* Branch 1: School */}
          <div className="branch-card school-card">
            <div className="branch-card-header">
              <div className="branch-icon-pill">🏫</div>
              <span className="branch-tag">Academic Wing</span>
            </div>
            <h3 className="branch-name">VJ School</h3>
            <p className="branch-desc">
              Holistic CBSE education fostering critical thinking, sportsmanship, moral values, 
              and leadership skills in students.
            </p>
            <ul className="branch-features">
              <li>• Smart Interactive Classrooms</li>
              <li>• Sports & Cultural Clubs</li>
              <li>• Experienced & Caring Faculty</li>
            </ul>
            <Link to="/School" className="branch-action-link">
              <span>Explore School</span>
              <span className="link-arrow">→</span>
            </Link>
          </div>

          {/* Branch 2: Coaching */}
          <div className="branch-card coaching-card">
            <div className="branch-card-header">
              <div className="branch-icon-pill">🎯</div>
              <span className="branch-tag">Competitive Wing</span>
            </div>
            <h3 className="branch-name">VJ Coaching</h3>
            <p className="branch-desc">
              Specialized coaching for IIT-JEE, NEET, Olympiads, and Board examinations with 
              structured test series and doubt resolution.
            </p>
            <ul className="branch-features">
              <li>• Rigorous Test & Feedback System</li>
              <li>• Top-Ranker Mentorship</li>
              <li>• Personalized Study Material</li>
            </ul>
            <Link to="/Coaching" className="branch-action-link">
              <span>Explore Coaching</span>
              <span className="link-arrow">→</span>
            </Link>
          </div>

          {/* Branch 3: Hostel */}
          <div className="branch-card hostel-card">
            <div className="branch-card-header">
              <div className="branch-icon-pill">🏡</div>
              <span className="branch-tag">Residential Wing</span>
            </div>
            <h3 className="branch-name">VJ Hostel</h3>
            <p className="branch-desc">
              Safe, disciplined, and comfortable residential facility with hygienic meals, 
              supervised evening self-study, and 24/7 warden support.
            </p>
            <ul className="branch-features">
              <li>• Nutritious Balanced Meals</li>
              <li>• Supervised Evening Self-Study</li>
              <li>• 24x7 CCTV & Security</li>
            </ul>
            <Link to="/Hostel" className="branch-action-link">
              <span>Explore Hostel</span>
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- UPCOMING EVENTS ---------- */}
      <Event />

      {/* ---------- ABOUT US MODERN PREVIEW ---------- */}
      <section className="home-about-wrapper">
        <div className="home-about-card">
          <div className="about-left-content">
            <span className="badge-pill navy">Our Philosophy</span>
            <h2 className="about-title">A Tradition of Dedication & Value-Based Learning</h2>
            <p className="about-paragraph">
              Choosing the right school is the foundation of your child's future. At VJ Education, 
              we believe every child is uniquely talented. Our mission is to inspire intellectual 
              curiosity, emotional resilience, and integrity so that each student excels both in academics 
              and in real life.
            </p>
            <div className="about-highlights-grid">
              <div className="about-feat">
                <span className="feat-emoji">💡</span>
                <div>
                  <strong>Experiential Learning</strong>
                  <p>Practical learning that connects theory to real applications.</p>
                </div>
              </div>
              <div className="about-feat">
                <span className="feat-emoji">🛡️</span>
                <div>
                  <strong>Safe & Caring Environment</strong>
                  <p>A welcoming atmosphere where every student feels valued.</p>
                </div>
              </div>
            </div>
            <div className="about-actions">
              <Link to="/About" className="btn-primary">
                <span>Discover Our Story</span>
                <span>→</span>
              </Link>
              <Link to="/gallery" className="btn-secondary">
                <span>View Campus Life</span>
              </Link>
            </div>
          </div>

          <div className="about-right-visual">
            <div className="quote-box">
              <span className="quote-mark">“</span>
              <p className="quote-text">
                "Education is not the learning of facts, but the training of the mind to think."
              </p>
              <span className="quote-author">— VJ Education Core Value</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MEDIA & VIDEO SHOWCASE ---------- */}
      <Media />
    </div>
  )
}

export default App