import React, { useEffect, useRef, useState } from "react";

const Mountains = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mountainBackgrounds, setMountainBackgrounds] = useState({
    mountain1: "",
    mountain2: "",
    mountain3: "",
  });
  const mountainRef = useRef(null);

  // Handle intersection observer to detect when mountains are visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (mountainRef.current) {
      observer.observe(mountainRef.current);
    }

    return () => {
      if (mountainRef.current) {
        observer.unobserve(mountainRef.current);
      }
    };
  }, []);

  // Handle scroll event to update the background images of each mountain
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Example threshold: Change the background after 100px, 200px, and 300px of scrolling
      // setMountainBackgrounds({
      //   mountain1: scrollY > 100 ? "url('/img/f360.png')" : "",
      //   mountain2: scrollY > 200 ? "url('/logo.png')" : "",
      //   mountain3: scrollY > 300 ? "url('/img/blender.png')" : "",
      // });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full h-[70vh] pointer-events-none">
      {/* Mountain section at the bottom */}
      <div
        className="absolute bottom-0 w-full h-64 md:h-80 pointer-events-none"
        ref={mountainRef}
      >
        <div className="absolute inset-0 flex justify-center space-x-3 md:space-x-6">
          {/* Mountain 1 */}
          <div
            className="w-1/4 h-40 md:w-80 md:h-80 bg-gray-900 transform rotate-45 flex items-center justify-center text-transparent animate-mountainLoad1 transition-all duration-1000"
            style={{
              boxShadow:
                "-1em -0.2em 0.4em -1.1em #c2ccff, inset 0em 0em 0em 2px #c2ccff, inset 0.2em 0.3em 0.2em -0.2em #c2ccff, inset 10.2em 10.3em 2em -10em #d4e6ff2f",
              backgroundImage: mountainBackgrounds.mountain1,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "background-image 1s ease-in-out, background-size 1s ease-in-out, background-position 1s ease-in-out",
            }}
          >
            <p
              className={`transition-opacity duration-500 ${
                isVisible ? "opacity-100 text-blue-300" : "opacity-0"
              }`}
            >
              Fusion 360 
            </p>
          </div>

          {/* Mountain 2 */}
          <div
            className="w-1/4 h-40 md:w-56 md:h-80 bg-gray-900 transform rotate-45 flex items-center justify-center text-transparent animate-mountainLoad2 transition-all duration-1000"
            style={{
              boxShadow:
                "-1em -0.2em 0.4em -1.1em #c2ccff, inset 0em 0em 0em 2px #c2ccff, inset 0.2em 0.3em 0.2em -0.2em #c2ccff, inset 10.2em 10.3em 2em -10em #d4e6ff2f",
              backgroundImage: mountainBackgrounds.mountain2,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "background-image 1s ease-in-out, background-size 1s ease-in-out, background-position 1s ease-in-out",
            }}
          >
            <p
              className={`transition-opacity duration-500 ${
                isVisible ? "opacity-100 text-blue-300" : "opacity-0"
              }`}
            >
              CU3D
            </p>
          </div>

          {/* Mountain 3 */}
          <div
            className="w-1/4 h-40 md:w-80 md:h-80 bg-gray-900 transform rotate-45 flex items-center justify-center text-transparent animate-mountainLoad1 transition-all duration-1000"
            style={{
              boxShadow:
                "-1em -0.2em 0.4em -1.1em #c2ccff, inset 0em 0em 0em 2px #c2ccff, inset 0.2em 0.3em 0.2em -0.2em #c2ccff, inset 10.2em 10.3em 2em -10em #d4e6ff2f",
              backgroundImage: mountainBackgrounds.mountain3,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "background-image 1s ease-in-out, background-size 1s ease-in-out, background-position 1s ease-in-out",
            }}
          >
            <p
              className={`transition-opacity duration-500 ${
                isVisible ? "opacity-100 text-blue-300" : "opacity-0"
              }`}
            >
              Blender
            </p>
          </div>
        </div>
        <div className="h-40 md:h-50"></div>
      </div>
    </div>
  );
};

export default Mountains;
