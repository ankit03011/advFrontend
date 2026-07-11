import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "dark";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseStyle =
    "ripple-btn inline-flex items-center justify-center font-semibold rounded-full uppercase tracking-wider transition-all duration-300 transform active:scale-95 focus:outline-none";

  const variants = {
    primary: "bg-primary text-cream hover:bg-primary/95 shadow-premium hover:shadow-gold/20 hover:-translate-y-0.5",
    secondary: "bg-secondary text-dark hover:bg-secondary/95 shadow-gold hover:-translate-y-0.5",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-cream hover:-translate-y-0.5",
    dark: "bg-dark text-cream hover:bg-dark/90 hover:-translate-y-0.5",
  };

  const sizes = {
    sm: "px-5 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
