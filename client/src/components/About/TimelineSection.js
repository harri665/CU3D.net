// TimelineSection.js
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TimelineSection = () => {
  const timelineRef = useRef(null);
  const trackRef = useRef(null);

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Our journey begins.',
      image: 'https://via.placeholder.com/800x600/0b0d17/ffffff?text=2020',
    },
    {
      year: '2021',
      title: 'First Satellite Launched',
      description: 'We reached the stars.',
      image: 'https://via.placeholder.com/800x600/2d006b/ffffff?text=2021',
    },
    {
      year: '2022',
      title: 'Mars Mission',
      description: 'We sent our first rover to Mars.',
      image: 'https://via.placeholder.com/800x600/4f81ff/ffffff?text=2022',
    },
    // Add more milestones as needed
  ];

  useEffect(() => {
    const timeline = timelineRef.current;
    const track = trackRef.current;
    const totalMilestones = milestones.length;

    // Set track width dynamically based on the number of milestones
    gsap.set(track, { width: `${totalMilestones * 100}vw` });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: timeline,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${window.innerWidth * (totalMilestones - 1)}`,
      },
    });

    tl.to(track, {
      xPercent: -100 * (totalMilestones - 1),
      ease: 'none',
    });
  }, [milestones.length]);

  return (
    <section className="timeline-section overflow-hidden h-screen relative" ref={timelineRef}>
      <div className="timeline-track flex" ref={trackRef}>
        {milestones.map((item, index) => (
          <div
            key={index}
            className="timeline-item flex-shrink-0 w-screen h-screen flex items-center justify-center bg-dark-space text-white"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="bg-black bg-opacity-60 p-6 rounded-md">
              <h3 className="text-3xl font-bold mb-2 glow">{item.year}</h3>
              <h4 className="text-xl mb-2">{item.title}</h4>
              <p className="max-w-md">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimelineSection;
