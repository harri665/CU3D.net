// HeroSection.js
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  useEffect(() => {
    // Parallax effect
    gsap.to('.hero-bg', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
      <div className="hero-bg absolute top-0 left-0 w-full h-full bg-stars bg-cover bg-center"></div>
      <div className="hero-overlay absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-dark-space opacity-70"></div>
      <div className="hero-content z-10 text-center px-4">
        <h1 className="text-6xl font-bold mb-4 text-white glow">
          About Us
        </h1>
        <p className="text-xl max-w-2xl mx-auto text-gray-200">
          Join our community of 3D designers
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
