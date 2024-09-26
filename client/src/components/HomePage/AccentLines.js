import React from "react";

const AccentLines = () => {
  const horizontalLines = [6, 11, 16, 24, 29];
  const verticalPositions = [24, 34, 24, 34];
  return (
    <div className="absolute top-0 left-0 w-full h-[42em] pointer-events-none opacity-0 animate-fadeIn animation-delay-2400">
      {/* Horizontal Lines */}
      {horizontalLines.map((top, index) => (
        <div
          key={index}
          className={`absolute w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-0`}
          style={{
            top: `${top}em`,
            animation: `accentLines 2s forwards`,
            animationDelay: `${2.4 + index * 0.2}s`,
          }}
        ></div>
      ))}
      {/* Vertical Lines */}
      {verticalPositions.map((left, index) => (
        <div
          key={index}
          className={`absolute h-full w-px bg-blue-200 opacity-0`}
          style={{
            left: `${left}em`,
            animation: `accentLines 2s forwards`,
            animationDelay: `${2 + index * 0.2}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default AccentLines;
