import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [msgStatus, setMsgStatus] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', query: '' });

  const handleQuickMsg = (e) => {
    e.preventDefault();
    setMsgStatus('sent');
    setTimeout(() => {
      setMsgStatus(null);
      setFormData({ name: '', phone: '', query: '' });
    }, 4000);
  };

  return (
    <div className="contact-page-wrapper">
      {/* Contact Hero Banner */}
      <section className="contact-hero">
        <div className="contact-hero-container">
          <span className="badge-pill gold">We're Here For You</span>
          <h1 className="contact-hero-title">Connect With VJ Education</h1>
          <p className="contact-hero-subtitle">
            Have questions about admissions, fees, hostel, or faculty? Reach out to our team 
            via call, WhatsApp, or visit our campus.
          </p>
        </div>
      </section>

      {/* Main Grid: Info Cards & Message Form */}
      <section className="contact-content-section">
        <div className="contact-cards-grid">
          {/* Phone Card */}
          <div className="contact-method-card">
            <div className="method-icon-box phone">📞</div>
            <div className="method-text">
              <span className="method-label">Call Our Helpdesk</span>
              <a href="tel:+916207146144" className="method-val">+91 6207146144</a>
              <span className="method-note">Available Mon-Sat (8 AM - 6 PM)</span>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="contact-method-card">
            <div className="method-icon-box whatsapp">💬</div>
            <div className="method-text">
              <span className="method-label">Chat on WhatsApp</span>
              <a 
                href="https://wa.me/916207146144" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="method-val"
              >
                +91 6207146144
              </a>
              <span className="method-note">Instant guidance & brochure</span>
            </div>
          </div>

          {/* Email Card */}
          <div className="contact-method-card">
            <div className="method-icon-box email">✉️</div>
            <div className="method-text">
              <span className="method-label">Email Communications</span>
              <a href="mailto:vjcoachingkaemail@gmail.com" className="method-val">
                vjcoachingkaemail@gmail.com
              </a>
              <span className="method-note">Official inquiries & notices</span>
            </div>
          </div>
        </div>

        {/* Split Section: Direct Inquiry Form + Google Maps */}
        <div className="contact-split-section">
          {/* Quick Inquiry Form */}
          <div className="contact-form-card">
            <h2 className="form-card-title">Send a Quick Message</h2>
            <p className="form-card-desc">Leave your details and our team will get back to you within 24 hours.</p>

            {msgStatus === 'sent' && (
              <div className="quick-msg-alert">
                ✅ Thank you! Your message has been received. Our counselor will contact you.
              </div>
            )}

            <form onSubmit={handleQuickMsg} className="quick-contact-form">
              <div className="form-field">
                <label>Your Name *</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-field">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  placeholder="10 digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-field">
                <label>Inquiry / Query *</label>
                <textarea
                  rows="4"
                  placeholder="Tell us what you'd like to know..."
                  value={formData.query}
                  onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary form-submit-btn">
                <span>Send Message</span>
                <span>→</span>
              </button>
            </form>
          </div>

          {/* Campus Map & Address Box */}
          <div className="contact-map-card">
            <div className="map-card-header">
              <div className="map-pin-pill">📍 Main Campus</div>
              <h3 className="campus-address-title">VJ Education Concept School</h3>
              <p className="campus-address-line">
                Near Gayatri Mandir, Nala Road, Bihar Sharif, Nalanda, Bihar - 803101
              </p>
              <div className="campus-timings">
                <span>🕒 <strong>Visiting Hours:</strong> 8:00 AM - 6:00 PM (Monday to Sunday)</span>
              </div>
            </div>

            <div className="map-embed-wrapper">
              <iframe 
                src="https://maps.google.com/maps?q=VJ%20Education%20Concept%20School,%20Bihar%20sharif&t=&z=18&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="320" 
                title="VJ Education Campus Map"
                className="map-iframe" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact