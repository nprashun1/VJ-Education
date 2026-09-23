import React, { useState, useEffect } from 'react'
import './Event.css'

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback realistic school events if backend has none
  const defaultEvents = [
    {
      _id: 'ev-1',
      title: 'Annual Sports & Athletic Championship',
      description: 'Exciting track and field competitions, relay races, and award ceremonies for all age groups.',
      date: '2026-10-15',
      location: 'Main School Grounds',
      category: 'Sports',
      link: '/gallery'
    },
    {
      _id: 'ev-2',
      title: 'Science & Innovation Exhibition 2026',
      description: 'Students showcase working robotics models, solar inventions, and biology lab demonstrations.',
      date: '2026-11-05',
      location: 'VJ Tech Hall',
      category: 'Academic',
      link: '/School'
    },
    {
      _id: 'ev-3',
      title: 'Foundation Day & Cultural Fest',
      description: 'A grand celebration with theatrical performances, classical Indian dances, and student awards.',
      date: '2026-11-20',
      location: 'Auditorium',
      category: 'Cultural',
      link: '/gallery'
    }
  ];

  useEffect(() => {
    fetch('https://vj-education.onrender.com/api/events')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(defaultEvents);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch events:", err);
        setEvents(defaultEvents);
        setLoading(false);
      });
  }, []);

  const getMonthName = (dateString) => {
    if (!dateString) return 'OCT';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'UPCOMING' : date.toLocaleString('default', { month: 'short' }).toUpperCase();
  };

  const getDay = (dateString) => {
    if (!dateString) return '15';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? '•' : date.getDate();
  };

  return (
    <section className="events-section">
      <div className="events-container">
        <div className="events-header">
          <span className="badge-pill gold">Exciting Happenings</span>
          <h2 className="events-title">Upcoming Campus Events</h2>
          <p className="events-subtitle">
            Celebrating achievements, sportsmanship, and student creativity across the academic calendar.
          </p>
        </div>

        <div className="events-grid">
          {loading ? (
            <div className="events-loading">
              <span className="loading-spinner"></span>
              <p>Fetching scheduled events...</p>
            </div>
          ) : (
            events.map((event) => (
              <div className="event-card" key={event._id}>
                <div className="event-badge-strip">
                  <span className="event-category-tag">
                    {event.category || 'School Event'}
                  </span>
                </div>

                <div className="event-card-body">
                  {/* Calendar Date Block */}
                  <div className="event-date-box">
                    <span className="event-day">{getDay(event.date)}</span>
                    <span className="event-month">{getMonthName(event.date)}</span>
                  </div>

                  <div className="event-info">
                    <h3 className="event-card-title">{event.title}</h3>
                    {event.location && (
                      <span className="event-location-tag">
                        📍 {event.location}
                      </span>
                    )}
                    <p className="event-description">{event.description}</p>
                    
                    {event.link && (
                      <a href={event.link} className="event-action-link">
                        <span>Event Details</span>
                        <span className="event-arrow">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Event;