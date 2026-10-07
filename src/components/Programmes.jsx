import { useState, useEffect } from 'react';
import api from '../api.js';

export default function Programmes() {
  const [programmesData, setProgrammesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const response = await api.get('/programmes');
        if (response.data.success) {
          setProgrammesData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching programmes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgrammes();
  }, []);

  if (loading) {
    return (
      <section
        className="programmes"
        id="programmes"
        aria-label="വരാനിരിക്കുന്ന പരിപാടികൾ"
      >
        <h2 className="programmes__heading">വരാനിരിക്കുന്ന പരിപാടികൾ</h2>
        <p className="programmes__subheading" style={{textAlign: 'center', marginTop: '1rem'}}>ലോഡ് ചെയ്യുന്നു...</p>
      </section>
    );
  }

  return (
    <section
      className="programmes"
      id="programmes"
      aria-label="വരാനിരിക്കുന്ന പരിപാടികൾ"
    >
      <h2 className="programmes__heading">വരാനിരിക്കുന്ന പരിപാടികൾ</h2>

      <div className="programmes__list">
        {programmesData.map((prog) => (
          <article className="programme-card" key={prog._id}>
            <div className="programme-card__date">
              <span className="programme-card__date-day">{prog.date}</span>
              <span className="programme-card__date-month">{prog.month}</span>
            </div>
            <div className="programme-card__content">
              <h3 className="programme-card__title">{prog.title}</h3>
              <p className="programme-card__detail">
                <span className="programme-card__detail-icon">📍</span>
                {prog.venue}
              </p>
              <p className="programme-card__detail">
                <span className="programme-card__detail-icon">🕐</span>
                {prog.time}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
