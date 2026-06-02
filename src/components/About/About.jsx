import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>About Us:</h2>
        <div className="video-container">
          <video src="/VJ School.mp4" autoPlay loop muted className="top-video"></video>
        </div>
        <p>In your child's education journey, choosing the right school is one of the most important decisions you'll make. At VJ Education, we understand this deeply. We're not just a school; we're a community dedicated to nurturing young minds, fostering curiosity, and building a strong foundation for a successful future. Our approach combines academic excellence with holistic development, ensuring every child grows intellectually, socially, and emotionally. We believe in creating a supportive and inspiring environment where students feel confident to explore, learn, and achieve their best. Join us as we work together to shape bright futures for our students.
          We are a team of educators who are passionate about providing quality education to students.Our mission is to help students achieve their full potential by providing them with the best possible education.Our courses are taught by experienced and qualified teachers who are passionate about education.We believe that every child has the potential to succeed, and we are committed to helping them reach their full potential.</p>
      </div>
    </div>
  )
}

export default About
