import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
// import "../styles/About.css";
import aboutImg from "../assets/EE2.png"; 
import '../LandingCss/About.css';

const About: React.FC = () => {
  useEffect(() => {
    ScrollReveal().reveal(".about__img", {
      origin: "left",
      distance: "60px",
      duration: 1000,
      delay: 200,
    });

    ScrollReveal().reveal(".about__data", {
      origin: "right",
      distance: "60px",
      duration: 1000,
      delay: 400,
    });
  }, []);

  return (
    <section className="about section" id="about">
      <div className="about__container container">
        <div className="about__img">
          <img src={aboutImg} alt="About Wise Wallet" />
        </div>
        <div className="about__data">
          <h2 className="section__title">About WISE WALLET</h2>
          <p className="about__description">
            Wise Wallet helps you track your expenses effortlessly and stay in
            control of your finances. From daily spends to monthly budgets, we
            make money management simple and smart. Get clear insights with
            real-time charts and reports that show where your money goes. Your
            data stays private and secure — always. No complex tools. Just you
            and your money, managed wisely.
          </p>
          <a href="#footer" className="button">
            Learn More <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
