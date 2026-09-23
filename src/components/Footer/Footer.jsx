import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="modern-footer">
      <div className="footer-top-accent"></div>
      <div className="footer-container">
        {/* Column 1: Brand Info */}
        <div className="footer-col brand-col">
          <div className="footer-logo-row">
            <img src="/vj.png" alt="VJ Education" className="footer-logo-img" />
            <div>
              <span className="footer-brand-title">VJ EDUCATION</span>
              <span className="footer-brand-sub">Empowering Young Minds</span>
            </div>
          </div>
          <p className="footer-desc">
            A comprehensive educational institution committed to nurturing academic excellence, 
            moral integrity, and lifelong learning for each student.
          </p>
          <div className="footer-badges">
            <span className="footer-badge">🏫 CBSE Aligned</span>
            <span className="footer-badge">🎯 Top Mentorship</span>
            <span className="footer-badge">🏡 Secure Hostel</span>
          </div>
        </div>

        {/* Column 2: Our Wings */}
        <div className="footer-col">
          <h4 className="footer-heading">Our Wings</h4>
          <ul className="footer-links">
            <li><Link to="/School">VJ School (K-12)</Link></li>
            <li><Link to="/Coaching">VJ Coaching (JEE / NEET)</Link></li>
            <li><Link to="/Hostel">VJ Hostel (Boys & Girls)</Link></li>
            <li><Link to="/admission">Admissions Open 2026-27</Link></li>
            <li><Link to="/staff">Staff Careers & Vacancies</Link></li>
          </ul>
        </div>

        {/* Column 3: Quick Navigation */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home Overview</Link></li>
            <li><Link to="/About">About Leadership</Link></li>
            <li><Link to="/gallery">Campus Gallery</Link></li>
            <li><Link to="/Contact">Contact & Location</Link></li>
            <li><Link to="/admission">Online Application</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & Hours */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Campus Address</h4>
          <div className="footer-contact-item">
            <span className="contact-icon">📍</span>
            <span>Nala Road, Bihar Sharif, Nalanda, Bihar - 803101</span>
          </div>
          <div className="footer-contact-item">
            <span className="contact-icon">📞</span>
            <span>+91 91234 56789 / 06112-234567</span>
          </div>
          <div className="footer-contact-item">
            <span className="contact-icon">✉️</span>
            <span>contact@vjeducation.com</span>
          </div>
          <div className="footer-contact-item">
            <span className="contact-icon">🕒</span>
            <span>Mon - Sat: 8:00 AM - 5:00 PM</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} VJ Education. All Rights Reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/School">School</Link>
            <span>•</span>
            <Link to="/Coaching">Coaching</Link>
            <span>•</span>
            <Link to="/Hostel">Hostel</Link>
            <span>•</span>
            <Link to="/Contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer