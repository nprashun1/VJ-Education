import React from 'react'

const Event = () => {
  return (
    <div>
        <section class="events">
      <div class="container">
        <div class="events-header">
          <h2>🎉 Upcoming Events</h2>
          <p>Join us for exciting events and activities throughout the year!</p>
        </div>
        <div class="events-wrapper">
          <div class="event-card">
            <div class="event-date">
              <span class="day">15</span>
              <span class="month">DEC</span>
            </div>
            <div class="event-content">
              <h3>Annual Sports Day</h3>
              <p>A day filled with sports, games, and fun activities for all students.</p>
              <a href="#" class="event-link">Learn More</a>
            </div>
          </div>
          <div class="event-card">
            <div class="event-date">
              <span class="day">22</span>
              <span class="month">DEC</span>
            </div>
            <div class="event-content">
              <h3>Science Fair</h3>
              <p>Showcase your scientific talents with innovative projects and experiments.</p>
              <a href="#" class="event-link">Learn More</a>
            </div>
          </div>
          <div class="event-card">
            <div class="event-date">
              <span class="day">30</span>
              <span class="month">DEC</span>
            </div>
            <div class="event-content">
              <h3>Cultural Fest</h3>
              <p>Experience the vibrant culture through dance, music, and performances.</p>
              <a href="#" class="event-link">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Event