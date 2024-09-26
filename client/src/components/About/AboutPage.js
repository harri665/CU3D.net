// AboutPage.js
import React from 'react';
import HeroSection from './HeroSection';
import MissionSection from './MissionSection';
import TimelineSection from './TimelineSection';
import TeamSection from './TeamSection';
import ValuesSection from './ValuesSection';
import CTASection from './CTASection';

const AboutPage = () => {
  return (
    <div className="about-page bg-dark-space text-white">
      <HeroSection />
      <MissionSection />
      <TeamSection />
      <ValuesSection />
      <CTASection />
    </div>
  );
};

export default AboutPage;
