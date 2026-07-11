import React from "react";

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-secondary border-r-transparent animate-spin"></div>
      </div>
      <span className="text-primary/70 font-semibold uppercase tracking-wider text-xs font-body animate-pulse">
        Loading Directory...
      </span>
    </div>
  );
};
export default Loading;
