import React from 'react'
import './Media.css'

function Media() {
  return (
    <div className="media-container">
      <div className="media-social">
        <p className="media-label">Follow us on:</p>
        <div className="media-icons">
          <a href="https://www.facebook.com/vjeducationvj" target="_blank" className="media-link" aria-label="Facebook">
            <img src="./facebook.png" alt="Facebook" className="media-icon"/>
          </a>
          <a href="https://www.youtube.com/@VJEducation1" target="_blank" className="media-link" aria-label="YouTube">
            <img src="./youtube.png" alt="YouTube" className="media-icon"/>
          </a>
          <a href="https://www.instagram.com/vjconceptschool?igsh=bHhwYnQycGg5b2dh" target="_blank" className="media-link" aria-label="Instagram">
            <img src="./instagram.png" alt="Instagram" className="media-icon"/>
          </a>
        </div>
      </div>
      <div className="media-apps">
        <p className="media-label">Download our app:</p>
        <div className="media-icons">
          <a href="https://play.google.com/store/apps/details?id=co.lynde.dckiu" target="_blank" className="media-link" aria-label="Google Play Store">
            <img src="./play-store.png" alt="Download on Google Play Store" className="media-icon"/>
          </a>
          <a href="https://apps.apple.com/in/app/classplus/id1324522260" target="_blank" className="media-link" aria-label="Apple App Store">
            <img src="./app-store.png" alt="Download on Apple App Store" className="media-icon"/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Media