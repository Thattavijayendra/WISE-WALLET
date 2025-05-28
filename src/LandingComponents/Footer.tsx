import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
// import '../styles/Footer.css';
import '../LandingCss/Footer.css';

const Footer: React.FC = () => {
  useEffect(() => {
    ScrollReveal().reveal('.footer__container', {
      origin: 'top',
      distance: '40px',
      duration: 1000,
      delay: 200,
    });
  }, []);

  return (
    <footer className="footer section" id="footer">
      <div className="footer__container container">
        <h2 className="footer__title">WISE WALLET</h2>
        <p className="footer__description">
          Join the smart side of spending! Track, save, and stay ahead with Wise Wallet!
        </p>
        <div className="footer__social">
          <a href="#" className="footer__social-link" aria-label="Facebook">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="footer__social-link" aria-label="Instagram">
            <i className="fab fa-instagram" />
          </a>
          <a href="#" className="footer__social-link" aria-label="Twitter">
            <i className="fab fa-twitter" />
          </a>
        </div>
        <p className="footer__copy">&copy; 2025 WISE WALLET. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
