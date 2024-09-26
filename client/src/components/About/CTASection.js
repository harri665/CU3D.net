// CTASection.js
import React from 'react';

const CTASection = () => {
  return (
    <section className="cta-section relative py-16 px-4 bg-nebula bg-cover bg-center text-center text-white overflow-hidden">
      <div className="cta-overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
      <div className="relative z-10">
        <h2 className="text-4xl font-semibold mb-6 glow">Join Our Mission</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg">
          Be a part of our journey to the stars.
        </p>
        <a
          href="/contact"
          className="inline-block bg-nebula-pink hover:bg-nebula-blue text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default CTASection;
    