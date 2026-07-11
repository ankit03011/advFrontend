import React from "react";

interface CardProps {
  className?: string;
  glass?: boolean;
  premiumBorder?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className = "",
  glass = false,
  premiumBorder = false,
  children,
}) => {
  const baseStyle = "rounded-3xl p-6 md:p-8 transition-all duration-300 shadow-premium";
  const borderStyle = premiumBorder ? "premium-border" : "border border-primary/5";
  const bgStyle = glass ? "glass-effect" : "bg-white";

  return (
    <div className={`${baseStyle} ${borderStyle} ${bgStyle} ${className}`}>
      {children}
    </div>
  );
};
export default Card;
