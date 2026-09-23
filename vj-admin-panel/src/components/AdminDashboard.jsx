import React, { useState, useEffect, useMemo } from 'react';
import './AdminDashboard.css';

const API_BASE = import.meta.env.VITE_API_URL || 'https://vj-education.onrender.com';
const getAuthHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('adminToken')}` });

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState('staff'); // staff | admissions | notices | gallery | events

  // Quick stats counts
  const [counts, setCounts] = useState({
    staff: 0,
    admissions: 0,
    notices: 0,
    gallery: 0,
    events: 0
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError(null);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        setAuthError(null);
      } else {
        setAuthError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setAuthError("Network error. Please make sure server is running.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out of Admin Portal?")) {
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    }
  };

  // Fetch counts when authenticated
  const refreshCounts = () => {
    if (!isAuthenticated) return;
    const headers = getAuthHeaders();

    fetch(`${API_BASE}/api/staff`, { headers })
      .then(r => r.ok ? r.json() : [])
      .then(d => setCounts(prev => ({ ...prev, staff: Array.isArray(d) ? d.length : 0 })))
      .catch(() => {});

    fetch(`${API_BASE}/api/admissions`, { headers })
      .then(r => r.ok ? r.json() : [])
      .then(d => setCounts(prev => ({ ...prev, admissions: Array.isArray(d) ? d.length : 0 })))
      .catch(() => {});

    fetch(`${API_BASE}/api/notices`)
      .then(r => r.ok ? r.json() : [])
      .then(d => setCounts(prev => ({ ...prev, notices: Array.isArray(d) ? d.length : 0 })))
      .catch(() => {});

    fetch(`${API_BASE}/api/gallery`)
      .then(r => r.ok ? r.json() : [])
      .then(d => setCounts(prev => ({ ...prev, gallery: Array.isArray(d) ? d.length : 0 })))
      .catch(() => {});

    fetch(`${API_BASE}/api/events`)
      .then(r => r.ok ? r.json() : [])
      .then(d => setCounts(prev => ({ ...prev, events: Array.isArray(d) ? d.length : 0 })))
      .catch(() => {});
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshCounts();
    }
  }, [isAuthenticated]);

  // ---------- LOGIN SCREEN ----------
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-backdrop"></div>
        <div className="admin-login-card">
          <div className="login-crest-box">
            <img src="/vj.png" alt="VJ Education Crest" className="login-crest" />
          </div>

          <div className="login-header-text">
            <span className="login-kicker">SECURE MANAGEMENT ACCESS</span>
            <h1 className="login-title">VJ Education Admin</h1>
            <p className="login-desc">Sign in with your administrative credentials to manage content and inquiries.</p>
          </div>

          {authError && (
            <div className="login-error-alert">
              <span>⚠️</span>
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="login-input-group">
              <label>Administrator Username</label>
              <div className="login-input-field">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-input-group">
              <label>Password</label>
              <div className="login-input-field">
                <span className="input-icon">🔑</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-submit-btn" disabled={isLoggingIn}>
              {isLoggingIn ? 'Authenticating...' : 'Sign In to Dashboard →'}
            </button>
          </form>

          <div className="login-card-footer">
            <span>🔒 256-Bit Encrypted Admin Session</span>
          </div>
        </div>
      </div>
    );
  }

  // ---------- AUTHENTICATED DASHBOARD LAYOUT ----------
  return (
    <div className="admin-app-layout">
      {/* Top Navbar */}
      <header className="admin-topbar">
        <div className="admin-topbar-container">
          <div className="admin-brand">
            <img src="/vj.png" alt="VJ Logo" className="admin-brand-logo" />
            <div className="admin-brand-info">
              <span className="admin-brand-title">VJ EDUCATION</span>
              <span className="admin-brand-sub">ADMIN CONTROL PORTAL</span>
            </div>
          </div>

          <div className="admin-topbar-right">
            <div className="admin-status-pill">
              <span className="status-live-dot"></span>
              <span>Super Admin • Online</span>
            </div>
            <button onClick={handleLogout} className="admin-logout-btn" title="Sign out">
              <span>Logout</span>
              <span>🚪</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="admin-main-container">
        {/* Executive Quick Stats Cards */}
        <section className="admin-metrics-row">
          <div 
            className={`metric-card ${activeTab === 'staff' ? 'metric-active' : ''}`}
            onClick={() => setActiveTab('staff')}
          >
            <div className="metric-icon-box staff-color">👥</div>
            <div className="metric-content">
              <span className="metric-count">{counts.staff}</span>
              <span className="metric-label">Staff Registrations</span>
            </div>
          </div>

          <div 
            className={`metric-card ${activeTab === 'admissions' ? 'metric-active' : ''}`}
            onClick={() => setActiveTab('admissions')}
          >
            <div className="metric-icon-box admission-color">🎓</div>
            <div className="metric-content">
              <span className="metric-count">{counts.admissions}</span>
              <span className="metric-label">Admissions Forms</span>
            </div>
          </div>

          <div 
            className={`metric-card ${activeTab === 'notices' ? 'metric-active' : ''}`}
            onClick={() => setActiveTab('notices')}
          >
            <div className="metric-icon-box notice-color">📢</div>
            <div className="metric-content">
              <span className="metric-count">{counts.notices}</span>
              <span className="metric-label">Live Notices</span>
            </div>
          </div>

          <div 
            className={`metric-card ${activeTab === 'gallery' ? 'metric-active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <div className="metric-icon-box gallery-color">🖼️</div>
            <div className="metric-content">
              <span className="metric-count">{counts.gallery}</span>
              <span className="metric-label">Gallery Photos</span>
            </div>
          </div>

          <div 
            className={`metric-card ${activeTab === 'events' ? 'metric-active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <div className="metric-icon-box event-color">📅</div>
            <div className="metric-content">
              <span className="metric-count">{counts.events}</span>
              <span className="metric-label">Campus Events</span>
            </div>
          </div>
        </section>

        {/* Tab Navigation Ribbon */}
        <nav className="admin-nav-tabs">
          <button
            className={`admin-tab-btn ${activeTab === 'staff' ? 'active' : ''}`}
            onClick={() => setActiveTab('staff')}
          >
            <span>👥 Staff Applications</span>
            <span className="tab-count-badge">{counts.staff}</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'admissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('admissions')}
          >
            <span>🎓 Student Admissions</span>
            <span className="tab-count-badge">{counts.admissions}</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'notices' ? 'active' : ''}`}
            onClick={() => setActiveTab('notices')}
          >
            <span>📢 Notice Board</span>
            <span className="tab-count-badge">{counts.notices}</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <span>🖼️ Photo Gallery</span>
            <span className="tab-count-badge">{counts.gallery}</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <span>📅 Upcoming Events</span>
            <span className="tab-count-badge">{counts.events}</span>
          </button>
        </nav>

        {/* Dynamic Tab Body */}
        <div className="admin-tab-body">
          {activeTab === 'staff' && <StaffTab onDataChange={refreshCounts} />}
          {activeTab === 'admissions' && <AdmissionTab onDataChange={refreshCounts} />}
          {activeTab === 'notices' && <NoticeTab onDataChange={refreshCounts} />}
          {activeTab === 'gallery' && <GalleryTab onDataChange={refreshCounts} />}
          {activeTab === 'events' && <EventTab onDataChange={refreshCounts} />}
        </div>
      </main>
    </div>
  );
}

