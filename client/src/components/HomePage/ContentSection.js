import React from "react";

const ContentSection = () => {
  return (
    <section className="relative z-10 text-center py-32 md:py-64">
      <div className="absolute inset-0 flex justify-center items-center">
        {/* <div className="w-24 h-24 md:w-40 md:h-40 bg-gray-900 rounded-full shadow-inner transform -translate-x-36 md:-translate-x-72"></div> */}
        {/* <div className="w-24 h-24 md:w-40 md:h-40 bg-gray-900 rounded-2xl shadow-inner transform translate-x-36 translate-y-24 md:translate-x-72 md:translate-y-48"></div> */}
      </div>
      <p className="text-blue-200 text-xs md:text-sm font-light relative inline-block mt-8 md:mt-16">
        For students, by students
        {/* <span className="absolute left-full ml-2 md:ml-4 top-1/2 w-10 md:w-20 h-px bg-gradient-to-r from-blue-200 to-transparent"></span> */}
        {/* <span className="absolute right-full mr-2 md:mr-4 top-1/2 w-10 md:w-20 h-px bg-gradient-to-l from-blue-200 to-transparent"></span> */}
      </p>
      <h3 className="mt-2 mb-4 text-2xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-blue-200 to-blue-400">
        CU Boulder's own student run 3D design organization <br />
        Founded 2024
      </h3>
      <p className="text-blue-200 text-sm md:text-base font-normal max-w-md md:max-w-xl mx-auto px-4">
        Join our community of talented student desiners. Learn about modeling techniques, navigate industry standard CAD softwares, and 3D print to your hearts content.
      </p>
    </section>
  );
};

export default ContentSection;
