import React from "react";
import { Link } from "react-router-dom";
import "./styles/HomePage.css"; // Import the CSS file

const HomePage = ({ user, toggleSignUp }) => {
  return (
    <div className="container">
      <div className="background-shape shape1"></div>
      <div className="background-shape shape2"></div>
      <div className="background-shape shape3"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div> {/* Optional decorative background */}
        <div className="hero-content">
          <h1 className="hero-title">Effortlessly Manage Your Expenses</h1>
          <p className="hero-subtitle">
            Take control of your finances with ease and simplicity.
          </p>
          <div className="hero-buttons">
            {!user && (
              <button onClick={toggleSignUp} className="cta-button">
                Sign Up Now
              </button>
            )}
            {user && (
              <Link to="/view-expenses" className="cta-button">
                View Expenses
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">Features You'll Love</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img
              src={`${process.env.PUBLIC_URL}/icons/track.svg`}
              alt="Track Expenses"
              className="feature-icon"
            />
            <h3 className="feature-title">Track Your Expenses</h3>
            <p className="feature-description">
              Monitor all your spending in one place.
            </p>
          </div>
          <div className="feature-card">
            <img
              src={`${process.env.PUBLIC_URL}/icons/organize.svg`}
              alt="Organize Finances"
              className="feature-icon"
            />
            <h3 className="feature-title">Organize Your Finances</h3>
            <p className="feature-description">
              Categorize your expenses for better insights.
            </p>
          </div>
          <div className="feature-card">
            <img
              src={`${process.env.PUBLIC_URL}/icons/simplify.svg`}
              alt="Simplify Budgeting"
              className="feature-icon"
            />
            <h3 className="feature-title">Simplify Budgeting</h3>
            <p className="feature-description">
              Plan your budget and achieve your financial goals.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-stack-section">
        <h2 className="tech-stack-title">Our Tech Stack</h2>
        <p className="tech-stack-description"></p>
        <div className="tech-stack-grid">
          <div className="tech-stack-card">
            <img
              src={`${process.env.PUBLIC_URL}/icons/frontend.svg`}
              alt="Frontend"
              className="tech-stack-icon"
            />
            <h3 className="tech-stack-card-title">Frontend</h3>
            <p className="tech-stack-card-description">
              Built with <strong>React.js</strong>, offering dynamic and seamless navigation using React Router.
            </p>
          </div>
          <div className="tech-stack-card">
            <img
              src={`${process.env.PUBLIC_URL}/icons/backend.svg`}
              alt="Backend"
              className="tech-stack-icon"
            />
            <h3 className="tech-stack-card-title">Backend</h3>
            <p className="tech-stack-card-description">
              Designed with <strong>Azure Functions</strong> for a serverless and highly scalable backend architecture.
            </p>
          </div>
          <div className="tech-stack-card">
            <img
              src={`${process.env.PUBLIC_URL}/icons/database.svg`}
              alt="Database"
              className="tech-stack-icon"
            />
            <h3 className="tech-stack-card-title">Database</h3>
            <p className="tech-stack-card-description">
              Powered by <strong>MySQL</strong>, hosted on Azure for reliable and secure data storage.
            </p>
          </div>
          <div className="tech-stack-card">
            <img
              src={`${process.env.PUBLIC_URL}/icons/storage.svg`}
              alt="Cloud Storage"
              className="tech-stack-icon"
            />
            <h3 className="tech-stack-card-title">Cloud Storage</h3>
            <p className="tech-stack-card-description">
              Leverages <strong>Azure Blob Storage</strong> to store and manage receipt uploads efficiently.
            </p>
          </div>
          <div className="tech-stack-card">
            <img
              src={`${process.env.PUBLIC_URL}/icons/auth.svg`}
              alt="Authentication"
              className="tech-stack-icon"
            />
            <h3 className="tech-stack-card-title">Authentication</h3>
            <p className="tech-stack-card-description">
              Secure user authentication implemented with <strong>bcrypt</strong>.
            </p>
          </div>
          <div className="tech-stack-card">
            <img
              src={`${process.env.PUBLIC_URL}/icons/hosting.svg`}
              alt="Hosting"
              className="tech-stack-icon"
            />
            <h3 className="tech-stack-card-title">Hosting</h3>
            <p className="tech-stack-card-description">
              Frontend hosted on <strong>GitHub Pages</strong> for cost-effective and fast delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          Expense Manager | Cloud Final Project | Matthew Porteous, Boris Gans, Georgios Klonis, Nikoloz Kipiani, Fares Qadoumi
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
