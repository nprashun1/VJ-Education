import React, { useState } from 'react'
import './AdmissionForm.css'

function AdmissionForm() {
  const [form, setForm] = useState({
    studentName: '',
    fatherName: '',
    class: '',
    phone: '',
    address: ''
  })
  const [status, setStatus] = useState(null)
  const [serverMsg, setServerMsg] = useState('')

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'phone') {
      if (value !== '') {
        if (!/^\d*$/.test(value)) return;
        if (!/^[6-9]/.test(value)) return;
        if (value.length > 10) return;
      }
    }

    if (id === 'class') {
      if (value !== '') {
        if (value.length > 20) return;
      }
    }

    setForm({ ...form, [id]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setServerMsg('')

    try {
      const res = await fetch('https://vj-education.onrender.com/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')

      setStatus('success')
      setServerMsg('🎉 Application Submitted Successfully! Our admissions counselor will call you shortly.')
      setForm({ studentName: '', fatherName: '', class: '', phone: '', address: '' })
    } catch (err) {
      setStatus('error')
      setServerMsg(`❌ ${err.message}`)
    }
  }

  return (
    <div className="admission-page-wrapper">
      <div className="admission-layout-container">
        {/* Left Side: Admission Benefits & Info */}
        <div className="admission-info-card">
          <span className="badge-pill gold">Academic Session 2026-27</span>
          <h1 className="admission-hero-title">Join VJ Education Family</h1>
          <p className="admission-hero-desc">
            Give your child the ideal launchpad for academic success, sportsmanship, and values.
          </p>

          <div className="admission-steps-list">
            <div className="step-item">
              <span className="step-number">1</span>
              <div>
                <strong>Submit Application</strong>
                <p>Fill out the online student enquiry form with your contact details.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">2</span>
              <div>
                <strong>Counseling & Campus Tour</strong>
                <p>Visit our campus to interact with faculty and inspect facilities.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">3</span>
              <div>
                <strong>Confirmation & Welcome</strong>
                <p>Complete document verification and secure your child's seat.</p>
              </div>
            </div>
          </div>

          <div className="admission-helpline-box">
            <span className="helpline-icon">📞</span>
            <div>
              <span className="helpline-label">Admissions Helpline</span>
              <span className="helpline-number">+91 6207146144</span>
            </div>
          </div>
        </div>

        {/* Right Side: Modern Admission Form Card */}
        <div className="admission-card-modern">
          <div className="card-top-accent"></div>
          <div className="card-header-area">
            <h2 className="form-heading">Online Admission Form</h2>
            <p className="form-subheading">Please provide accurate details below</p>
          </div>

          {serverMsg && (
            <div className={`server-msg ${status === 'success' ? 'msg-success' : 'msg-error'}`}>
              {serverMsg}
            </div>
          )}

          <form className="admission-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="studentName" className="form-label">
                Student's Full Name <span className="req">*</span>
              </label>
              <div className="input-field-wrapper">
                <span className="input-icon">👤</span>
                <input
                  id="studentName"
                  className="form-input"
                  placeholder="e.g. Rahul Kumar"
                  value={form.studentName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="fatherName" className="form-label">
                Father's / Guardian's Name <span className="req">*</span>
              </label>
              <div className="input-field-wrapper">
                <span className="input-icon">👨‍👧</span>
                <input
                  id="fatherName"
                  className="form-input"
                  placeholder="e.g. Suresh Kumar"
                  value={form.fatherName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row-dual">
              <div className="form-group">
                <label htmlFor="class" className="form-label">
                  Admission For Class <span className="req">*</span>
                </label>
                <div className="input-field-wrapper">
                  <span className="input-icon">🎒</span>
                  <input
                    id="class"
                    className="form-input"
                    placeholder="e.g. 6th, 9th, 11th"
                    value={form.class}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Mobile Number (10 Digits) <span className="req">*</span>
                </label>
                <div className="input-field-wrapper">
                  <span className="input-icon">📱</span>
                  <input
                    id="phone"
                    type="tel"
                    className="form-input"
                    placeholder="e.g. 9876543210"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Residential Address & City <span className="req">*</span>
              </label>
              <div className="input-field-wrapper">
                <span className="input-icon">📍</span>
                <input
                  id="address"
                  className="form-input"
                  placeholder="e.g. Nala Road, Bihar Sharif"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <span>Submitting Application...</span>
              ) : (
                <span>Submit Admission Form →</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdmissionForm
