import React, { forwardRef } from "react";

interface ConditionBoxProps {
  condition: string;
  passed: boolean;
  darkMode: boolean;
}

const ConditionBox = forwardRef<HTMLDivElement, ConditionBoxProps>(
  ({ condition, passed, darkMode }, ref) => {
    return (
      <div
        ref={ref}
        className={`p-2 mb-2 rounded ${
          passed ? "bg-green-500" : "bg-red-500"
        } ${darkMode ? "text-white" : "text-black"}`}
      >
        <span>
          {passed ? "✔" : "✖"} {condition}
        </span>
      </div>
    );
  }
);

export default ConditionBox;
