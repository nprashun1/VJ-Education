import React, { useState } from 'react'
import './Staff.css'

function Staff() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [pdf, setPdf] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [serverMsg, setServerMsg] = useState('')

  const indianPhone = /^[6-9][0-9]{9}$/

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Full name is required'
    if (!form.email.trim()) newErrors.email = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email address'
    if (!form.phone.trim()) newErrors.phone = 'Mobile number is required'
    else if (!indianPhone.test(form.phone)) newErrors.phone = 'Enter a valid 10-digit Indian mobile number (starts with 6-9)'
    if (!pdf) newErrors.pdf = 'Resume / CV (PDF) is required'
    return newErrors
  }

  const handlePdfChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      setErrors(prev => ({ ...prev, pdf: 'Only PDF files are accepted' }))
      setPdf(null)
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, pdf: 'File size must be under 5 MB' }))
      setPdf(null)
      return
    }
    setPdf(file)
    setErrors(prev => ({ ...prev, pdf: '' }))
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    if (id === 'phone') {
      if (value !== '') {
        if (!/^\d*$/.test(value)) return
        if (!/^[6-9]/.test(value)) return
        if (value.length > 10) return
      }
    }
    setForm(prev => ({ ...prev, [id]: value }))
    setErrors(prev => ({ ...prev, [id]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')
    setServerMsg('')

    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('phone', form.phone)
      formData.append('resume', pdf)

      const res = await fetch('https://vj-education.onrender.com/api/staff', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Submission failed')

      setStatus('success')
      setServerMsg(`🎉 Application Submitted Successfully! (Application ID: ${data.resumeId || 'VJ-STAFF'})`)
      setForm({ name: '', email: '', phone: '' })
      setPdf(null)
      setErrors({})
    } catch (err) {
      setStatus('error')
      setServerMsg(`❌ ${err.message}`)
    }
  }

  return (
    <div className="staff-page-wrapper">
      {/* Staff Hero Banner */}
      <section className="staff-hero">
        <div className="staff-hero-container">
          <span className="badge-pill gold">Careers & Opportunities</span>
          <h1 className="staff-hero-title">Join Our Teaching & Administrative Team</h1>
          <p className="staff-hero-subtitle">
            Are you passionate about inspiring young minds? We welcome talented, dedicated teachers 
            and staff to grow their careers with VJ Education.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="staff-layout-section">
        <div className="staff-grid-container">
          {/* Left Column: Why Work With Us */}
          <div className="staff-perks-card">
            <span className="badge-pill navy">Why VJ Education</span>
            <h2 className="perks-title">A Rewarding Place to Teach & Lead</h2>
            <p className="perks-desc">
              We value our educators as our greatest strength. Here is what you can look forward to:
            </p>

            <div className="perks-list">
              <div className="perk-box">
                <span className="perk-icon">💼</span>
                <div>
                  <strong>Competitive Compensation</strong>
                  <p>Attractive salary packages and annual increments based on merit.</p>
                </div>
              </div>

              <div className="perk-box">
                <span className="perk-icon">📈</span>
                <div>
                  <strong>Continuous Professional Training</strong>
                  <p>Regular workshops on modern pedagogical tools and classroom technology.</p>
                </div>
              </div>

              <div className="perk-box">
                <span className="perk-icon">🤝</span>
                <div>
                  <strong>Supportive Academic Culture</strong>
                  <p>A collaborative, respectful, and family-like workplace environment.</p>
                </div>
              </div>

              <div className="perk-box">
                <span className="perk-icon">🎯</span>
                <div>
                  <strong>Modern Digital Infrastructure</strong>
                  <p>Teach with smart screens, modern labs, and high-speed internet.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Card */}
          <div className="staff-card-modern">
            <div className="staff-card-top-accent"></div>
            <div className="staff-card-header">
              <h2 className="staff-form-title">Staff Application Form</h2>
              <p className="staff-form-subtitle">Submit your CV for current & upcoming openings</p>
            </div>

            {serverMsg && (
              <div className={`server-msg ${status === 'success' ? 'msg-success' : 'msg-error'}`}>
                {serverMsg}
              </div>
            )}

            <form className="staff-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name <span className="req">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                  placeholder="e.g. Dr. Priya Sharma"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="req">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="e.g. priya.sharma@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Mobile Number <span className="req">*</span>
                </label>
                <div className="phone-wrapper">
                  <span className="phone-prefix">🇮🇳 +91</span>
                  <input
                    id="phone"
                    type="tel"
                    className={`form-input phone-input ${errors.phone ? 'input-error' : ''}`}
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength={10}
                    required
                  />
                </div>
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="resume" className="form-label">
                  Resume / Curriculum Vitae (PDF) <span className="req">*</span>
                </label>
                <label htmlFor="resume" className={`pdf-upload-box ${errors.pdf ? 'input-error' : ''} ${pdf ? 'pdf-selected' : ''}`}>
                  <span className="pdf-icon">📄</span>
                  <span className="pdf-text">
                    {pdf ? pdf.name : 'Click to browse & upload PDF (Max 5 MB)'}
                  </span>
                  <input
                    id="resume"
                    type="file"
                    accept="application/pdf"
                    className="pdf-input-hidden"
                    onChange={handlePdfChange}
                  />
                </label>
                {errors.pdf && <span className="error-msg">{errors.pdf}</span>}
              </div>

              <button type="submit" className="submit-btn" disabled={status === 'loading'}>
                {status === 'loading' ? 'Submitting Application...' : 'Submit Application →'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Staff