// ── TAB: STAFF REGISTRATIONS ──────────────────────────────────────────────────
function StaffTab({ onDataChange }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchStaff = () => {
    fetch(`${API_BASE}/api/staff`, { headers: getAuthHeaders() })
      .then(r => { if (!r.ok) throw new Error('Fetch failed'); return r.json(); })
      .then(d => {
        setData(Array.isArray(d) ? d : []);
        setLoading(false);
        if (onDataChange) onDataChange();
      })
      .catch(e => { console.error(e); setLoading(false); });
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this staff application?")) return;
    await fetch(`${API_BASE}/api/staff/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    fetchStaff();
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const query = search.toLowerCase();
    return data.filter(item =>
      (item.name && item.name.toLowerCase().includes(query)) ||
      (item.email && item.email.toLowerCase().includes(query)) ||
      (item.phone && item.phone.includes(query))
    );
  }, [data, search]);

  const getInitials = (name) => {
    if (!name) return 'S';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="admin-view-card">
      <div className="view-card-header">
        <div>
          <h2 className="view-card-title">Staff Recruitment Inquiries</h2>
          <p className="view-card-subtitle">Manage candidate CVs and recruitment submissions.</p>
        </div>
        <div className="search-bar-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search candidate by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="admin-loading-state">
          <span className="admin-spinner"></span>
          <p>Loading candidate applications...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty-state">
          <span className="empty-icon">👥</span>
          <h3>No applications found</h3>
          <p>{search ? 'Try adjusting your search query.' : 'New submissions will appear here automatically.'}</p>
        </div>
      ) : (
        <div className="table-responsive-wrapper">
          <table className="modern-admin-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Contact Details</th>
                <th>Applied Date</th>
                <th>Resume (CV)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item._id}>
                  <td>
                    <div className="user-profile-cell">
                      <div className="user-avatar-circle">{getInitials(item.name)}</div>
                      <div className="user-info-text">
                        <strong className="user-name">{item.name}</strong>
                        <span className="user-sub">Applicant</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-cell">
                      <a href={`mailto:${item.email}`} className="email-link">✉️ {item.email}</a>
                      <a href={`tel:${item.phone}`} className="phone-link">📞 +91 {item.phone}</a>
                    </div>
                  </td>
                  <td>
                    <span className="date-text">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </td>
                  <td>
                    {item.resumeId ? (
                      <a
                        href={`https://vj-education.onrender.com/api/resume/${item.resumeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pill-view-pdf"
                      >
                        <span>📄 View PDF</span>
                        <span className="arrow-icon">↗</span>
                      </a>
                    ) : (
                      <span className="badge-missing">No PDF</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn-action-delete"
                      title="Delete application"
                    >
                      <span>🗑️ Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── TAB: ADMISSIONS ──────────────────────────────────────────────────────────
function AdmissionTab({ onDataChange }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('ALL');

  const fetchAdmissions = () => {
    fetch(`${API_BASE}/api/admissions`, { headers: getAuthHeaders() })
      .then(r => { if (!r.ok) throw new Error('Fetch failed'); return r.json(); })
      .then(d => {
        setData(Array.isArray(d) ? d : []);
        setLoading(false);
        if (onDataChange) onDataChange();
      })
      .catch(e => { console.error(e); setLoading(false); });
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this admission record?")) return;
    await fetch(`${API_BASE}/api/admissions/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    fetchAdmissions();
  };

  const filtered = useMemo(() => {
    return data.filter(item => {
      const matchSearch = !search.trim() ||
        (item.studentName && item.studentName.toLowerCase().includes(search.toLowerCase())) ||
        (item.fatherName && item.fatherName.toLowerCase().includes(search.toLowerCase())) ||
        (item.phone && item.phone.includes(search)) ||
        (item.address && item.address.toLowerCase().includes(search.toLowerCase()));

      const matchClass = classFilter === 'ALL' ||
        (item.class && item.class.toLowerCase() === classFilter.toLowerCase());

      return matchSearch && matchClass;
    });
  }, [data, search, classFilter]);

  return (
    <div className="admin-view-card">
      <div className="view-card-header">
        <div>
          <h2 className="view-card-title">Student Admissions Roster</h2>
          <p className="view-card-subtitle">Review prospective student applications for academic year 2026-27.</p>
        </div>
        <div className="filter-controls-row">
          <div className="search-bar-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search student, guardian, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="admin-loading-state">
          <span className="admin-spinner"></span>
          <p>Loading admissions records...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty-state">
          <span className="empty-icon">🎓</span>
          <h3>No admissions found</h3>
          <p>{search ? 'Try adjusting your search criteria.' : 'Online student applications will appear here.'}</p>
        </div>
      ) : (
        <div className="table-responsive-wrapper">
          <table className="modern-admin-table">
            <thead>
              <tr>
                <th>Student & Father</th>
                <th>Target Class</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Submission Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item._id}>
                  <td>
                    <div className="user-profile-cell">
                      <div className="user-avatar-circle student">🎓</div>
                      <div className="user-info-text">
                        <strong className="user-name">{item.studentName}</strong>
                        <span className="user-sub">Father: {item.fatherName}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="class-badge-pill">Class: {item.class}</span>
                  </td>
                  <td>
                    <div className="contact-cell">
                      <a href={`tel:${item.phone}`} className="phone-link">📞 +91 {item.phone}</a>
                      <a 
                        href={`https://wa.me/91${item.phone}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="whatsapp-quick-link"
                      >
                        💬 Chat on WhatsApp
                      </a>
                    </div>
                  </td>
                  <td>
                    <span className="address-text" title={item.address}>{item.address}</span>
                  </td>
                  <td>
                    <span className="date-text">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn-action-delete"
                      title="Delete admission record"
                    >
                      <span>🗑️ Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── TAB: NOTICES ──────────────────────────────────────────────────────────────
function NoticeTab({ onDataChange }) {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [linkType, setLinkType] = useState('url'); // 'url' or 'pdf'
  const [link, setLink] = useState('');
  const [pdf, setPdf] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNotices = () => {
    fetch(`${API_BASE}/api/notices`)
      .then(r => { if (!r.ok) throw new Error('Fetch failed'); return r.json(); })
      .then(d => {
        setNotices(Array.isArray(d) ? d : []);
        setLoading(false);
        if (onDataChange) onDataChange();
      })
      .catch(e => { console.error(e); setLoading(false); });
  };

  useEffect(() => { fetchNotices() }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (linkType === 'url' && !link) { setStatus('❌ URL Link is missing'); return; }
    if (linkType === 'pdf' && !pdf) { setStatus('❌ PDF file is missing'); return; }

    setStatus('Publishing circular...');
    const formData = new FormData();
    formData.append('title', title);
    if (linkType === 'url') formData.append('link', link);
    if (linkType === 'pdf') formData.append('pdf', pdf);

    try {
      const res = await fetch(`${API_BASE}/api/notices`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setTitle(''); setLink(''); setPdf(null);
      setStatus('✅ Notice published live to website!');
      fetchNotices();
      setTimeout(() => setStatus(''), 3500);
    } catch (err) { setStatus('❌ Error: ' + err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this notice from the public website?")) return;
    await fetch(`${API_BASE}/api/notices/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    fetchNotices();
  };

  return (
    <div className="tab-split-layout">
      {/* Create Notice Card */}
      <div className="admin-view-card add-card">
        <h2 className="view-card-title">📢 Post New Circular Notice</h2>
        <p className="view-card-subtitle">Publishes instantaneously to the homepage notice board.</p>

        {status && (
          <div className={`status-banner ${status.startsWith('✅') ? 'banner-success' : 'banner-error'}`}>
            {status}
          </div>
        )}

        <form onSubmit={handleAdd} className="admin-form-vertical">
          <div className="form-group">
            <label>Notice Announcement Title *</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. Schedule for Half-Yearly Examinations 2026-27"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Attachment Type</label>
            <div className="toggle-pill-group">
              <button
                type="button"
                className={`toggle-pill ${linkType === 'url' ? 'selected' : ''}`}
                onClick={() => setLinkType('url')}
              >
                🔗 External Web URL
              </button>
              <button
                type="button"
                className={`toggle-pill ${linkType === 'pdf' ? 'selected' : ''}`}
                onClick={() => setLinkType('pdf')}
              >
                📄 Upload PDF Document
              </button>
            </div>
          </div>

          {linkType === 'url' ? (
            <div className="form-group">
              <label>Target Web URL *</label>
              <input
                type="url"
                className="admin-input"
                placeholder="https://example.com/circular"
                value={link}
                onChange={e => setLink(e.target.value)}
                required={linkType === 'url'}
              />
            </div>
          ) : (
            <div className="form-group">
              <label>Select PDF Circular File *</label>
              <input
                type="file"
                accept="application/pdf"
                className="admin-file-input"
                onChange={e => setPdf(e.target.files[0])}
                required={linkType === 'pdf'}
              />
              {pdf && <span className="file-picked-label">Selected: {pdf.name}</span>}
            </div>
          )}

          <button type="submit" className="btn-primary-admin">
            <span>Publish to Notice Board</span>
            <span>→</span>
          </button>
        </form>
      </div>

      {/* Live Notices List */}
      <div className="admin-view-card">
        <h2 className="view-card-title">Currently Live Notices</h2>
        <p className="view-card-subtitle">Active circulars visible to all visitors on the client website.</p>

        {loading ? (
          <div className="admin-loading-state">
            <span className="admin-spinner"></span>
            <p>Loading circulars...</p>
          </div>
        ) : notices.length === 0 ? (
          <div className="admin-empty-state">
            <span className="empty-icon">📢</span>
            <h3>No notices running</h3>
            <p>Publish a notice on the left to show it here.</p>
          </div>
        ) : (
          <div className="table-responsive-wrapper">
            <table className="modern-admin-table">
              <thead>
                <tr>
                  <th>Notice Title</th>
                  <th>Attachment</th>
                  <th>Posted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notices.map(n => (
                  <tr key={n._id}>
                    <td>
                      <strong className="notice-row-title">{n.title}</strong>
                    </td>
                    <td>
                      {n.link ? (
                        <a href={n.link} target="_blank" rel="noreferrer" className="btn-pill-view-pdf">
                          <span>🔗 Open Link</span>
                          <span>↗</span>
                        </a>
                      ) : (
                        <span className="badge-missing">Text Only</span>
                      )}
                    </td>
                    <td>
                      <span className="date-text">
                        {new Date(n.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(n._id)}
                        className="btn-action-delete"
                        title="Delete notice"
                      >
                        <span>🗑️ Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── TAB: GALLERY ──────────────────────────────────────────────────────────────
function GalleryTab({ onDataChange }) {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPhotos = () => {
    fetch(`${API_BASE}/api/gallery`)
      .then(r => { if (!r.ok) throw new Error('Fetch failed'); return r.json(); })
      .then(d => {
        setPhotos(Array.isArray(d) ? d : []);
        setLoading(false);
        if (onDataChange) onDataChange();
      })
      .catch(e => { console.error(e); setLoading(false); });
  };

  useEffect(() => { fetchPhotos() }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setStatus('Uploading photo to gallery...');

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('title', title);

    try {
      const res = await fetch(`${API_BASE}/api/gallery`, {
        method: 'POST', 
        headers: getAuthHeaders(),
        body: formData
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }
      setTitle(''); setFile(null);
      setStatus('✅ Photo uploaded to gallery successfully!');
      fetchPhotos();
      setTimeout(() => setStatus(''), 3500);
    } catch (err) { setStatus('❌ Upload failed: ' + err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this photo from the gallery?")) return;
    await fetch(`${API_BASE}/api/gallery/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    fetchPhotos();
  };

  return (
    <div className="tab-split-layout">
      {/* Upload Card */}
      <div className="admin-view-card add-card">
        <h2 className="view-card-title">🖼️ Upload to Campus Gallery</h2>
        <p className="view-card-subtitle">Add campus events, sports, and classroom photos.</p>

        {status && (
          <div className={`status-banner ${status.startsWith('✅') ? 'banner-success' : 'banner-error'}`}>
            {status}
          </div>
        )}

        <form onSubmit={handleUpload} className="admin-form-vertical">
          <div className="form-group">
            <label>Select Photo Image *</label>
            <input
              type="file"
              accept="image/*"
              className="admin-file-input"
              onChange={e => setFile(e.target.files[0])}
              required
            />
            {file && <span className="file-picked-label">Selected: {file.name}</span>}
          </div>

          <div className="form-group">
            <label>Photo Caption / Title *</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. Annual Science Exhibition 2026"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary-admin">
            <span>Upload Photo</span>
            <span>→</span>
          </button>
        </form>
      </div>

      {/* Live Photos Grid */}
      <div className="admin-view-card">
        <h2 className="view-card-title">Live Gallery Photos ({photos.length})</h2>
        <p className="view-card-subtitle">Active photos currently visible to the public.</p>

        {loading ? (
          <div className="admin-loading-state">
            <span className="admin-spinner"></span>
            <p>Loading photo gallery...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="admin-empty-state">
            <span className="empty-icon">🖼️</span>
            <h3>No photos uploaded yet</h3>
            <p>Upload campus photos using the form on the left.</p>
          </div>
        ) : (
          <div className="modern-gallery-admin-grid">
            {photos.map(p => (
              <div key={p.id || p._id} className="admin-photo-card">
                <div className="photo-media-wrapper">
                  <img src={p.url} alt={p.title || 'VJ Gallery'} />
                </div>
                <div className="photo-card-info">
                  <span className="photo-title-text">{p.title || 'Untitled Photo'}</span>
                  <button
                    onClick={() => handleDelete(p.id || p._id)}
                    className="photo-delete-btn"
                    title="Delete photo"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── TAB: EVENTS ──────────────────────────────────────────────────────────────
function EventTab({ onDataChange }) {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchEvents = () => {
    fetch(`${API_BASE}/api/events`)
      .then(r => { if (!r.ok) throw new Error('Fetch failed'); return r.json(); })
      .then(d => {
        setEvents(Array.isArray(d) ? d : []);
        setLoading(false);
        if (onDataChange) onDataChange();
      })
      .catch(e => { console.error(e); setLoading(false); });
  };

  useEffect(() => { fetchEvents() }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !description || !date) { setStatus('❌ Required fields missing'); return; }

    setStatus('Publishing event...');
    try {
      const res = await fetch(`${API_BASE}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ title, description, date, link })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setTitle(''); setDescription(''); setDate(''); setLink('');
      setStatus('✅ Event published successfully!');
      fetchEvents();
      setTimeout(() => setStatus(''), 3500);
    } catch (err) { setStatus('❌ Error: ' + err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event from the website?")) return;
    await fetch(`${API_BASE}/api/events/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    fetchEvents();
  };

  return (
    <div className="tab-split-layout">
      {/* Create Event Card */}
      <div className="admin-view-card add-card">
        <h2 className="view-card-title">📅 Publish Campus Event</h2>
        <p className="view-card-subtitle">Display sports, cultural, and academic events on the homepage.</p>

        {status && (
          <div className={`status-banner ${status.startsWith('✅') ? 'banner-success' : 'banner-error'}`}>
            {status}
          </div>
        )}

        <form onSubmit={handleAdd} className="admin-form-vertical">
          <div className="form-group">
            <label>Event Title *</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. Annual Sports Championship 2026"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Event Date *</label>
            <input
              type="date"
              className="admin-input"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Event Details / Description *</label>
            <textarea
              className="admin-textarea"
              rows="3"
              placeholder="Provide a short description of the event..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Optional Event Link (Website or Registration)</label>
            <input
              type="url"
              className="admin-input"
              placeholder="https://..."
              value={link}
              onChange={e => setLink(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary-admin">
            <span>Publish Campus Event</span>
            <span>→</span>
          </button>
        </form>
      </div>

      {/* Live Events Table */}
      <div className="admin-view-card">
        <h2 className="view-card-title">Active Scheduled Events</h2>
        <p className="view-card-subtitle">Events displayed on the public website calendar.</p>

        {loading ? (
          <div className="admin-loading-state">
            <span className="admin-spinner"></span>
            <p>Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="admin-empty-state">
            <span className="empty-icon">📅</span>
            <h3>No events scheduled</h3>
            <p>Add upcoming school events using the form on the left.</p>
          </div>
        ) : (
          <div className="table-responsive-wrapper">
            <table className="modern-admin-table">
              <thead>
                <tr>
                  <th>Event Date</th>
                  <th>Title & Link</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(e => (
                  <tr key={e._id}>
                    <td>
                      <span className="event-date-pill">
                        📅 {new Date(e.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td>
                      <strong className="event-row-title">{e.title}</strong>
                      {e.link && (
                        <a href={e.link} target="_blank" rel="noreferrer" className="event-link-sub">
                          🔗 Link ↗
                        </a>
                      )}
                    </td>
                    <td>
                      <span className="event-desc-text">{e.description}</span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(e._id)}
                        className="btn-action-delete"
                        title="Delete event"
                      >
                        <span>🗑️ Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
