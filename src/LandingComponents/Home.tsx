import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
// import '../styles/Home.css';
import ghostImg from "../assets/EE.png"; // Replace with your image
import { Link } from "react-router-dom";
import "../LandingCss/Home.css";

const Home: React.FC = () => {
  useEffect(() => {
    ScrollReveal().reveal(".home__title, .home__description", {
      origin: "left",
      distance: "60px",
      duration: 1000,
      delay: 200,
    });

    ScrollReveal().reveal(".home__img", {
      origin: "right",
      distance: "60px",
      duration: 1000,
      delay: 400,
    });

    ScrollReveal().reveal(".home__button", {
      origin: "bottom",
      distance: "30px",
      duration: 800,
      delay: 600,
    });
  }, []);

  return (
    <section className="home section" id="home">
      <div className="home__container">
        <div className="home__img">
          <img src={ghostImg} alt="Halloween Ghost" />
        </div>
        <div className="home__content">
          <h1 className="home__title">
            Track Your Expenses,<span>Take Control of Your Life.</span>
          </h1>
          <p className="home__description">
            Take control of your financial life. From daily coffee spends to
            monthly bills know where every penny goes and start saving smarter.
          </p>
        </div>
      </div>

      <div className="home__button-wrapper">
        <Link to="/login" className="home__button">
          Start
        </Link>
      </div>
    </section>
  );
};

export default Home;
