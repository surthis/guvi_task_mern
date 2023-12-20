import React from 'react';
import '../css/home.css';

const Home = () => {
  return (
    <div className="home guvi-bg-color">
      <header className="guvi-header">
        <h1 className="guvi-heading">Welcome to GUVI</h1>
        <p className="guvi-subheading">Learn to code in your native language and take your tech career to the next level.</p>
        <button className="guvi-btn">Get Started</button>
      </header>

      <main className="guvi-main">
        <section className="guvi-features">
          <h2 className="guvi-section-heading">Unlock Your Tech Potential with GUVI</h2>
          <ul className="guvi-feature-list">
            <li className="guvi-feature">Learn in Tamil, Telugu, Hindi, and English</li>
            <li className="guvi-feature">Expert-led courses in trending technologies</li>
            <li className="guvi-feature">Job placement support to kickstart your career</li>
            <li className="guvi-feature">Flexible learning paths for all skill levels</li>
            <li className="guvi-feature">Interactive exercises and hands-on projects</li>
          </ul>
        </section>

        <section className="guvi-testimonials">
          <h2 className="guvi-section-heading">Hear from Our Learners</h2>
          </section>
      </main>
    </div>
  );
};

export default Home;
