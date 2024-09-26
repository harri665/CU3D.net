import React, { useEffect, useRef, useState } from "react";

const Mountains = () => {
  const [isVisible, setIsVisible] = useState(false);
  const mountainRef = useRef(null);

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

  return (
    <div
      className="relative mt-[28em] w-full h-80 pointer-events-none"
      ref={mountainRef}
    >
      <div className="absolute inset-0 flex justify-center space-x-6">
        {/* Mountain 1 */}
        <div
          className="w-80 h-80 bg-gray-900 transform rotate-45 flex items-center justify-center text-transparent animate-mountainLoad1"
          style={{
            boxShadow:
              "-1em -0.2em 0.4em -1.1em #c2ccff, inset 0em 0em 0em 2px #c2ccff, inset 0.2em 0.3em 0.2em -0.2em #c2ccff, inset 10.2em 10.3em 2em -10em #d4e6ff2f",
          }}
        >
          <p
            className={`transition-opacity duration-500 ${
              isVisible ? "opacity-100 text-blue-300" : "opacity-0"
            }`}
          >
            Mountain 1
          </p>
        </div>

        {/* Mountain 2 */}
        <div
          className="w-56 h-80 bg-gray-900 transform rotate-45 flex items-center justify-center text-transparent animate-mountainLoad2"
          style={{
            boxShadow:
              "-1em -0.2em 0.4em -1.1em #c2ccff, inset 0em 0em 0em 2px #c2ccff, inset 0.2em 0.3em 0.2em -0.2em #c2ccff, inset 10.2em 10.3em 2em -10em #d4e6ff2f",
          }}
        >
          <p
            className={`transition-opacity duration-500 ${
              isVisible ? "opacity-100 text-blue-300" : "opacity-0"
            }`}
          >
            Mountain 2
          </p>
        </div>

        {/* Mountain 3 */}
        <div
          className="w-80 h-80 bg-gray-900 transform rotate-45 flex items-center justify-center text-transparent animate-mountainLoad1"
          style={{
            boxShadow:
              "-1em -0.2em 0.4em -1.1em #c2ccff, inset 0em 0em 0em 2px #c2ccff, inset 0.2em 0.3em 0.2em -0.2em #c2ccff, inset 10.2em 10.3em 2em -10em #d4e6ff2f",
          }}
        >
          <p
            className={`transition-opacity duration-500 ${
              isVisible ? "opacity-100 text-blue-300" : "opacity-0"
            }`}
          >
            Mountain 3
          </p>
        </div>
      </div>
      <div className="h-50"></div>
    </div>
  );
};

export default Mountains;
