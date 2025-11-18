import React from "react";

const CodeBlock = ({
  children,
  variant = "inline",
  language = "",
  className = "",
}) => {
  const baseClasses = "font-mono";

  const variants = {
    inline:
      "px-1.5 py-0.5 bg-gray-100 rounded text-xs text-gray-800 whitespace-nowrap",
    block:
      "block px-4 py-3 bg-blue-950 text-gray-100 rounded-lg text-sm overflow-x-auto",
  };

  const classes = [baseClasses, variants[variant], className]
    .filter(Boolean)
    .join(" ");

  if (variant === "block") {
    return (
      <pre className={classes}>
        <code className="text-xs font-mono">{children}</code>
      </pre>
    );
  }

  return <code className={classes}>{children}</code>;
};

export default CodeBlock;
