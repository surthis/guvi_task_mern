import React from 'react';
import '../css/about.css';

const About = () => {
  return (
    <div className="about-page guvi-bg-color">
      <header className="guvi-header">
        <h1 className="guvi-heading">About GUVI</h1>
      </header>

      <main className="guvi-main">
      <section className="about-section">
  <h2 className="guvi-section-heading">Our Story: Empowering Dreams in Native Languages</h2>
  <p className="about-text">
    At GUVI, we believe that language shouldn't be a barrier to unlocking your tech potential. That's why we're on a mission to make quality tech education accessible to everyone, in the languages they feel most comfortable with.
  </p>
  <p className="about-text">
    Our story began in 2014, when a group of passionate educators and technologists saw the need to bridge the digital divide in India. We envisioned a world where anyone, regardless of their background or language skills, could learn the skills needed to thrive in the digital age.
  </p>
  <p className="about-text">
    We started by offering courses in Tamil and Telugu, two of the most widely spoken languages in India. Our approach was simple: break down complex tech concepts into easily understandable terms, using relatable examples and engaging teaching methods. And it worked! Thousands of learners embraced the opportunity to learn in their native languages, and we quickly expanded to offer courses in Hindi and English as well.
  </p>
  <p className="about-text">
    Today, GUVI is a thriving community of learners, educators, and industry partners. We've empowered over a million learners to pursue their tech dreams, and we're just getting started. We're constantly expanding our course offerings, exploring new technologies, and forging partnerships to make tech education even more accessible and impactful.
  </p>
  <p className="about-text">
    Join us on our journey to democratize tech education and unleash the potential of millions. Together, we can build a more inclusive and innovative world, where everyone has the opportunity to thrive in the digital age.
  </p>
</section>


<section className="about-impact">
  <h2 className="guvi-section-heading">Making a Difference, One Learner at a Time</h2>
  <p className="about-text">
    At GUVI, we measure our success not just by numbers, but by the real-life impact we have on learners and communities. Here are some of the ways we're making a difference:
  </p>

  <ul className="guvi-impact-list">
    <li>
      <strong>Empowering over 1 million learners to date</strong>, with diverse backgrounds and skill levels, to pursue their tech dreams.
    </li>
    <li>
      <strong>Bridging the digital divide</strong> by making tech education accessible in multiple native languages, breaking down language barriers.
    </li>
    <li>
      <strong>Creating a skilled workforce</strong> aligned with industry needs, contributing to economic growth and job creation.
    </li>
    <li>
      <strong>Promoting inclusivity and diversity</strong> in the tech industry by empowering learners from underrepresented communities.
    </li>
    <li>
      <strong>Inspiring innovation and entrepreneurship</strong>, fostering a culture of problem-solving and creativity.
    </li>
  </ul>

  <p className="about-text">
    Here are some stories that illustrate our impact:
  </p>

  <div className="guvi-impact-stories">
    {/* Add testimonials or success stories here */}
    <div className="guvi-impact-story">
      <h3>From Rural Village to Software Developer</h3>
      <p>Learn how Kumar, a farmer's son from a remote village, transformed his life through GUVI's courses and landed a job at a leading tech company.</p>
    </div>
    <div className="guvi-impact-story">
      <h3>Breaking Barriers: Women in Tech</h3>
      <p>Meet Priya, who overcame societal expectations and financial challenges to become a successful web developer, thanks to GUVI's support.</p>
    </div>
    {/* Add more stories as needed */}
  </div>
</section>

      </main>
    </div>
  );
};

export default About;
