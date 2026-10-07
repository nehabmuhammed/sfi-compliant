import { useState, useEffect, useCallback } from 'react';
import api from '../api.js';

export default function Gallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await api.get('/gallery');
        if (response.data.success) {
          setGalleryData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const total = galleryData.length;

  const goTo = useCallback(
    (index) => {
      if (total === 0) return;
      setCurrent((index + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (total === 0) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, total]);

  if (loading) {
    return (
      <section className="gallery" id="gallery" aria-label="ഗാലറി">
        <div className="gallery__header">
          <h2 className="gallery__heading">ഗാലറി</h2>
          <p className="gallery__subheading">ലോഡ് ചെയ്യുന്നു...</p>
        </div>
      </section>
    );
  }

  if (total === 0) return null;

  return (
    <section className="gallery" id="gallery" aria-label="ഗാലറി">
      <div className="gallery__header">
        <h2 className="gallery__heading">ഗാലറി</h2>
        <p className="gallery__subheading">നമ്മുടെ ഓർമ്മകൾ</p>
      </div>

      <div className="gallery__slideshow" role="region" aria-roledescription="carousel" aria-label="ചിത്രങ്ങൾ">
        {galleryData.map((item, index) => (
          <div
            className={`gallery__slide ${index === current ? 'active' : ''}`}
            key={item._id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${total}`}
            aria-hidden={index !== current}
          >
            <img src={item.image} alt={item.caption || 'Gallery Image'} loading="lazy" />
          </div>
        ))}

        <button
          className="gallery__nav-btn gallery__nav-btn--prev"
          onClick={prev}
          aria-label="മുമ്പത്തെ ചിത്രം"
        >
          ‹
        </button>
        <button
          className="gallery__nav-btn gallery__nav-btn--next"
          onClick={next}
          aria-label="അടുത്ത ചിത്രം"
        >
          ›
        </button>
      </div>

      <div className="gallery__dots" role="tablist" aria-label="സ്ലൈഡ് ഡോട്ടുകൾ">
        {galleryData.map((_, index) => (
          <button
            key={index}
            className={`gallery__dot ${index === current ? 'active' : ''}`}
            onClick={() => goTo(index)}
            role="tab"
            aria-selected={index === current}
            aria-label={`ചിത്രം ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
