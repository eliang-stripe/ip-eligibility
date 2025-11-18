import React from "react";
import { ChevronRightIcon } from "../icons";

const Accordion = ({
  title,
  children,
  isExpanded = false,
  onToggle,
  className = "",
}) => {
  return (
    <div className={`overflow-hidden border-b border-gray-200 ${className}`}>
      <button
        onClick={onToggle}
        className="w-full px-2 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <div
            className={`transform transition-transform ${
              isExpanded ? "-rotate-90" : ""
            }`}
          >
            <ChevronRightIcon />
          </div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
      </button>
      {isExpanded && (
        <div className="px-6 pt-1 pb-4 bg-white border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
