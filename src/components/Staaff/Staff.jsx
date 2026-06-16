import React, { useState } from 'react'
import './Staff.css'

function Staff() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [pdf, setPdf] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [serverMsg, setServerMsg] = useState('')

  const indianPhone = /^[6-9][0-9]{9}$/

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email'
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required'
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

      const res = await fetch('http://localhost:5000/api/staff', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Submission failed')

      setStatus('success')
      setServerMsg(`✅ Registered! (ID: ${data.resumeId})`)
      setForm({ name: '', email: '', phone: '' })
      setPdf(null)
      setErrors({})
    } catch (err) {
      setStatus('error')
      setServerMsg(`❌ ${err.message}`)
    }
  }

  return (
    <div className="staff-container">
      <div className="staff-card">
        <h2 className="staff-title">Staff Registration</h2>
        <p className="staff-subtitle">Fill in the details to add a new staff member</p>
        <form className="staff-form" onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name <span className="required-star">*</span>
            </label>
            <input
              id="name"
              type="text"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email <span className="required-star">*</span>
            </label>
            <input
              id="email"
              type="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number <span className="required-star">*</span>
            </label>
            <div className="phone-wrapper">
              <span className="phone-prefix">🇮🇳 +91</span>
              <input
                id="phone"
                type="tel"
                className={`form-input phone-input ${errors.phone ? 'input-error' : ''}`}
                placeholder="Enter 10-digit mobile number"
                value={form.phone}
                onChange={handleChange}
                maxLength={10}
                pattern="[6-9][0-9]{9}"
                required
              />
            </div>
            {errors.phone && <span className="error-msg">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="resume" className="form-label">
              Resume / CV <span className="required-star">*</span>
            </label>
            <label htmlFor="resume" className={`pdf-upload-label ${errors.pdf ? 'input-error' : ''} ${pdf ? 'pdf-selected' : ''}`}>
              <span className="pdf-icon">📄</span>
              <span className="pdf-text">
                {pdf ? pdf.name : 'Click to upload PDF (max 5 MB)'}
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

          {serverMsg && (
            <div className={`server-msg ${status === 'success' ? 'msg-success' : 'msg-error'}`}>
              {serverMsg}
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Staff