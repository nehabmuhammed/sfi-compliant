import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItems = [
    { label: 'ഹോം', path: '/' },
    { label: 'യൂണിയനെ കുറിച്ച്', path: '/#about' },
    { label: 'എക്സിക്യൂട്ടീവ് കമ്മിറ്റി', path: '/#excom' },
    { label: 'പരിപാടികൾ', path: '/#programmes' },
    { label: 'ഗാലറി', path: '/#gallery' },
    { label: 'പരാതി', path: '/complaint' },
  ];

  const handleNavClick = (path) => {
    setMenuOpen(false);
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      // If we're on the homepage, scroll to section
      if (location.pathname === '/') {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to homepage first, then scroll
        window.location.href = path;
      }
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="പ്രധാന നാവിഗേഷൻ">
      <Link to="/" className="navbar__brand">
        <span className="navbar__title">IGC യൂണിയൻ</span>
        <span className="navbar__subtitle">
          ഇന്ദിരാഗാന്ധി കോളേജ്, കോതമംഗലം
        </span>
      </Link>

      <button
        className={`navbar__hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'മെനു അടയ്ക്കുക' : 'മെനു തുറക്കുക'}
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar__menu ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) =>
          item.path.startsWith('/#') ? (
            <a
              key={item.label}
              href={item.path}
              className="navbar__menu-item"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.path);
              }}
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.label}
              to={item.path}
              className="navbar__menu-item"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
