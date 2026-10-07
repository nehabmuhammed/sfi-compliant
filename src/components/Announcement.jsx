import { useState, useEffect } from 'react';
import api from '../api.js';

export default function Announcement() {
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await api.get('/announcements');
        if (response.data.success && response.data.data.length > 0) {
          setAnnouncement(response.data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncement();
  }, []);

  if (loading) {
    return (
      <div className="announcement" role="status" aria-live="polite">
        <p className="announcement__text">ലോഡ് ചെയ്യുന്നു...</p>
      </div>
    );
  }

  if (!announcement) return null;

  return (
    <div className="announcement" role="status" aria-live="polite">
      <p className="announcement__text">
        {announcement.description}
      </p>
    </div>
  );
}
