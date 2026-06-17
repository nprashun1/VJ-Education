import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Media from './components/Media/Media'
import Event from './components/Event/Event'

function App() {
  const [notices, setNotices] = useState([])

  useEffect(() => {
    fetch('https://vj-education.onrender.com/api/notices')
      .then(res => res.json())
      .then(data => setNotices(Array.isArray(data) ? data : []))
      .catch(err => console.error("Failed to load notices:", err))
  }, [])

  return (
    <>
      <div className="sections-row">
        <section className="notice-board">
          <h2>Notice Board</h2>
          <marquee direction="up" height="150" onMouseOver={(e) => e.currentTarget.stop()} onMouseOut={(e) => e.currentTarget.start()}>
            {notices.length === 0 ? (
              <div className="no-notices">No notices available.</div>
            ) : (
              notices.map(notice => (
                <div key={notice._id} className="notice-item">
                  {notice.link ? (
                    <a href={notice.link} target='_blank' rel="noopener noreferrer">{notice.title}</a>
                  ) : (
                    <span className="notice-title-text">{notice.title}</span>
                  )}
                </div>
              ))
            )}
          </marquee>
        </section>
        <section>
          <h2>Admission</h2>
          <p>Admission is open for the session 2026-27<br></br>
            Please contact the school office for more details.</p>
          <Link to="/admission">
            Fill the Form
          </Link>
        </section>
      </div>
      <Event />
      <div className="home-about-container">
        <div className="home-about-content">
          <h2>About Us:</h2>
          <p>In your child's education journey, choosing the right school is one of the most important decisions you'll make.</p>
          <Link to="/About">Read More</Link>
        </div>
      </div>
      <Media />
    </>
  )
}

export default App