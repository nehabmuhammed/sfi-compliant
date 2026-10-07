import { Link } from 'react-router-dom';

export default function ComplaintCTA() {
  return (
    <section className="complaint-cta" aria-label="പരാതി സെക്ഷൻ">
      <h2 className="complaint-cta__heading">
        എന്തെങ്കിലും
        <br />
        പ്രശ്നമുണ്ടോ?
      </h2>
      <p className="complaint-cta__text">
        നിങ്ങളുടെ പ്രശ്നം ഞങ്ങളോട് പങ്കുവയ്ക്കൂ.
      </p>
      <Link to="/complaint" className="complaint-cta__btn">
        പരാതി രജിസ്റ്റർ ചെയ്യുക →
      </Link>
    </section>
  );
}
