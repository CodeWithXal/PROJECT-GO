import { useNavigate } from "react-router-dom";
import "./Landing.css";
import { ArrowRight, Users, Rocket, Layers } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

      {/* NAVBAR */}
      <div className="landing-navbar">
        <h1 className="logo">
          PROJECT <span>GO</span>
        </h1>

        <div className="nav-actions">
          <button
            className="nav-signin"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>

          <button
            className="nav-signup"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <h2>
          Build Projects.
          <br />
          <span>Find Your Team.</span>
        </h2>

        <p>
          PROJECT GO connects developers, designers and innovators 
          to collaborate on real-world ideas. Discover projects, 
          join teams, and turn concepts into production-ready products.
        </p>

        <button
          className="hero-cta"
          onClick={() => navigate("/signup")}
        >
          Start Building <ArrowRight size={18} />
        </button>
      </section>

      {/* FEATURES */}
      <section className="features">

        <div className="feature-card">
          <Rocket size={32} />
          <h3>Launch Ideas</h3>
          <p>
            Create and showcase your project ideas.
            Attract passionate builders.
          </p>
        </div>

        <div className="feature-card">
          <Users size={32} />
          <h3>Find Builders</h3>
          <p>
            Connect with developers based on skills
            and collaboration goals.
          </p>
        </div>

        <div className="feature-card">
          <Layers size={32} />
          <h3>Grow Together</h3>
          <p>
            Manage teams, accept requests, and build
            production-ready products.
          </p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        © {new Date().getFullYear()} PROJECT GO — Build Something That Matters.
      </footer>

    </div>
  );
};

export default Landing;