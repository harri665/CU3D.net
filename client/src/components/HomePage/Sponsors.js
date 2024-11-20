import React from 'react';

// Placeholder images for sponsors; replace with actual images or URLs.

const sponsors = [
  { name: 'The Atlas Institute', logo: "/img/ATLAS.gif", link: 'https://www.colorado.edu/' },
  { name: 'Prusa Research', logo: "/img/PRUSA.png", link: 'https://www.prusa3d.com/' },
  { name: '3Dconnexion', logo: "/img/3DCONNECTION.png", link: 'https://3dconnexion.com/' },
];

const Sponsors = () => {
  return (
    <section className="bg-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-white mb-10">Our Sponsors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                className="h-20 w-auto mb-4 transform hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-lg font-medium text-white">{sponsor.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
