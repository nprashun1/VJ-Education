import React from 'react'
import './Media.css'

function Media() {
  return (
    <section className="media-section-wrapper">
      <div className="media-card-box">
        {/* Left: Connect With Us */}
        <div className="media-block">
          <div className="media-block-header">
            <span className="media-badge">Stay Connected</span>
            <h3 className="media-title">Follow VJ Education</h3>
          </div>
          <div className="media-icons-row">
            <a 
              href="https://www.facebook.com/vjeducationvj" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn facebook" 
              aria-label="Facebook"
            >
              <img src="/facebook.png" alt="Facebook" className="social-img" />
              <span>Facebook</span>
            </a>
            <a 
              href="https://www.youtube.com/@VJEducation1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn youtube" 
              aria-label="YouTube"
            >
              <img src="/youtube.png" alt="YouTube" className="social-img" />
              <span>YouTube</span>
            </a>
            <a 
              href="https://www.instagram.com/vjconceptschool?igsh=bHhwYnQycGg5b2dh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn instagram" 
              aria-label="Instagram"
            >
              <img src="/instagram.png" alt="Instagram" className="social-img" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Center Divider */}
        <div className="media-center-divider"></div>

        {/* Right: E-Learning Mobile Apps */}
        <div className="media-block">
          <div className="media-block-header">
            <span className="media-badge gold">Smart Learning</span>
            <h3 className="media-title">Download Student App</h3>
          </div>
          <div className="app-download-row">
            <a 
              href="https://play.google.com/store/apps/details?id=co.lynde.dckiu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="app-store-pill google-play" 
              aria-label="Google Play Store"
            >
              <img src="/play-store.png" alt="Google Play" className="app-icon" />
              <div className="app-text">
                <span className="app-sub">GET IT ON</span>
                <span className="app-name">Google Play</span>
              </div>
            </a>
            <a 
              href="https://apps.apple.com/in/app/classplus/id1324522260" 
              target="_blank" 
              rel="noopener noreferrer"
              className="app-store-pill apple-store" 
              aria-label="Apple App Store"
            >
              <img src="/app-store.png" alt="Apple Store" className="app-icon" />
              <div className="app-text">
                <span className="app-sub">Download on the</span>
                <span className="app-name">App Store</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Media