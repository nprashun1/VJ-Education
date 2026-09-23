import React, { useState, useEffect, useCallback } from 'react';
import './Gallery.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const [loading, setLoading] = useState(true);

  // Fallback high-quality campus photos
  const defaultPhotos = [
    {
      _id: 'g1',
      url: '/logo dp.jpg',
      title: 'VJ Education Campus Flagship Entrance',
      description: 'Modern, secure and student-friendly environment welcoming students every morning.',
      category: 'Campus'
    },
    {
      _id: 'g2',
      url: '/logo dp.jpg',
      title: 'Digital Smart Classroom Session',
      description: 'Interactive screens and collaborative seating for deeper conceptual understanding.',
      category: 'Academics'
    },
    {
      _id: 'g3',
      url: '/logo dp.jpg',
      title: 'Annual Sports & Athletic Meet',
      description: 'Fostering teamwork, endurance, and sporting spirit across track and field events.',
      category: 'Sports'
    }
  ];

  const duration = 5000;

  useEffect(() => {
    fetch('https://vj-education.onrender.com/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPhotos(data);
        } else {
          setPhotos(defaultPhotos);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Gallery fetch failed, using fallback:", err);
        setPhotos(defaultPhotos);
        setLoading(false);
      });
  }, []);

  const goTo = useCallback((index, dir = 'next') => {
    if (animating || photos.length === 0) return;
    setAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  }, [animating, photos.length]);

  const handleNext = useCallback(() => {
    if (photos.length <= 1) return;
    const next = (current + 1) % photos.length;
    goTo(next, 'next');
  }, [current, goTo, photos.length]);

  const handlePrev = useCallback(() => {
    if (photos.length <= 1) return;
    const prev = (current - 1 + photos.length) % photos.length;
    goTo(prev, 'prev');
  }, [current, goTo, photos.length]);

  useEffect(() => {
    if (photos.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, duration);
    return () => clearInterval(timer);
  }, [handleNext, photos.length]);

  return (
    <section className="gallery-section">
      <div className="gallery-header-area">
        <span className="badge-pill gold">Visual Tour</span>
        <h1 className="gallery-main-title">Campus Life & Memories</h1>
        <p className="gallery-sub-text">
          Explore moments of celebration, discovery, and sportsmanship at VJ Education.
        </p>
      </div>

      <div className="gallery-main-container">
        {loading ? (
          <div className="gallery-loading-card">
            <span className="spinner-ring"></span>
            <p>Loading photo memories...</p>
          </div>
        ) : (
          <>
            <div className="gallery-viewport">
              <div className={`gallery-slide-card ${animating ? `slide-out-${direction}` : 'slide-in'}`}>
                <img
                  src={photos[current].url}
                  alt={photos[current].title || 'VJ Education'}
                  className="gallery-main-image"
                />
                <div className="gallery-caption-overlay">
                  <span className="caption-tag">
                    {photos[current].category || 'Campus Moment'}
                  </span>
                  <h3 className="caption-title">{photos[current].title}</h3>
                  {photos[current].description && (
                    <p className="caption-desc">{photos[current].description}</p>
                  )}
                </div>
              </div>

              {/* Prev / Next Floating Arrows */}
              {photos.length > 1 && (
                <>
                  <button className="nav-arrow-btn prev" onClick={handlePrev} aria-label="Previous Photo">
                    <ArrowBackIosNewIcon fontSize="small" />
                  </button>
                  <button className="nav-arrow-btn next" onClick={handleNext} aria-label="Next Photo">
                    <ArrowForwardIosIcon fontSize="small" />
                  </button>
                </>
              )}

              {/* Image Counter Pill */}
              <div className="gallery-count-pill">
                {current + 1} / {photos.length}
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            {photos.length > 1 && (
              <div className="gallery-thumb-strip">
                {photos.map((item, idx) => (
                  <button
                    key={item._id || idx}
                    className={`thumb-btn ${idx === current ? 'active-thumb' : ''}`}
                    onClick={() => goTo(idx, idx > current ? 'next' : 'prev')}
                  >
                    <img src={item.url} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
