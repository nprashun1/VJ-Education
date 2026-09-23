import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchesOpen, setBranchesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setBranchesOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', to: '/' },
    {
      name: 'Branches',
      dropdown: [
        { name: 'School', to: '/School', desc: 'Holistic K-12 Education' },
        { name: 'Coaching', to: '/Coaching', desc: 'Competitive Exams & Foundation' },
        { name: 'Hostel', to: '/Hostel', desc: 'Safe & Disciplined Boarding' }
      ]
    },
    { name: 'Admissions', to: '/admission' },
    { name: 'Gallery', to: '/gallery' },
    { name: 'About Us', to: '/About' },
    { name: 'Contact', to: '/Contact' },
  ];

  return (
    <>
      {/* Top Joyful Announcement Strip */}
      <div className="top-announcement-bar">
        <div className="announcement-content">
          <span className="announcement-badge">
            <span className="pulse-dot"></span> Admissions Open 2026-27
          </span>
          <span className="announcement-text">
            Enroll your child in a world-class learning environment!
          </span>
          <div className="announcement-links">
            <Link to="/admission" className="quick-apply-link">Apply Online →</Link>
          </div>
        </div>
      </div>

      <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Brand Logo & Name */}
          <Link to="/" className="navbar-brand">
            <div className="navbar-logo-wrapper">
              <img src="/vj.png" alt="VJ Education Logo" className="navbar-logo" />
            </div>
            <div className="brand-text">
              <span className="brand-title">VJ EDUCATION</span>
              <span className="brand-tagline">NURTURING EXCELLENCE</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            {navLinks.map((item) => {
              if (item.dropdown) {
                const isBranchActive = item.dropdown.some(
                  sub => currentPath.toLowerCase() === sub.to.toLowerCase()
                );
                return (
                  <div className="nav-dropdown-wrapper" key={item.name}>
                    <button
                      type="button"
                      className={`nav-link dropdown-toggle ${isBranchActive ? 'active' : ''}`}
                    >
                      <span>{item.name}</span>
                      <svg className="dropdown-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    <div className="modern-dropdown-menu">
                      <div className="dropdown-glow-top"></div>
                      {item.dropdown.map((sub) => (
                        <Link to={sub.to} key={sub.name} className="dropdown-item">
                          <div className="dropdown-icon-pill">
                            {sub.name === 'School' && '🏫'}
                            {sub.name === 'Coaching' && '🎯'}
                            {sub.name === 'Hostel' && '🏡'}
                          </div>
                          <div className="dropdown-item-info">
                            <span className="dropdown-item-title">{sub.name}</span>
                            <span className="dropdown-item-desc">{sub.desc}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              const isActive = item.to === '/'
                ? currentPath === '/'
                : currentPath.toLowerCase().startsWith(item.to.toLowerCase());

              return (
                <Link
                  to={item.to}
                  key={item.name}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Header Action CTA */}
          <div className="navbar-actions">
            <Link to="/staff" className="staff-portal-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Staff Portal</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'show' : ''}`}>
          <div className="mobile-nav-inner">
            <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              🏠 Home
            </Link>

            {/* Mobile Branches Accordion */}
            <div className="mobile-branches-group">
              <button
                className="mobile-branches-btn"
                onClick={() => setBranchesOpen(!branchesOpen)}
              >
                <span>🏢 Branches</span>
                <span className={`mobile-chevron ${branchesOpen ? 'rotated' : ''}`}>▾</span>
              </button>
              {branchesOpen && (
                <div className="mobile-sublinks">
                  <Link to="/School" onClick={() => setMobileMenuOpen(false)}>
                    🏫 VJ School
                  </Link>
                  <Link to="/Coaching" onClick={() => setMobileMenuOpen(false)}>
                    🎯 VJ Coaching
                  </Link>
                  <Link to="/Hostel" onClick={() => setMobileMenuOpen(false)}>
                    🏡 VJ Hostel
                  </Link>
                </div>
              )}
            </div>

            <Link to="/admission" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              📝 Admissions Form
            </Link>
            <Link to="/gallery" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              🖼️ Campus Gallery
            </Link>
            <Link to="/About" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              ℹ️ About VJ
            </Link>
            <Link to="/Contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              📞 Contact Us
            </Link>

            <div className="mobile-cta-box">
              <Link to="/staff" className="mobile-staff-btn" onClick={() => setMobileMenuOpen(false)}>
                👥 Staff Recruitment
              </Link>
              <Link to="/admission" className="mobile-apply-btn" onClick={() => setMobileMenuOpen(false)}>
                🎓 Apply for Admission
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;