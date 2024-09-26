import React, { useEffect, useState } from 'react';

const ParallaxSVGs = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-0 pointer-events-none overflow-hidden">
      {/* Flatirons SVG fixed at the bottom of the screen */}
      <svg
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#4b5320"
          fillOpacity="1"
          d="M0,256L80,245.3C160,235,320,213,480,186.7C640,160,800,128,960,106.7C1120,85,1280,75,1360,69.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        />
        <path
          fill="#6b8e23"
          fillOpacity="0.8"
          d="M0,256L60,218.7C120,181,240,107,360,96C480,85,600,139,720,160C840,181,960,171,1080,192C1200,213,1320,267,1380,293.3L1440,320L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </svg>
    </div>
  );
};

export default ParallaxSVGs;
