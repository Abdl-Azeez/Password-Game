import React, { useState, useEffect, useRef } from "react";
import ConditionBox from "./ConditionBox";
import Logo from "./Logo";

interface PasswordInputProps {
  darkMode: boolean;
}

const conditions = [
  "Your password must be at least 5 characters.",
  "Your password must include a number.",
  "Your password must include an uppercase letter.",
  "Your password must include a lowercase letter.",
  "Your password must include a special character (!, @, #, etc.).",
  "Your password must not contain spaces.",
  "Your password must include at least one repeating character (e.g., 'aa').",
  "Your password must include at least one sequence of numbers (e.g., '123').",
  "Your password must include at least one palindrome (e.g., 'madam').",
  "Your password must not include common words like 'password' or 'admin'.",
];

const containsPalindrome = (str: string) => {
  const len = str.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 2; j < len; j++) {
      const substr = str.slice(i, j + 1);
      if (substr === substr.split("").reverse().join("")) {
        return true;
      }
    }
  }
  return false;
};

const PasswordInput: React.FC<PasswordInputProps> = ({ darkMode }) => {
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [passedConditions, setPassedConditions] = useState<number>(0);
  const [hasStartedTyping, setHasStartedTyping] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const validatePassword = (password: string) => {
    const checks = [
      password.length >= 5,
      /\d/.test(password),
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]+/.test(password),
      !/\s/.test(password),
      /(.)\1/.test(password),
      /\d{2,}/.test(password),
      containsPalindrome(password),
      !/password|admin/i.test(password),
    ];
    return checks;
  };

  const checks = validatePassword(password);
  const passedCount = checks
    .slice(0, passedConditions + 1)
    .filter(Boolean).length;

  useEffect(() => {
    if (passedCount > passedConditions) {
      setPassedConditions(passedCount);
    }

    // Scroll to the latest condition (the top in reversed layout)
    if (containerRef.current) {
      const container = containerRef.current;
      const latestCondition = container.lastElementChild as HTMLElement;
      latestCondition?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [passedCount, passedConditions]);

  return (
    <div className="max-w-md mx-auto text-center">
      <Logo darkMode={darkMode} />
      <h1
        className={`${
          darkMode ? "text-lightBlue" : "text-darkBlue"
        } text-4xl font-bold mb-4`}
      >
        The Password Game
      </h1>
      <input
        type="text"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setAttempts(attempts + 1);
          setHasStartedTyping(true); // Set to true when user starts typing
        }}
        className={`${
          darkMode
            ? "bg-darkBlue border-lightBlue text-white"
            : "bg-white border-darkBlue text-darkBlue"
        } border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 transition duration-200 ease-in-out`}
        placeholder="Enter your password"
      />
      <div className="flex justify-between mb-4">
        <span className={`${darkMode ? "text-lightBlue" : "text-darkBlue"}`}>
          Passed Conditions: {passedConditions}
        </span>
        <span className={`${darkMode ? "text-lightBlue" : "text-darkBlue"}`}>
          Attempts: {attempts}
        </span>
      </div>
      <div
        className="h-72 overflow-y-auto flex flex-col-reverse"
        ref={containerRef}
      >
        {hasStartedTyping &&
          conditions
            .slice(0, passedConditions + 1)
            .map((condition, index) => (
              <ConditionBox
                key={index}
                condition={condition}
                passed={checks[index]}
                darkMode={darkMode}
              />
            ))}
      </div>
    </div>
  );
};

export default PasswordInput;
