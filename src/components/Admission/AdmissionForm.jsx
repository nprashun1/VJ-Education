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
        if (!/^\d*$/.test(value)) return;
        if (value.length > 2) return;
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
      setServerMsg('✅ Application Submited Successfully! We will contact you soon.')
      setForm({ studentName: '', fatherName: '', class: '', phone: '', address: '' })
    } catch (err) {
      setStatus('error')
      setServerMsg(`❌ ${err.message}`)
    }
  }

  return (
    <div className="admission-container">
      <div className="admission-card">
        <h2 className="admission-title">Student Admission</h2>
        <p className="admission-subtitle">Apply for session 2026-27</p>

        {serverMsg && (
          <div className={`server-msg ${status === 'success' ? 'msg-success' : 'msg-error'}`}>
            {serverMsg}
          </div>
        )}

        <form className="admission-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="studentName" className="form-label">Student Name *</label>
            <input id="studentName" className="form-input" value={form.studentName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="fatherName" className="form-label">Father's Name *</label>
            <input id="fatherName" className="form-input" value={form.fatherName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="class" className="form-label">Admission For Class *</label>
            <input id="class" className="form-input" placeholder="e.g. 5th, 10th" value={form.class} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone Number *</label>
            <input id="phone" type="tel" className="form-input" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">Address *</label>
            <input id="address" className="form-input" value={form.address} onChange={handleChange} required />
          </div>

          <button type="submit" className="submit-btn" disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdmissionForm
