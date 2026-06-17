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

  const duration = 4000;

  useEffect(() => {
    fetch('https://vj-education.onrender.com/api/gallery')
      .then(res => res.json())
      .then(data => {
        setPhotos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
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
    }, 500);
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

  // Auto-slide every 1 minute
  useEffect(() => {
    if (photos.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, duration);
    return () => clearInterval(timer);
  }, [handleNext, photos.length]);

  if (loading) {
    return (
      <section className="gallery-section fade-in">
        <div className="gallery-header">
          <h2 className="gallery-title">📸 Photo Gallery</h2>
        </div>
        <div className="gallery-wrapper gallery-empty-state">
          <div className="loading-spinner"></div>
          <span className="gallery-state-text loading-text">Loading Gallery...</span>
        </div>
      </section>
    );
  }

  if (photos.length === 0) {
    return (
      <section className="gallery-section fade-in">
        <div className="gallery-header">
          <h2 className="gallery-title">📸 Photo Gallery</h2>
        </div>
        <div className="gallery-wrapper gallery-empty-state">
          <span className="gallery-state-text">No photos in the gallery yet. Check back soon!</span>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery-section fade-in">
      <div className="gallery-header">
        <h2 className="gallery-title">📸 Photo Gallery</h2>
      </div>

      <div className="gallery-wrapper">
        {/* Main Image */}
        <div className={`gallery-slide ${animating ? `slide-out-${direction}` : 'slide-in'}`}>
          <img
            src={photos[current].url}
            alt={photos[current].title}
            className="gallery-image"
          />
          <div className="gallery-overlay">
            <h3 className="photo-title">{photos[current].title}</h3>
            <p className="photo-desc">{photos[current].description}</p>
          </div>
        </div>

        {/* Prev Button */}
        {photos.length > 1 && (
          <button className="gallery-btn prev-btn" onClick={handlePrev} aria-label="Previous">
            <ArrowBackIosNewIcon fontSize="medium" />
          </button>
        )}

        {/* Next Button */}
        {photos.length > 1 && (
          <button className="gallery-btn next-btn" onClick={handleNext} aria-label="Next">
            <ArrowForwardIosIcon fontSize="medium" />
          </button>
        )}

        {/* Counter Badge */}
        <div className="gallery-counter">
          {current + 1} / {photos.length}
        </div>
      </div>
    </section>
  );
}
