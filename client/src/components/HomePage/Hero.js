import React from "react";

const Hero = () => {
  return (
    <section className="text-center mt-40 relative">
      <div className="opacity-70 animate-fadeInUp animation-delay-0">
        <p className="text-xl text-blue-200 relative inline-block">
          Introducing
          <span className="absolute left-full ml-4 top-1/2 w-20 h-px bg-gradient-to-r from-blue-200 to-transparent"></span>
          <span className="absolute right-full mr-4 top-1/2 w-20 h-px bg-gradient-to-l from-blue-200 to-transparent"></span>
        </p>
      </div>
      <div className="relative opacity-0 animate-fadeIn animation-delay-600">
        <h2 className="text-8xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-blue-200 to-blue-400 animate-pulse">
          CU3D
        </h2>
        <h2 className="absolute inset-0 text-8xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-blue-200 to-blue-400 opacity-40 blur-lg animate-pulse">
          CU3D
        </h2>
      </div>
      <p className="mt-6 text-xl text-transparent bg-clip-text bg-gradient-to-b from-blue-200 to-blue-400 opacity-0 animate-fadeInUp animation-delay-2000">
        The premier platform for 3D printing, <br />
        powered by CU3D innovations and cutting-edge technology.
      </p>
    </section>
  );
};

export default Hero;
