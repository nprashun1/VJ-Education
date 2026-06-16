import React from 'react';
import './Hostel.css';

const Hostel = () => {
  return (
    <div className="hostel-container">
      <div className="hostel-header">
        <h2>Our Hostel Facilities</h2>
        <p><b>VJ Education</b> offers safe, modern, and affordable hostel facilities for both boys and girls, ensuring a comfortable and conducive environment for focused learning.</p>
      </div>

      {/* <div className="hostel-photo-placeholder">
        <span>📷 Space for Hostel Photo</span>
      </div> */}

      <div className="hostel-features">
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>24/7 Security</h3>
          <p>Round-the-clock security personnel and CCTV surveillance to ensure complete safety of all students.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📶</div>
          <h3>High-Speed Wi-Fi</h3>
          <p>Seamless internet connectivity across the premises to support digital learning and research.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🍽️</div>
          <h3>Nutritious Meals</h3>
          <p>Hygienic and well-balanced meals served in a clean dining hall, catering to various dietary needs.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Study Rooms</h3>
          <p>Quiet, well-lit study areas designed to provide the perfect atmosphere for uninterrupted focus.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Power Backup</h3>
          <p>100% power backup to ensure that essential services and study times are never disrupted.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🧹</div>
          <h3>Housekeeping</h3>
          <p>Daily cleaning and laundry services available to maintain a hygienic and pleasant living space.</p>
        </div>
      </div>

      <div className="hostel-address-section">
        <h3>📍 Location</h3>
        <p>
          <strong>VJ Hostel</strong><br />
          Manta Complex, Near SBI Nai Sara,<br />
          Bihar Sharif, Nalanda
        </p>
        <div className="hostel-note">
          <strong>Note:</strong> For any hostel-related queries, please contact the school.
        </div>
      </div>
    </div>
  );
};

export default Hostel;