import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const ADMIN_PASSWORD = "admin";

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(null);
  const [activeTab, setActiveTab] = useState('staff'); // staff | admissions | notices | gallery

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(null);
    } else {
      setAuthError("Incorrect Password! Access Denied.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box">
          <h2>🔒 Super Admin Portal</h2>
          <p>Please enter the admin password to access CMS controls.</p>
          <form onSubmit={handleLogin} className="admin-login-form">
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          {authError && <p className="admin-error-text">{authError}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <div className="admin-header">
        <h2>VJ Admin Control Panel</h2>
        <div className="admin-tabs">
          <button className={activeTab === 'staff' ? 'active-tab' : ''} onClick={() => setActiveTab('staff')}>Staff Registrations</button>
          <button className={activeTab === 'admissions' ? 'active-tab' : ''} onClick={() => setActiveTab('admissions')}>Admissions</button>
          <button className={activeTab === 'notices' ? 'active-tab' : ''} onClick={() => setActiveTab('notices')}>Notice Board</button>
          <button className={activeTab === 'gallery' ? 'active-tab' : ''} onClick={() => setActiveTab('gallery')}>Photo Gallery</button>
        </div>
      </div>

      <div className="admin-content-area">
        {activeTab === 'staff' && <StaffTab />}
        {activeTab === 'admissions' && <AdmissionTab />}
        {activeTab === 'notices' && <NoticeTab />}
        {activeTab === 'gallery' && <GalleryTab />}
      </div>
    </div>
  );
}

// ── TAB: STAFF REGISTRATIONS ──────────────────────────────────────────────────
function StaffTab() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStaff = () => {
    fetch('http://localhost:5000/api/staff')
      .then(r => { if (!r.ok) throw new Error('Fetch failed'); return r.json(); })
      .then(d => { setData(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(e => { console.error(e); setLoading(false); });
  }

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this staff registration forever?")) return;
    await fetch(`http://localhost:5000/api/staff/${id}`, { method: 'DELETE' });
    fetchStaff();
  }

  if (loading) return <div className="admin-loading">Loading staff data...</div>;

  return (
    <div className="admin-card">
      <h3 className="card-title">Pending Staff Registrations</h3>
      {data.length === 0 ? <p>No staff applications found.</p> : (
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Applied Date</th><th>Resume</th><th>Action</th></tr></thead>
          <tbody>
            {data.map(item => (
               <tr key={item._id}>
                 <td><strong>{item.name}</strong></td>
                 <td>{item.email}</td>
                 <td>{item.phone}</td>
                 <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                 <td>
                   {item.resumeId ? <a href={`http://localhost:5000/api/resume/${item.resumeId}`} target="_blank" className="view-resume-btn">📄 View PDF</a> : '-'}
                 </td>
                 <td><button onClick={()=>handleDelete(item._id)} className="delete-btn">🗑️</button></td>
               </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ── TAB: ADMISSIONS ──────────────────────────────────────────────────────────
function AdmissionTab() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdmissions = () => {
    fetch('http://localhost:5000/api/admissions')
      .then(r => { if (!r.ok) throw new Error('Fetch failed'); return r.json(); })
      .then(d => { setData(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(e => { console.error(e); setLoading(false); });
  }

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this admission record forever?")) return;
    await fetch(`http://localhost:5000/api/admissions/${id}`, { method: 'DELETE' });
    fetchAdmissions();
  }

  if (loading) return <div className="admin-loading">Loading admission data...</div>;

  return (
    <div className="admin-card">
      <h3 className="card-title">Student Admission Inquiries</h3>
      {data.length === 0 ? <p>No admission forms found.</p> : (
        <table className="admin-table">
          <thead><tr><th>Student</th><th>Father's Name</th><th>Class</th><th>Phone</th><th>Address</th><th>Date</th><th>Action</th></tr></thead>
          <tbody>
            {data.map(item => (
               <tr key={item._id}>
                 <td><strong>{item.studentName}</strong></td>
                 <td>{item.fatherName}</td>
                 <td><span className="badge">{item.class}</span></td>
                 <td>{item.phone}</td>
                 <td>{item.address}</td>
                 <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                 <td><button onClick={()=>handleDelete(item._id)} className="delete-btn">🗑️</button></td>
               </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ── TAB: NOTICES ──────────────────────────────────────────────────────────────
function NoticeTab() {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [linkType, setLinkType] = useState('url'); // 'url' or 'pdf'
  const [link, setLink] = useState('');
  const [pdf, setPdf] = useState(null);
  const [status, setStatus] = useState('');

  const fetchNotices = () => {
    fetch('http://localhost:5000/api/notices')
      .then(r => { if (!r.ok) throw new Error('Fetch failed'); return r.json(); })
      .then(d => setNotices(Array.isArray(d) ? d : []))
      .catch(e => console.error(e));
  }

  useEffect(() => { fetchNotices() }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (linkType === 'url' && !link) { setStatus('❌ URL Link is missing'); return; }
    if (linkType === 'pdf' && !pdf) { setStatus('❌ PDF file is missing'); return; }
    
    setStatus('Saving...');
    const formData = new FormData();
    formData.append('title', title);
    if (linkType === 'url') formData.append('link', link);
    if (linkType === 'pdf') formData.append('pdf', pdf);

    try {
      const res = await fetch('http://localhost:5000/api/notices', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setTitle(''); setLink(''); setPdf(null); setStatus('✅ Added successfully!');
      fetchNotices();
      setTimeout(() => setStatus(''), 3000);
    } catch (err) { setStatus('❌ Error: ' + err.message); }
  }

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this notice?")) return;
    await fetch(`http://localhost:5000/api/notices/${id}`, { method: 'DELETE' });
    fetchNotices();
  }

  return (
    <div>
      <div className="admin-card add-form-card">
        <h3 className="card-title">➕ Post New Notice</h3>
        <form onSubmit={handleAdd} className="row-form" style={{flexDirection: 'column', alignItems: 'flex-start'}}>
          <input type="text" placeholder="Notice Text / Title *" value={title} onChange={e=>setTitle(e.target.value)} required style={{width: '100%'}}/>
          
          <div style={{display: 'flex', gap: '20px', marginTop: '10px', marginBottom: '10px'}}>
            <label><input type="radio" checked={linkType === 'url'} onChange={() => setLinkType('url')} /> Enter URL Link</label>
            <label><input type="radio" checked={linkType === 'pdf'} onChange={() => setLinkType('pdf')} /> Upload PDF File</label>
          </div>

          {linkType === 'url' ? (
             <input type="url" placeholder="https://example.com *" value={link} onChange={e=>setLink(e.target.value)} style={{width: '100%'}} required={linkType==='url'} />
          ) : (
             <input type="file" accept="application/pdf" onChange={e=>setPdf(e.target.files[0])} style={{width: '100%'}} required={linkType==='pdf'} />
          )}

          <button type="submit" className="action-btn" style={{marginTop: '10px'}}>Post to Website</button>
        </form>
        {status && <p className="status-msg">{status}</p>}
      </div>

      <div className="admin-card">
        <h3 className="card-title">Live Notices on Website</h3>
        {notices.length === 0 ? <p>No notices running.</p> : (
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Link / PDF</th><th>Posted On</th><th>Action</th></tr></thead>
            <tbody>
              {notices.map(n => (
                <tr key={n._id}>
                  <td>{n.title}</td>
                  <td><a href={n.link} target="_blank" rel="noreferrer">Open Link</a></td>
                  <td>{new Date(n.createdAt).toLocaleDateString()}</td>
                  <td><button onClick={()=>handleDelete(n._id)} className="delete-btn">🗑️ Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

// ── TAB: GALLERY ──────────────────────────────────────────────────────────────
function GalleryTab() {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  const fetchPhotos = () => {
    fetch('http://localhost:5000/api/gallery')
      .then(r => { if (!r.ok) throw new Error('Fetch failed'); return r.json(); })
      .then(d => setPhotos(Array.isArray(d) ? d : []))
      .catch(e => console.error(e));
  }
  
  useEffect(() => { fetchPhotos() }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setStatus('Uploading...');
    
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('title', title);

    try {
      const res = await fetch('http://localhost:5000/api/gallery', {
        method: 'POST', body: formData
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }
      setTitle(''); setFile(null); setStatus('✅ Uploaded successfully!');
      fetchPhotos();
      setTimeout(() => setStatus(''), 3000);
    } catch (err) { setStatus('❌ Upload failed: ' + err.message); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this photo? This will remove it from the public gallery.")) return;
    await fetch(`http://localhost:5000/api/gallery/${id}`, { method: 'DELETE' });
    fetchPhotos();
  }

  return (
    <div>
      <div className="admin-card add-form-card">
        <h3 className="card-title">➕ Upload to Gallery</h3>
        <form onSubmit={handleUpload} className="row-form">
          <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} required />
          <input type="text" placeholder="Photo Caption *" value={title} onChange={e=>setTitle(e.target.value)} required />
          <button type="submit" className="action-btn">Upload Photo</button>
        </form>
        {status && <p className="status-msg">{status}</p>}
      </div>

      <div className="admin-card">
        <h3 className="card-title">Live Gallery Photos</h3>
        <div className="gallery-grid">
          {photos.length === 0 ? <p>No photos found.</p> : photos.map(p => (
            <div key={p.id} className="gallery-admin-item">
              <img src={p.url} alt={p.title} />
              <div className="gallery-meta">
                <span>{p.title}</span>
                <button onClick={()=>handleDelete(p.id)} className="delete-icon-btn">❌</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
