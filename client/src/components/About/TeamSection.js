// TeamSection.js
import React from 'react';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Dr. Jane Doe',
      position: 'Astrophysicist',
      image: 'https://via.placeholder.com/300x400/0b0d17/ffffff?text=Jane+Doe',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'John Smith',
      position: 'Mission Specialist',
      image: 'https://via.placeholder.com/300x400/2d006b/ffffff?text=John+Smith',
      linkedin: '#',
      twitter: '#',
    },
    // Add more team members as needed
  ];

  return (
    <section className="team-section py-16 px-4 bg-gradient-to-b from-space-purple to-dark-space text-white">
      <h2 className="text-4xl font-semibold text-center mb-8 glow">Our Team</h2>
      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member text-center">
            <div className="relative group">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover rounded-md mb-4 transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                <div>
                  <p className="mb-2 text-lg">{member.position}</p>
                  <div className="flex justify-center space-x-4">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-500"
                      >
                        <FaLinkedin size={24} />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400"
                      >
                        <FaTwitter size={24} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-medium">{member.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
