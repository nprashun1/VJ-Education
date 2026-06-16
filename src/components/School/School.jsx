import React from 'react';
import './School.css';

const School = () => {
  return (
    <div className="school-container">
      <div className="school-header">
        <h2>Our School Education</h2>
        <p><b>VJ Education</b> provides holistic schooling from primary to higher secondary levels, focusing on academic excellence and overall character development.</p>
      </div>


      <div className="school-features">
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Comprehensive Curriculum</h3>
          <p>Following updated modern curriculum with a focus on core subjects and practical learning.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎓</div>
          <h3>Expert Faculty</h3>
          <p>Highly qualified and experienced teachers dedicated to nurturing every student's potential.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🖥️</div>
          <h3>Smart Classrooms</h3>
          <p>Interactive digital boards and multimedia resources to make learning engaging and effective.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚽</div>
          <h3>Sports & Extra-curriculars</h3>
          <p>A wide range of sports and cultural activities to ensure the physical and mental growth of students.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔬</div>
          <h3>Advanced Laboratories</h3>
          <p>Well-equipped science and computer labs for hands-on practical experiments.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🚌</div>
          <h3>Transport Facility</h3>
          <p>Safe and reliable school bus services covering all major routes in the city.</p>
        </div>
      </div>

      {/* <div className="school-photo-placeholder">
        <span>🏫 Space for School Photo</span>
      </div> */}
    </div>
  );
};

export default School;