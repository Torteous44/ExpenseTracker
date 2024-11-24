import React from "react";
import { Link } from "react-router-dom";

const HomePage = ({ user, toggleSignUp }) => {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Effortlessly Manage Your Expenses</h1>
        <p style={styles.heroSubtitle}>
          Take control of your finances with ease and simplicity.
        </p>
        <div style={styles.heroButtons}>
          {!user && (
            <button onClick={toggleSignUp} style={styles.ctaButton}>
              Sign Up Now
            </button>
          )}
          {user && (
            <Link to="/view-expenses" style={styles.ctaButton}>
              View Expenses
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>Features You'll Love</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <img
              src={`${process.env.PUBLIC_URL}/icons/track.svg`}
              alt="Track Expenses"
              style={styles.featureIcon}
            />
            <h3 style={styles.featureTitle}>Track Your Expenses</h3>
            <p style={styles.featureDescription}>
              Monitor all your spending in one place.
            </p>
          </div>
          <div style={styles.featureCard}>
            <img
              src={`${process.env.PUBLIC_URL}/icons/organize.svg`}
              alt="Organize Finances"
              style={styles.featureIcon}
            />
            <h3 style={styles.featureTitle}>Organize Your Finances</h3>
            <p style={styles.featureDescription}>
              Categorize your expenses for better insights.
            </p>
          </div>
          <div style={styles.featureCard}>
            <img
              src={`${process.env.PUBLIC_URL}/icons/simplify.svg`}
              alt="Simplify Budgeting"
              style={styles.featureIcon}
            />
            <h3 style={styles.featureTitle}>Simplify Budgeting</h3>
            <p style={styles.featureDescription}>
              Plan your budget and achieve your financial goals.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section style={styles.techStackSection}>
        <h2 style={styles.techStackTitle}>Our Tech Stack</h2>
        <p style={styles.techStackDescription}>
          
        </p>
        <div style={styles.techStackGrid}>
          <div style={styles.techStackCard}>
            <img
              src={`${process.env.PUBLIC_URL}/icons/frontend.svg`}
              alt="Frontend"
              style={styles.techStackIcon}
            />
            <h3 style={styles.techStackCardTitle}>Frontend</h3>
            <p style={styles.techStackCardDescription}>
              Built with <strong>React.js</strong>, offering dynamic and seamless navigation using React Router.
            </p>
          </div>
          <div style={styles.techStackCard}>
            <img
              src={`${process.env.PUBLIC_URL}/icons/backend.svg`}
              alt="Backend"
              style={styles.techStackIcon}
            />
            <h3 style={styles.techStackCardTitle}>Backend</h3>
            <p style={styles.techStackCardDescription}>
              Designed with <strong>Azure Functions</strong> for a serverless and highly scalable backend architecture.
            </p>
          </div>
          <div style={styles.techStackCard}>
            <img
              src={`${process.env.PUBLIC_URL}/icons/database.svg`}
              alt="Database"
              style={styles.techStackIcon}
            />
            <h3 style={styles.techStackCardTitle}>Database</h3>
            <p style={styles.techStackCardDescription}>
              Powered by <strong>MySQL</strong>, hosted on Azure for reliable and secure data storage.
            </p>
          </div>
          <div style={styles.techStackCard}>
            <img
              src={`${process.env.PUBLIC_URL}/icons/storage.svg`}
              alt="Cloud Storage"
              style={styles.techStackIcon}
            />
            <h3 style={styles.techStackCardTitle}>Cloud Storage</h3>
            <p style={styles.techStackCardDescription}>
              Leverages <strong>Azure Blob Storage</strong> to store and manage receipt uploads efficiently.
            </p>
          </div>
          <div style={styles.techStackCard}>
            <img
              src={`${process.env.PUBLIC_URL}/icons/auth.svg`}
              alt="Authentication"
              style={styles.techStackIcon}
            />
            <h3 style={styles.techStackCardTitle}>Authentication</h3>
            <p style={styles.techStackCardDescription}>
              Secure user authentication implemented with <strong>bcrypt</strong>.
            </p>
          </div>
          <div style={styles.techStackCard}>
            <img
              src={`${process.env.PUBLIC_URL}/icons/hosting.svg`}
              alt="Hosting"
              style={styles.techStackIcon}
            />
            <h3 style={styles.techStackCardTitle}>Hosting</h3>
            <p style={styles.techStackCardDescription}>
              Frontend hosted on <strong>GitHub Pages</strong> for cost-effective and fast delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Expense Manager | Cloud Final Project | Matthew Porteous, Boris Gans,
          Georgios Klonis, Nikoloz Kipiani, Fares Qadoumi
        </p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    color: "#333",
  },
  heroSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "60px 20px",
    background: "linear-gradient(135deg, #007bff, #0056b3)",
    color: "white",
  },
  heroTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    margin: "20px 0",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    margin: "10px 0 30px 0",
  },
  heroButtons: {
    display: "flex",
    gap: "20px",
  },
  ctaButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "white",
    color: "#007bff",
    border: "none",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  featuresSection: {
    padding: "40px 20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  featuresTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  featuresGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
  },
  featureCard: {
    width: "250px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  featureIcon: {
    width: "60px",
    marginBottom: "15px",
  },
  techStackSection: {
    padding: "60px 20px",
    backgroundColor: "#f3f4f6",
    textAlign: "center",
  },
  techStackTitle: {
    fontSize: "2.2rem",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  techStackDescription: {
    fontSize: "1.1rem",
    marginBottom: "30px",
    color: "#555",
    maxWidth: "700px",
    margin: "0 auto",
  },
  techStackGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  techStackCard: {
    width: "250px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  techStackIcon: {
    width: "60px",
    marginBottom: "15px",
  },
  techStackCardTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#007bff",
  },
  techStackCardDescription: {
    fontSize: "1rem",
    color: "#666",
  },
  footer: {
    padding: "20px",
    backgroundColor: "#333",
    color: "white",
    textAlign: "center",
  },
  footerText: {
    fontSize: "0.9rem",
  },
};

export default HomePage;