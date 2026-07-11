import React from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="inline-flex bg-dark/10 p-1 rounded-full border border-primary/10">
      <button
        onClick={() => toggleLanguage("en")}
        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all duration-300 ${
          i18n.language === "en"
            ? "bg-primary text-cream shadow-sm"
            : "text-dark/60 hover:text-dark"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => toggleLanguage("hi")}
        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all duration-300 font-devanagari ${
          i18n.language === "hi"
            ? "bg-primary text-cream shadow-sm"
            : "text-dark/60 hover:text-dark"
        }`}
      >
        हिन्दी
      </button>
    </div>
  );
};
export default LanguageSwitcher;
