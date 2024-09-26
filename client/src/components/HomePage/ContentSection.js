import React from "react";

const ContentSection = () => {
  return (
    <section className="relative z-10 text-center py-64">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-40 h-40 bg-gray-900 rounded-full shadow-inner transform -translate-x-72"></div>
        <div className="w-40 h-40 bg-gray-900 rounded-2xl shadow-inner transform translate-x-72 translate-y-48"></div>
      </div>
      <p className="text-blue-200 text-sm font-light relative inline-block mt-16">
        Revolutionary by design
        <span className="absolute left-full ml-4 top-1/2 w-20 h-px bg-gradient-to-r from-blue-200 to-transparent"></span>
        <span className="absolute right-full mr-4 top-1/2 w-20 h-px bg-gradient-to-l from-blue-200 to-transparent"></span>
      </p>
      <h3 className="mt-4 mb-6 text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-blue-200 to-blue-400">
        3D Printing. Made Simple. <br />
        Join the CU3D Experience.
      </h3>
      <p className="text-blue-200 text-base font-normal max-w-xl mx-auto">
        Harness the power of CU3D’s revolutionary platform to bring your 3D designs to life.
        Whether you're a hobbyist or a professional, our tools provide unmatched versatility.
      </p>
    </section>
  );
};

export default ContentSection;
