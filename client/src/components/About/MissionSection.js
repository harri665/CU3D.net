// MissionSection.js
import React from 'react';

const MissionSection = () => {
  return (
    <section className="mission-section relative py-16 px-4 bg-gradient-to-b from-dark-space to-space-purple text-center overflow-hidden">
      {/* Star Field Animation */}
      <div className="absolute top-0 left-0 w-full h-full stars-animation"></div>
      <div className="relative z-10">
        <h2 className="text-4xl font-semibold mb-6 text-white glow">
          Our Mission
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-200">
          To explore the universe and bring the wonders of space closer to everyone.
        </p>
      </div>
    </section>
  );
};

export default MissionSection;
