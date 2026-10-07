import { useState, useEffect } from 'react';
import api from '../api.js';

export default function Excom() {
  const [excomData, setExcomData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExcom = async () => {
      try {
        const response = await api.get('/excom');
        if (response.data.success) {
          setExcomData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching excom:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExcom();
  }, []);

  if (loading) {
    return (
      <section className="excom" id="excom" aria-label="എക്സിക്യൂട്ടീവ് കമ്മിറ്റി">
        <div className="excom__header">
          <h2 className="excom__heading">എക്സിക്യൂട്ടീവ് കമ്മിറ്റി</h2>
          <p className="excom__subheading">ലോഡ് ചെയ്യുന്നു...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="excom" id="excom" aria-label="എക്സിക്യൂട്ടീവ് കമ്മിറ്റി">
      <div className="excom__header">
        <h2 className="excom__heading">എക്സിക്യൂട്ടീവ് കമ്മിറ്റി</h2>
        <p className="excom__subheading">യൂണിയനെ നയിക്കുന്നവർ</p>
      </div>

      <div className="excom__grid">
        {excomData.map((member) => (
          <article className="excom__card" key={member._id}>
            <div className="excom__card-image-wrap">
              <img
                src={member.image}
                alt={`${member.role} - ${member.name}`}
                className="excom__card-image"
                loading="lazy"
              />
            </div>
            <div className="excom__card-info">
              <span className="excom__card-role">{member.role}</span>
              <h3 className="excom__card-name">{member.name}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
