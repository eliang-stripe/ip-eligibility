import React from "react";

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border";

  const variants = {
    default: "bg-primary text-white hover:border-black",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary",
  };

  const sizes = {
    default: "h-[32px] px-3 rounded-[6px] text-sm",
    lg: "h-10 px-4 rounded-md",
    icon: "h-10 w-10",
  };

  // Custom variants for this project
  const customVariants = {
    primary: "bg-primary text-white border-red",
    secondary: "bg-white border border-gray-300 text-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  const classes = [
    baseClasses,
    customVariants[variant] || variants[variant] || variants.default,
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
