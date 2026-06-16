import React from 'react';
import './Coaching.css';

const Coaching = () => {
  return (
    <div className="coaching-container">
      <div className="coaching-header">
        <h2>VJ Coaching Institute</h2>
        <p><b>VJ Education</b> offers premier coaching for competitive exams, board preparations, and foundational courses with a proven track record of success.</p>
      </div>

      <div className="coaching-features">
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Competitive Exam Prep</h3>
          <p>Specialized batches for JEE, NEET, and other national level competitive examinations.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>Comprehensive Material</h3>
          <p>High-quality, meticulously designed study materials, DPPs (Daily Practice Problems), and notes.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Regular Mock Tests</h3>
          <p>Weekly and monthly test series to track progress and simulate the real exam environment.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">👨‍🏫</div>
          <h3>Doubt Clearing Sessions</h3>
          <p>Dedicated 1-on-1 and group doubt solving counters to ensure conceptual clarity.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Performance Tracking</h3>
          <p>Detailed performance analysis reports shared regularly with students and parents.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💡</div>
          <h3>Motivational Seminars</h3>
          <p>Regular guidance and motivational sessions from toppers and experts to keep spirits high.</p>
        </div>
      </div>

      {/* <div className="coaching-photo-placeholder">
        <span>📖 Space for Coaching Photo</span>
      </div> */}

    </div>
  );
};

export default Coaching;