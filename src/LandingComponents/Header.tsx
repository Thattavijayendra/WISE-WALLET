import React, { useEffect, useState } from 'react';
// import '../styles/Header.css';
import ScrollReveal from 'scrollreveal';
import { Link } from 'react-router-dom';
import '../LandingCss/Header.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    ScrollReveal().reveal('.nav__logo, .nav__toggle', {
      origin: 'top',
      distance: '30px',
      duration: 800,
      delay: 200,
      reset: false,
    });

    ScrollReveal().reveal('.nav__list li, .nav__auth-buttons a', {
      origin: 'top',
      distance: '20px',
      duration: 800,
      delay: 300,
      interval: 100,
      reset: false,
    });
  }, []);

  // Toggle mobile menu visibility
  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">
          WISE WALLET
        </Link>

        {/* Mobile menu toggle button */}
        <div className="nav__toggle" onClick={handleToggleMenu} aria-label="Toggle navigation menu" role="button" tabIndex={0} onKeyPress={handleToggleMenu}>
          <i className="fas fa-bars"></i>
        </div>

        {/* Navigation menu */}
        <div className={`nav__menu ${menuOpen ? 'nav__menu--active' : ''}`}>
          <ul className="nav__list">
            <li>
              <Link to="#home" className="nav__link" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="#about" className="nav__link" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="#footer" className="nav__link" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>

          {/* Example auth buttons if needed */}
          {/* <div className="nav__auth-buttons">
            <Link to="/login" className="button button--login">
              Login
            </Link>
            <Link to="/signup" className="button button--signup">
              Sign Up
            </Link>
          </div> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
