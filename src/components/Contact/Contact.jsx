import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <div className="contact-details">
              <span className="contact-label">Phone:</span>
              <a href="tel:+916207146144" className="contact-link">+91 6207146144</a>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">💬</span>
            <div className="contact-details">
              <span className="contact-label">WhatsApp:</span>
              <a href="https://wa.me/916207146144" className="contact-link" target="_blank" rel="noopener noreferrer">+91 6207146144</a>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <div className="contact-details">
              <span className="contact-label">Email:</span>
              <a href="mailto:vjcoachingkaemail@gmail.com" className="contact-link">vjcoachingkaemail@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="branch-info">
          <div className="branch-item">
            <span className="branch-icon">📍</span>
            <div className="branch-details">
              <span className="branch-label">Branch:</span>
              <h3>Near gaytri mandir, Nala Road, Bihar sharif, Nalanda, Bihar 803101</h3>
              <p>Open 8 Am to 6 pm   Monday to Sunday</p>
              <div className="map-container">
                <iframe 
                  src="https://maps.google.com/maps?q=VJ%20Education%20Concept%20School,%20Bihar%20sharif&t=&z=18&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="300" 
                  className="map-iframe" 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact