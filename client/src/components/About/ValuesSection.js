// ValuesSection.js
import React from 'react';
import { FaRocket, FaSatellite, FaMeteor } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const ValueItem = ({ icon, title, description }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`value-item text-center transition-all duration-1000 transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="mb-4 text-nebula-pink animate-pulse">{icon}</div>
      <h3 className="text-2xl font-medium mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const ValuesSection = () => {
  const values = [
    {
      icon: <FaRocket size={48} />,
      title: 'Innovation',
      description: 'Pushing the boundaries of technology.',
    },
    {
      icon: <FaSatellite size={48} />,
      title: 'Exploration',
      description: 'Discovering new worlds.',
    },
    {
      icon: <FaMeteor size={48} />,
      title: 'Velocity',
      description: 'Moving swiftly towards our goals.',
    },
  ];

  return (
    <section className="values-section py-16 px-4 bg-dark-space text-white">
      <h2 className="text-4xl font-semibold text-center mb-8 glow">Our Values</h2>
      <div className="max-w-5xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-3">
        {values.map((value, index) => (
          <ValueItem
            key={index}
            icon={value.icon}
            title={value.title}
            description={value.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ValuesSection;
