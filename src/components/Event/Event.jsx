import React, { useState, useEffect } from 'react'

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://vj-education.onrender.com/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, []);

  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' }).toUpperCase();
  };

  const getDay = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  return (
    <div>
      <section className="events">
        <div className="container">
          <div className="events-header">
            <h2>🎉 Upcoming Events</h2>
            <p>Join us for exciting events and activities throughout the year!</p>
          </div>
          <div className="events-wrapper">
            {loading ? (
              <p>Loading events...</p>
            ) : events.length === 0 ? (
              <p>No upcoming events currently scheduled.</p>
            ) : (
              events.map((event) => (
                <div className="event-card" key={event._id}>
                  <div className="event-date">
                    <span className="day">{getDay(event.date)}</span>
                    <span className="month">{getMonthName(event.date)}</span>
                  </div>
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    {event.link && <a href={event.link} target="_blank" rel="noreferrer" className="event-link">Learn More</a>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Event