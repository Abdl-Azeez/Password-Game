import React from "react";

interface LogoProps {
  darkMode: boolean;
}

const Logo: React.FC<LogoProps> = ({ darkMode }) => {
  return (
    <div
      className={`text-3xl font-bold mb-6 ${
        darkMode ? "text-lightBlue" : "text-darkBlue"
      }`}
    >
      <span className={darkMode ? "text-white" : "text-blue-500"}>Pass</span>
      Game
    </div>
  );
};

export default Logo;
