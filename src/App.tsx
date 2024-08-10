import React, { useState } from "react";
import PasswordInput from "./components/PasswordInput";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-darkBlue text-white" : "bg-white text-darkBlue"
      } min-h-screen flex items-center justify-center`}
    >
      <div className="absolute top-4 left-4">
        <button
          onClick={toggleTheme}
          className="bg-lightBlue text-white p-2 rounded shadow-md transition duration-300 hover:bg-blue-500 focus:outline-none"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <PasswordInput darkMode={darkMode} />
    </div>
  );
};

export default App;
