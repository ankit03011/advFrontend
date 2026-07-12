import React from "react";
import { useTranslation } from "react-i18next";
import { IoSearch } from "react-icons/io5";

interface SearchBoxProps {
  value: string;
  onChange: (val: string) => void;
  searchType: "all" | "name" | "phone" | "enrollment";
  onSearchTypeChange: (type: "all" | "name" | "phone" | "enrollment") => void;
  disabled?: boolean;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  searchType,
  onSearchTypeChange,
  disabled = false,
}) => {
  const { t } = useTranslation();

  const getPlaceholder = () => {
    if (disabled) {
      return "preparing search..";
    }
    switch (searchType) {
      case "name":
        return t("search.placeholder_name");
      case "phone":
        return t("search.placeholder_phone");
      case "enrollment":
        return t("search.placeholder_enrollment");
      default:
        return t("search.placeholder_all");
    }
  };

  const types: { id: "all" | "name" | "phone" | "enrollment"; key: string }[] = [
    { id: "all", key: "search.btn_all" },
    { id: "name", key: "search.btn_name" },
    { id: "phone", key: "search.btn_phone" },
    { id: "enrollment", key: "search.btn_enroll" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <IoSearch className={`h-6 w-6 ${disabled ? "text-primary/30" : "text-primary"}`} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={getPlaceholder()}
          disabled={disabled}
          className={`block w-full pl-16 pr-6 py-5 bg-white border-2 border-primary/10 rounded-full text-dark placeholder-dark/40 focus:outline-none shadow-premium transition-all duration-300 text-base md:text-lg ${
            disabled 
              ? "opacity-60 cursor-not-allowed bg-cream/10 animate-pulse border-primary/5" 
              : "focus:border-secondary focus:ring-2 focus:ring-secondary/20"
          }`}
        />
      </div>

      {/* Filter Toggle Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => !disabled && onSearchTypeChange(type.id)}
            disabled={disabled}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              disabled
                ? "bg-white/40 text-dark/30 border border-primary/5 cursor-not-allowed"
                : searchType === type.id
                  ? "bg-primary text-cream shadow-premium cursor-pointer"
                  : "bg-white text-dark/70 hover:bg-primary/5 hover:text-primary border border-primary/5 cursor-pointer"
            }`}
          >
            {t(type.key)}
          </button>
        ))}
      </div>
    </div>
  );
};
export default SearchBox;
