import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';

export default function Complaint() {
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    department: '',
    complaint: '',
    name: '',
    email: '',
    whatsapp: '',
    anonymous: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const [complaintId, setComplaintId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await api.post('/complaints', formData);
      if (response.data.success) {
        setComplaintId(response.data.data.complaintId);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMsg(response.data.message || 'പരാതി സമർപ്പിക്കുന്നതിൽ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'സെർവർ തകരാർ. ദയവായി പിന്നീട് ശ്രമിക്കുക.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="complaint-page">
        <div className="complaint-success">
          <div className="complaint-success__icon" aria-hidden="true">
            ✅
          </div>
          <h1 className="complaint-success__heading">പരാതി ലഭിച്ചു</h1>
          <p className="complaint-success__text">
            നിങ്ങളുടെ പരാതി വിജയകരമായി ലഭിച്ചു. പരിശോധനയ്ക്ക് ശേഷം ആവശ്യമായ നടപടികൾ സ്വീകരിക്കുന്നതാണ്.
          </p>
          <div style={{ margin: '1.5rem 0', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <p style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.875rem' }}>പരാതി നമ്പർ:</p>
            <p style={{ margin: 0, fontWeight: '700', fontSize: '1.25rem', color: '#0f172a' }}>{complaintId}</p>
          </div>
          <p style={{ color: '#16a34a', fontSize: '0.875rem', marginBottom: '2rem', textAlign: 'center' }}>
            നിങ്ങളുടെ ഇമെയിലിലേക്ക് സ്ഥിരീകരണ സന്ദേശം അയച്ചിട്ടുണ്ട്.
          </p>
          <Link to="/" className="complaint-success__back">
            ← ഹോം പേജിലേക്ക്
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="complaint-page">
      <div className="complaint-page__header">
        <div className="complaint-page__icon" aria-hidden="true">
          ✍️
        </div>
        <h1 className="complaint-page__heading">പരാതി രജിസ്റ്റർ ചെയ്യുക</h1>
        <p className="complaint-page__subtext">
          ക്യാമ്പസുമായി ബന്ധപ്പെട്ട നിങ്ങളുടെ പ്രശ്നങ്ങൾ ഞങ്ങളുമായി
          പങ്കുവയ്ക്കാം.
        </p>
      </div>

      <form className="complaint-form" onSubmit={handleSubmit} noValidate>
        {errorMsg && (
          <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        {/* Category */}
        <div className="complaint-form__group">
          <label className="complaint-form__label" htmlFor="category">
            പരാതി വിഭാഗം
            <span className="complaint-form__required">*</span>
          </label>
          <select
            id="category"
            name="category"
            className="complaint-form__select"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              തിരഞ്ഞെടുക്കുക...
            </option>
            <option value="academic">അക്കാദമിക്</option>
            <option value="infrastructure">അടിസ്ഥാന സൗകര്യങ്ങൾ</option>
            <option value="hostel">ഹോസ്റ്റൽ</option>
            <option value="canteen">കാന്റീൻ</option>
            <option value="hygiene">ശുചിത്വം</option>
            <option value="other">മറ്റ്</option>
          </select>
        </div>

        {/* Department */}
        <div className="complaint-form__group">
          <label className="complaint-form__label" htmlFor="department">
            വകുപ്പ് / വിഷയമേഖല
          </label>
          <input
            id="department"
            name="department"
            type="text"
            className="complaint-form__input"
            placeholder="ഉദാ: ഇംഗ്ലീഷ്, കണക്ക്..."
            value={formData.department}
            onChange={handleChange}
          />
        </div>

        {/* Complaint */}
        <div className="complaint-form__group">
          <label className="complaint-form__label" htmlFor="complaint">
            വിഷയം
            <span className="complaint-form__required">*</span>
          </label>
          <textarea
            id="complaint"
            name="complaint"
            className="complaint-form__textarea"
            placeholder="പരാതിയുടെ വിശദാംശം ഇവിടെ എഴുതുക..."
            value={formData.complaint}
            onChange={handleChange}
            required
          />
        </div>

        {/* Complainant Name */}
        <div className="complaint-form__group">
          <label className="complaint-form__label" htmlFor="name">
            പേര് (ഓപ്ഷണൽ)
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="complaint-form__input"
            placeholder="നിങ്ങളുടെ പേര്"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="complaint-form__group">
          <label className="complaint-form__label" htmlFor="email">
            ഇമെയിൽ
            <span className="complaint-form__required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="complaint-form__input"
            placeholder="നിങ്ങളുടെ ഇമെയിൽ വിലാസം"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* WhatsApp */}
        <div className="complaint-form__group">
          <label className="complaint-form__label" htmlFor="whatsapp">
            ബന്ധപ്പെടാനുള്ള നമ്പർ (ഓപ്ഷണൽ)
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            className="complaint-form__input"
            placeholder="WhatsApp നമ്പർ"
            value={formData.whatsapp}
            onChange={handleChange}
          />
        </div>

        {/* Anonymous */}
        <div className="complaint-form__group">
          <div className="complaint-form__checkbox-wrap">
            <input
              id="anonymous"
              name="anonymous"
              type="checkbox"
              className="complaint-form__checkbox"
              checked={formData.anonymous}
              onChange={handleChange}
            />
            <label className="complaint-form__checkbox-label" htmlFor="anonymous">
              🔒 അനാമധേയമായി സമർപ്പിക്കുക
            </label>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="complaint-form__privacy">
          <p className="complaint-form__privacy-text">
            <span className="complaint-form__privacy-icon" aria-hidden="true">
              🛡️
            </span>
            നിങ്ങൾ നൽകുന്ന വിവരങ്ങൾ പരാതിയുടെ പരിശോധനയ്ക്കും
            തുടർനടപടികൾക്കുമായി മാത്രം ഉപയോഗിക്കും.
          </p>
        </div>

        {/* Submit */}
        <button type="submit" className="complaint-form__submit" disabled={loading}>
          {loading ? 'സമർപ്പിക്കുന്നു...' : 'പരാതി സമർപ്പിക്കുക →'}
        </button>
      </form>
    </div>
  );
}
