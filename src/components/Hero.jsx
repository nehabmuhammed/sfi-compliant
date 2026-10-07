import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero" aria-label="ഹീറോ സെക്ഷൻ">
      {/* Campus building image with masks/overlays */}
      <div className="hero__image-wrapper">
        <img
          src="/images/campus.jpg"
          alt="ഇന്ദിരാഗാന്ധി കോളേജ് ഓഫ് ആർട്സ് ആൻഡ് സയൻസ് കെട്ടിടം"
          className="hero__image"
          loading="eager"
        />
        {/* Left-side red gradient overlay for blending */}
        <div className="hero__image-overlay" aria-hidden="true"></div>

        {/* College label over the image */}
        <div className="hero__college-label">
          <span className="hero__college-label-icon">🏛</span>
          <span className="hero__college-label-text">
            INDIRA GANDHI COLLEGE OF ARTS AND SCIENCE
          </span>
        </div>
      </div>

      {/* Hero text content */}
      <div className="hero__content">
        <h1 className="hero__heading">
          <span>നമ്മുടെ</span>
          <span className="highlight">കോളേജ്</span>
          <span>നമ്മുടെ ശബ്ദം</span>
        </h1>
        <p className="hero__subtext">
          വിദ്യാർത്ഥികളുടെ ശബ്ദവും അവകാശങ്ങളും പ്രവർത്തനങ്ങളും ഒരുമിച്ച്
          മുന്നോട്ട്.
        </p>
        <Link to="/complaint" className="hero__cta">
          പരാതി രജിസ്റ്റർ ചെയ്യുക →
        </Link>
      </div>

      {/* Bottom strip */}
      <div className="hero__footer-strip">
        <span className="hero__footer-strip-icon" aria-hidden="true">
          ✓
        </span>
        <span className="hero__footer-strip-text">
          കൂടുതൽ അറിയിപ്പുകൾ ഉടൻ ലഭ്യമാകും
        </span>
      </div>
    </section>
  );
}
