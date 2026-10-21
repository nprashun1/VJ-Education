import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Gallery.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Kept outside the component so it has a stable memory reference
const DEFAULT_PHOTOS = [
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

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const [loading, setLoading] = useState(true);

  const duration = 5000;
  const isAnimatingRef = useRef(false);
  const transitionTimeoutRef = useRef(null);

  // Fetch campus photos
  useEffect(() => {
    let isMounted = true;

    const fetchGallery = async () => {
      try {
        const res = await fetch('https://vj-education.onrender.com/api/gallery');
        if (!res.ok) throw new Error('Failed to fetch gallery');
        const data = await res.json();
        
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setPhotos(data);
          } else {
            setPhotos(DEFAULT_PHOTOS);
          }
        }
      } catch (err) {
        console.error('Gallery fetch failed, using fallback:', err);
        if (isMounted) {
          setPhotos(DEFAULT_PHOTOS);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGallery();

    return () => {
      isMounted = false;
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Universal navigation handler accepting either a static index or updater function
  const goTo = useCallback((targetIndexOrUpdater, dir = 'next') => {
    if (isAnimatingRef.current || photos.length <= 1) return;

    isAnimatingRef.current = true;
    setAnimating(true);
    setDirection(dir);

    transitionTimeoutRef.current = setTimeout(() => {
      setCurrent((prev) => {
        const nextIndex = typeof targetIndexOrUpdater === 'function'
          ? targetIndexOrUpdater(prev)
          : targetIndexOrUpdater;
        return (nextIndex + photos.length) % photos.length;
      });
      isAnimatingRef.current = false;
      setAnimating(false);
    }, 400);
  }, [photos.length]);

  const handleNext = useCallback(() => {
    goTo((prev) => prev + 1, 'next');
  }, [goTo]);

  const handlePrev = useCallback(() => {
    goTo((prev) => prev - 1, 'prev');
  }, [goTo]);

  // Autoplay timer with stable cadence
  useEffect(() => {
    if (photos.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, duration);

    return () => clearInterval(timer);
  }, [handleNext, photos.length, duration]);

  const currentPhoto = photos[current];

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
        ) : currentPhoto ? (
          <>
            <div className="gallery-viewport">
              <div className={`gallery-slide-card ${animating ? `slide-out-${direction}` : 'slide-in'}`}>
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.title || 'VJ Education'}
                  className="gallery-main-image"
                />
                <div className="gallery-caption-overlay">
                  <span className="caption-tag">
                    {currentPhoto.category || 'Campus Moment'}
                  </span>
                  <h3 className="caption-title">{currentPhoto.title}</h3>
                  {currentPhoto.description && (
                    <p className="caption-desc">{currentPhoto.description}</p>
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
        ) : null}
      </div>
    </section>
  );
}